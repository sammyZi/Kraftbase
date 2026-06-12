/**
 * TabBar — floating bottom tab navigation (Home / Analytics).
 *
 * A single prop-driven component (Requirement 7.4) that renders a horizontal row
 * of tab items and highlights the active one with a token-based pill, expressing
 * the design's active / inactive states (Requirement 6.3). Switching the
 * `activeKey` transitions items between states (Requirement 6.4). Each item is a
 * `Pressable` so its pressed feedback is derived without extra state.
 *
 * Styling flows entirely through `makeStyles(theme)`; there are no inline style
 * object literals (Requirements 8.1, 8.2).
 *
 * Requirements: 6.3 (active/inactive states), 6.4 (state transitions),
 * 7.1/7.2 (reusable, separate file), 7.4 (typed props), 8.1/8.2 (consistent
 * styling, no inline styles).
 */

import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../../theme';

import { makeStyles } from './TabBar.styles';

/** Name of an Ionicons glyph, used for the optional leading icon. */
export type TabBarIconName = keyof typeof Ionicons.glyphMap;

/** A single bottom-tab entry. */
export interface TabBarItem {
  /** Stable identifier reported back through `onTabPress`. */
  key: string;
  /** Visible tab label. */
  label: string;
  /** Optional Ionicons glyph rendered above/with the label. */
  icon?: TabBarIconName;
}

export interface TabBarProps {
  /** Ordered list of tabs to render. */
  items: TabBarItem[];
  /** Key of the currently active tab. */
  activeKey: string;
  /** Invoked with the pressed tab's key. */
  onTabPress: (key: string) => void;
}

export function TabBar({
  items,
  activeKey,
  onTabPress,
}: TabBarProps): React.JSX.Element {
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <View style={styles.bar} accessibilityRole="tablist">
      {items.map((item) => {
        const active = item.key === activeKey;
        const tint = active ? theme.colors.onPrimary : theme.colors.textSecondary;

        return (
          <Pressable
            key={item.key}
            accessibilityRole="tab"
            accessibilityLabel={item.label}
            accessibilityState={{ selected: active }}
            onPress={() => onTabPress(item.key)}
            style={({ pressed }) => {
              const itemStyles = [styles.item, active && styles.itemActive];
              return pressed ? [...itemStyles, styles.itemPressed] : itemStyles;
            }}
          >
            {item.icon !== undefined ? (
              <Ionicons
                name={item.icon}
                size={theme.typography.styles.bodyLg.fontSize}
                color={tint}
              />
            ) : null}
            <Text
              style={active ? [styles.label, styles.labelActive] : styles.label}
              numberOfLines={1}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
