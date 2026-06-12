/**
 * ProgressCard styles factory.
 *
 * Token-only `StyleSheet.create` factory for the "Today's pick" summary card.
 * The progress track/fill use the theme's `trackInactive` / `progressBar`
 * tokens; only the fill's data-derived width is supplied at the call site
 * (Requirements 8.1, 8.2, 8.3).
 */

import { StyleSheet } from 'react-native';

import type { Theme } from '../../theme';

export const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    title: {
      ...theme.typography.styles.bodySm,
      color: theme.colors.textPrimary,
    },
    metaRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.sm,
      marginTop: theme.spacing.sm,
    },
    metaChip: {
      paddingVertical: theme.spacing.xxs,
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.radius.card,
      backgroundColor: theme.colors.glass29,
    },
    metaText: {
      ...theme.typography.styles.chip,
      color: theme.colors.textOnTintMuted,
    },
    progressRow: {
      marginTop: theme.spacing.lg,
      gap: theme.spacing.sm,
    },
    barTrack: {
      height: theme.spacing.sm,
      borderRadius: theme.radius.pill,
      backgroundColor: theme.colors.trackInactive,
      overflow: 'hidden',
    },
    barFill: {
      height: '100%',
      borderRadius: theme.radius.pill,
      backgroundColor: theme.colors.progressBar,
    },
    progressLabel: {
      ...theme.typography.styles.label,
      color: theme.colors.textSecondary,
    },
  });
