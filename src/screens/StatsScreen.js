import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../utils/ThemeContext';
import { getJournalEntries } from '../utils/storage';
import { calculateStats } from '../utils/achievements';
import { spacing, typography, borderRadius } from '../utils/styles';
import Card from '../components/Card';

export default function StatsScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const entries = await getJournalEntries();
      const calculatedStats = calculateStats(entries);
      setStats(calculatedStats);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: colors.background, paddingTop: insets.top }
      ]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Writing Streaks */}
      <Card style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="flame" size={24} color={colors.primary} />
          <Text style={[styles.cardTitle, { color: colors.text.primary }]}>
            Writing Streaks
          </Text>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.primary }]}>
              {stats?.currentStreak || 0}
            </Text>
            <Text style={[styles.statLabel, { color: colors.text.secondary }]}>
              Current Streak
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.primary }]}>
              {stats?.longestStreak || 0}
            </Text>
            <Text style={[styles.statLabel, { color: colors.text.secondary }]}>
              Longest Streak
            </Text>
          </View>
        </View>
      </Card>

      {/* Writing Stats */}
      <Card style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="stats-chart" size={24} color={colors.primary} />
          <Text style={[styles.cardTitle, { color: colors.text.primary }]}>
            Writing Statistics
          </Text>
        </View>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.primary }]}>
              {stats?.totalEntries || 0}
            </Text>
            <Text style={[styles.statLabel, { color: colors.text.secondary }]}>
              Total Entries
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.primary }]}>
              {stats?.totalWords || 0}
            </Text>
            <Text style={[styles.statLabel, { color: colors.text.secondary }]}>
              Total Words
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.primary }]}>
              {stats?.averageWordsPerEntry || 0}
            </Text>
            <Text style={[styles.statLabel, { color: colors.text.secondary }]}>
              Avg. Words/Entry
            </Text>
          </View>
        </View>
      </Card>

      {/* Achievements */}
      <Card style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="trophy" size={24} color={colors.primary} />
          <Text style={[styles.cardTitle, { color: colors.text.primary }]}>
            Achievements
          </Text>
        </View>
        <View style={styles.achievementsList}>
          {stats?.achievedBadges.map((badge, index) => (
            <View key={badge.id} style={styles.achievementItem}>
              <Ionicons name="ribbon" size={24} color={colors.primary} />
              <View style={styles.achievementText}>
                <Text style={[styles.achievementTitle, { color: colors.text.primary }]}>
                  {badge.name}
                </Text>
                <Text style={[styles.achievementDesc, { color: colors.text.secondary }]}>
                  {badge.description}
                </Text>
              </View>
            </View>
          ))}
          {(!stats?.achievedBadges || stats.achievedBadges.length === 0) && (
            <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
              Keep writing to earn achievements!
            </Text>
          )}
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  card: {
    padding: spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  cardTitle: {
    fontSize: typography.sizes.large,
    fontWeight: typography.weights.bold,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.sm,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: spacing.sm,
  },
  statItem: {
    alignItems: 'center',
    minWidth: 100,
    padding: spacing.sm,
  },
  statValue: {
    fontSize: typography.sizes.xlarge,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: typography.sizes.small,
  },
  achievementsList: {
    gap: spacing.md,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  achievementText: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: typography.sizes.medium,
    fontWeight: typography.weights.medium,
  },
  achievementDesc: {
    fontSize: typography.sizes.small,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: typography.sizes.medium,
    fontStyle: 'italic',
  },
});
