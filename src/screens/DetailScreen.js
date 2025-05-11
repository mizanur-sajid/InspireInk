import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Share,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../utils/ThemeContext';
import { spacing, typography } from '../utils/styles';
import Card from '../components/Card';
import { Ionicons } from '@expo/vector-icons';

export default function DetailScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const { entry } = route.params;

  const formattedDate = new Date(entry.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${entry.prompt}\n\n${entry.content}\n\nWritten on ${formattedDate}`,
        title: 'My Journal Entry',
      });
    } catch (error) {
      console.error('Error sharing entry:', error);
    }
  };

  const handleExport = async () => {
    try {
      const content = `Journal Entry - ${formattedDate}\n\nPrompt:\n${entry.prompt}\n\nEntry:\n${entry.content}`;
      
      if (Platform.OS === 'web') {
        // For web, create a blob and download it
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `journal_entry_${new Date(entry.date).toISOString().split('T')[0]}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        Alert.alert(
          "Success",
          "Journal entry exported successfully!",
          [{ text: "OK" }]
        );
      } else {
        // For mobile, use expo-file-system and expo-sharing
        const fileUri = `${FileSystem.documentDirectory}journal_entry_${new Date(entry.date).toISOString().split('T')[0]}.txt`;
        await FileSystem.writeAsStringAsync(fileUri, content);
        
        await Sharing.shareAsync(fileUri, {
          mimeType: 'text/plain',
          dialogTitle: 'Export Journal Entry',
          UTI: 'public.plain-text'
        });
      }
    } catch (error) {
      console.error('Error exporting entry:', error);
      Alert.alert(
        "Error",
        "Failed to export journal entry. Please try again.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        style={[styles.scrollView, { paddingTop: insets.top }]}
        contentContainerStyle={styles.contentContainer}
      >
        <Card style={styles.card}>
          <Text style={[styles.date, { color: colors.text.secondary }]}>
            {formattedDate}
          </Text>

          <View style={styles.promptContainer}>
            <Text style={[styles.promptLabel, { color: colors.text.secondary }]}>
              Prompt:
            </Text>
            <Text style={[styles.prompt, { color: colors.text.primary }]}>
              {entry.prompt}
            </Text>
          </View>

          <View style={styles.contentContainer}>
            <Text style={[styles.content, { color: colors.text.primary }]}>
              {entry.content}
            </Text>
          </View>
        </Card>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: colors.surface }]}>
        <View style={styles.footerButtons}>
          <TouchableOpacity
            style={[styles.footerButton, styles.shareButton]}
            onPress={handleShare}
          >
            <Ionicons name="share-outline" size={24} color={colors.primary} />
            <Text style={[styles.buttonText, { color: colors.primary }]}>
              Share Entry
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.footerButton, styles.exportButton]}
            onPress={handleExport}
          >
            <Ionicons name="download-outline" size={24} color={colors.primary} />
            <Text style={[styles.buttonText, { color: colors.primary }]}>
              Export as Text
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.lg,
  },
  card: {
    marginBottom: spacing.lg,
  },
  date: {
    fontSize: typography.sizes.small,
    marginBottom: spacing.md,
  },
  promptContainer: {
    marginBottom: spacing.lg,
  },
  promptLabel: {
    fontSize: typography.sizes.small,
    marginBottom: spacing.xs,
  },
  prompt: {
    fontSize: typography.sizes.large,
    fontWeight: typography.weights.medium,
    lineHeight: 28,
  },
  content: {
    fontSize: typography.sizes.medium,
    lineHeight: 24,
  },
  footer: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
  },
  buttonText: {
    marginLeft: spacing.sm,
    fontSize: typography.sizes.medium,
    fontWeight: typography.weights.medium,
  },
});
