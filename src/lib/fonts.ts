/**
 * Font-fallback resolver.
 *
 * A pure helper that maps a requested font family to a family that is safe to
 * hand to React Native's `fontFamily` style prop. Custom fonts (the
 * `@expo-google-fonts/inter` family keys) are only usable once `useFonts` has
 * registered them; until then — or if a font file fails to load — we must fall
 * back to a real, renderable family rather than passing an unregistered name,
 * `undefined`, or an empty string (which would yield unstyled or broken text).
 *
 * Design reference: design.md §"Error Handling" (custom font fails to load) and
 * Correctness Property 3 (font fallback totality).
 *
 * Requirements: 5.3 (apply each specified family to its text), 5.4 (render a
 * documented fallback when a family fails to load and continue operation).
 */

/**
 * Documented fallback family.
 *
 * `'System'` is React Native's built-in platform default (San Francisco on
 * iOS, Roboto on Android). It is always available without bundling, so it is a
 * guaranteed non-empty, renderable family — the single documented fallback used
 * whenever a requested family is not registered/loaded. This mirrors
 * `typography.fonts.fallback` in `theme/typography.ts`.
 */
export const SYSTEM_FALLBACK = 'System';

/**
 * Resolve a requested font family to a family that is guaranteed to render.
 *
 * Total and pure: returns the trimmed `requested` family when it is present in
 * `registeredFamilies`; otherwise returns the documented {@link SYSTEM_FALLBACK}.
 * Never returns `undefined` or an empty string for any input (including
 * `undefined`, empty, or whitespace-only requests, or an empty registry).
 *
 * @param requested - The font family the caller wants to use (e.g. an Inter
 *   family key). May be `undefined`/empty when a token is missing.
 * @param registeredFamilies - The families known to be loaded/registered (e.g.
 *   the keys reported ready by `useFonts`). Defaults to none, so an
 *   unconfigured caller safely falls back to the system family.
 * @returns A defined, non-empty font family name.
 */
export function resolveFontFamily(
  requested: string | null | undefined,
  registeredFamilies: readonly string[] = [],
): string {
  const family = requested?.trim();

  if (family && registeredFamilies.includes(family)) {
    return family;
  }

  return SYSTEM_FALLBACK;
}
