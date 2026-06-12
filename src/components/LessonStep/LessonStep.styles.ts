/**
 * LessonStep styles factory.
 *
 * Token-only `StyleSheet.create` factory for a timeline step row. Provides the
 * timeline node (active/locked), the connector, the tinted step card, and the
 * label/duration text — all sourced from theme tokens (Requirements 8.1, 8.2,
 * 8.3). Card tints mirror the `CardTint` union so a step can match the design's
 * pastel step cards without inline literals.
 */

import { StyleSheet } from 'react-native';

import type { Theme } from '../../theme';

export const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'stretch',
      gap: theme.spacing.md,
    },
    timeline: {
      alignItems: 'center',
      width: theme.spacing.lg,
    },
    node: {
      width: theme.spacing.md,
      height: theme.spacing.md,
      borderRadius: theme.radius.pill,
    },
    nodeActive: {
      backgroundColor: theme.colors.progressBar,
    },
    nodeLocked: {
      backgroundColor: theme.colors.trackInactive,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    connector: {
      flex: 1,
      width: 1,
      backgroundColor: theme.colors.trackInactive,
      marginTop: theme.spacing.xxs,
    },
    card: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: theme.spacing.md,
      padding: theme.spacing.lg,
      borderRadius: theme.radius.card,
      marginBottom: theme.spacing.md,
    },
    // --- Tints (mirror CardTint union) ---
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
      backgroundColor: theme.colors.accent,
    },
    info: {
      flex: 1,
      gap: theme.spacing.xxs,
    },
    label: {
      fontFamily: theme.typography.styles.bodyLg.fontFamily,
      fontSize: theme.typography.styles.bodyLg.fontSize,
      fontWeight: theme.typography.styles.bodyLg.fontWeight,
      letterSpacing: theme.typography.styles.bodyLg.letterSpacing,
      lineHeight: theme.typography.styles.bodyLg.lineHeight,
      color: theme.colors.textPrimary,
    },
    labelLocked: {
      color: theme.colors.textSecondary,
    },
    duration: {
      fontFamily: theme.typography.styles.bodySm.fontFamily,
      fontSize: theme.typography.styles.bodySm.fontSize,
      fontWeight: theme.typography.styles.bodySm.fontWeight,
      letterSpacing: theme.typography.styles.bodySm.letterSpacing,
      lineHeight: theme.typography.styles.bodySm.lineHeight,
      color: theme.colors.textSecondary,
    },
    lockedTag: {
      fontFamily: theme.typography.styles.chip.fontFamily,
      fontSize: theme.typography.styles.chip.fontSize,
      fontWeight: theme.typography.styles.chip.fontWeight,
      letterSpacing: theme.typography.styles.chip.letterSpacing,
      lineHeight: theme.typography.styles.chip.lineHeight,
      color: theme.colors.textSecondary,
    },
  });
