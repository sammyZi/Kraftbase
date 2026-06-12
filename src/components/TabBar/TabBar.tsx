/**
 * TabBar — floating bottom tab navigation.
 *
 * A single prop-driven component (Requirement 7.4) that renders a centered
 * floating white pill of icon-only circular items. The active item is a filled
 * navy circle (Requirement 6.3); switching `activeKey` transitions items
 * between states (Requirement 6.4). Each item is a `Pressable` so its pressed
 * feedback is derived without extra state.
 *
 * Styling lives in this file (self-contained). Labels are kept for
 * accessibility but rendered icon-only to match the design.
 */

import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/** Name of an Ionicons glyph, used for the tab icon. */
export type TabBarIconName = keyof typeof Ionicons.glyphMap;

/** A single bottom-tab entry. */
export interface TabBarItem {
  /** Stable identifier reported back through `onTabPress`. */
  key: string;
  /** Accessibility label for the tab. */
  label: string;
  /** Ionicons glyph rendered in the circular item. */
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

const NAVY = '#1C274C';
const WHITE = '#FFFFFF';
const GRAY = '#708892';

export function TabBar({
  items,
  activeKey,
  onTabPress,
}: TabBarProps): React.JSX.Element {
  return (
    <View style={styles.wrap} pointerEvents="box-none">
      <View style={styles.bar} accessibilityRole="tablist">
        {items.map((item) => {
          const active = item.key === activeKey;
          return (
            <Pressable
              key={item.key}
              accessibilityRole="tab"
              accessibilityLabel={item.label}
              accessibilityState={{ selected: active }}
              onPress={() => onTabPress(item.key)}
              style={({ pressed }) => {
                const base = [styles.item, active && styles.itemActive];
                return pressed ? [...base, styles.itemPressed] : base;
              }}
            >
              <Ionicons
                name={item.icon ?? 'ellipse'}
                size={20}
                color={active ? WHITE : GRAY}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    paddingBottom: 24,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 40,
    backgroundColor: '#F4F3F3',
  },
  item: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  itemActive: {
    backgroundColor: NAVY,
  },
  itemPressed: {
    opacity: 0.85,
  },
});
