/**
 * Button styles factory.
 *
 * Token-only styles built with `StyleSheet.create` from the active theme
 * (Requirements 8.1–8.3). Covers the three design variants (primary, secondary,
 * ghost) and the pressed / disabled visual states (Requirement 6.3). No inline
 * style literals are used at the call site.
 */

import { StyleSheet } from 'react-native';

import type { Theme } from '../../theme';

export const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    base: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.radius.round,
      paddingVertical: theme.spacing.lg,
      paddingHorizontal: theme.spacing.xxl,
    },
    // --- Variant containers ---
    primary: {
      backgroundColor: theme.colors.primary,
    },
    secondary: {
      backgroundColor: theme.colors.accent,
    },
    ghost: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
    // --- States ---
    pressed: {
      opacity: 0.85,
    },
    disabled: {
      opacity: 0.4,
    },
    // --- Labels ---
    label: {
      fontFamily: theme.typography.styles.buttonLg.fontFamily,
      fontSize: theme.typography.styles.buttonLg.fontSize,
      fontWeight: theme.typography.styles.buttonLg.fontWeight,
      letterSpacing: theme.typography.styles.buttonLg.letterSpacing,
      lineHeight: theme.typography.styles.buttonLg.lineHeight,
    },
    labelPrimary: {
      color: theme.colors.onPrimary,
    },
    labelSecondary: {
      color: theme.colors.textPrimary,
    },
    labelGhost: {
      color: theme.colors.primary,
    },
  });
