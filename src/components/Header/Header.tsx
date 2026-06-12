/**
 * Header — screen title with an OPTIONAL back/dismiss control.
 *
 * Renders a title (and optional subtitle), an optional leading back button, and
 * an optional trailing slot. The back button appears when either `onBack` is
 * supplied or `showBack` is explicitly `true`; pressing it invokes `onBack`
 * (Requirement 2.3 — back/dismiss returns to the previous screen). The button is
 * a `Pressable` so its pressed state is token-driven (Requirement 6.3).
 *
 * Styling flows entirely through `makeStyles(theme)`; there are no inline style
 * object literals (Requirements 8.1, 8.2).
 *
 * Requirements: 2.3 (back/dismiss control), 6.3 (pressed state), 7.1/7.2
 * (reusable, separate file), 7.4 (typed props), 8.1/8.2 (consistent styling).
 */

import { type ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../../theme';

import { makeStyles } from './Header.styles';

export interface HeaderProps {
  /** Screen / section title. */
  title: string;
  /** Optional secondary line below the title (e.g. lesson meta). */
  subtitle?: string;
  /** Back/dismiss handler. When provided, a back control is rendered. */
  onBack?: () => void;
  /**
   * Force the back control's visibility. Defaults to showing the control
   * whenever `onBack` is provided. Set explicitly to override.
   */
  showBack?: boolean;
  /** Optional trailing slot (avatar, action button, etc.). */
  right?: ReactNode;
}

export function Header({
  title,
  subtitle,
  onBack,
  showBack,
  right,
}: HeaderProps): React.JSX.Element {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const backVisible = showBack ?? onBack !== undefined;

  return (
    <View style={styles.container}>
      {backVisible ? (
        <Pressable
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={theme.spacing.sm}
          style={({ pressed }) =>
            pressed ? [styles.backButton, styles.backButtonPressed] : styles.backButton
          }
        >
          <Ionicons
            name="chevron-back"
            size={theme.typography.styles.h3.fontSize}
            color={theme.colors.textPrimary}
          />
        </Pressable>
      ) : null}
      <View style={styles.titles}>
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
    </View>
  );
}
