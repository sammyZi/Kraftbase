/**
 * Avatar styles factory.
 *
 * Token-only styles for the user avatar built from the active theme
 * (Requirements 8.1–8.3). Covers the image state and the empty/initials
 * fallback (Requirement 6.1).
 */

import { StyleSheet } from 'react-native';

import type { Theme } from '../../theme';

/** Default avatar diameter, in logical pixels. */
export const AVATAR_SIZE = 44;

export const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    base: {
      width: AVATAR_SIZE,
      height: AVATAR_SIZE,
      borderRadius: AVATAR_SIZE / 2,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      backgroundColor: theme.colors.tintBlue,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    initials: {
      fontFamily: theme.typography.styles.bodySm.fontFamily,
      fontSize: theme.typography.styles.bodySm.fontSize,
      fontWeight: theme.typography.styles.bodySm.fontWeight,
      letterSpacing: theme.typography.styles.bodySm.letterSpacing,
      lineHeight: theme.typography.styles.bodySm.lineHeight,
      color: theme.colors.primary,
    },
  });
