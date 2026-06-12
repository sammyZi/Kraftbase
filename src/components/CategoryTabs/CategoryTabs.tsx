/**
 * CategoryTabs — horizontal filter tabs (All / Letters / Colors…).
 *
 * A single prop-driven component (Requirement 7.4) that renders a horizontally
 * scrollable row of filter pills and highlights the selected one with a
 * token-based pill, expressing the design's selected / unselected states
 * (Requirement 6.3). Changing `selectedKey` transitions items between states
 * (Requirement 6.4). Each pill is a `Pressable` so its press feedback is derived
 * without extra state, and an optional `count` renders as a trailing chip.
 *
 * Styling flows entirely through `makeStyles(theme)`; there are no inline style
 * object literals (Requirements 8.1, 8.2).
 *
 * Requirements: 6.3 (selected/unselected states), 6.4 (state transitions),
 * 7.1/7.2 (reusable, separate file), 7.4 (typed props), 8.1/8.2 (consistent
 * styling, no inline styles).
 */

import { Pressable, ScrollView, Text, View } from 'react-native';

import { useTheme } from '../../theme';

import { makeStyles } from './CategoryTabs.styles';

/** A single filter tab entry. */
export interface CategoryTabItem {
  /** Stable identifier reported back through `onSelect`. */
  key: string;
  /** Visible tab label (e.g. "All", "Letters"). */
  label: string;
  /** Optional count rendered as a trailing chip. */
  count?: number;
}

export interface CategoryTabsProps {
  /** Ordered list of filter tabs to render. */
  items: CategoryTabItem[];
  /** Key of the currently selected tab. */
  selectedKey: string;
  /** Invoked with the pressed tab's key. */
  onSelect: (key: string) => void;
}

export function CategoryTabs({
  items,
  selectedKey,
  onSelect,
}: CategoryTabsProps): React.JSX.Element {
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      {items.map((item) => {
        const selected = item.key === selectedKey;

        return (
          <Pressable
            key={item.key}
            accessibilityRole="tab"
            accessibilityLabel={item.label}
            accessibilityState={{ selected }}
            onPress={() => onSelect(item.key)}
            style={({ pressed }) => {
              const tabStyles = [styles.tab, selected ? styles.tabSelected : styles.tabUnselected];
              return pressed ? [...tabStyles, styles.tabPressed] : tabStyles;
            }}
          >
            <Text
              style={selected ? [styles.label, styles.labelSelected] : styles.label}
              numberOfLines={1}
            >
              {item.label}
            </Text>
            {item.count !== undefined ? (
              <View style={selected ? [styles.countChip, styles.countChipSelected] : styles.countChip}>
                <Text
                  style={selected ? [styles.countText, styles.countTextSelected] : styles.countText}
                >
                  {item.count}
                </Text>
              </View>
            ) : null}
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
