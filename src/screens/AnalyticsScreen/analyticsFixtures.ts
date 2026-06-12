/**
 * Local fixture/mock data for the AnalyticsScreen.
 *
 * The Analytics screen has no backend in scope, so its Filled_State is sourced
 * from these typed view-model fixtures (design "Data Models": Filled_State data
 * comes from local fixtures; Empty_State is the absence of that data —
 * Requirements 6.1, 6.2). The shapes here mirror the props of the reusable
 * `StreakTracker` (`StreakDay`) and `BarChart` (`BarChartDatum`) components.
 */

import type { StreakDay } from '../../components';

/** The four skill categories shown as bar-chart filters in the Figma frame. */
export type SkillCategory = 'letters' | 'colors' | 'shapes' | 'animals';

/** A single category's skill-progress value for a given week. */
export interface SkillProgress {
  /** Stable category key used by the filter tabs. */
  category: SkillCategory;
  /** Visible label shown beneath the bar (e.g. "Letters"). */
  label: string;
  /** Progress value for the category, compared against the other bars. */
  value: number;
}

/** A selectable week of analytics data driving the streak row and bar chart. */
export interface AnalyticsWeek {
  /** Stable key reported back by the week selector. */
  key: string;
  /** Visible label in the week selector (e.g. "This week"). */
  label: string;
  /** Weekly streak markers (Mon→Sun) for the "Your streak" tracker. */
  streak: StreakDay[];
  /** Per-category skill progress for the "Skill progress" bar chart. */
  skills: SkillProgress[];
}

/** Human-readable labels for each skill category (filter tab + bar label). */
export const skillCategoryLabels: Record<SkillCategory, string> = {
  letters: 'Letters',
  colors: 'Colors',
  shapes: 'Shapes',
  animals: 'Animals',
};

/**
 * Three weeks of fixture data. "This week" and "Last week" are Filled_State;
 * "Next week" has no recorded data yet, exercising the Empty_State path for the
 * skill-progress chart (Requirements 6.1, 6.2).
 */
export const analyticsWeeks: AnalyticsWeek[] = [
  {
    key: 'this-week',
    label: 'This week',
    streak: [
      { label: 'M', active: true },
      { label: 'T', active: true },
      { label: 'W', active: true },
      { label: 'T', active: true },
      { label: 'F', active: false },
      { label: 'S', active: false },
      { label: 'S', active: false },
    ],
    skills: [
      { category: 'letters', label: skillCategoryLabels.letters, value: 82 },
      { category: 'colors', label: skillCategoryLabels.colors, value: 64 },
      { category: 'shapes', label: skillCategoryLabels.shapes, value: 48 },
      { category: 'animals', label: skillCategoryLabels.animals, value: 71 },
    ],
  },
  {
    key: 'last-week',
    label: 'Last week',
    streak: [
      { label: 'M', active: true },
      { label: 'T', active: true },
      { label: 'W', active: true },
      { label: 'T', active: true },
      { label: 'F', active: true },
      { label: 'S', active: true },
      { label: 'S', active: false },
    ],
    skills: [
      { category: 'letters', label: skillCategoryLabels.letters, value: 70 },
      { category: 'colors', label: skillCategoryLabels.colors, value: 58 },
      { category: 'shapes', label: skillCategoryLabels.shapes, value: 60 },
      { category: 'animals', label: skillCategoryLabels.animals, value: 44 },
    ],
  },
  {
    key: 'next-week',
    label: 'Next week',
    streak: [
      { label: 'M', active: false },
      { label: 'T', active: false },
      { label: 'W', active: false },
      { label: 'T', active: false },
      { label: 'F', active: false },
      { label: 'S', active: false },
      { label: 'S', active: false },
    ],
    skills: [],
  },
];
