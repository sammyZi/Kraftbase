/**
 * StreakTracker styles factory.
 *
 * Token-only `StyleSheet.create` factory for the weekly streak row. Active and
 * inactive day markers are expressed through the active-progress / inactive
 * track color tokens so the two control states are token-driven rather than
 * inline literals (Requirements 6.3, 8.1, 8.2, 8.3).
 */

import { StyleSheet } from 'react-native';

import type { Theme } from '../../theme';

export const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: theme.spacing.sm,
    },
    day: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    dot: {
      width: theme.spacing.xxxl,
      height: theme.spacing.xxxl,
      borderRadius: theme.radius.pill,
      alignItems: 'center',
      justifyContent: 'center',
    },
    dotActive: {
      backgroundColor: theme.colors.progressBar,
    },
    dotInactive: {
      backgroundColor: theme.colors.trackInactive,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    dotLabel: {
      fontFamily: theme.typography.styles.label.fontFamily,
      fontSize: theme.typography.styles.label.fontSize,
      fontWeight: theme.typography.styles.label.fontWeight,
      letterSpacing: theme.typography.styles.label.letterSpacing,
      lineHeight: theme.typography.styles.label.lineHeight,
    },
    dotLabelActive: {
      color: theme.colors.onPrimary,
    },
    dotLabelInactive: {
      color: theme.colors.textSecondary,
    },
  });
