/**
 * Local fixture / mock data for the LessonDetailScreen.
 *
 * This presentation-focused app has no backend in scope, so the lesson header
 * (title + meta) and the vertical stepper/timeline are sourced from these typed
 * view-model fixtures (design.md §"Data Models": Filled_State data comes from
 * local fixtures — Requirements 6.1, 6.2). The step shapes mirror the props of
 * the reusable `LessonStep` component (`LessonStepStatus`).
 *
 * The screen reads a `lessonId` param (design "Screen 4 — Lesson detail" and
 * `RootStackParamList.LessonDetail: { lessonId: string }`); `getLessonDetail`
 * selects the matching fixture, falling back to the first lesson so the screen
 * always renders a defined Filled_State.
 */

import type { LessonStepStatus } from '../../components';

/** A single row in the LessonDetail vertical timeline / stepper. */
export interface LessonDetailStep {
  /** Stable identity used as the list key. */
  id: string;
  /** Step title, e.g. `'A for Apple'`. */
  label: string;
  /** Human-readable duration, e.g. `'10 min'`. */
  duration: string;
  /** Current step state; selects the rendered action in `LessonStep`. */
  status: LessonStepStatus;
}

/** The full lesson-detail view model selected by `lessonId`. */
export interface LessonDetail {
  /** Stable identity matching the `lessonId` route param. */
  id: string;
  /** Lesson title shown in the header (e.g. "Learn ABC with fun sounds"). */
  title: string;
  /** Meta chips shown beneath the title (e.g. ["26 lessons", "30 min"]). */
  meta: string[];
  /** AI buddy banner message for this lesson. */
  buddyMessage: string;
  /** The ordered steps rendered as the vertical stepper/timeline. */
  steps: LessonDetailStep[];
}

/**
 * Fixture lessons keyed by id. Each exercises every `LessonStep` status so the
 * per-step interactive states (done/Replay, in-progress/Continue, start, locked)
 * are all reachable in the timeline (Requirements 6.3, 6.4).
 */
export const lessonDetails: LessonDetail[] = [
  {
    id: 'letters-sounds',
    title: 'Learn ABC with fun sounds',
    meta: ['26 lessons', '30 min'],
    buddyMessage: "Let's sound out the alphabet together!",
    steps: [
      { id: 'a-apple', label: 'A for Apple', duration: '10 min', status: 'done' },
      { id: 'b-ball', label: 'B for Ball', duration: '10 min', status: 'done' },
      { id: 'c-cat', label: 'C for Cat', duration: '12 min', status: 'in-progress' },
      { id: 'd-dog', label: 'D for Dog', duration: '12 min', status: 'start' },
      { id: 'e-elephant', label: 'E for Elephant', duration: '15 min', status: 'locked' },
    ],
  },
  {
    id: 'colors-objects',
    title: 'Learn colors with objects',
    meta: ['12 lessons', '20 min'],
    buddyMessage: "Ready to paint the world with colors?",
    steps: [
      { id: 'red-apple', label: 'Red like an apple', duration: '8 min', status: 'done' },
      { id: 'blue-sky', label: 'Blue like the sky', duration: '8 min', status: 'in-progress' },
      { id: 'green-grass', label: 'Green like grass', duration: '10 min', status: 'start' },
      { id: 'yellow-sun', label: 'Yellow like the sun', duration: '10 min', status: 'locked' },
    ],
  },
];

/**
 * Select the lesson-detail fixture for a `lessonId`. Falls back to the first
 * fixture when the id is unknown or absent, so the screen always renders a
 * defined Filled_State.
 */
export const getLessonDetail = (lessonId?: string): LessonDetail =>
  lessonDetails.find((lesson) => lesson.id === lessonId) ?? lessonDetails[0];
