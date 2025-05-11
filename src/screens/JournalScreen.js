import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../utils/ThemeContext';
import { saveJournalEntry } from '../utils/storage';
import { spacing, typography } from '../utils/styles';
import Card from '../components/Card';
import Button from '../components/Button';

export default function JournalScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const { prompt } = route.params;
  const [content, setContent] = useState('');

  const handleSave = async () => {
    if (!content.trim()) {
      Alert.alert(
        "Empty Entry",
        "Please write something before saving.",
        [{ text: "OK" }]
      );
      return;
    }

    try {
      await saveJournalEntry({
        prompt,
        content: content.trim(),
      });
      Alert.alert(
        "Success",
        "Your journal entry has been saved!",
        [
          { 
            text: "OK",
            onPress: () => navigation.goBack()
          }
        ]
      );
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to save your journal entry. Please try again.",
        [{ text: "OK" }]
      );
      console.error('Error saving journal entry:', error);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={[styles.container, { paddingTop: insets.top }]}
        contentContainerStyle={styles.contentContainer}
      >
        <Card style={styles.promptCard}>
          <TextInput
            style={[
              styles.promptText,
              { color: colors.text.primary }
            ]}
            value={prompt}
            editable={false}
            multiline
          />
        </Card>

        <Card style={styles.inputCard}>
          <TextInput
            style={[
              styles.input,
              { color: colors.text.primary }
            ]}
            value={content}
            onChangeText={setContent}
            placeholder="Start writing here..."
            placeholderTextColor={colors.text.secondary}
            multiline
            autoFocus
            textAlignVertical="top"
          />
        </Card>
      </ScrollView>

      <View style={[
        styles.bottomBar,
        { backgroundColor: colors.surface }
      ]}>
        <Button
          title="Save Entry"
          onPress={handleSave}
          variant="primary"
          style={styles.saveButton}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.lg,
    paddingBottom: 80,
  },
  promptCard: {
    marginBottom: spacing.md,
  },
  promptText: {
    fontSize: typography.sizes.large,
    lineHeight: 24,
    fontWeight: typography.weights.medium,
  },
  inputCard: {
    flex: 1,
    minHeight: 300,
  },
  input: {
    fontSize: typography.sizes.regular,
    lineHeight: 24,
    minHeight: 280,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  saveButton: {
    marginBottom: spacing.md,
  },
});
