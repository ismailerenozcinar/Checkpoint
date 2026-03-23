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

const tags = ['Amazing Graphics', 'Compelling Story', 'Minor Bugs', 'Great Soundtrack', 'Long Gameplay'];

export default function ReviewScreen({ route, navigation }) {
  const game = route?.params?.game || {
    title: 'Cyberpunk 2077',
    subtitle: 'NIGHT CITY EDITION',
    image: 'https://picsum.photos/seed/cp77review/150/150',
  };

  const [rating, setRating] = useState(4);
  const [reviewText, setReviewText] = useState('');
  const [selectedTags, setSelectedTags] = useState(['Amazing Graphics', 'Compelling Story', 'Minor Bugs']);

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Write Review</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Game Card */}
        <View style={styles.gameCard}>
          <Image source={{ uri: game.image }} style={styles.gameImage} />
          <Text style={styles.gameTitle}>{game.title}</Text>
          <Text style={styles.gameSubtitle}>{game.subtitle || game.developer}</Text>
        </View>

        {/* Rating Section */}
        <View style={styles.ratingCard}>
          <Text style={styles.tapToRate}>TAP TO RATE</Text>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((s) => (
              <TouchableOpacity key={s} onPress={() => setRating(s)}>
                <Ionicons
                  name={s <= rating ? 'star' : 'star-outline'}
                  size={40}
                  color={COLORS.star}
                />
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.ratingDisplay}>{rating}.0 / 5.0</Text>
        </View>

        {/* Detailed Feedback */}
        <Text style={styles.sectionTitle}>Detailed Feedback</Text>
        <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textArea}
            placeholder="What did you think of the story, mechanics, and visual fidelity? Share your journey through Night City..."
            placeholderTextColor={COLORS.textMuted}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            value={reviewText}
            onChangeText={setReviewText}
          />
        </View>

        {/* Tags */}
        <View style={styles.tagsContainer}>
          {tags.map((tag) => (
            <TouchableOpacity
              key={tag}
              style={[styles.tag, selectedTags.includes(tag) && styles.tagSelected]}
              onPress={() => toggleTag(tag)}
            >
              <Text style={[styles.tagText, selectedTags.includes(tag) && styles.tagTextSelected]}>
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitText}>SUBMIT REVIEW</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.draftButton}>
          <Text style={styles.draftText}>Save as Draft</Text>
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
    marginBottom: SPACING.xl,
  },
  headerTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  gameCard: {
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.xl,
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  gameImage: {
    width: 120,
    height: 120,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
  },
  gameTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.xxl,
    fontWeight: 'bold',
  },
  gameSubtitle: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    letterSpacing: 2,
    marginTop: 4,
  },
  ratingCard: {
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  tapToRate: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    letterSpacing: 2,
    marginBottom: SPACING.md,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: SPACING.sm,
  },
  ratingDisplay: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  textAreaContainer: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    minHeight: 140,
  },
  textArea: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    lineHeight: 22,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.lg,
    gap: 8,
    marginBottom: SPACING.xxl,
  },
  tag: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.round,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  tagSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tagText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
  },
  tagTextSelected: {
    color: COLORS.background,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    marginHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  submitText: {
    color: COLORS.background,
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    letterSpacing: 1,
  },
  draftButton: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  draftText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    textDecorationLine: 'underline',
  },
});
