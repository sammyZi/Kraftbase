/**
 * BarChart styles factory.
 *
 * Token-only `StyleSheet.create` factory for the skill-progress chart. The four
 * fill variants map to distinct pastel/accent tokens so bar colors are
 * token-driven; bar heights themselves are computed at the call site as dynamic
 * numeric layout values (Requirements 8.1, 8.2, 8.3).
 */

import { StyleSheet } from 'react-native';

import type { Theme } from '../../theme';

export const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: '100%',
    },
    plot: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: theme.spacing.md,
    },
    column: {
      flex: 1,
      alignItems: 'center',
      gap: theme.spacing.sm,
    },
    track: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    fill: {
      width: '100%',
      borderRadius: theme.radius.md,
    },
    // --- Token-based fill palette (cycled by index) ---
    fill0: {
      backgroundColor: theme.colors.progressBar,
    },
    fill1: {
      backgroundColor: theme.colors.pillBlue,
    },
    fill2: {
      backgroundColor: theme.colors.tintPurple,
    },
    fill3: {
      backgroundColor: theme.colors.accentAlt,
    },
    label: {
      fontFamily: theme.typography.styles.bodySm.fontFamily,
      fontSize: theme.typography.styles.bodySm.fontSize,
      fontWeight: theme.typography.styles.bodySm.fontWeight,
      letterSpacing: theme.typography.styles.bodySm.letterSpacing,
      lineHeight: theme.typography.styles.bodySm.lineHeight,
      color: theme.colors.textSecondary,
    },
  });
