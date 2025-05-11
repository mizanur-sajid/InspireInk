import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  ENTRIES: '@journal_entries',
};

export async function saveJournalEntry(entry) {
  try {
    // Get existing entries
    const existingEntriesJson = await AsyncStorage.getItem(STORAGE_KEYS.ENTRIES);
    const existingEntries = existingEntriesJson ? JSON.parse(existingEntriesJson) : [];

    // Create new entry with date
    const newEntry = {
      ...entry,
      date: new Date().toISOString(),
    };

    // Add new entry to the beginning of the array
    const updatedEntries = [newEntry, ...existingEntries];

    // Save updated entries
    await AsyncStorage.setItem(STORAGE_KEYS.ENTRIES, JSON.stringify(updatedEntries));

    return newEntry;
  } catch (error) {
    console.error('Error saving journal entry:', error);
    throw error;
  }
}

export async function getJournalEntries() {
  try {
    const entriesJson = await AsyncStorage.getItem(STORAGE_KEYS.ENTRIES);
    return entriesJson ? JSON.parse(entriesJson) : [];
  } catch (error) {
    console.error('Error getting journal entries:', error);
    throw error;
  }
}

export async function deleteJournalEntry(date) {
  try {
    const existingEntriesJson = await AsyncStorage.getItem(STORAGE_KEYS.ENTRIES);
    const existingEntries = existingEntriesJson ? JSON.parse(existingEntriesJson) : [];

    const updatedEntries = existingEntries.filter(entry => entry.date !== date);
    await AsyncStorage.setItem(STORAGE_KEYS.ENTRIES, JSON.stringify(updatedEntries));
  } catch (error) {
    console.error('Error deleting journal entry:', error);
    throw error;
  }
}

export async function clearAllEntries() {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.ENTRIES);
  } catch (error) {
    console.error('Error clearing entries:', error);
    throw error;
  }
}

export async function searchEntries(query) {
  try {
    const entries = await getJournalEntries();
    const searchTerm = query.toLowerCase();

    return entries.filter(entry => 
      entry.content.toLowerCase().includes(searchTerm) ||
      entry.prompt.toLowerCase().includes(searchTerm)
    );
  } catch (error) {
    console.error('Error searching entries:', error);
    throw error;
  }
}
