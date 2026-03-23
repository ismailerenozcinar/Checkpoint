import React, { useState } from 'react';
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

const filterTags = ['Trending', 'New Releases', 'Open World', 'RPG', 'Action', 'Indie'];

const searchResults = [
  {
    id: 1,
    title: 'Elden Ring: Shadow of the Erdtree',
    year: 2024,
    genres: 'RPG, Action',
    rating: 9.6,
    platforms: ['desktop', 'game-controller', 'tv'],
    image: 'https://picsum.photos/seed/erdtree/80/80',
  },
  {
    id: 2,
    title: 'Cyberpunk 2077',
    year: 2020,
    genres: 'Sci-Fi, RPG',
    rating: 8.9,
    platforms: ['desktop', 'game-controller'],
    image: 'https://picsum.photos/seed/cp77/80/80',
  },
  {
    id: 3,
    title: 'Zelda: Breath of the Wild',
    year: 2017,
    genres: 'Adventure',
    rating: 9.8,
    platforms: ['tv'],
    image: 'https://picsum.photos/seed/zelda/80/80',
  },
  {
    id: 4,
    title: 'Hades II',
    year: 2024,
    genres: 'Rogue-like',
    rating: 9.4,
    platforms: ['desktop', 'game-controller', 'tv'],
    image: 'https://picsum.photos/seed/hades2/80/80',
  },
];

export default function SearchScreen() {
  const [activeFilter, setActiveFilter] = useState(0);
  const [searchText, setSearchText] = useState('');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="game-controller" size={28} color={COLORS.primary} />
        <Text style={styles.headerTitle}>Checkpoint</Text>
        <TouchableOpacity style={styles.avatarBtn}>
          <Ionicons name="person-circle" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color={COLORS.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search titles, genres, or studios..."
            placeholderTextColor={COLORS.textSecondary}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Filter Tags */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
        {filterTags.map((tag, i) => (
          <TouchableOpacity
            key={tag}
            onPress={() => setActiveFilter(i)}
            style={[styles.filterTag, activeFilter === i && styles.filterTagActive]}
          >
            <Text style={[styles.filterTagText, activeFilter === i && styles.filterTagTextActive]}>
              {tag}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results Count & Sort */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>RESULTS (42)</Text>
        <TouchableOpacity style={styles.sortButton}>
          <Text style={styles.sortText}>Relevance</Text>
          <Ionicons name="chevron-down" size={14} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Results List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {searchResults.map((game) => (
          <TouchableOpacity key={game.id} style={styles.resultCard}>
            <Image source={{ uri: game.image }} style={styles.resultImage} />
            <View style={styles.resultInfo}>
              <Text style={styles.resultTitle}>{game.title}</Text>
              <Text style={styles.resultMeta}>{game.year} • {game.genres}</Text>
              <View style={styles.platformsRow}>
                {game.platforms.map((p, i) => (
                  <Ionicons key={i} name={p} size={16} color={COLORS.textSecondary} style={{ marginRight: 8 }} />
                ))}
              </View>
            </View>
            <View style={styles.resultRight}>
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>{game.rating}</Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="library-outline" size={22} color={COLORS.textSecondary} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
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
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  headerTitle: {
    flex: 1,
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginLeft: 8,
  },
  avatarBtn: {
    padding: 2,
  },
  searchRow: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    gap: 10,
    marginBottom: SPACING.md,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchInput: {
    flex: 1,
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
    fontSize: FONTS.sizes.md,
  },
  filterButton: {
    width: 44,
    height: 44,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filtersScroll: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    maxHeight: 40,
  },
  filterTag: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.round,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: SPACING.sm,
  },
  filterTagActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterTagText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
  },
  filterTagTextActive: {
    color: COLORS.background,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  resultsCount: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    letterSpacing: 1,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sortText: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.md,
  },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SPACING.lg,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  resultImage: {
    width: 70,
    height: 70,
    borderRadius: BORDER_RADIUS.md,
  },
  resultInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  resultTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
  },
  resultMeta: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    marginTop: 2,
  },
  platformsRow: {
    flexDirection: 'row',
    marginTop: 6,
  },
  resultRight: {
    alignItems: 'center',
    gap: 10,
  },
  ratingBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.sm,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  ratingText: {
    color: COLORS.background,
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
  },
});
