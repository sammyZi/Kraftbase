/**
 * Spacing scale — transcribed from §4 of the Figma extraction notes
 * (`figma-extraction-notes.md`). 4px-based scale derived from observed
 * paddings/gaps in the live Figma frames (Requirement 4.3, 8.3).
 *
 * Screen horizontal gutter = `lg` = 16. Card inner padding ≈ `xl` = 20.
 * Default inter-element gap = `lg` = 16.
 */

export interface SpacingScale {
  /** 4 — icon-to-label gaps, chip gap */
  xxs: number;
  /** 6 — tab bar item gap, small button gaps */
  xs: number;
  /** 8 — chip padding, AI-buddy row gap */
  sm: number;
  /** 12 — category pill padding, meta chip padding */
  md: number;
  /** 16 — screen horizontal gutter, card content gap */
  lg: number;
  /** 20 — lesson-card inner left/top padding */
  xl: number;
  /** 24 — section spacing */
  xxl: number;
  /** 32 — large block separation */
  xxxl: number;
  /** Screen horizontal gutter (alias of `lg` = 16) */
  gutter: number;
}

export const spacing: SpacingScale = {
  xxs: 4,
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  gutter: 16,
};
