/**
 * BannerCard — the Home "Your AI buddy" / tip banner
 * (e.g. "Your AI buddy — You're learning great today!").
 *
 * A prop-driven component (Requirement 7.4) that wraps the shared `Card`
 * primitive (no duplicate surface logic) and lays out a small eyebrow title, a
 * message line, and an optional trailing slot (e.g. a robot `Avatar`). Default
 * (non-interactive) state only, per the design.
 *
 * Styling flows entirely through `makeStyles(theme)`; there are no inline style
 * object literals (Requirements 8.1, 8.2).
 *
 * Requirements: 7.1/7.2 (reusable, separate file), 7.4 (typed props),
 * 8.1/8.2 (consistent styling, no inline styles).
 */

import { type ReactNode } from 'react';
import { Text, View } from 'react-native';

import { useTheme } from '../../theme';
import { Card, type CardTint } from '../Card/Card';

import { makeStyles } from './BannerCard.styles';

export interface BannerCardProps {
  /** Eyebrow / source title (e.g. "Your AI buddy"). */
  title: string;
  /** Supporting message line (e.g. "You're learning great today!"). */
  message: string;
  /** Optional trailing slot (e.g. robot avatar, progress ring). */
  right?: ReactNode;
  /** Pastel surface tint passed to the underlying `Card`. Defaults `'blue'`. */
  tint?: CardTint;
}

export function BannerCard({
  title,
  message,
  right,
  tint = 'blue',
}: BannerCardProps): React.JSX.Element {
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <Card tint={tint}>
      <View style={styles.row}>
        <View style={styles.text}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.message} numberOfLines={2}>
            {message}
          </Text>
        </View>
        {right !== undefined ? <View style={styles.right}>{right}</View> : null}
      </View>
    </Card>
  );
}
