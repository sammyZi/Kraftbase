/**
 * Theme context provider + `useTheme` hook.
 *
 * `ThemeProvider` reads the device color scheme via React Native's
 * `useColorScheme()` and resolves the active `Theme` with `getTheme(scheme)`.
 * Because `useColorScheme()` re-renders the provider whenever the system
 * appearance changes, the memoized theme is recomputed and re-exposed to every
 * consumer automatically (Requirement 13.3).
 *
 * `useTheme()` reads the context and throws a clear developer error when used
 * outside a `ThemeProvider`. A sentinel `undefined` default context value makes
 * a missing provider detectable at runtime (design.md §"Error Handling").
 *
 * Design reference: design.md §"Theme system".
 * Requirements: 4.2 (consumers read tokens via context), 13.2 (active theme
 * resolved from device appearance), 13.3 (recompute on appearance change).
 */

import { createContext, useContext, useMemo, type ReactNode } from 'react';

import { getTheme, type Theme } from './theme';

/**
 * Sentinel default: `undefined` means "no provider above me". `useTheme`
 * relies on this to distinguish a real (always-defined) theme value from an
 * un-wrapped consumer.
 */
const ThemeContext = createContext<Theme | undefined>(undefined);
ThemeContext.displayName = 'ThemeContext';

export interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Provides the active `Theme` to all descendants.
 *
 * The app is **light-mode only** (per product decision): the provider always
 * resolves the light theme via `getTheme('light')` and intentionally does NOT
 * subscribe to the device color scheme, so dark appearance never changes the
 * UI. `getTheme` remains the single resolver (its dark branch is still covered
 * by unit/property tests), but the running app is pinned to light.
 */
export function ThemeProvider({ children }: ThemeProviderProps): React.JSX.Element {
  // Light mode only — do not read `useColorScheme()`.
  const theme = useMemo<Theme>(() => getTheme('light'), []);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

/**
 * Read the active `Theme` from context.
 *
 * @throws {Error} when called outside a `ThemeProvider`, with a descriptive
 * message to catch wiring mistakes early in development.
 */
export function useTheme(): Theme {
  const theme = useContext(ThemeContext);

  if (theme === undefined) {
    throw new Error(
      'useTheme must be used within a ThemeProvider. ' +
        'Wrap your component tree (typically in App.tsx) with <ThemeProvider> before calling useTheme().',
    );
  }

  return theme;
}
