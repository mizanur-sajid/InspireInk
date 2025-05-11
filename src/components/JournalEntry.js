import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../utils/ThemeContext';
import { spacing, typography, borderRadius } from '../utils/styles';
import Card from './Card';

export default function JournalEntry({ entry, style, onPress, ...props }) {
  const { colors } = useTheme();
  const { date, prompt, content } = entry;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <Card
        variant="primary"
        style={[styles.container, style]}
        {...props}
      >
      <Text style={[styles.date, { color: colors.text.secondary }]}>
        {formattedDate}
      </Text>
      
      <View style={styles.promptContainer}>
        <Text style={[styles.promptLabel, { color: colors.text.secondary }]}>
          Prompt:
        </Text>
        <Text style={[styles.prompt, { color: colors.text.primary }]}>
          {prompt}
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <Text 
          style={[styles.content, { color: colors.text.primary }]}
          numberOfLines={3}
        >
          {content}
        </Text>
      </View>

      <View style={[styles.footer, { borderTopColor: colors.border }]}>
        <Text style={[styles.readMore, { color: colors.primary }]}>
          Tap to read more
        </Text>
      </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  date: {
    fontSize: typography.sizes.small,
    marginBottom: spacing.sm,
  },
  promptContainer: {
    marginBottom: spacing.md,
  },
  promptLabel: {
    fontSize: typography.sizes.small,
    marginBottom: spacing.xs,
  },
  prompt: {
    fontSize: typography.sizes.medium,
    fontWeight: typography.weights.medium,
    lineHeight: 24,
  },
  contentContainer: {
    marginBottom: spacing.md,
  },
  content: {
    fontSize: typography.sizes.regular,
    lineHeight: 22,
  },
  footer: {
    borderTopWidth: 1,
    paddingTop: spacing.md,
    marginTop: spacing.md,
  },
  readMore: {
    fontSize: typography.sizes.small,
    fontWeight: typography.weights.medium,
    textAlign: 'center',
  },
});
