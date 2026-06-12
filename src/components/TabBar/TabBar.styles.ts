/**
 * TabBar styles factory.
 *
 * Token-only `StyleSheet.create` factory for the floating bottom tab bar. The
 * `itemActive` pill and `labelActive` overlay express the active state through
 * tokens, and `itemPressed` covers press feedback, rather than inline literals
 * (Requirements 6.3, 8.1, 8.2, 8.3).
 */

import { StyleSheet } from 'react-native';

import type { Theme } from '../../theme';

export const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    bar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: theme.spacing.xs,
      padding: theme.spacing.xs,
      borderRadius: theme.radius.pill,
      backgroundColor: theme.colors.tabBarBg,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 10,
      elevation: 2,
    },
    item: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing.xxs,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: theme.radius.pill,
      backgroundColor: 'transparent',
    },
    itemActive: {
      backgroundColor: theme.colors.primary,
    },
    itemPressed: {
      opacity: 0.85,
    },
    label: {
      ...theme.typography.styles.bodySm,
      color: theme.colors.textSecondary,
    },
    labelActive: {
      color: theme.colors.onPrimary,
    },
  });
