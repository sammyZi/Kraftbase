/**
 * Color tokens derived from the SmartLearn design screenshot.
 *
 * NOTE: The live Figma file was not accessible, so these hex values are
 * sampled from the provided design screenshot. They are the single source of
 * truth for color across the app (Requirement 4, 8.3).
 */

export interface ColorTokens {
  /** App / screen background */
  background: string;
  /** Card / elevated surface background */
  surface: string;
  /** Strong brand color: primary buttons, active pills, chart bars, headings */
  primary: string;
  /** Text/icon color rendered on top of `primary` */
  onPrimary: string;
  /** Brand accent green: lesson header, streak, progress */
  accent: string;
  /** Text/icon color on top of `accent` */
  onAccent: string;

  /** Primary text */
  textPrimary: string;
  /** Secondary / muted text */
  textSecondary: string;
  /** Tertiary / faint text */
  textMuted: string;

  /** Hairline borders and dividers */
  border: string;

  // Pastel category / card tints sampled from the design
  tintBlue: string;
  tintPink: string;
  tintPurple: string;
  tintLime: string;
  tintPeach: string;
  tintYellow: string;

  /** Generic white / black helpers */
  white: string;
  black: string;

  /** Streak fire / warm highlight */
  warning: string;
  /** Error / destructive */
  danger: string;
}

export const lightColors: ColorTokens = {
  background: '#FFFFFF',
  surface: '#F6F7FB',
  primary: '#16173C',
  onPrimary: '#FFFFFF',
  accent: '#C6E450',
  onAccent: '#16173C',

  textPrimary: '#16173C',
  textSecondary: '#6E6F85',
  textMuted: '#A0A1B2',

  border: '#ECEDF3',

  tintBlue: '#DCE6F9',
  tintPink: '#FBD8D2',
  tintPurple: '#E4D8F6',
  tintLime: '#E9F4C6',
  tintPeach: '#FDE4D2',
  tintYellow: '#FBE9A8',

  white: '#FFFFFF',
  black: '#000000',

  warning: '#FF7A1A',
  danger: '#E5484D',
};

export const darkColors: ColorTokens = {
  background: '#0E0F24',
  surface: '#1B1C3A',
  primary: '#C6E450',
  onPrimary: '#16173C',
  accent: '#C6E450',
  onAccent: '#16173C',

  textPrimary: '#F4F4FA',
  textSecondary: '#B9BACB',
  textMuted: '#7B7C92',

  border: '#2A2B4A',

  tintBlue: '#23304F',
  tintPink: '#4A2E2E',
  tintPurple: '#322A4D',
  tintLime: '#33401C',
  tintPeach: '#473324',
  tintYellow: '#46401F',

  white: '#FFFFFF',
  black: '#000000',

  warning: '#FF7A1A',
  danger: '#E5484D',
};
