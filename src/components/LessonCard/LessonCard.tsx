/**
 * LessonCard — a lesson entry shown on Home (e.g. "Learn colors with objects").
 *
 * A single prop-driven component (Requirement 7.4) that renders a category
 * label, a card title, optional meta chips, and a call-to-action pill. It is
 * interactive: `Pressable` derives the pressed state and applies the
 * token-based `containerPressed` overlay while held (Requirement 6.3). The
 * surface mirrors the `Card` primitive's radius / padding / shadow tokens and
 * reuses the same pastel `tint` vocabulary for consistency (no duplicate
 * components, Requirement 7.4).
 *
 * Styling flows entirely through `makeStyles(theme)`; there are no inline style
 * object literals (Requirements 8.1, 8.2).
 *
 * Requirements: 6.3 (default/pressed states), 7.1/7.2 (reusable, separate file),
 * 7.4 (typed props), 8.1/8.2 (consistent styling, no inline styles).
 */

import { Pressable, Text, View } from 'react-native';

import { useTheme } from '../../theme';
import { type CardTint } from '../Card/Card';

import { makeStyles } from './LessonCard.styles';

export interface LessonCardProps {
  /** Primary card title (e.g. "Learn colors with objects"). */
  title: string;
  /** Optional category label rendered above the title (e.g. "Colors"). */
  category?: string;
  /** Optional meta chips (e.g. ["12 lessons", "10 min"]). */
  meta?: string[];
  /** Call-to-action pill label. Defaults to "Start learning". */
  ctaLabel?: string;
  /** Pastel surface tint. Defaults to `'purple'`. */
  tint?: CardTint;
  /** Press handler; when omitted the card is non-interactive. */
  onPress?: () => void;
  /** Accessibility label; defaults to `title`. */
  accessibilityLabel?: string;
}

export function LessonCard({
  title,
  category,
  meta,
  ctaLabel = 'Start learning',
  tint = 'purple',
  onPress,
  accessibilityLabel,
}: LessonCardProps): React.JSX.Element {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const interactive = onPress !== undefined;

  return (
    <Pressable
      onPress={onPress}
      disabled={!interactive}
      accessibilityRole={interactive ? 'button' : undefined}
      accessibilityLabel={accessibilityLabel ?? title}
      style={({ pressed }) =>
        pressed && interactive
          ? [styles.container, styles[tint], styles.containerPressed]
          : [styles.container, styles[tint]]
      }
    >
      {category !== undefined ? (
        <Text style={styles.category} numberOfLines={1}>
          {category}
        </Text>
      ) : null}

      <Text style={styles.title} numberOfLines={2}>
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

      <View style={styles.cta}>
        <Text style={styles.ctaText} numberOfLines={1}>
          {ctaLabel}
        </Text>
      </View>
    </Pressable>
  );
}
