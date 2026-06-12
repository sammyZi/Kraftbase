/**
 * EmptyState — the defined empty placeholder for a list/screen with no data.
 *
 * Renders a centered optional icon slot, a title, and an optional supporting
 * message. Screens/components render this when their data set is empty or absent
 * (Requirement 6.1).
 *
 * Styling flows entirely through `makeStyles(theme)`; there are no inline style
 * object literals (Requirements 8.1, 8.2).
 *
 * Requirements: 6.1 (empty placeholder), 7.1/7.2 (reusable, separate file),
 * 7.4 (typed props), 8.1/8.2 (consistent styling).
 */

import { type ReactNode } from 'react';
import { Text, View } from 'react-native';

import { useTheme } from '../../theme';

import { makeStyles } from './EmptyState.styles';

export interface EmptyStateProps {
  /** Headline describing the empty condition. */
  title: string;
  /** Optional supporting copy below the title. */
  message?: string;
  /** Optional illustrative icon rendered above the title. */
  icon?: ReactNode;
}

export function EmptyState({ title, message, icon }: EmptyStateProps): React.JSX.Element {
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <View style={styles.container}>
      {icon !== undefined ? <View style={styles.icon}>{icon}</View> : null}
      <Text style={styles.title}>{title}</Text>
      {message !== undefined ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}
