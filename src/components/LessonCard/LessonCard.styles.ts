/**
 * LessonCard styles factory.
 *
 * Token-only `StyleSheet.create` factory for the Home lesson card. Mirrors the
 * `Card` primitive's surface tokens (radius `xl`, padding `xl`, shadow) and
 * reuses the same pastel tint vocabulary, then layers a `containerPressed`
 * overlay so the Pressable-derived pressed state is expressed through tokens
 * rather than inline literals (Requirements 6.3, 8.1, 8.2, 8.3).
 */

import { StyleSheet } from 'react-native';

import type { Theme } from '../../theme';

export const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderRadius: theme.radius.xl,
      padding: theme.spacing.xl,
      gap: theme.spacing.md,
      backgroundColor: theme.colors.tintPurple,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 10,
      elevation: 2,
    },
    containerPressed: {
      opacity: 0.9,
    },
    // --- Tints (mirrors Card's tint vocabulary) ---
    surface: {
      backgroundColor: theme.colors.background,
    },
    blue: {
      backgroundColor: theme.colors.tintBlue,
    },
    purple: {
      backgroundColor: theme.colors.tintPurple,
    },
    pink: {
      backgroundColor: theme.colors.tintPink,
    },
    accent: {
      backgroundColor: theme.colors.accentAlt,
    },
    // --- Content ---
    category: {
      ...theme.typography.styles.caption,
      color: theme.colors.textTintPurple,
    },
    title: {
      ...theme.typography.styles.cardTitle,
      color: theme.colors.textPrimary,
    },
    metaRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.sm,
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
    cta: {
      alignSelf: 'flex-start',
      marginTop: theme.spacing.xs,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: theme.radius.pill,
      backgroundColor: theme.colors.primary,
    },
    ctaText: {
      ...theme.typography.styles.pillCta,
      color: theme.colors.onPrimary,
    },
  });
