# InspireInk What

A modern writing prompt generator and journaling app built with React Native and Expo.

## Features

- Random writing prompts generation
- Daily journaling space with save functionality
- Journal history viewer
- Search functionality for prompts
- Modern, clean UI design

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npx expo start
```

3. Use Expo Go app on your mobile device to scan the QR code, or press 'w' to open in web browser.

## Project Structure

- `/src/screens/` - Main app screens
  - `HomeScreen.js` - Main screen with prompt generator
  - `JournalScreen.js` - Writing space
  - `HistoryScreen.js` - Past entries viewer
- `/src/utils/` - Utility functions
  - `promptGenerator.js` - Writing prompts management

## Technologies Used

- React Native
- Expo
- React Navigation
- AsyncStorage for data persistence
