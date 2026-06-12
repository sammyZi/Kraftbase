/**
 * CategoryTabs styles factory.
 *
 * Token-only `StyleSheet.create` factory for the horizontal filter pills. The
 * `tabSelected` / `tabUnselected` containers and `labelSelected` overlay express
 * the selected state through tokens, with `tabPressed` covering press feedback
 * and an optional count chip — never inline literals
 * (Requirements 6.3, 8.1, 8.2, 8.3).
 */

import { StyleSheet } from 'react-native';

import type { Theme } from '../../theme';

export const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm,
      paddingHorizontal: theme.spacing.gutter,
    },
    tab: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xs,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.xl,
      borderRadius: theme.radius.pill,
    },
    tabSelected: {
      backgroundColor: theme.colors.primary,
    },
    tabUnselected: {
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    tabPressed: {
      opacity: 0.85,
    },
    label: {
      ...theme.typography.styles.bodySm,
      color: theme.colors.textSecondary,
    },
    labelSelected: {
      color: theme.colors.onPrimary,
    },
    countChip: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xxs,
      borderRadius: theme.radius.pill,
      backgroundColor: theme.colors.chipGray,
    },
    countChipSelected: {
      backgroundColor: theme.colors.glass29,
    },
    countText: {
      ...theme.typography.styles.chip,
      color: theme.colors.countTextMuted,
    },
    countTextSelected: {
      color: theme.colors.onPrimary,
    },
  });
