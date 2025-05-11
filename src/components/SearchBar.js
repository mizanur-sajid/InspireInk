import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '../utils/ThemeContext';
import { spacing, typography, borderRadius } from '../utils/styles';
import { Ionicons } from '@expo/vector-icons';

export default function SearchBar({
  value,
  onChangeText,
  placeholder,
  onClear,
  style,
  ...props
}) {
  const { colors, isDark } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? colors.surface : colors.background,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      <Ionicons
        name="search"
        size={20}
        color={colors.text.secondary}
        style={styles.searchIcon}
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.text.secondary}
        style={[
          styles.input,
          {
            color: colors.text.primary,
          },
        ]}
        {...props}
      />
      {value ? (
        <TouchableOpacity onPress={onClear} style={styles.clearButton}>
          <Ionicons
            name="close-circle"
            size={20}
            color={colors.text.secondary}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    height: 48,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: typography.sizes.regular,
    padding: 0,
  },
  clearButton: {
    marginLeft: spacing.sm,
    padding: spacing.xs,
  },
});
