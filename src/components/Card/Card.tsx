/**
 * Card — content container.
 *
 * A simple prop-driven surface (Requirement 7.4) that wraps arbitrary children
 * with token-based padding, radius, and an optional pastel `tint`
 * (Requirements 8.1–8.3). Renders the default state (Requirement 6).
 */

import { View, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '../../theme';

import { makeStyles } from './Card.styles';

export type CardTint = 'surface' | 'blue' | 'purple' | 'pink' | 'accent';

export interface CardProps {
  /** Card content. */
  children: React.ReactNode;
  /** Optional background tint. Defaults to `'surface'`. */
  tint?: CardTint;
  /** Optional style override for layout-only adjustments (margins, width). */
  style?: StyleProp<ViewStyle>;
}

export function Card({
  children,
  tint = 'surface',
  style,
}: CardProps): React.JSX.Element {
  const theme = useTheme();
  const styles = makeStyles(theme);

  return <View style={[styles.base, styles[tint], style]}>{children}</View>;
}
