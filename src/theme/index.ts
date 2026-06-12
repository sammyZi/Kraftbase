/**
 * Public theme API barrel.
 *
 * Single import surface for the design-token layer and theming primitives.
 * Re-exports the assembled `Theme` + resolver (theme.ts), the
 * `ThemeProvider`/`useTheme` context API (ThemeProvider.tsx), and the
 * underlying token interfaces/objects (colors, spacing, radius, typography).
 *
 * Requirements: 4.1 (single typed token source), 7.3 (theme dir is the single
 * token home referenced everywhere).
 */

// Theme assembly + resolver
export { lightTheme, darkTheme, getTheme, type Theme } from './theme';

// Context provider + hook
export { ThemeProvider, useTheme, type ThemeProviderProps } from './ThemeProvider';

// Color tokens
export { lightColors, darkColors, type ColorTokens } from './colors';

// Spacing scale
export { spacing, type SpacingScale } from './spacing';

// Radius scale
export { radius, type RadiusScale } from './radius';

// Typography tokens
export {
  typography,
  type Typography,
  type FontFamilies,
  type FontWeights,
  type FontWeight,
  type TextStyleToken,
  type TextStyles,
} from './typography';
