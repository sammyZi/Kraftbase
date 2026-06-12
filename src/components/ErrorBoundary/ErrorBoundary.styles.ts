/**
 * ErrorBoundary fallback styles factory.
 *
 * Token-only `StyleSheet.create` factory for the recoverable fallback UI shown
 * when a render error is caught at the app root. Because the boundary sits
 * ABOVE `ThemeProvider`, it cannot read the theme via `useTheme()`; the factory
 * therefore accepts a `Theme` explicitly (the boundary passes the static
 * `lightTheme`). All color, spacing, radius, and typography come from tokens —
 * there are no inline style object literals (Requirements 8.1, 8.2, 8.3).
 */

import { StyleSheet } from 'react-native';

import type { Theme } from '../../theme';

export const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: theme.spacing.xl,
      gap: theme.spacing.md,
    },
    title: {
      ...theme.typography.styles.h2,
      color: theme.colors.textPrimary,
      textAlign: 'center',
    },
    message: {
      ...theme.typography.styles.body,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
    button: {
      marginTop: theme.spacing.sm,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.xxl,
      borderRadius: theme.radius.round,
      backgroundColor: theme.colors.primary,
    },
    buttonLabel: {
      ...theme.typography.styles.buttonLg,
      color: theme.colors.onPrimary,
      textAlign: 'center',
    },
  });
