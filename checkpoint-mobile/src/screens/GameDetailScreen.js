import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { gameService, reviewService } from '../services/api';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const COVER_HEIGHT = 280;

function StarRow({ rating, size = 14 }) {
  return (
    <View style={{ flexDirection: 'row', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Ionicons
          key={s}
          name={s <= Math.round(rating) ? 'star' : 'star-outline'}
          size={size}
          color={COLORS.star}
        />
      ))}
    </View>
  );
}

export default function GameDetailScreen({ route, navigation }) {
  const gameId = route.params?.gameId ?? route.params?.game?.id;

  const [game, setGame] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [descExpanded, setDescExpanded] = useState(false);

  const scrollY = useRef(new Animated.Value(0)).current;

  // Animasyonlar
  const headerOpacity = scrollY.interpolate({
    inputRange: [COVER_HEIGHT - 80, COVER_HEIGHT - 40],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const coverTranslate = scrollY.interpolate({
    inputRange: [0, COVER_HEIGHT],
    outputRange: [0, -COVER_HEIGHT / 2],
    extrapolate: 'clamp',
  });
  const coverScale = scrollY.interpolate({
    inputRange: [-80, 0],
    outputRange: [1.2, 1],
    extrapolate: 'clamp',
  });

  const fetchAll = useCallback(async () => {
    if (!gameId) { setLoading(false); return; }
    try {
      const [gameRes, similarRes, reviewRes] = await Promise.allSettled([
        gameService.getById(gameId),
        gameService.getSimilar(gameId),
        reviewService.getByGame(gameId),
      ]);
      if (gameRes.status === 'fulfilled')    setGame(gameRes.value.data);
      if (similarRes.status === 'fulfilled') setSimilar(similarRes.value.data);
      if (reviewRes.status === 'fulfilled')  setReviews(reviewRes.value.data ?? []);
    } catch (_) {}
    finally { setLoading(false); }
  }, [gameId]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!game) {
    return (
      <View style={styles.centered}>
        <Ionicons name="alert-circle-outline" size={48} color={COLORS.textSecondary} />
        <Text style={styles.emptyText}>Oyun bulunamadı.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backFallback}>
          <Text style={{ color: COLORS.primary }}>Geri Dön</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const description = game.description ?? '';
  const shortDesc = description.length > 160 ? description.slice(0, 160) + '…' : description;

  return (
    <View style={styles.container}>
      {/* Animated sticky header */}
      <Animated.View style={[styles.stickyHeader, { opacity: headerOpacity }]}>
        <TouchableOpacity style={styles.stickyBack} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.stickyTitle} numberOfLines={1}>{game.title}</Text>
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {/* Cover Image with parallax */}
        <View style={styles.coverContainer}>
          <Animated.Image
            source={{ uri: game.coverImageUrl }}
            style={[
              styles.coverImage,
              { transform: [{ translateY: coverTranslate }, { scale: coverScale }] },
            ]}
            resizeMode="cover"
          />
          {/* Gradient overlay */}
          <View style={styles.coverGradient} />
          <View style={styles.coverOverlay}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.body}>
          {/* Genre tags */}
          <View style={styles.tagsRow}>
            {(game.genres ?? []).map((g) => (
              <View key={g} style={styles.tag}>
                <Text style={styles.tagText}>{g.toUpperCase()}</Text>
              </View>
            ))}
          </View>

          {/* Title & developer */}
          <Text style={styles.title}>{game.title}</Text>
          <Text style={styles.developer}>
            {game.developer ?? ''}
            {game.releaseYear ? ` • ${game.releaseYear}` : ''}
          </Text>

          {/* Action buttons */}
          <TouchableOpacity style={styles.primaryButton}>
            <Ionicons name="library-outline" size={18} color={COLORS.background} />
            <Text style={styles.primaryButtonText}>Add to Library</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Ionicons name="play-circle-outline" size={18} color={COLORS.primary} />
            <Text style={styles.secondaryButtonText}>Mark as Playing</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.outlineButton}>
            <Ionicons name="bookmark-outline" size={18} color={COLORS.textPrimary} />
            <Text style={styles.outlineButtonText}>Add to Wishlist</Text>
          </TouchableOpacity>

          {/* Rating */}
          <View style={styles.ratingSection}>
            <Text style={styles.ratingBig}>{game.rating.toFixed(1)}</Text>
            <StarRow rating={game.rating} size={18} />
            <Text style={styles.reviewCount}>
              {game.reviewCount > 0 ? `${game.reviewCount.toLocaleString()} REVIEWS` : 'İLK YORUMU YAZ'}
            </Text>
          </View>

          {/* Description */}
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            {descExpanded ? description : shortDesc}
          </Text>
          {description.length > 160 && (
            <TouchableOpacity onPress={() => setDescExpanded(!descExpanded)}>
              <Text style={styles.readMore}>
                {descExpanded ? 'Show Less ▴' : 'Read More ▾'}
              </Text>
            </TouchableOpacity>
          )}

          {/* Community Reviews */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Community Reviews</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Review', { gameId: game.id, gameTitle: game.title })}>
              <Text style={styles.writeReview}>WRITE REVIEW</Text>
            </TouchableOpacity>
          </View>

          {reviews.length > 0 ? reviews.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View style={styles.reviewUser}>
                  <View style={styles.reviewAvatar}>
                    <Text style={styles.reviewAvatarText}>
                      {(review.user?.username ?? 'U').charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.reviewUserName}>{review.user?.username ?? 'Kullanıcı'}</Text>
                    <Text style={styles.reviewDate}>
                      {new Date(review.createdAt).toLocaleDateString('tr-TR')}
                    </Text>
                  </View>
                </View>
                <StarRow rating={review.rating} size={12} />
              </View>
              <Text style={styles.reviewText}>{review.comment}</Text>
            </View>
          )) : (
            <View style={styles.emptyReviews}>
              <Ionicons name="chatbubble-outline" size={32} color={COLORS.textSecondary} />
              <Text style={styles.emptyReviewText}>Henüz yorum yok. İlk yorumu yaz!</Text>
            </View>
          )}

          {/* Similar Games */}
          {similar.length > 0 && (
            <>
              <Text style={[styles.sectionTitle, { marginTop: SPACING.lg }]}>Similar Games</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.similarList}>
                {similar.map((sg) => (
                  <TouchableOpacity
                    key={sg.id}
                    style={styles.similarCard}
                    onPress={() => navigation.push('GameDetail', { gameId: sg.id })}
                  >
                    <Image
                      source={{ uri: sg.coverImageUrl }}
                      style={styles.similarImage}
                    />
                    <Text style={styles.similarTitle} numberOfLines={2}>{sg.title}</Text>
                    <Text style={styles.similarGenre} numberOfLines={1}>
                      {(sg.genres ?? []).join(', ')}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          )}

          <View style={{ height: 40 }} />
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centered: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
  },
  backFallback: { marginTop: 8 },

  // Sticky header
  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    height: 56,
    paddingTop: 10,
    backgroundColor: COLORS.background,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  stickyBack: {
    marginRight: SPACING.md,
    padding: 4,
  },
  stickyTitle: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
  },

  // Cover
  coverContainer: {
    height: COVER_HEIGHT,
    overflow: 'hidden',
    backgroundColor: COLORS.surface,
  },
  coverImage: {
    width: SCREEN_WIDTH,
    height: COVER_HEIGHT,
  },
  coverGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: 'transparent',
    // Fade from transparent to background
    // LinearGradient olmadan basit overlay
  },
  coverOverlay: {
    position: 'absolute',
    top: 44,
    left: SPACING.lg,
    right: SPACING.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  body: {
    paddingTop: SPACING.lg,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.lg,
    gap: 8,
    marginBottom: SPACING.sm,
  },
  tag: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.round,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  tagText: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.xs,
    fontWeight: '600',
  },
  title: {
    fontSize: FONTS.sizes.title ?? 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.sm,
  },
  developer: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    marginTop: 4,
  },

  // Buttons
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    marginHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    gap: 8,
  },
  primaryButtonText: {
    color: COLORS.background,
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    marginHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    gap: 8,
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
  },
  outlineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.xl,
    gap: 8,
  },
  outlineButtonText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
  },

  // Rating
  ratingSection: {
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
    gap: 6,
  },
  ratingBig: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.primary,
    lineHeight: 52,
  },
  reviewCount: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.xs,
    letterSpacing: 1,
    marginTop: 2,
  },

  // Description
  sectionTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.sm,
    marginTop: SPACING.lg,
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    lineHeight: 22,
    paddingHorizontal: SPACING.lg,
  },
  readMore: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.md,
    paddingHorizontal: SPACING.lg,
    marginTop: 6,
    marginBottom: SPACING.lg,
    fontWeight: '600',
  },
  writeReview: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.sm,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // Reviews
  reviewCard: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  reviewUser: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  reviewAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewAvatarText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: FONTS.sizes.md,
  },
  reviewUserName: {
    color: COLORS.textPrimary,
    fontWeight: '600',
    fontSize: FONTS.sizes.md,
  },
  reviewDate: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.xs,
  },
  reviewText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    lineHeight: 20,
  },
  emptyReviews: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    gap: 8,
    marginHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surface,
  },
  emptyReviewText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
  },

  // Similar
  similarList: {
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.sm,
  },
  similarCard: {
    marginRight: SPACING.md,
    width: 110,
  },
  similarImage: {
    width: 110,
    height: 110,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: 6,
    backgroundColor: COLORS.surface,
  },
  similarTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
  },
  similarGenre: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.xs,
    marginTop: 2,
  },
});
