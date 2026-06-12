/**
 * Theme assembly + resolver.
 *
 * Composes the four token categories (colors, spacing, radius, typography)
 * into a single `Theme` shape and exposes the `light`/`dark` themes plus a
 * total, pure `getTheme` resolver.
 *
 * Design reference: design.md §"Theme system". Supports Correctness Properties
 * 1 (theme completeness) and 2 (theme resolution correctness and totality).
 *
 * Requirements: 4.1 (single typed token source), 13.1 (light + dark expose the
 * identical key set), 13.2 (resolver is total and falls back to light).
 */

import { ColorTokens, lightColors, darkColors } from './colors';
import { SpacingScale, spacing } from './spacing';
import { RadiusScale, radius } from './radius';
import { Typography, typography } from './typography';

/** The single source of visual truth, composed from every token category. */
export interface Theme {
  colors: ColorTokens;
  spacing: SpacingScale;
  radius: RadiusScale;
  typography: Typography;
}

/** Light theme — the default; assembled from the measured Figma light tokens. */
export const lightTheme: Theme = {
  colors: lightColors,
  spacing,
  radius,
  typography,
};

/** Dark theme — derived companion palette; mirrors the light token key set. */
export const darkTheme: Theme = {
  colors: darkColors,
  spacing,
  radius,
  typography,
};

/**
 * Resolve the active theme from a device color scheme.
 *
 * Total and pure: returns `darkTheme` if and only if `scheme` is exactly
 * `'dark'`, and `lightTheme` for every other input (`'light'`, `null`,
 * `undefined`, or any unexpected value). Never throws; always returns a
 * defined `Theme`.
 */
export function getTheme(scheme: 'light' | 'dark' | null | undefined): Theme {
  return scheme === 'dark' ? darkTheme : lightTheme;
}
