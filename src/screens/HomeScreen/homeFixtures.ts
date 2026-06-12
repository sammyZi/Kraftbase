/**
 * Local fixture / mock data for the HomeScreen Filled_State.
 *
 * This presentation-focused app has no backend in scope, so the "Let's learn"
 * lesson list is sourced from this local fixture shaped like a view model
 * (design.md §"Data Models"). The absence of these items would drive the
 * Empty_State instead (Requirements 6.1, 6.2).
 */

import { type CardTint } from '../../components';

/** Category keys used by both the filter tabs and the lesson fixtures. */
export type HomeCategoryKey = 'letters' | 'colors';

/** A single lesson entry rendered as a `LessonCard` on Home. */
export interface HomeLesson {
  /** Stable identity reported through `onOpenLesson` and used as list key. */
  id: string;
  /** Lesson card title (e.g. "Learn colors with objects"). */
  title: string;
  /** Filter category this lesson belongs to. */
  category: HomeCategoryKey;
  /** Human-readable category label shown on the card (e.g. "Colors"). */
  categoryLabel: string;
  /** Meta chips (e.g. ["12 lessons", "10 min"]). */
  meta: string[];
  /** Pastel surface tint for the card. */
  tint: CardTint;
}

/** The Filled_State lesson list shown under "Let's learn". */
export const homeLessons: HomeLesson[] = [
  {
    id: 'colors-objects',
    title: 'Learn colors with objects',
    category: 'colors',
    categoryLabel: 'Colors',
    meta: ['12 lessons', '10 min'],
    tint: 'purple',
  },
  {
    id: 'letters-sounds',
    title: 'Learn letters with fun sounds',
    category: 'letters',
    categoryLabel: 'Letters',
    meta: ['26 lessons', '15 min'],
    tint: 'accent',
  },
  {
    id: 'colors-mixing',
    title: 'Mix and match colors',
    category: 'colors',
    categoryLabel: 'Colors',
    meta: ['8 lessons', '8 min'],
    tint: 'blue',
  },
  {
    id: 'letters-tracing',
    title: 'Trace letters A to Z',
    category: 'letters',
    categoryLabel: 'Letters',
    meta: ['26 lessons', '20 min'],
    tint: 'pink',
  },
];
