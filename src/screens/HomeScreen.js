import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { 
  getRandomPrompt, 
  searchPrompts, 
  getGenres, 
  getRandomPromptByGenre 
} from '../utils/promptGenerator';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import Card from '../components/Card';
import { useTheme } from '../utils/ThemeContext';
import { spacing, typography, borderRadius } from '../utils/styles';
import { getRandomQuote } from '../utils/quotes';

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { colors, isDark, toggleTheme } = useTheme();
  const [currentPrompt, setCurrentPrompt] = useState(getRandomPrompt());
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [quote, setQuote] = useState(getRandomQuote());

  const genres = getGenres();

  const refreshQuote = useCallback(() => {
    setQuote(getRandomQuote());
  }, []);

  const generateNewPrompt = useCallback(() => {
    const newPrompt = selectedGenre 
      ? getRandomPromptByGenre(selectedGenre)
      : getRandomPrompt();
    setCurrentPrompt(newPrompt);
    setSearchQuery('');
    setSearchResults([]);
  }, [selectedGenre]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = searchPrompts(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handlePromptSelect = (result) => {
    setCurrentPrompt(result.prompt);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre === selectedGenre ? null : genre);
    setSearchQuery('');
    setSearchResults([]);
    const newPrompt = genre === selectedGenre
      ? getRandomPrompt()
      : getRandomPromptByGenre(genre);
    setCurrentPrompt(newPrompt);
  };

  const renderGenreButton = ({ item: genre }) => (
    <TouchableOpacity
      style={[
        styles.genreButton,
        {
          backgroundColor: genre === selectedGenre ? colors.primary : colors.surface,
          borderColor: colors.primary,
        },
      ]}
      onPress={() => handleGenreSelect(genre)}
    >
      <Text
        style={[
          styles.genreButtonText,
          {
            color: genre === selectedGenre ? colors.text.inverse : colors.primary,
          },
        ]}
      >
        {genre.charAt(0).toUpperCase() + genre.slice(1)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={[
        styles.container, 
        { 
          paddingTop: insets.top,
          backgroundColor: colors.background 
        }
      ]}
      contentContainerStyle={styles.contentContainer}
    >
      <Card style={styles.quoteCard}>
        <View style={styles.quoteCardContent}>
          <TouchableOpacity 
            onPress={toggleTheme} 
            style={[styles.themeToggle, { backgroundColor: colors.background }]}
            activeOpacity={0.7}
          >
            <Ionicons 
              name={isDark ? 'sunny' : 'moon'} 
              size={22} 
              color={isDark ? '#ffd166' : '#4361ee'} 
            />
          </TouchableOpacity>
          <View style={styles.quoteTextContainer}>
            <Text style={[styles.quoteText, { color: colors.text.primary }]}>
              "{quote.quote}"
            </Text>
            <Text style={[styles.quoteAuthor, { color: colors.text.secondary }]}>
              — {quote.author}
            </Text>
          </View>
        </View>
      </Card>

      <View style={styles.titleContainer}>
        <Text style={[styles.title, { color: colors.text.primary }]}>
          InspireInk
        </Text>
        <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
          A Writing Prompt Generator
        </Text>
      </View>

      <SearchBar
        value={searchQuery}
        onChangeText={handleSearch}
        placeholder="Search writing prompts..."
        onClear={() => {
          setSearchQuery('');
          setSearchResults([]);
        }}
      />

      <FlatList
        horizontal
        data={genres}
        renderItem={renderGenreButton}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        style={styles.genreList}
        contentContainerStyle={styles.genreListContent}
      />

      {searchResults.length > 0 ? (
        <View style={styles.searchResults}>
          {searchResults.map((result, index) => (
            <TouchableOpacity 
              key={index}
              onPress={() => handlePromptSelect(result)}
            >
              <Card variant="primary" style={styles.searchResultCard}>
                <Text style={[styles.genreLabel, { color: colors.text.secondary }]}>
                  {result.genre.charAt(0).toUpperCase() + result.genre.slice(1)}
                </Text>
                <Text style={[styles.searchResultText, { color: colors.text.primary }]}>
                  {result.prompt}
                </Text>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <>
          <Card style={styles.promptCard}>
            {selectedGenre && (
              <Text style={[styles.genreLabel, { color: colors.text.secondary }]}>
                {selectedGenre.charAt(0).toUpperCase() + selectedGenre.slice(1)}
              </Text>
            )}
            <Text style={[styles.promptText, { color: colors.text.primary }]}>
              {currentPrompt}
            </Text>
            <Button
              title="New Prompt"
              onPress={generateNewPrompt}
              variant="accent"
              style={styles.reloadButton}
            />
          </Card>

          <View style={styles.actionButtons}>
            <Button
              title="Start Writing"
              onPress={() => navigation.navigate('Journal', { prompt: currentPrompt })}
              variant="primary"
              size="large"
            />

            <View style={styles.buttonRow}>
              <Button
                title="View History"
                onPress={() => navigation.navigate('History')}
                variant="secondary"
                size="large"
                style={styles.halfButton}
              />
              <Button
                title="Writing Stats"
                onPress={() => navigation.navigate('Stats')}
                variant="secondary"
                size="large"
                style={styles.halfButton}
              />
            </View>

            <Text style={[styles.copyright, { color: colors.text.secondary }]}>
              © {new Date().getFullYear()} InspireInk - Made by Mizan • Mainul • Labonno
            </Text>
          </View>
        </>
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
    gap: spacing.lg,
  },
  quoteCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quoteTextContainer: {
    flex: 1,
    marginLeft: spacing.md,
  },
  themeToggle: {
    padding: spacing.sm,
    borderRadius: borderRadius.round,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  quoteCard: {
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  quoteText: {
    fontSize: typography.sizes.medium,
    fontStyle: 'italic',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  quoteAuthor: {
    fontSize: typography.sizes.small,
    textAlign: 'right',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.sizes.xxlarge,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.sizes.medium,
    fontWeight: typography.weights.medium,
  },
  genreList: {
    marginBottom: spacing.md,
  },
  genreListContent: {
    paddingHorizontal: spacing.xs,
    gap: spacing.sm,
  },
  genreButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.round,
    borderWidth: 1,
    marginRight: spacing.sm,
  },
  genreButtonText: {
    fontSize: typography.sizes.regular,
    fontWeight: typography.weights.medium,
  },
  promptCard: {
    marginVertical: spacing.md,
  },
  genreLabel: {
    fontSize: typography.sizes.small,
    marginBottom: spacing.sm,
  },
  promptText: {
    fontSize: typography.sizes.xlarge,
    lineHeight: 32,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  actionButtons: {
    gap: spacing.md,
  },
  searchResults: {
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  searchResultCard: {
    padding: spacing.sm,
  },
  searchResultText: {
    fontSize: typography.sizes.regular,
    lineHeight: 24,
  },
  reloadButton: {
    alignSelf: 'center',
    minWidth: 150,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  halfButton: {
    flex: 1,
  },
  copyright: {
    fontSize: typography.sizes.small,
    textAlign: 'center',
    marginTop: spacing.lg,
    opacity: 0.7,
  },
});
