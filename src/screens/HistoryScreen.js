import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../utils/ThemeContext';
import { getJournalEntries } from '../utils/storage';
import { spacing, typography } from '../utils/styles';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';

export default function HistoryScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEntries, setFilteredEntries] = useState([]);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      const journalEntries = await getJournalEntries();
      setEntries(journalEntries);
      setFilteredEntries(journalEntries);
    } catch (error) {
      console.error('Error loading entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredEntries(entries);
      return;
    }

    const searchTerm = query.toLowerCase();
    const filtered = entries.filter(
      entry =>
        entry.content.toLowerCase().includes(searchTerm) ||
        entry.prompt.toLowerCase().includes(searchTerm)
    );
    setFilteredEntries(filtered);
  };

  const renderEntry = (entry) => {
    const date = new Date(entry.date);
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const previewLength = 100;
    const contentPreview = entry.content.length > previewLength
      ? `${entry.content.substring(0, previewLength)}...`
      : entry.content;

    return (
      <TouchableOpacity
        key={entry.date}
        onPress={() => navigation.navigate('Detail', { entry })}
      >
        <Card style={styles.entryCard}>
          <Text style={[styles.date, { color: colors.text.secondary }]}>
            {formattedDate}
          </Text>
          
          <Text 
            style={[
              styles.prompt,
              { color: colors.text.primary }
            ]}
            numberOfLines={2}
          >
            {entry.prompt}
          </Text>

          <Text
            style={[
              styles.preview,
              { color: colors.text.primary }
            ]}
            numberOfLines={3}
          >
            {contentPreview}
          </Text>
        </Card>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      contentContainerStyle={styles.contentContainer}
    >
      <SearchBar
        value={searchQuery}
        onChangeText={handleSearch}
        placeholder="Search journal entries..."
        onClear={() => {
          setSearchQuery('');
          setFilteredEntries(entries);
        }}
      />

      {filteredEntries.length === 0 ? (
        <Card style={styles.emptyCard}>
          <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
            {searchQuery
              ? "No entries match your search."
              : "No journal entries yet. Start writing!"}
          </Text>
        </Card>
      ) : (
        filteredEntries.map(renderEntry)
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  entryCard: {
    gap: spacing.sm,
  },
  date: {
    fontSize: typography.sizes.small,
  },
  prompt: {
    fontSize: typography.sizes.medium,
    fontWeight: typography.weights.medium,
    marginBottom: spacing.xs,
  },
  preview: {
    fontSize: typography.sizes.regular,
    lineHeight: 22,
  },
  emptyCard: {
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: typography.sizes.medium,
    textAlign: 'center',
  },
});
