import React from 'react';
import { StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useTheme } from '../utils/ThemeContext';
import { spacing, borderRadius, elevation } from '../utils/styles';
import { Ionicons } from '@expo/vector-icons';

export default function ThemeToggle({ style }) {
  const { isDark, toggleTheme, colors } = useTheme();
  const [rotateAnim] = React.useState(new Animated.Value(isDark ? 1 : 0));

  React.useEffect(() => {
    Animated.spring(rotateAnim, {
      toValue: isDark ? 1 : 0,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();
  }, [isDark]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const scale = rotateAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.8, 1],
  });

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={[
        styles.container,
        {
          backgroundColor: isDark ? colors.surface : colors.background,
          borderColor: colors.border,
          ...(!isDark && elevation.small),
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.iconContainer,
          {
            transform: [{ rotate }, { scale }],
          },
        ]}
      >
        <Ionicons
          name={isDark ? 'moon' : 'sunny'}
          size={24}
          color={isDark ? colors.primary : colors.accent}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
