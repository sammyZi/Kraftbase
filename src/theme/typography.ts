/**
 * Typography tokens — transcribed from §6 of the Figma extraction notes
 * (`figma-extraction-notes.md`). The design uses Inter / Inter Display; on
 * React Native the Inter Display optical cut maps to Inter at large sizes
 * (Requirements 4.5, 5.1, 8.3).
 *
 * Weights are mapped to the loaded `@expo-google-fonts/inter` family keys so the
 * correct weight file is used rather than relying on synthetic `fontWeight`. A
 * documented `System` fallback is included (Req 5.4).
 *
 * Line heights: most Figma text is `normal` (auto); for RN we set explicit
 * line heights at ~1.3× the font size (per the §6 guidance, e.g. card title
 * 28 → ~34, body 14 → ~20).
 */

/** Numeric font weights present in the design. */
export type FontWeight = '400' | '500' | '600' | '700';

/** Registered Inter family keys (for `useFonts`) plus the documented fallback. */
export interface FontFamilies {
  /** Inter_400Regular */
  regular: string;
  /** Inter_500Medium */
  medium: string;
  /** Inter_600SemiBold */
  semiBold: string;
  /** Inter_700Bold (reserved) */
  bold: string;
  /** Documented fallback (SF on iOS, Roboto on Android) — Req 5.4 */
  fallback: string;
}

/** Named numeric weights used across the type scale. */
export interface FontWeights {
  regular: FontWeight;
  medium: FontWeight;
  semiBold: FontWeight;
  bold: FontWeight;
}

/** A single resolved text style token. */
export interface TextStyleToken {
  /** Loaded Inter family key (e.g. `Inter_500Medium`) */
  fontFamily: string;
  fontSize: number;
  fontWeight: FontWeight;
  letterSpacing: number;
  lineHeight: number;
}

/** Style-token names read from the Figma frames (§6 table). */
export interface TextStyles {
  /** Onboarding "Personalized" hero */
  display: TextStyleToken;
  /** Onboarding "Learning" hero (on card) */
  display2: TextStyleToken;
  /** Home "Let's learn" section title */
  h1: TextStyleToken;
  /** LessonDetail title "Learn ABC with fun sounds" */
  h2: TextStyleToken;
  /** Onboarding "SmartLearn" wordmark */
  h3: TextStyleToken;
  /** Lesson card titles ("Learn colors with objects") */
  cardTitle: TextStyleToken;
  /** Step card titles ("A for Apple"), feature tags */
  bodyLg: TextStyleToken;
  /** "Good Morning" greeting */
  body: TextStyleToken;
  /** "Today's pick", AI-buddy line, category labels */
  bodySm: TextStyleToken;
  /** Onboarding body copy, lesson card category label */
  caption: TextStyleToken;
  /** Greeting "Hello Max", meta ("12 lessons"), 12% */
  label: TextStyleToken;
  /** Meta chips ("26 lessons", "10 min"), step buttons */
  chip: TextStyleToken;
  /** "Sign up" button label */
  buttonLg: TextStyleToken;
  /** "Log in" button label */
  buttonOutline: TextStyleToken;
  /** "Start learning" pill on Home lesson cards */
  pillCta: TextStyleToken;
}

export interface Typography {
  fonts: FontFamilies;
  weights: FontWeights;
  styles: TextStyles;
}

const fonts: FontFamilies = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semiBold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  fallback: 'System',
};

const weights: FontWeights = {
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
};

const styles: TextStyles = {
  display: {
    fontFamily: fonts.medium,
    fontSize: 30,
    fontWeight: weights.medium,
    letterSpacing: -0.33,
    lineHeight: 39,
  },
  display2: {
    fontFamily: fonts.medium,
    fontSize: 27,
    fontWeight: weights.medium,
    letterSpacing: -0.297,
    lineHeight: 35,
  },
  h1: {
    fontFamily: fonts.medium,
    fontSize: 26,
    fontWeight: weights.medium,
    letterSpacing: -0.286,
    lineHeight: 34,
  },
  h2: {
    fontFamily: fonts.medium,
    fontSize: 25,
    fontWeight: weights.medium,
    letterSpacing: -0.275,
    lineHeight: 33,
  },
  h3: {
    fontFamily: fonts.medium,
    fontSize: 24,
    fontWeight: weights.medium,
    letterSpacing: -0.264,
    lineHeight: 31,
  },
  cardTitle: {
    fontFamily: fonts.medium,
    fontSize: 28,
    fontWeight: weights.medium,
    letterSpacing: -0.308,
    lineHeight: 34,
  },
  bodyLg: {
    fontFamily: fonts.medium,
    fontSize: 16,
    fontWeight: weights.medium,
    letterSpacing: -0.176,
    lineHeight: 21,
  },
  body: {
    fontFamily: fonts.medium,
    fontSize: 15,
    fontWeight: weights.medium,
    letterSpacing: -0.165,
    lineHeight: 20,
  },
  bodySm: {
    fontFamily: fonts.medium,
    fontSize: 14,
    fontWeight: weights.medium,
    letterSpacing: -0.154,
    lineHeight: 20,
  },
  caption: {
    fontFamily: fonts.regular,
    fontSize: 14,
    fontWeight: weights.regular,
    letterSpacing: -0.154,
    lineHeight: 20,
  },
  // §6 lists label as Inter Display / 400-500; use medium (500) for the
  // greeting/meta labels which read slightly heavier than body copy.
  label: {
    fontFamily: fonts.medium,
    fontSize: 12,
    fontWeight: weights.medium,
    letterSpacing: -0.132,
    lineHeight: 16,
  },
  chip: {
    fontFamily: fonts.semiBold,
    fontSize: 10,
    fontWeight: weights.semiBold,
    letterSpacing: -0.11,
    lineHeight: 13,
  },
  buttonLg: {
    fontFamily: fonts.medium,
    fontSize: 16,
    fontWeight: weights.medium,
    letterSpacing: -0.176,
    lineHeight: 21,
  },
  buttonOutline: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    fontWeight: weights.semiBold,
    letterSpacing: -0.154,
    lineHeight: 20,
  },
  pillCta: {
    fontFamily: fonts.semiBold,
    fontSize: 18,
    fontWeight: weights.semiBold,
    letterSpacing: -0.198,
    lineHeight: 24,
  },
};

export const typography: Typography = {
  fonts,
  weights,
  styles,
};
