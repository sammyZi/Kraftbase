/**
 * Color tokens — transcribed from the live Figma file
 * ("Assignment - React Native (Copy)", file key `OlP8HJO5dGZcSJZHEKD5Gb`).
 *
 * These hex/rgba values are the measured §3 values from the Figma extraction
 * notes (`figma-extraction-notes.md`). They are the single source of truth for
 * color across the app (Requirements 4.2, 8.3, 13.1).
 *
 * The file is light-mode only in Figma. The dark set is a **derived** companion
 * palette (documented as an assumption) and MUST expose the identical key set as
 * the light set so the theme resolver stays total (Property 1 / Req 13.1).
 */

export interface ColorTokens {
  // --- Core / brand ---
  /** Primary buttons, active tab pill/item, active category pill (navy "Btn") */
  primary: string;
  /** Lesson-card play button, dark accent circle */
  primaryDark: string;
  /** Text/icon on primary */
  onPrimary: string;
  /** Primary text / titles ("Black") */
  textPrimary: string;
  /** Secondary / muted text ("Gray") */
  textSecondary: string;
  /** Dark-teal label on tinted cards (chips, "Start learning") */
  textOnTintMuted: string;
  /** Category label on purple lesson card */
  textTintPurple: string;
  /** App / screen background */
  background: string;
  /** Hairline borders (inactive category tabs) */
  border: string;
  /** AI-buddy robot avatar background */
  robotBg: string;
  /** Card drop shadow color (0 4 10) */
  shadow: string;

  // --- Accent / lime family ---
  /** LessonDetail header band */
  accent: string;
  /** "Letters" lesson card (Home) */
  accentAlt: string;
  /** Onboarding "Fun Games" card */
  accentOnboard: string;
  /** Active step timeline bar (LessonDetail), olive-green */
  progressBar: string;
  /** Inactive step timeline bar */
  trackInactive: string;

  // --- Pastel card tints ---
  /** Home "Your AI buddy" banner */
  tintBlue: string;
  /** LessonDetail "D for Dog" step card */
  tintBlueSt: string;
  /** Onboarding main illustration card */
  tintBlueOb: string;
  /** Home "Colors" lesson card + LessonDetail "C for Cat" */
  tintPurple: string;
  /** Onboarding "Instant Feedback" card */
  tintPink: string;
  /** LessonDetail "B for Ball" step card */
  tintPinkSt: string;
  /** LessonDetail "A for Apple" step card */
  tintCream: string;
  /** LessonDetail "E for Elephant" step card */
  tintPeach: string;
  /** Onboarding decorative pill */
  pillBlue: string;

  // --- Helpers / misc ---
  /** Home "Today's pick" glass card */
  glass84: string;
  /** LessonDetail back btn + AI buddy glass card */
  glass40: string;
  /** Meta chips on lesson cards */
  glass29: string;
  /** Inactive category count chip */
  chipGray: string;
  /** Floating bottom tab bar background */
  tabBarBg: string;
  /** Inactive category count text */
  countTextMuted: string;
  /** Card subtitle text (lesson step descriptions) */
  black50: string;
  /** Onboarding body copy */
  navySubtle50: string;
}

export const lightColors: ColorTokens = {
  // Core / brand
  primary: '#1C274C',
  primaryDark: '#161A34',
  onPrimary: '#FFFFFF',
  textPrimary: '#010000',
  textSecondary: '#708892',
  textOnTintMuted: '#073647',
  textTintPurple: '#9881B3',
  background: '#FFFFFF',
  border: 'rgba(0,0,0,0.05)',
  robotBg: '#3C425F',
  shadow: '#CED5DD',

  // Accent / lime family
  accent: '#DCEA8F',
  accentAlt: '#E1F18C',
  accentOnboard: '#DFF28A',
  progressBar: '#7CA62B',
  trackInactive: '#F5F5F5',

  // Pastel card tints
  tintBlue: '#EAF1F9',
  tintBlueSt: '#D7EAF8',
  tintBlueOb: '#CADDF7',
  tintPurple: '#E5CDFF',
  tintPink: '#F2D1D0',
  tintPinkSt: '#FFE9E9',
  tintCream: '#F4EFD7',
  tintPeach: '#F9E9DC',
  pillBlue: '#71A6EE',

  // Helpers / misc
  glass84: 'rgba(255,255,255,0.84)',
  glass40: 'rgba(255,255,255,0.4)',
  glass29: 'rgba(255,255,255,0.29)',
  chipGray: 'rgba(244,243,243,0.5)',
  tabBarBg: 'rgba(244,243,243,0.7)',
  countTextMuted: '#6A8282',
  black50: 'rgba(1,0,0,0.5)',
  navySubtle50: 'rgba(28,39,76,0.5)',
};

/**
 * Derived dark palette (§3 "Dark theme" guidance). Figma ships light mode only,
 * so the file documents these as an assumption: brand-explicit values come from
 * the §3 dark table, and the pastel tints are each darkened ~70% toward
 * `#1B1C3A` while keeping their hue. Keys mirror `lightColors` exactly.
 */
export const darkColors: ColorTokens = {
  // Core / brand
  primary: '#DCEA8F',
  primaryDark: '#0A0B1E',
  onPrimary: '#16173C',
  textPrimary: '#F4F4FA',
  textSecondary: '#A7B0BC',
  textOnTintMuted: '#BFD8DF',
  textTintPurple: '#B9A6D1',
  background: '#0E0F24',
  border: 'rgba(255,255,255,0.08)',
  robotBg: '#2A2E45',
  shadow: '#05060F',

  // Accent / lime family
  accent: '#DCEA8F',
  accentAlt: '#C7D87A',
  accentOnboard: '#C7D87A',
  progressBar: '#9BC24A',
  trackInactive: '#2A2B4A',

  // Pastel card tints (light tint darkened ~70% toward #1B1C3A)
  tintBlue: '#595C73',
  tintBlueSt: '#535A73',
  tintBlueOb: '#505673',
  tintPurple: '#585175',
  tintPink: '#5C5267',
  tintPinkSt: '#5F5A6F',
  tintCream: '#5C5B69',
  tintPeach: '#5E5A6B',
  pillBlue: '#354570',

  // Helpers / misc
  glass84: 'rgba(30,31,60,0.84)',
  glass40: 'rgba(30,31,60,0.4)',
  glass29: 'rgba(30,31,60,0.29)',
  chipGray: 'rgba(60,62,90,0.5)',
  tabBarBg: 'rgba(30,31,60,0.7)',
  countTextMuted: '#8FA3A3',
  black50: 'rgba(244,244,250,0.5)',
  navySubtle50: 'rgba(220,234,143,0.5)',
};
