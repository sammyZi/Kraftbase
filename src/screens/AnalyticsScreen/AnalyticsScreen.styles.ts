/**
 * AnalyticsScreen styles factory.
 *
 * Token-only styles built with `StyleSheet.create` from the active theme
 * (Requirements 8.1–8.3). Every color, spacing, radius, and typography value is
 * read from the design-token layer — there are no inline style object literals
 * at the call site and no hardcoded visual literals here.
 *
 * Layout reproduces the Figma "Analytics" frame: a screen title, the "Your
 * streak" section (section title + weekly tracker), a tip banner, and the
 * "Skill progress" section (section title + week selector + category filters +
 * bar chart). The screen is scrollable (Req 3.3).
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

    // --- Screen title ---
    screenTitle: {
      fontFamily: theme.typography.styles.h1.fontFamily,
      fontSize: theme.typography.styles.h1.fontSize,
      fontWeight: theme.typography.styles.h1.fontWeight,
      letterSpacing: theme.typography.styles.h1.letterSpacing,
      lineHeight: theme.typography.styles.h1.lineHeight,
      color: theme.colors.textPrimary,
    },

    // --- Sections ("Your streak" / "Skill progress") ---
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
  });
