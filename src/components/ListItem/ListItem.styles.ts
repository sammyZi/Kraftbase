/**
 * ListItem styles factory.
 *
 * Token-only `StyleSheet.create` factory for the repeated list row. Exposes a
 * `default` container plus a `containerPressed` overlay so the Pressable-derived
 * pressed state is expressed through tokens rather than inline literals
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
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: theme.radius.card,
      backgroundColor: theme.colors.background,
    },
    containerPressed: {
      backgroundColor: theme.colors.tintBlue,
    },
    left: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      flex: 1,
      gap: theme.spacing.xxs,
    },
    title: {
      ...theme.typography.styles.bodyLg,
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
