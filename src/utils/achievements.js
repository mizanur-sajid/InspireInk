// Achievement definitions and milestone tracking
const achievements = {
  streaks: [
    { id: 'streak-3', name: 'Getting Started', description: '3 days writing streak', days: 3 },
    { id: 'streak-7', name: 'Weekly Writer', description: '7 days writing streak', days: 7 },
    { id: 'streak-30', name: 'Dedicated Author', description: '30 days writing streak', days: 30 },
  ],
  entries: [
    { id: 'entries-5', name: 'Warming Up', description: 'Write 5 journal entries', count: 5 },
    { id: 'entries-25', name: 'Story Collector', description: 'Write 25 journal entries', count: 25 },
    { id: 'entries-100', name: 'Master Chronicler', description: 'Write 100 journal entries', count: 100 },
  ],
  words: [
    { id: 'words-1000', name: 'Wordsmith', description: 'Write 1,000 words total', count: 1000 },
    { id: 'words-10000', name: 'Prolific Writer', description: 'Write 10,000 words total', count: 10000 },
    { id: 'words-50000', name: 'Novel Writer', description: 'Write 50,000 words total', count: 50000 },
  ]
};

// Calculate writing statistics
export function calculateStats(entries) {
  const now = new Date();
  const stats = {
    totalEntries: entries.length,
    totalWords: 0,
    currentStreak: 0,
    longestStreak: 0,
    averageWordsPerEntry: 0,
    achievedBadges: [],
  };

  if (entries.length === 0) return stats;

  // Calculate total words and check word-count achievements
  entries.forEach(entry => {
    const wordCount = entry.content.trim().split(/\s+/).length;
    stats.totalWords += wordCount;
  });

  // Calculate average words per entry
  stats.averageWordsPerEntry = Math.round(stats.totalWords / stats.totalEntries);

  // Calculate current streak
  let currentStreak = 0;
  let date = new Date();
  date.setHours(0, 0, 0, 0);

  // Sort entries by date in descending order
  const sortedEntries = [...entries].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  // Check if there's an entry for today
  const latestEntry = new Date(sortedEntries[0]?.date);
  latestEntry.setHours(0, 0, 0, 0);
  
  if (latestEntry.getTime() === date.getTime()) {
    currentStreak = 1;
    date.setDate(date.getDate() - 1);

    // Count consecutive days
    for (let i = 1; i < sortedEntries.length; i++) {
      const entryDate = new Date(sortedEntries[i].date);
      entryDate.setHours(0, 0, 0, 0);
      
      if (entryDate.getTime() === date.getTime()) {
        currentStreak++;
        date.setDate(date.getDate() - 1);
      } else {
        break;
      }
    }
  }

  stats.currentStreak = currentStreak;
  stats.longestStreak = Math.max(currentStreak, calculateLongestStreak(entries));

  // Check achievements
  achievements.streaks.forEach(achievement => {
    if (stats.currentStreak >= achievement.days) {
      stats.achievedBadges.push(achievement);
    }
  });

  achievements.entries.forEach(achievement => {
    if (stats.totalEntries >= achievement.count) {
      stats.achievedBadges.push(achievement);
    }
  });

  achievements.words.forEach(achievement => {
    if (stats.totalWords >= achievement.count) {
      stats.achievedBadges.push(achievement);
    }
  });

  return stats;
}

// Calculate longest writing streak
function calculateLongestStreak(entries) {
  if (entries.length === 0) return 0;

  const sortedEntries = [...entries].sort((a, b) => 
    new Date(a.date) - new Date(b.date)
  );

  let longestStreak = 1;
  let currentStreak = 1;
  let previousDate = new Date(sortedEntries[0].date);

  for (let i = 1; i < sortedEntries.length; i++) {
    const currentDate = new Date(sortedEntries[i].date);
    const dayDifference = Math.floor(
      (currentDate - previousDate) / (1000 * 60 * 60 * 24)
    );

    if (dayDifference === 1) {
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 1;
    }

    previousDate = currentDate;
  }

  return longestStreak;
}

export const getAchievements = () => achievements;
