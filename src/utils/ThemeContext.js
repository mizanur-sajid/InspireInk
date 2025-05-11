import React, { createContext, useContext, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

const lightTheme = {
  background: '#ffffff',
  surface: '#f8f9fa',
  primary: '#4361ee',
  accent: '#f72585',
  text: {
    primary: '#212529',
    secondary: '#6c757d',
    inverse: '#ffffff'
  },
  border: '#dee2e6'
};

const darkTheme = {
  background: '#1a1b1e',
  surface: '#2c2e33',
  primary: '#4cc9f0',
  accent: '#f72585',
  text: {
    primary: '#f8f9fa',
    secondary: '#adb5bd',
    inverse: '#212529'
  },
  border: '#495057'
};

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  React.useEffect(() => {
    // Load saved theme preference
    AsyncStorage.getItem('theme').then(savedTheme => {
      if (savedTheme === 'dark') {
        setIsDark(true);
      }
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark(prev => {
      const newTheme = !prev;
      AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
      return newTheme;
    });
  }, []);

  const theme = {
    isDark,
    colors: isDark ? darkTheme : lightTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
