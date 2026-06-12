/**
 * BarChart — per-category skill-progress bar chart (Analytics "Skill progress").
 *
 * A dependency-free chart built from plain React Native views. Each datum is a
 * named category (e.g. Letters, Colors, Shapes, Animals) with a numeric
 * progress value; bar heights are derived from the value relative to the
 * largest value in the set. Bar fill colors cycle through a fixed token-based
 * palette so every color comes from the theme (Requirements 8.1–8.3).
 *
 * Bar heights/widths are computed numeric layout values (allowed dynamic
 * layout) while all color, spacing, radius, and typography come from tokens.
 *
 * Requirements: 6.3 (per-category visual state), 7.1/7.4 (reusable, typed
 * props), 8.1/8.2 (token styling, no inline style literals).
 */

import { Text, View } from 'react-native';

import { useTheme } from '../../theme';

import { makeStyles } from './BarChart.styles';

export interface BarChartDatum {
  /** Category label shown beneath the bar (e.g. `'Letters'`). */
  label: string;
  /** Progress value for the category; compared against the other bars. */
  value: number;
}

export interface BarChartProps {
  /** Categories to plot, in display order. */
  data: BarChartDatum[];
  /** Maximum pixel height for the tallest bar. Defaults to 160. */
  maxHeight?: number;
}

const DEFAULT_MAX_HEIGHT = 160;
const MIN_BAR_HEIGHT = 4;
/** Number of distinct token-based fill colors the palette cycles through. */
const PALETTE_SIZE = 4;

export function BarChart({
  data,
  maxHeight = DEFAULT_MAX_HEIGHT,
}: BarChartProps): React.JSX.Element {
  const theme = useTheme();
  const styles = makeStyles(theme);

  const fills = [styles.fill0, styles.fill1, styles.fill2, styles.fill3];
  const peak = data.reduce((max, datum) => Math.max(max, datum.value), 0);

  return (
    <View style={styles.container}>
      <View style={styles.plot}>
        {data.map((datum, index) => {
          const ratio = peak > 0 ? Math.max(datum.value, 0) / peak : 0;
          const barHeight = Math.max(ratio * maxHeight, MIN_BAR_HEIGHT);

          return (
            <View key={`${datum.label}-${index}`} style={styles.column}>
              <View style={styles.track}>
                <View
                  style={[
                    styles.fill,
                    fills[index % PALETTE_SIZE],
                    { height: barHeight },
                  ]}
                />
              </View>
              <Text style={styles.label} numberOfLines={1}>
                {datum.label}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
