import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { gameService, libraryService } from '../services/api';

export default function HomeScreen({ navigation }) {
  const [trendingGames, setTrendingGames] = useState([]);
  const [continuePlaying, setContinuePlaying] = useState(null);
  const [libraryStats, setLibraryStats] = useState({ playing: 0, completed: 0, wishlist: 0 });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setError(null);

      const [trendingRes, playingRes] = await Promise.allSettled([
        gameService.getTrending(),
        libraryService.getMyLibrary('Playing'),
      ]);

      if (trendingRes.status === 'fulfilled') {
        setTrendingGames(trendingRes.value.data);
      }

      if (playingRes.status === 'fulfilled') {
        const playingGames = playingRes.value.data;
        if (playingGames && playingGames.length > 0) {
          setContinuePlaying(playingGames[0]);
        }
        setLibraryStats(prev => ({ ...prev, playing: playingGames?.length ?? 0 }));
      }
    } catch (err) {
      setError('Veriler yüklenemedi. Bağlantını kontrol et.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
            colors={[COLORS.primary]}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Ionicons name="game-controller" size={28} color={COLORS.primary} />
            <Text style={styles.headerTitle}>CHECKPOINT</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={22} color={COLORS.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.avatarBtn}>
              <Ionicons name="person-circle" size={32} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Arama Çubuğu */}
        <TouchableOpacity
          style={styles.searchContainer}
          onPress={() => navigation.navigate('Search')}
        >
          <Ionicons name="search" size={18} color={COLORS.textSecondary} />
          <Text style={[styles.searchInput, { color: COLORS.textSecondary }]}>
            Search games, developers, or friends
          </Text>
        </TouchableOpacity>

        {/* Hata mesajı */}
        {error && (
          <View style={styles.errorBox}>
            <Ionicons name="warning-outline" size={16} color={COLORS.error} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Trending Games */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending Games</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        {trendingGames.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.trendingList}>
            {trendingGames.map((game) => (
              <TouchableOpacity
                key={game.id}
                style={styles.trendingCard}
                onPress={() => navigation.navigate('GameDetail', { gameId: game.id })}
              >
                <Image
                  source={{ uri: game.coverImageUrl }}
                  style={styles.trendingImage}
                  defaultSource={{ uri: `https://picsum.photos/seed/${game.id}/300/400` }}
                />
                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={12} color={COLORS.star} />
                  <Text style={styles.ratingText}>{game.rating.toFixed(1)}</Text>
                </View>
                <Text style={styles.gameName} numberOfLines={1}>{game.title}</Text>
                <Text style={styles.gameInfo} numberOfLines={1}>
                  {game.genres?.[0] ?? 'Game'} • {game.developer ?? ''}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.emptyRow}>
            <Text style={styles.emptyText}>Oyun bulunamadı.</Text>
          </View>
        )}

        {/* Continue Playing */}
        <Text style={[styles.sectionTitle, { marginTop: SPACING.xl }]}>Continue Playing</Text>
        {continuePlaying ? (
          <TouchableOpacity
            style={styles.continueCard}
            onPress={() => navigation.navigate('GameDetail', { gameId: continuePlaying.gameId })}
          >
            <Image
              source={{ uri: continuePlaying.game?.coverImageUrl ?? `https://picsum.photos/seed/${continuePlaying.gameId}/80/80` }}
              style={styles.continueImage}
            />
            <View style={styles.continueInfo}>
              <Text style={styles.continueTitle} numberOfLines={1}>
                {continuePlaying.game?.title ?? 'Oyun'}
              </Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${continuePlaying.progress}%` }]} />
              </View>
              <Text style={styles.continueSubtext}>
                {continuePlaying.lastPlayedAt
                  ? `Son oynama: ${new Date(continuePlaying.lastPlayedAt).toLocaleDateString('tr-TR')}`
                  : 'Oynamaya devam et'}
              </Text>
            </View>
            <Text style={styles.progressPercent}>{continuePlaying.progress}%</Text>
            <View style={styles.playButton}>
              <Ionicons name="play" size={20} color={COLORS.background} />
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.emptyCard}>
            <Ionicons name="game-controller-outline" size={32} color={COLORS.textSecondary} />
            <Text style={styles.emptyCardText}>Kütüphanene oyun ekle</Text>
          </View>
        )}

        {/* Your Activity */}
        <Text style={[styles.sectionTitle, { marginTop: SPACING.xl }]}>Your Activity</Text>
        <View style={styles.activityStats}>
          <View style={styles.statItem}>
            <Ionicons name="game-controller" size={24} color={COLORS.primary} />
            <Text style={styles.statLabel}>Playing</Text>
            <Text style={styles.statValue}>{libraryStats.playing}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="checkmark-circle" size={24} color={COLORS.primary} />
            <Text style={styles.statLabel}>Completed</Text>
            <Text style={styles.statValue}>{libraryStats.completed}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="heart" size={24} color={COLORS.error} />
            <Text style={styles.statLabel}>Wishlist</Text>
            <Text style={styles.statValue}>{libraryStats.wishlist}</Text>
          </View>
        </View>

        {/* Activity Feed */}
        <View style={styles.activityItem}>
          <Ionicons name="trophy" size={28} color={COLORS.primary} style={styles.activityIcon} />
          <View style={{ flex: 1 }}>
            <Text style={styles.activityText}>
              Unlocked achievement <Text style={styles.highlight}>"Dragon Slayer"</Text> in Elden Ring
            </Text>
            <Text style={styles.activityTime}>10 minutes ago</Text>
          </View>
        </View>
        <View style={styles.activityItem}>
          <Ionicons name="person-add" size={28} color={COLORS.info} style={styles.activityIcon} />
          <View style={{ flex: 1 }}>
            <Text style={styles.activityText}>
              <Text style={styles.highlight}>AlexGaming</Text> started following you
            </Text>
            <Text style={styles.activityTime}>1 hour ago</Text>
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 50,
    paddingHorizontal: SPACING.lg,
  },
  centered: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    letterSpacing: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: { padding: 4 },
  avatarBtn: { padding: 2 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: SPACING.sm,
    fontSize: FONTS.sizes.md,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(207,34,46,0.1)',
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    gap: 8,
  },
  errorText: {
    color: COLORS.error,
    fontSize: FONTS.sizes.sm,
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  viewAll: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
  },
  trendingList: { marginBottom: SPACING.sm },
  trendingCard: { width: 180, marginRight: SPACING.md },
  trendingImage: {
    width: 180,
    height: 240,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.sm,
    backgroundColor: COLORS.surface,
  },
  ratingBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: BORDER_RADIUS.sm,
    paddingHorizontal: 6,
    paddingVertical: 3,
    gap: 3,
  },
  ratingText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.sm,
    fontWeight: '700',
  },
  gameName: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
  },
  gameInfo: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    marginTop: 2,
  },
  emptyRow: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
  },
  continueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
  },
  emptyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  emptyCardText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
  },
  continueImage: {
    width: 50,
    height: 50,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.border,
  },
  continueInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  continueTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
  },
  progressBar: {
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    marginTop: 6,
    marginBottom: 4,
  },
  progressFill: {
    height: 4,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  continueSubtext: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.xs,
  },
  progressPercent: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
    marginRight: SPACING.sm,
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SPACING.xl,
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },
  statLabel: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
  },
  statValue: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  activityIcon: { marginRight: SPACING.md },
  activityText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
  },
  highlight: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  activityTime: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.xs,
    marginTop: 2,
  },
});
