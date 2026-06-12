/**
 * Button — primary action control.
 *
 * A single prop-driven component (Requirement 7.4) supporting the design's
 * variants (primary / secondary / ghost) and interactive states
 * default / pressed / disabled (Requirement 6.3). Pressed state is derived from
 * `Pressable`'s render-prop so no extra state is tracked. All styling comes from
 * the theme via `makeStyles` (Requirements 8.1–8.3).
 */

import { Pressable, Text } from 'react-native';

import { useTheme } from '../../theme';

import { makeStyles } from './Button.styles';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface ButtonProps {
  /** Visible button text. */
  label: string;
  /** Visual variant. Defaults to `'primary'`. */
  variant?: ButtonVariant;
  /** When true the button is non-interactive and rendered dimmed. */
  disabled?: boolean;
  /** Press handler; ignored while `disabled`. */
  onPress?: () => void;
  /** Accessibility label; defaults to `label`. */
  accessibilityLabel?: string;
}

const labelStyleFor = (
  styles: ReturnType<typeof makeStyles>,
  variant: ButtonVariant,
) => {
  switch (variant) {
    case 'secondary':
      return styles.labelSecondary;
    case 'ghost':
      return styles.labelGhost;
    case 'primary':
    default:
      return styles.labelPrimary;
  }
};

export function Button({
  label,
  variant = 'primary',
  disabled = false,
  onPress,
  accessibilityLabel,
}: ButtonProps): React.JSX.Element {
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <Text style={[styles.label, labelStyleFor(styles, variant)]}>{label}</Text>
    </Pressable>
  );
}
