/**
 * Border radius scale — transcribed from §5 of the Figma extraction notes
 * (`figma-extraction-notes.md`). Exact radii read from the live Figma fills
 * (Requirement 4.4, 8.3).
 *
 * Primary content card radius = `xl` = 32 (Home) / `card` = 24 (step cards).
 * Button radius = `round` = 80 (onboarding CTAs, fully rounded).
 */

export interface RadiusScale {
  /** 15.5 — tiny play-button circle on step cards */
  sm: number;
  /** 20 — onboarding feature cards */
  md: number;
  /** 24 — lesson step cards, lesson-card icon button, meta chips, onboarding main card */
  card: number;
  /** 25 — LessonDetail AI-buddy glass card */
  lg: number;
  /** 28 — language selector / notification button, back button */
  chip: number;
  /** 32 — Home cards (banner, progress, lesson cards), header band bottom */
  xl: number;
  /** 56 — category pills, tab bar, tab items */
  pill: number;
  /** 80 — onboarding Sign up / Log in buttons (full pill) */
  round: number;
}

export const radius: RadiusScale = {
  sm: 15.5,
  md: 20,
  card: 24,
  lg: 25,
  chip: 28,
  xl: 32,
  pill: 56,
  round: 80,
};
