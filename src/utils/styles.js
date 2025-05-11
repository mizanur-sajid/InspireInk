export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  sizes: {
    small: 12,
    regular: 14,
    medium: 16,
    large: 18,
    xlarge: 24,
    xxlarge: 32,
  },
  weights: {
    regular: '400',
    medium: '500',
    bold: '700',
  },
  families: {
    regular: undefined, // Uses system default
    medium: undefined,
    bold: undefined,
  },
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 999,
};

export const elevation = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 3,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};
