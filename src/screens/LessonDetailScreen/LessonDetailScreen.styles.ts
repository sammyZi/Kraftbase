/**
 * LessonDetailScreen styles factory.
 *
 * Token-only styles built with `StyleSheet.create` from the active theme
 * (Requirements 8.1–8.3). Every color, spacing, radius, and typography value is
 * read from the design-token layer — there are no inline style object literals
 * at the call site and no hardcoded visual literals here.
 *
 * Layout reproduces the Figma "Lesson detail" frame: a header (title + back),
 * a row of lesson meta chips, an AI buddy banner, and the "Lessons" section
 * containing the vertical stepper/timeline. The screen is scrollable (Req 3.3).
 */

import { StyleSheet } from 'react-native';

import type { Theme } from '../../theme';

export const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    // --- Screen frame ---
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContent: {
      paddingHorizontal: theme.spacing.gutter,
      paddingTop: theme.spacing.lg,
      paddingBottom: theme.spacing.xxxl,
      gap: theme.spacing.xxl,
    },

    // --- Lesson meta chips ("26 lessons", "30 min") ---
    metaRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.sm,
    },
    metaChip: {
      backgroundColor: theme.colors.chipGray,
      borderRadius: theme.radius.pill,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.xs,
    },
    metaText: {
      fontFamily: theme.typography.styles.bodySm.fontFamily,
      fontSize: theme.typography.styles.bodySm.fontSize,
      fontWeight: theme.typography.styles.bodySm.fontWeight,
      letterSpacing: theme.typography.styles.bodySm.letterSpacing,
      lineHeight: theme.typography.styles.bodySm.lineHeight,
      color: theme.colors.textSecondary,
    },

    // --- "Lessons" section + timeline ---
    section: {
      gap: theme.spacing.lg,
    },
    sectionTitle: {
      fontFamily: theme.typography.styles.h3.fontFamily,
      fontSize: theme.typography.styles.h3.fontSize,
      fontWeight: theme.typography.styles.h3.fontWeight,
      letterSpacing: theme.typography.styles.h3.letterSpacing,
      lineHeight: theme.typography.styles.h3.lineHeight,
      color: theme.colors.textPrimary,
    },
    timeline: {
      gap: theme.spacing.md,
    },
  });
