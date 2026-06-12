/**
 * Responsive scaling helpers.
 *
 * Pure, total functions that scale a design-time `size` (authored against the
 * Figma frame width) to the runtime device width, so layouts keep their
 * Figma proportions across screen sizes (Requirement 12.1).
 *
 * Design reference: design.md §"Data Models" (`ResponsiveConfig`) and
 * Correctness Property 5 ("Responsive scaling proportionality"):
 *   - proportional:  `scale(size) == size * screenWidth / baseWidth`
 *   - monotonic:     non-decreasing in `screenWidth` (for `size >= 0`)
 *   - identity:      `scale(size) == size` when `screenWidth == baseWidth`
 *
 * Both `screenWidth` and `baseWidth` can be injected for testability; they
 * default to the runtime device width (from `Dimensions`) and the Figma frame
 * base width respectively.
 */

import { Dimensions } from 'react-native';

/**
 * Base width of the Figma design frame, in logical pixels. Sizes throughout
 * the app are authored against this reference width.
 *
 * TODO(figma): confirm the exact frame width from the Figma file. 375 (the
 * classic iPhone logical width) is used as a sensible default until the exact
 * frame width is confirmed.
 */
export const BASE_WIDTH = 375;

/** Runtime device width, in logical pixels, read from `Dimensions`. */
function deviceWidth(): number {
  return Dimensions.get('window').width;
}

/**
 * Scale a design-time `size` proportionally to the ratio of the runtime
 * screen width to the design base width.
 *
 * Pure and total: `scale(size) == size * screenWidth / baseWidth`. Returns
 * `size` unchanged when `screenWidth == baseWidth`, and is monotonically
 * non-decreasing in `screenWidth` for non-negative `size`.
 *
 * @param size        The design-time value to scale (e.g. a width or padding).
 * @param screenWidth Runtime device width. Defaults to the device width.
 * @param baseWidth   Figma frame base width. Defaults to {@link BASE_WIDTH}.
 */
export function scale(
  size: number,
  screenWidth: number = deviceWidth(),
  baseWidth: number = BASE_WIDTH
): number {
  return (size * screenWidth) / baseWidth;
}

/**
 * Scale a design-time `size` with a dampening `factor`, blending between the
 * original `size` (factor `0`) and the fully scaled value (factor `1`).
 *
 * `moderateScale(size) == size + (scale(size) - size) * factor`. With the
 * default factor of `0.5`, values grow/shrink at half the rate of `scale`,
 * which avoids over-scaling on very large or very small screens. Also an
 * identity when `screenWidth == baseWidth` for any factor.
 *
 * @param size        The design-time value to scale.
 * @param factor      Dampening factor in `[0, 1]`. Defaults to `0.5`.
 * @param screenWidth Runtime device width. Defaults to the device width.
 * @param baseWidth   Figma frame base width. Defaults to {@link BASE_WIDTH}.
 */
export function moderateScale(
  size: number,
  factor: number = 0.5,
  screenWidth: number = deviceWidth(),
  baseWidth: number = BASE_WIDTH
): number {
  return size + (scale(size, screenWidth, baseWidth) - size) * factor;
}
