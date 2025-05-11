import React from 'react';
import { StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useTheme } from '../utils/ThemeContext';
import { spacing, typography, borderRadius } from '../utils/styles';

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  style,
  ...props
}) {
  const { colors } = useTheme();

  const getBackgroundColor = () => {
    if (disabled) return colors.text.secondary;
    switch (variant) {
      case 'primary':
        return colors.primary;
      case 'accent':
        return colors.accent;
      case 'secondary':
        return 'transparent';
      default:
        return colors.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return colors.text.inverse;
    switch (variant) {
      case 'secondary':
        return colors.primary;
      default:
        return colors.text.inverse;
    }
  };

  const getBorderColor = () => {
    if (disabled) return colors.text.secondary;
    switch (variant) {
      case 'secondary':
        return colors.primary;
      default:
        return 'transparent';
    }
  };

  const getSize = () => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: spacing.xs,
          paddingHorizontal: spacing.md,
          fontSize: typography.sizes.small,
        };
      case 'large':
        return {
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.xl,
          fontSize: typography.sizes.medium,
        };
      default:
        return {
          paddingVertical: spacing.sm,
          paddingHorizontal: spacing.lg,
          fontSize: typography.sizes.regular,
        };
    }
  };

  const sizeStyles = getSize();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          paddingVertical: sizeStyles.paddingVertical,
          paddingHorizontal: sizeStyles.paddingHorizontal,
        },
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text
          style={[
            styles.text,
            {
              color: getTextColor(),
              fontSize: sizeStyles.fontSize,
            },
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  text: {
    fontWeight: typography.weights.medium,
    textAlign: 'center',
  },
});
