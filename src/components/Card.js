import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../utils/ThemeContext';
import { spacing, borderRadius, elevation } from '../utils/styles';

export default function Card({ children, variant = 'default', style, ...props }) {
  const { colors, isDark } = useTheme();

  const getBackgroundColor = () => {
    switch (variant) {
      case 'primary':
        return isDark ? colors.surface : colors.surface;
      case 'secondary':
        return colors.background;
      default:
        return colors.surface;
    }
  };

  const getBorderColor = () => {
    switch (variant) {
      case 'primary':
        return colors.primary;
      case 'secondary':
        return colors.border;
      default:
        return colors.border;
    }
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          ...(!isDark && elevation.small), // Apply elevation only in light mode
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    backgroundColor: 'white',
  },
});
