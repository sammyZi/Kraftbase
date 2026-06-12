/**
 * StateAwareList — data-driven Empty_State / Filled_State selector.
 *
 * A generic, prop-driven list that renders the Empty_State when the provided
 * `items` array is empty or absent, and the Filled_State — rendering exactly the
 * provided items, in order, with identity preserved via `keyExtractor` — when
 * the list is non-empty (Requirements 6.1, 6.2).
 *
 * The Empty_State reuses the existing {@link EmptyState} component. Callers may
 * configure it through `emptyTitle`/`emptyMessage`/`emptyIcon`, or supply a
 * fully custom node via `emptyState` (which takes precedence).
 *
 * The component is intentionally side-effect free and deterministic so it is
 * straightforward to property-test (design Correctness Property 4): for all
 * lists of view-model items it selects Empty vs Filled purely from length and,
 * when filled, maps `items` one-to-one through `renderItem`.
 *
 * Styling flows entirely through `makeStyles(theme)`; there are no inline style
 * object literals (Requirements 8.1, 8.2).
 *
 * Requirements: 6.1 (render Empty_State when no data), 6.2 (render Filled_State
 * with the provided items when data present), 7.1/7.2 (reusable, separate file),
 * 7.4 (typed props), 8.1/8.2 (consistent styling, no inline styles).
 */

import { type ReactNode } from 'react';
import { View } from 'react-native';

import { useTheme } from '../../theme';
import { EmptyState } from '../EmptyState/EmptyState';

import { makeStyles } from './StateAwareList.styles';

export interface StateAwareListProps<TItem> {
  /**
   * The view-model items to render. An empty array or `undefined` selects the
   * Empty_State; a non-empty array selects the Filled_State.
   */
  items?: readonly TItem[];
  /** Renders a single item in the Filled_State. */
  renderItem: (item: TItem, index: number) => ReactNode;
  /** Derives a stable, unique key/identity for each item. */
  keyExtractor: (item: TItem, index: number) => string;
  /**
   * Fully custom Empty_State node. When provided it takes precedence over the
   * `emptyTitle`/`emptyMessage`/`emptyIcon` passthrough props.
   */
  emptyState?: ReactNode;
  /** Title for the default {@link EmptyState}. Defaults to `'Nothing here yet'`. */
  emptyTitle?: string;
  /** Optional supporting copy for the default {@link EmptyState}. */
  emptyMessage?: string;
  /** Optional icon slot for the default {@link EmptyState}. */
  emptyIcon?: ReactNode;
}

export function StateAwareList<TItem>({
  items,
  renderItem,
  keyExtractor,
  emptyState,
  emptyTitle = 'Nothing here yet',
  emptyMessage,
  emptyIcon,
}: StateAwareListProps<TItem>): React.JSX.Element {
  const theme = useTheme();
  const styles = makeStyles(theme);

  // Empty_State selection: empty or absent list (Requirement 6.1).
  if (items === undefined || items.length === 0) {
    if (emptyState !== undefined) {
      return <>{emptyState}</>;
    }
    return <EmptyState title={emptyTitle} message={emptyMessage} icon={emptyIcon} />;
  }

  // Filled_State: render exactly the provided items, in order (Requirement 6.2).
  return (
    <View style={styles.list}>
      {items.map((item, index) => (
        <View key={keyExtractor(item, index)}>{renderItem(item, index)}</View>
      ))}
    </View>
  );
}
