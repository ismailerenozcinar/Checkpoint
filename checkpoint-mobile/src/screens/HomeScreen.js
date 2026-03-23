import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';

// Örnek veriler (daha sonra API'den gelecek)
const trendingGames = [
  {
    id: 1,
    title: 'Elden Ring',
    genre: 'RPG',
    developer: 'FROMSOFTWARE',
    rating: 4.9,
    image: 'https://picsum.photos/seed/eldenring/300/400',
  },
  {
    id: 2,
    title: 'Cyberpunk 2077',
    genre: 'ACTION',
    developer: 'CD PROJEKT RED',
    rating: 4.8,
    image: 'https://picsum.photos/seed/cyberpunk/300/400',
  },
  {
    id: 3,
    title: 'Starfield',
    genre: 'RPG',
    developer: 'BETHESDA',
    rating: 4.2,
    image: 'https://picsum.photos/seed/starfield/300/400',
  },
];

const continuePlayingGame = {
  title: 'God of War Ragnarök',
  progress: 65,
  lastPlayed: '2 hours ago',
  image: 'https://picsum.photos/seed/gow/80/80',
};

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color={COLORS.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search games, developers, or friends"
            placeholderTextColor={COLORS.textSecondary}
          />
        </View>

        {/* Trending Games */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending Games</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.trendingList}>
          {trendingGames.map((game) => (
            <TouchableOpacity
              key={game.id}
              style={styles.trendingCard}
              onPress={() => navigation.navigate('GameDetail', { game })}
            >
              <Image source={{ uri: game.image }} style={styles.trendingImage} />
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={12} color={COLORS.star} />
                <Text style={styles.ratingText}>{game.rating}</Text>
              </View>
              <Text style={styles.gameName}>{game.title}</Text>
              <Text style={styles.gameInfo}>
                {game.genre} • {game.developer}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Continue Playing */}
        <Text style={[styles.sectionTitle, { marginTop: SPACING.xl }]}>Continue Playing</Text>
        <TouchableOpacity style={styles.continueCard}>
          <Image source={{ uri: continuePlayingGame.image }} style={styles.continueImage} />
          <View style={styles.continueInfo}>
            <Text style={styles.continueTitle}>{continuePlayingGame.title}</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${continuePlayingGame.progress}%` }]} />
            </View>
            <Text style={styles.continueSubtext}>Last played: {continuePlayingGame.lastPlayed}</Text>
          </View>
          <Text style={styles.progressPercent}>{continuePlayingGame.progress}%</Text>
          <TouchableOpacity style={styles.playButton}>
            <Ionicons name="play" size={20} color={COLORS.background} />
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Your Activity */}
        <Text style={[styles.sectionTitle, { marginTop: SPACING.xl }]}>Your Activity</Text>
        <View style={styles.activityStats}>
          <View style={styles.statItem}>
            <Ionicons name="game-controller" size={24} color={COLORS.primary} />
            <Text style={styles.statLabel}>Playing</Text>
            <Text style={styles.statValue}>12</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="checkmark-circle" size={24} color={COLORS.primary} />
            <Text style={styles.statLabel}>Completed</Text>
            <Text style={styles.statValue}>84</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="heart" size={24} color={COLORS.error} />
            <Text style={styles.statLabel}>Wishlist</Text>
            <Text style={styles.statValue}>31</Text>
          </View>
        </View>

        {/* Activity Feed */}
        <View style={styles.activityItem}>
          <Ionicons name="trophy" size={28} color={COLORS.primary} style={styles.activityIcon} />
          <View>
            <Text style={styles.activityText}>
              Unlocked achievement <Text style={styles.highlight}>"Dragon Slayer"</Text> in Elden Ring
            </Text>
            <Text style={styles.activityTime}>10 minutes ago</Text>
          </View>
        </View>
        <View style={styles.activityItem}>
          <Ionicons name="person-add" size={28} color={COLORS.info} style={styles.activityIcon} />
          <View>
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
  iconButton: {
    padding: 4,
  },
  avatarBtn: {
    padding: 2,
  },
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
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
    fontSize: FONTS.sizes.md,
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
  trendingList: {
    marginBottom: SPACING.sm,
  },
  trendingCard: {
    width: 180,
    marginRight: SPACING.md,
  },
  trendingImage: {
    width: 180,
    height: 240,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.sm,
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
  continueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
  },
  continueImage: {
    width: 50,
    height: 50,
    borderRadius: BORDER_RADIUS.md,
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
  activityIcon: {
    marginRight: SPACING.md,
  },
  activityText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    flex: 1,
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
