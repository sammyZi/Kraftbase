/**
 * Header styles factory.
 *
 * Token-only `StyleSheet.create` factory for the screen header (title + optional
 * back/dismiss control + optional trailing slot). The back button gets a
 * pressed overlay so its interaction state is token-driven, never inline
 * (Requirements 6.3, 8.1, 8.2, 8.3).
 */

import { StyleSheet } from 'react-native';

import type { Theme } from '../../theme';

export const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.md,
      paddingHorizontal: theme.spacing.gutter,
      paddingVertical: theme.spacing.md,
      backgroundColor: theme.colors.background,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: theme.radius.chip,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.glass40,
    },
    backButtonPressed: {
      backgroundColor: theme.colors.tintBlue,
    },
    titles: {
      flex: 1,
      gap: theme.spacing.xxs,
    },
    title: {
      ...theme.typography.styles.h2,
      color: theme.colors.textPrimary,
    },
    subtitle: {
      ...theme.typography.styles.bodySm,
      color: theme.colors.textSecondary,
    },
    right: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
