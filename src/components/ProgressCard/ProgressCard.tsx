/**
 * ProgressCard — the Home "Today's pick" progress summary card.
 *
 * A prop-driven component (Requirement 7.4) that wraps the shared `Card`
 * primitive (no duplicate surface logic) and renders a title
 * (e.g. "Today's pick: Shapes"), optional meta chips, and a progress bar with a
 * "% complete" label. Default (non-interactive) state only, per the design.
 *
 * The progress fill width is data-derived from the clamped `progress` prop and
 * applied via a precomputed style array (not a JSX-inline literal), so styling
 * still flows through `makeStyles(theme)` tokens (Requirements 8.1, 8.2).
 *
 * Requirements: 7.1/7.2 (reusable, separate file), 7.4 (typed props),
 * 8.1/8.2 (consistent styling, no inline styles).
 */

import {
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { useTheme } from '../../theme';
import { Card, type CardTint } from '../Card/Card';

import { makeStyles } from './ProgressCard.styles';

export interface ProgressCardProps {
  /** Card title (e.g. "Today's pick: Shapes"). */
  title: string;
  /** Optional meta chips (e.g. ["12 lessons", "10 min"]). */
  meta?: string[];
  /** Completion ratio in the range [0, 1]; clamped defensively. */
  progress: number;
  /** Optional label override; defaults to "{percent}% complete". */
  progressLabel?: string;
  /** Pastel surface tint passed to the underlying `Card`. Defaults `'surface'`. */
  tint?: CardTint;
}

/** Clamp an arbitrary number into the inclusive [0, 1] ratio range. */
function clampRatio(value: number): number {
  if (Number.isNaN(value)) {
    return 0;
  }
  return Math.max(0, Math.min(1, value));
}

export function ProgressCard({
  title,
  meta,
  progress,
  progressLabel,
  tint = 'surface',
}: ProgressCardProps): React.JSX.Element {
  const theme = useTheme();
  const styles = makeStyles(theme);

  const ratio = clampRatio(progress);
  const percent = Math.round(ratio * 100);
  const label = progressLabel ?? `${percent}% complete`;

  // Data-derived fill width composed in a variable (not a JSX-inline literal).
  const fillStyle: StyleProp<ViewStyle> = [
    styles.barFill,
    { width: `${percent}%` },
  ];

  return (
    <Card tint={tint}>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      {meta !== undefined && meta.length > 0 ? (
        <View style={styles.metaRow}>
          {meta.map((item) => (
            <View key={item} style={styles.metaChip}>
              <Text style={styles.metaText} numberOfLines={1}>
                {item}
              </Text>
            </View>
          ))}
        </View>
      ) : null}

      <View style={styles.progressRow}>
        <View
          style={styles.barTrack}
          accessibilityRole="progressbar"
          accessibilityValue={{ min: 0, max: 100, now: percent }}
        >
          <View style={fillStyle} />
        </View>
        <Text style={styles.progressLabel} numberOfLines={1}>
          {label}
        </Text>
      </View>
    </Card>
  );
}
