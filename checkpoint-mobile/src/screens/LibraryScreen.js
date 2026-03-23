import React, { useState } from 'react';
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

const tabs = ['Playing', 'Completed', 'Backlog', 'Wishlist'];

const libraryGames = [
  { id: 1, title: 'Cyberpunk 2077', progress: 65, status: 'ACTIVE', image: 'https://picsum.photos/seed/cp1/180/220' },
  { id: 2, title: 'Elden Ring', progress: 22, status: 'ACTIVE', image: 'https://picsum.photos/seed/er1/180/220' },
  { id: 3, title: 'Starfield', progress: 40, status: 'ACTIVE', image: 'https://picsum.photos/seed/sf1/180/220' },
  { id: 4, title: 'Final Fantasy VII', progress: 85, status: 'PAUSED', image: 'https://picsum.photos/seed/ff7/180/220' },
  { id: 5, title: 'Hades II', progress: 30, status: 'ACTIVE', image: 'https://picsum.photos/seed/hd2/180/220' },
  { id: 6, title: 'Forza Horizon 5', progress: 50, status: 'ACTIVE', image: 'https://picsum.photos/seed/fh5/180/220' },
];

export default function LibraryScreen() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="person-circle-outline" size={36} color={COLORS.primary} />
          <View>
            <Text style={styles.headerTitle}>My Library</Text>
            <Text style={styles.headerSub}>142 Games Collected</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity>
            <Ionicons name="search" size={22} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="filter" size={22} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        {tabs.map((tab, i) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(i)}
            style={[styles.tab, activeTab === i && styles.tabActive]}
          >
            <Text style={[styles.tabText, activeTab === i && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Game Grid */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {libraryGames.map((game) => (
            <View key={game.id} style={styles.gameCard}>
              <Image source={{ uri: game.image }} style={styles.gameImage} />
              <View style={[styles.statusBadge, game.status === 'PAUSED' ? styles.pausedBadge : styles.activeBadge]}>
                <Text style={styles.statusText}>{game.status}</Text>
              </View>
              <Text style={styles.gameTitle}>{game.title}</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${game.progress}%` }]} />
              </View>
              <Text style={styles.progressText}>{game.progress}% PROGRESS</Text>
            </View>
          ))}
        </View>

        {/* Now Playing Bar */}
        <View style={styles.nowPlaying}>
          <Ionicons name="person-circle" size={36} color={COLORS.primary} />
          <View style={styles.nowPlayingInfo}>
            <Text style={styles.nowPlayingLabel}>NOW PLAYING</Text>
            <Text style={styles.nowPlayingTitle}>Cyberpunk 2077</Text>
          </View>
          <TouchableOpacity style={styles.playBtn}>
            <Ionicons name="play" size={20} color={COLORS.background} />
          </TouchableOpacity>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  headerSub: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 16,
  },
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: SPACING.lg,
  },
  tab: {
    paddingBottom: SPACING.md,
    marginRight: SPACING.xl,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
  },
  tabTextActive: {
    color: COLORS.primary,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.lg,
    justifyContent: 'space-between',
  },
  gameCard: {
    width: '48%',
    marginBottom: SPACING.lg,
  },
  gameImage: {
    width: '100%',
    height: 200,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.sm,
  },
  statusBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BORDER_RADIUS.sm,
  },
  activeBadge: {
    backgroundColor: COLORS.primary,
  },
  pausedBadge: {
    backgroundColor: COLORS.warning,
  },
  statusText: {
    color: COLORS.background,
    fontSize: FONTS.sizes.xs,
    fontWeight: '700',
  },
  gameTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
  },
  progressBar: {
    height: 3,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    marginTop: 6,
    marginBottom: 4,
  },
  progressFill: {
    height: 3,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  progressText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.xs,
  },
  nowPlaying: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginTop: SPACING.md,
  },
  nowPlayingInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  nowPlayingLabel: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.xs,
    fontWeight: '700',
    letterSpacing: 1,
  },
  nowPlayingTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
  },
  playBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
