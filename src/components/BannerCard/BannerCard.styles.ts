/**
 * BannerCard styles factory.
 *
 * Token-only `StyleSheet.create` factory for the "AI buddy" / tip banner. The
 * eyebrow title uses the muted-on-tint token while the message uses the primary
 * body token, all sourced from the active theme (Requirements 8.1, 8.2, 8.3).
 */

import { StyleSheet } from 'react-native';

import type { Theme } from '../../theme';

export const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.md,
    },
    text: {
      flex: 1,
      gap: theme.spacing.xxs,
    },
    title: {
      ...theme.typography.styles.bodySm,
      color: theme.colors.textOnTintMuted,
    },
    message: {
      ...theme.typography.styles.bodyLg,
      color: theme.colors.textPrimary,
    },
    right: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
