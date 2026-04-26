import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { gameService } from '../services/api';

const GENRES = ['All', 'RPG', 'Action', 'Adventure', 'Open World', 'Sci-Fi', 'Fantasy', 'Indie', 'Rogue-like', 'Strategy'];

const SORT_OPTIONS = [
  { label: 'En Yüksek Puan', value: 'rating' },
  { label: 'En Yeni', value: 'year' },
  { label: 'İsim (A-Z)', value: 'title' },
];

function SortModal({ visible, current, onSelect, onClose }) {
  if (!visible) return null;
  return (
    <TouchableOpacity style={styles.modalOverlay} onPress={onClose} activeOpacity={1}>
      <View style={styles.sortModal}>
        {SORT_OPTIONS.map((opt) => (
          <TouchableOpacity
            key={opt.value}
            style={styles.sortOption}
            onPress={() => { onSelect(opt.value); onClose(); }}
          >
            <Text style={[styles.sortOptionText, current === opt.value && styles.sortOptionActive]}>
              {opt.label}
            </Text>
            {current === opt.value && (
              <Ionicons name="checkmark" size={18} color={COLORS.primary} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </TouchableOpacity>
  );
}

export default function SearchScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [showSort, setShowSort] = useState(false);

  const debounceRef = useRef(null);

  const fetchResults = useCallback(async (query, genre, sort) => {
    setLoading(true);
    setHasSearched(true);
    try {
      const params = {
        query: query || '',
        genre: genre !== 'All' ? genre : undefined,
      };
      const res = await gameService.search(query, params.genre ? { genre: params.genre } : {});
      let data = res.data?.results ?? res.data ?? [];

      // Client-side sort
      if (sort === 'year') {
        data = [...data].sort((a, b) => (b.releaseYear ?? 0) - (a.releaseYear ?? 0));
      } else if (sort === 'title') {
        data = [...data].sort((a, b) => a.title.localeCompare(b.title));
      }
      // 'rating' → backend already orders by rating

      setResults(data);
    } catch (_) {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // İlk yükleme — trending listesini göster
  useEffect(() => {
    fetchResults('', 'All', 'rating');
  }, [fetchResults]);

  const handleSearchChange = (text) => {
    setSearchText(text);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchResults(text, selectedGenre, sortBy);
    }, 350);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    fetchResults(searchText, genre, sortBy);
  };

  const handleSortSelect = (sort) => {
    setSortBy(sort);
    fetchResults(searchText, selectedGenre, sort);
  };

  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? 'Sırala';

  const renderItem = ({ item: game }) => (
    <TouchableOpacity
      style={styles.resultCard}
      onPress={() => navigation.navigate('GameDetail', { gameId: game.id })}
    >
      <Image
        source={{ uri: game.coverImageUrl }}
        style={styles.resultImage}
        defaultSource={{ uri: `https://picsum.photos/seed/${game.id}/80/80` }}
      />
      <View style={styles.resultInfo}>
        <Text style={styles.resultTitle} numberOfLines={2}>{game.title}</Text>
        <Text style={styles.resultMeta} numberOfLines={1}>
          {game.releaseYear ? `${game.releaseYear} • ` : ''}
          {(game.genres ?? []).join(', ')}
        </Text>
        <Text style={styles.resultDev} numberOfLines={1}>{game.developer ?? ''}</Text>
      </View>
      <View style={styles.resultRight}>
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={10} color={COLORS.background} />
          <Text style={styles.ratingText}>{game.rating?.toFixed(1)}</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={COLORS.textSecondary} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="game-controller" size={26} color={COLORS.primary} />
        <Text style={styles.headerTitle}>Ara</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color={COLORS.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Oyun, geliştirici ara..."
            placeholderTextColor={COLORS.textSecondary}
            value={searchText}
            onChangeText={handleSearchChange}
            returnKeyType="search"
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => handleSearchChange('')}>
              <Ionicons name="close-circle" size={18} color={COLORS.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.sortButton} onPress={() => setShowSort(true)}>
          <Ionicons name="options" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Genre Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersScroll}
        contentContainerStyle={styles.filtersContent}
      >
        {GENRES.map((genre) => (
          <TouchableOpacity
            key={genre}
            onPress={() => handleGenreSelect(genre)}
            style={[styles.filterTag, selectedGenre === genre && styles.filterTagActive]}
          >
            <Text style={[styles.filterTagText, selectedGenre === genre && styles.filterTagTextActive]}>
              {genre}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results Header */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>
          {loading ? 'Aranıyor...' : `${results.length} SONUÇ`}
        </Text>
        <TouchableOpacity style={styles.sortLabelBtn} onPress={() => setShowSort(true)}>
          <Text style={styles.sortLabelText}>{currentSortLabel}</Text>
          <Ionicons name="chevron-down" size={14} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* List */}
      {loading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : results.length === 0 && hasSearched ? (
        <View style={styles.emptyBox}>
          <Ionicons name="search-outline" size={48} color={COLORS.textSecondary} />
          <Text style={styles.emptyText}>Sonuç bulunamadı.</Text>
          <Text style={styles.emptySubText}>Farklı bir arama dene veya filtreni değiştir.</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}

      <SortModal
        visible={showSort}
        current={sortBy}
        onSelect={handleSortSelect}
        onClose={() => setShowSort(false)}
      />
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
    marginBottom: SPACING.md,
    gap: 8,
  },
  headerTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
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
    gap: 8,
  },
  searchInput: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
  },
  sortButton: {
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
    maxHeight: 44,
    marginBottom: SPACING.md,
  },
  filtersContent: {
    paddingHorizontal: SPACING.lg,
    gap: 8,
    alignItems: 'center',
  },
  filterTag: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: BORDER_RADIUS.round,
    borderWidth: 1,
    borderColor: COLORS.border,
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
    marginBottom: SPACING.sm,
  },
  resultsCount: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    letterSpacing: 1,
    fontWeight: '600',
  },
  sortLabelBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sortLabelText: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
  },
  loadingBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: SPACING.xl,
  },
  emptyText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
  },
  emptySubText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    textAlign: 'center',
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: 20,
  },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  resultImage: {
    width: 72,
    height: 72,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.border,
  },
  resultInfo: {
    flex: 1,
    marginLeft: SPACING.md,
    gap: 3,
  },
  resultTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
  },
  resultMeta: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
  },
  resultDev: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.xs,
  },
  resultRight: {
    alignItems: 'center',
    gap: 8,
    marginLeft: SPACING.sm,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.sm,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 3,
  },
  ratingText: {
    color: COLORS.background,
    fontSize: FONTS.sizes.sm,
    fontWeight: '700',
  },

  // Sort modal
  modalOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    zIndex: 100,
  },
  sortModal: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: BORDER_RADIUS.lg,
    borderTopRightRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    paddingBottom: 34,
    gap: 4,
  },
  sortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sortOptionText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
  },
  sortOptionActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});
