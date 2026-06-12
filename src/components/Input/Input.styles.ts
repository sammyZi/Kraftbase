/**
 * Input styles factory.
 *
 * Token-only styles for the text field, covering the default / focused / error /
 * disabled states (Requirement 6.3) built from the active theme
 * (Requirements 8.1–8.3).
 */

import { StyleSheet } from 'react-native';

import type { Theme } from '../../theme';

export const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: '100%',
    },
    label: {
      fontFamily: theme.typography.styles.label.fontFamily,
      fontSize: theme.typography.styles.label.fontSize,
      fontWeight: theme.typography.styles.label.fontWeight,
      letterSpacing: theme.typography.styles.label.letterSpacing,
      lineHeight: theme.typography.styles.label.lineHeight,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.xs,
    },
    field: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.radius.chip,
      backgroundColor: theme.colors.background,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      fontFamily: theme.typography.styles.body.fontFamily,
      fontSize: theme.typography.styles.body.fontSize,
      fontWeight: theme.typography.styles.body.fontWeight,
      letterSpacing: theme.typography.styles.body.letterSpacing,
      lineHeight: theme.typography.styles.body.lineHeight,
      color: theme.colors.textPrimary,
    },
    // --- States ---
    focused: {
      borderColor: theme.colors.primary,
    },
    error: {
      borderColor: theme.colors.tintPink,
    },
    disabled: {
      backgroundColor: theme.colors.trackInactive,
      opacity: 0.6,
    },
    errorText: {
      fontFamily: theme.typography.styles.caption.fontFamily,
      fontSize: theme.typography.styles.caption.fontSize,
      fontWeight: theme.typography.styles.caption.fontWeight,
      letterSpacing: theme.typography.styles.caption.letterSpacing,
      lineHeight: theme.typography.styles.caption.lineHeight,
      color: theme.colors.tintPink,
      marginTop: theme.spacing.xxs,
    },
  });
