import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';

export default function GameDetailScreen({ route, navigation }) {
  // Oyun bilgisi navigasyonla gelecek
  const game = route?.params?.game || {
    id: 1,
    title: 'Cyberpunk 2077',
    genre: 'ACTION',
    developer: 'CD PROJEKT RED',
    rating: 4.8,
    image: 'https://picsum.photos/seed/cyberpunk/400/250',
  };

  const genres = ['RPG', 'ACTION', 'OPEN WORLD'];

  const reviews = [
    {
      id: 1,
      user: 'Johnny_Silverhand',
      rating: 5,
      text: '"The Phantom Liberty expansion completely changed the game. It\'s a masterpiece now. Night City has never looked better."',
      date: '2 days ago',
    },
    {
      id: 2,
      user: 'NightCityRunner',
      rating: 4,
      text: '"Solid RPG elements and the storytelling is top tier. A few bugs still linger but nothing game breaking."',
      date: '1 week ago',
    },
  ];

  const similarGames = [
    { id: 1, title: 'The Witcher 3', genre: 'RPG, Fantasy', image: 'https://picsum.photos/seed/witcher/120/120' },
    { id: 2, title: 'Starfield', genre: 'RPG, Sci-Fi', image: 'https://picsum.photos/seed/starfield2/120/120' },
    { id: 3, title: 'Deus Ex', genre: 'RPG, Cyberpunk', image: 'https://picsum.photos/seed/deusex/120/120' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cover Image */}
        <View style={styles.coverContainer}>
          <Image source={{ uri: game.image }} style={styles.coverImage} />
          <View style={styles.coverOverlay}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
            </TouchableOpacity>
            <View style={styles.coverActions}>
              <TouchableOpacity>
                <Ionicons name="share-social-outline" size={22} color={COLORS.textPrimary} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={22} color={COLORS.textPrimary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Tür Etiketleri */}
        <View style={styles.tagsRow}>
          {genres.map((g, i) => (
            <View key={i} style={styles.tag}>
              <Text style={styles.tagText}>{g}</Text>
            </View>
          ))}
        </View>

        {/* Oyun Başlığı */}
        <Text style={styles.title}>{game.title}</Text>
        <Text style={styles.developer}>{game.developer} • 2020</Text>

        {/* Aksiyon Butonları */}
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
          <Text style={styles.ratingBig}>{game.rating}</Text>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Ionicons
                key={s}
                name={s <= Math.round(game.rating) ? 'star' : 'star-outline'}
                size={16}
                color={COLORS.star}
              />
            ))}
          </View>
          <Text style={styles.reviewCount}>24.5K REVIEWS</Text>
        </View>

        {/* Açıklama */}
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>
          {game.title} is an open-world, action-adventure RPG set in the megalopolis of Night City,
          where you play as a cyberpunk mercenary wrapped up in a do-or-die fight for survival.
          Improved and featuring all-new free additional content, customize your character and
          playstyle as you take on jobs, build a reputation, and unlock upgrades.
        </Text>
        <TouchableOpacity>
          <Text style={styles.readMore}>Read More ▾</Text>
        </TouchableOpacity>

        {/* Community Reviews */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Community Reviews</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Review', { game })}>
            <Text style={styles.writeReview}>WRITE REVIEW</Text>
          </TouchableOpacity>
        </View>

        {reviews.map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <View style={styles.reviewUser}>
                <View style={styles.reviewAvatar}>
                  <Text style={styles.reviewAvatarText}>{review.user.charAt(0)}</Text>
                </View>
                <View>
                  <Text style={styles.reviewUserName}>{review.user}</Text>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
              </View>
              <View style={styles.reviewStars}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Ionicons
                    key={s}
                    name={s <= review.rating ? 'star' : 'star-outline'}
                    size={12}
                    color={COLORS.star}
                  />
                ))}
              </View>
            </View>
            <Text style={styles.reviewText}>{review.text}</Text>
          </View>
        ))}

        {/* Similar Games */}
        <Text style={styles.sectionTitle}>Similar Games</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.similarList}>
          {similarGames.map((sg) => (
            <TouchableOpacity key={sg.id} style={styles.similarCard}>
              <Image source={{ uri: sg.image }} style={styles.similarImage} />
              <Text style={styles.similarTitle}>{sg.title}</Text>
              <Text style={styles.similarGenre}>{sg.genre}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  coverContainer: {
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: 250,
  },
  coverOverlay: {
    position: 'absolute',
    top: 50,
    left: SPACING.lg,
    right: SPACING.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverActions: {
    flexDirection: 'row',
    gap: 12,
  },
  tagsRow: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    gap: 8,
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
    fontSize: FONTS.sizes.title,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.md,
  },
  developer: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
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
    borderWidth: 1,
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
  ratingSection: {
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  ratingBig: {
    fontSize: 42,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
    marginVertical: 4,
  },
  reviewCount: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.xs,
    letterSpacing: 1,
  },
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
    marginTop: 4,
    marginBottom: SPACING.lg,
  },
  writeReview: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.sm,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
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
    gap: 8,
  },
  reviewAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewAvatarText: {
    color: COLORS.primary,
    fontWeight: '700',
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
  reviewStars: {
    flexDirection: 'row',
    gap: 1,
  },
  reviewText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    lineHeight: 20,
  },
  similarList: {
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.sm,
  },
  similarCard: {
    marginRight: SPACING.md,
    width: 100,
  },
  similarImage: {
    width: 100,
    height: 100,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: 4,
  },
  similarTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
  },
  similarGenre: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.xs,
  },
});
