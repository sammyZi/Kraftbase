/**
 * Card styles factory.
 *
 * Token-only container styles built from the active theme
 * (Requirements 8.1–8.3). Optional pastel tints map to the theme's tint tokens.
 */

import { StyleSheet } from 'react-native';

import type { Theme } from '../../theme';

export const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    base: {
      borderRadius: theme.radius.xl,
      padding: theme.spacing.xl,
      backgroundColor: theme.colors.background,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 10,
      elevation: 2,
    },
    // --- Tints ---
    surface: {
      backgroundColor: theme.colors.background,
    },
    blue: {
      backgroundColor: theme.colors.tintBlue,
    },
    purple: {
      backgroundColor: theme.colors.tintPurple,
    },
    pink: {
      backgroundColor: theme.colors.tintPink,
    },
    accent: {
      backgroundColor: theme.colors.accent,
    },
  });
