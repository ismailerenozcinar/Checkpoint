import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';

// Yorum kartı bileşeni - Oyun detay ve profil sayfasında kullanılır
export default function ReviewCard({ review, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.userRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{review.user?.charAt(0) || 'U'}</Text>
          </View>
          <View>
            <Text style={styles.userName}>{review.user || 'Anonymous'}</Text>
            <Text style={styles.date}>{review.date}</Text>
          </View>
        </View>
        <View style={styles.stars}>
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
      <Text style={styles.text} numberOfLines={3}>{review.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: FONTS.sizes.md,
  },
  userName: {
    color: COLORS.textPrimary,
    fontWeight: '600',
    fontSize: FONTS.sizes.md,
  },
  date: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.xs,
  },
  stars: {
    flexDirection: 'row',
    gap: 1,
  },
  text: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    lineHeight: 20,
  },
});
