import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';

// Oyun kartı bileşeni - Ana sayfa ve arama sonuçlarında kullanılır
export default function GameCard({ game, onPress, variant = 'default' }) {
  if (variant === 'list') {
    return (
      <TouchableOpacity style={styles.listCard} onPress={onPress}>
        <Image source={{ uri: game.image }} style={styles.listImage} />
        <View style={styles.listInfo}>
          <Text style={styles.listTitle}>{game.title}</Text>
          <Text style={styles.listMeta}>{game.year} • {game.genres}</Text>
        </View>
        {game.rating && (
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>{game.rating}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: game.image }} style={styles.image} />
      {game.rating && (
        <View style={styles.starBadge}>
          <Ionicons name="star" size={12} color={COLORS.star} />
          <Text style={styles.starText}>{game.rating}</Text>
        </View>
      )}
      <Text style={styles.title}>{game.title}</Text>
      <Text style={styles.genre}>{game.genre} • {game.developer}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Default (Card) variant
  card: {
    width: 180,
    marginRight: SPACING.md,
  },
  image: {
    width: 180,
    height: 240,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.sm,
  },
  starBadge: {
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
  starText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.sm,
    fontWeight: '700',
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
  },
  genre: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    marginTop: 2,
  },

  // List variant
  listCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  listImage: {
    width: 70,
    height: 70,
    borderRadius: BORDER_RADIUS.md,
  },
  listInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  listTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
  },
  listMeta: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    marginTop: 2,
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
