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

const favoriteGames = [
  { id: 1, title: 'Cyberpunk 2077', image: 'https://picsum.photos/seed/cp2/100/130' },
  { id: 2, title: 'The Witcher 3', image: 'https://picsum.photos/seed/tw3/100/130' },
  { id: 3, title: 'God of War', image: 'https://picsum.photos/seed/gow2/100/130' },
];

const recentReviews = [
  {
    id: 1,
    game: 'Starfield',
    rating: 9.0,
    text: '"An absolute masterpiece of space exploration. The depth of ship customization..."',
    date: '2 days ago',
    image: 'https://picsum.photos/seed/sf2/50/50',
  },
  {
    id: 2,
    game: 'Sea of Stars',
    rating: 8.5,
    text: '"A nostalgic trip back to the golden age of JRPGs. The turn-based combat is refreshing..."',
    date: '1 week ago',
    image: 'https://picsum.photos/seed/sos/50/50',
  },
];

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="menu" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Avatar & Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle" size={90} color={COLORS.primary} />
            <View style={styles.editBadge}>
              <Ionicons name="pencil" size={12} color={COLORS.textPrimary} />
            </View>
          </View>
          <Text style={styles.username}>Checkpoint_Pro</Text>
          <View style={styles.levelRow}>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>LEVEL 42</Text>
            </View>
            <Text style={styles.userType}>RPG Enthusiast</Text>
          </View>
          <Text style={styles.bio}>
            Hardcore RPG enthusiast and speedrunner. Exploring the digital frontier one quest at a
            time. Currently hunting for platinum in Elden Ring.
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCircle}>
            <Text style={styles.statNumber}>124</Text>
            <Text style={styles.statLabel}>PLAYED</Text>
          </View>
          <View style={[styles.statCircle, styles.statCircleMid]}>
            <Text style={styles.statNumber}>86</Text>
            <Text style={styles.statLabel}>COMPLETED</Text>
          </View>
          <View style={styles.statCircle}>
            <Text style={styles.statNumber}>32</Text>
            <Text style={styles.statLabel}>REVIEWS</Text>
          </View>
        </View>

        {/* Favorite Games */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Favorite Games</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.favList}>
          {favoriteGames.map((game) => (
            <TouchableOpacity key={game.id} style={styles.favCard}>
              <Image source={{ uri: game.image }} style={styles.favImage} />
              <Text style={styles.favTitle}>{game.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Recent Reviews */}
        <Text style={styles.sectionTitle}>Recent Reviews</Text>
        {recentReviews.map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Image source={{ uri: review.image }} style={styles.reviewGameImg} />
              <View style={styles.reviewInfo}>
                <Text style={styles.reviewGame}>{review.game}</Text>
                <Text style={styles.reviewDate}>Reviewed {review.date}</Text>
              </View>
              <View style={styles.reviewRating}>
                <Ionicons name="star" size={12} color={COLORS.star} />
                <Text style={styles.reviewRatingText}>{review.rating}</Text>
              </View>
            </View>
            <Text style={styles.reviewText}>{review.text}</Text>
          </View>
        ))}

        {/* Account Section */}
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="person-outline" size={20} color={COLORS.primary} />
          <Text style={styles.menuText}>Edit Profile Information</Text>
          <Ionicons name="chevron-forward" size={18} color={COLORS.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="notifications-outline" size={20} color={COLORS.primary} />
          <Text style={styles.menuText}>Notification Settings</Text>
          <Ionicons name="chevron-forward" size={18} color={COLORS.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItemLogout}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  headerTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: SPACING.md,
  },
  editBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    fontSize: FONTS.sizes.title,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  levelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
    marginBottom: SPACING.md,
  },
  levelBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.round,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  levelText: {
    color: COLORS.background,
    fontSize: FONTS.sizes.xs,
    fontWeight: '700',
  },
  userType: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
  },
  bio: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    textAlign: 'center',
    lineHeight: 22,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  statCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statCircleMid: {
    borderColor: COLORS.primary,
  },
  statNumber: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xxl,
    fontWeight: '700',
  },
  statLabel: {
    color: COLORS.textSecondary,
    fontSize: 8,
    letterSpacing: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  viewAll: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
  },
  favList: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  favCard: {
    marginRight: SPACING.md,
    width: 100,
  },
  favImage: {
    width: 100,
    height: 130,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: 4,
  },
  favTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
  },
  reviewCard: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  reviewGameImg: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.sm,
  },
  reviewInfo: {
    flex: 1,
    marginLeft: SPACING.sm,
  },
  reviewGame: {
    color: COLORS.textPrimary,
    fontWeight: '700',
    fontSize: FONTS.sizes.md,
  },
  reviewDate: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.xs,
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  reviewRatingText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: FONTS.sizes.lg,
  },
  reviewText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    lineHeight: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  menuText: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    marginLeft: SPACING.md,
  },
  menuItemLogout: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  logoutText: {
    color: COLORS.error,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    marginLeft: SPACING.md,
  },
});
