/**
 * StreakTracker — weekly streak row (Analytics "Your streak").
 *
 * Renders a horizontal row of day markers (typically 7) where each day is
 * either active (the user practised) or inactive. State is driven entirely by
 * the typed `days` prop rather than duplicate components (Requirement 7.4), and
 * the active/inactive visuals map to the design's defined control states
 * (Requirements 6.3, 6.4).
 *
 * Styling flows through `makeStyles(theme)`; there are no inline style literals
 * (Requirements 8.1, 8.2).
 *
 * Requirements: 6.3 (state-aware rendering), 6.4 (state transitions),
 * 7.1/7.4 (reusable, typed props), 8.1/8.2 (token styling, no inline styles).
 */

import { Text, View } from 'react-native';

import { useTheme } from '../../theme';

import { makeStyles } from './StreakTracker.styles';

export interface StreakDay {
  /** Short day label, e.g. `'M'`, `'T'`. */
  label: string;
  /** Whether the day counts toward the active streak. */
  active: boolean;
}

export interface StreakTrackerProps {
  /** Ordered list of days to render (commonly 7 for a week). */
  days: StreakDay[];
}

export function StreakTracker({ days }: StreakTrackerProps): React.JSX.Element {
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <View style={styles.row} accessibilityRole="summary">
      {days.map((day, index) => (
        <View key={`${day.label}-${index}`} style={styles.day}>
          <View
            style={
              day.active
                ? [styles.dot, styles.dotActive]
                : [styles.dot, styles.dotInactive]
            }
          >
            <Text
              style={
                day.active
                  ? [styles.dotLabel, styles.dotLabelActive]
                  : [styles.dotLabel, styles.dotLabelInactive]
              }
            >
              {day.label}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}
