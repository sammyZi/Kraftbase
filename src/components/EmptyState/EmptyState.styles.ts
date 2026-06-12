/**
 * EmptyState styles factory.
 *
 * Token-only `StyleSheet.create` factory for the empty placeholder shown when a
 * list/screen has no data (Requirement 6.1). All color, spacing, radius, and
 * typography come from the theme (Requirements 8.1, 8.2, 8.3).
 */

import { StyleSheet } from 'react-native';

import type { Theme } from '../../theme';

export const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing.sm,
      paddingVertical: theme.spacing.xxxl,
      paddingHorizontal: theme.spacing.xl,
    },
    icon: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: theme.spacing.xs,
    },
    title: {
      ...theme.typography.styles.bodyLg,
      color: theme.colors.textPrimary,
      textAlign: 'center',
    },
    message: {
      ...theme.typography.styles.bodySm,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
  });
