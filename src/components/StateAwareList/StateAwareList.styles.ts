/**
 * StateAwareList styles factory.
 *
 * Token-only `StyleSheet.create` factory for the state-aware list container.
 * Provides the Filled_State list wrapper plus per-item separation derived from
 * theme spacing tokens — no inline style literals, no hardcoded values
 * (Requirements 8.1, 8.2, 8.3).
 */

import { StyleSheet } from 'react-native';

import type { Theme } from '../../theme';

export const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    list: {
      gap: theme.spacing.md,
    },
  });
