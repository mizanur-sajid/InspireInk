# ✍️ InspireInk

A modern, intuitive writing prompt generator and daily journaling app built with React Native and Expo. Ignite your creativity, keep track of your thoughts, and build a lasting writing habit!

## ✨ Features

- **Random Writing Prompts**: Generate unique prompts to overcome writer's block and spark your imagination.
- **Daily Journaling Space**: A clean, distraction-free environment to write down your thoughts.
- **Save & History**: Persistent data saving with `AsyncStorage`, allowing you to view and manage past entries.
- **Detailed Entry View**: Dive back into your past writings with a dedicated viewing experience.
- **Writing Statistics & Achievements**: Track your writing progress, streaks, and unlock achievements to stay motivated.
- **Inspirational Quotes**: Get inspired with curated quotes for writers.
- **Theming Support**: Seamlessly switch between themes to suit your writing environment.
- **Modern UI Design**: Sleek, beautiful interface with smooth navigation.
- **Cross-Platform**: Ready to run on iOS, Android, and Web!

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npx expo start
   ```

3. **Run the App:**
   - **Mobile**: Use the [Expo Go](https://expo.dev/client) app on your mobile device to scan the QR code.
   - **Web**: Press `w` in the terminal to open the app in your local web browser.

## 📂 Project Structure

- `/src/screens/` - Main application screens
  - `HomeScreen.js` - Main screen featuring the prompt generator
  - `JournalScreen.js` - Your personal writing space
  - `HistoryScreen.js` - Viewer for past journal entries
  - `DetailScreen.js` - Detailed view of individual journal entries
  - `StatsScreen.js` - Writing statistics and user achievements
- `/src/utils/` - Utility functions and context
  - `ThemeContext.js` - App-wide theme management
  - `achievements.js` - Logic for gamification and achievements
  - `promptGenerator.js` - Logic and management for writing prompts
  - `quotes.js` - Collection of inspirational quotes
  - `storage.js` - Data persistence helpers using AsyncStorage
  - `styles.js` - Shared styling definitions

## 🛠 Technologies Used

- **React Native** - Core framework
- **Expo** - Development platform and build tools
- **React Navigation** - App routing and navigation
- **AsyncStorage** - Local data persistence

## 👨‍💻 Credits

© InspireInk • Made with ❤️ by Mizan X Mainul X Labonno
