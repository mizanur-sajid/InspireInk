<div align="center">

# ✍️ InspireInk

**A modern, intuitive writing prompt generator and daily journaling app.**

[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

Ignite your creativity, keep track of your thoughts, and build a lasting writing habit!

</div>

---

## ✨ Features

- **🎲 Random Writing Prompts**: Generate unique prompts to overcome writer's block and spark your imagination.
- **📔 Daily Journaling Space**: A clean, distraction-free environment to write down your thoughts.
- **💾 Save & History**: Persistent data saving with `AsyncStorage`, allowing you to view and manage past entries.
- **🔍 Detailed Entry View**: Dive back into your past writings with a dedicated viewing experience.
- **📈 Writing Statistics & Achievements**: Track your writing progress, streaks, and unlock achievements to stay motivated.
- **💡 Inspirational Quotes**: Get inspired with curated quotes for writers.
- **🎨 Theming Support**: Seamlessly switch between themes to suit your writing environment.
- **📱 Cross-Platform**: Ready to run on iOS, Android, and Web!

---

## 🚀 Quick Start

Get up and running with InspireInk in just a few steps:

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npx expo start
```

### 3. Run the App

- **📱 Mobile**: Use the [Expo Go](https://expo.dev/client) app on your mobile device to scan the QR code.
- **🌐 Web**: Press `w` in the terminal to open the app in your local web browser.

---

## 📂 Project Structure

A quick look at the core structure of the app:

```text
src/
├── screens/                  # Main application screens
│   ├── HomeScreen.js         # Main screen featuring the prompt generator
│   ├── JournalScreen.js      # Your personal writing space
│   ├── HistoryScreen.js      # Viewer for past journal entries
│   ├── DetailScreen.js       # Detailed view of individual journal entries
│   └── StatsScreen.js        # Writing statistics and user achievements
│
└── utils/                    # Utility functions and context
    ├── ThemeContext.js       # App-wide theme management
    ├── achievements.js       # Gamification and achievements logic
    ├── promptGenerator.js    # Writing prompts data and logic
    ├── quotes.js             # Collection of inspirational quotes
    ├── storage.js            # Data persistence helpers (AsyncStorage)
    └── styles.js             # Shared styling definitions
```

---

## 🛠 Tech Stack

InspireInk is built using modern mobile technologies:

- **[React Native](https://reactnative.dev/)** - Core framework for building native apps using React
- **[Expo](https://expo.dev/)** - Platform for making universal native apps for Android, iOS, and the web
- **[React Navigation](https://reactnavigation.org/)** - Routing and navigation for React Native apps
- **[AsyncStorage](https://react-native-async-storage.github.io/async-storage/)** - Unencrypted, asynchronous, persistent, key-value storage system

---

## 👨‍💻 Credits

© **InspireInk** > Made with ❤️ by **Mizan • Mainul • Labonno**
