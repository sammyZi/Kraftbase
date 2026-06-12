/**
 * LessonStep — a row in the LessonDetail vertical timeline / stepper.
 *
 * Models the four design states via a typed `status` union and renders the
 * state-appropriate action by reusing the shared `Button` primitive
 * (Requirement 7.4 — one prop-driven component, no duplication):
 *
 *   - `locked`      → no action (non-interactive)
 *   - `in-progress` → "Continue"     (primary button)
 *   - `done`        → "Replay"       (ghost button)
 *   - `start`       → "Start Lesson" (secondary button)
 *
 * Each row shows a `label`, a `duration`, and the action above. Selecting an
 * action drives a transition to the next state in the owning screen
 * (Requirements 6.3, 6.4). All styling comes from `makeStyles(theme)` with no
 * inline style literals (Requirements 8.1, 8.2).
 *
 * Requirements: 6.3 (control states), 6.4 (state transitions), 7.1/7.4
 * (reusable, typed props), 8.1/8.2 (token styling, no inline styles).
 */

import { Text, View } from 'react-native';

import { useTheme } from '../../theme';
import { Button, type ButtonVariant } from '../Button/Button';
import type { CardTint } from '../Card/Card';

import { makeStyles } from './LessonStep.styles';

export type LessonStepStatus = 'locked' | 'in-progress' | 'done' | 'start';

export interface LessonStepProps {
  /** Step title, e.g. `'A for Apple'`. */
  label: string;
  /** Human-readable duration, e.g. `'10 min'`. */
  duration: string;
  /** Current step state; selects the rendered action. */
  status: LessonStepStatus;
  /** Optional background tint for the step card. Defaults to `'surface'`. */
  tint?: CardTint;
  /** Action handler; ignored for the `locked` state. */
  onAction?: () => void;
}

interface StepAction {
  label: string;
  variant: ButtonVariant;
}

/** Map a step status to its action label + button variant, or `null` if none. */
const actionFor = (status: LessonStepStatus): StepAction | null => {
  switch (status) {
    case 'in-progress':
      return { label: 'Continue', variant: 'primary' };
    case 'done':
      return { label: 'Replay', variant: 'ghost' };
    case 'start':
      return { label: 'Start Lesson', variant: 'secondary' };
    case 'locked':
    default:
      return null;
  }
};

export function LessonStep({
  label,
  duration,
  status,
  tint = 'surface',
  onAction,
}: LessonStepProps): React.JSX.Element {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const action = actionFor(status);
  const locked = status === 'locked';

  return (
    <View style={styles.row}>
      <View style={styles.timeline}>
        <View
          style={
            locked
              ? [styles.node, styles.nodeLocked]
              : [styles.node, styles.nodeActive]
          }
        />
        <View style={styles.connector} />
      </View>

      <View style={[styles.card, styles[tint]]}>
        <View style={styles.info}>
          <Text
            style={locked ? [styles.label, styles.labelLocked] : styles.label}
            numberOfLines={1}
          >
            {label}
          </Text>
          <Text style={styles.duration} numberOfLines={1}>
            {duration}
          </Text>
        </View>

        {action !== null ? (
          <Button
            label={action.label}
            variant={action.variant}
            onPress={onAction}
          />
        ) : (
          <Text style={styles.lockedTag}>Locked</Text>
        )}
      </View>
    </View>
  );
}
