/**
 * ListItem — a repeated list row supporting default + pressed states.
 *
 * Renders an optional `left` slot, a title + optional subtitle, and an optional
 * `right` slot. Uses `Pressable` to derive the pressed state and applies the
 * token-based `containerPressed` overlay while held (Requirement 6.3). When no
 * `onPress` is supplied the row is non-interactive (Requirement 7.4 — one
 * component, prop-driven states).
 *
 * Styling flows entirely through `makeStyles(theme)`; there are no inline style
 * object literals (Requirements 8.1, 8.2).
 *
 * Requirements: 6.3 (pressed state), 7.1/7.2 (reusable, separate file),
 * 7.4 (typed props), 8.1/8.2 (consistent styling, no inline styles).
 */

import { type ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';

import { useTheme } from '../../theme';

import { makeStyles } from './ListItem.styles';

export interface ListItemProps {
  /** Primary row label. */
  title: string;
  /** Optional secondary line below the title. */
  subtitle?: string;
  /** Press handler; when omitted the row is non-interactive. */
  onPress?: () => void;
  /** Optional leading slot (icon, avatar, etc.). */
  left?: ReactNode;
  /** Optional trailing slot (chevron, badge, etc.). */
  right?: ReactNode;
}

export function ListItem({
  title,
  subtitle,
  onPress,
  left,
  right,
}: ListItemProps): React.JSX.Element {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const interactive = onPress !== undefined;

  return (
    <Pressable
      onPress={onPress}
      disabled={!interactive}
      accessibilityRole={interactive ? 'button' : undefined}
      style={({ pressed }) =>
        pressed ? [styles.container, styles.containerPressed] : styles.container
      }
    >
      {left !== undefined ? <View style={styles.left}>{left}</View> : null}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {subtitle !== undefined ? (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {right !== undefined ? <View style={styles.right}>{right}</View> : null}
    </Pressable>
  );
}
