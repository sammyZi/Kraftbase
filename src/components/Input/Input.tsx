/**
 * Input — single-line text field.
 *
 * Prop-driven component (Requirement 7.4) supporting default / focused / error /
 * disabled states (Requirement 6.3). Focus state is tracked internally via
 * `onFocus` / `onBlur`. All styling comes from the theme via `makeStyles`
 * (Requirements 8.1–8.3).
 */

import { useState } from 'react';
import { TextInput, View, Text } from 'react-native';

import { useTheme } from '../../theme';

import { makeStyles } from './Input.styles';

export interface InputProps {
  /** Current text value (controlled). */
  value: string;
  /** Called when the text changes. */
  onChangeText: (text: string) => void;
  /** Placeholder shown when empty. */
  placeholder?: string;
  /** Optional field label rendered above the input. */
  label?: string;
  /** Error message; when present the field renders its error state. */
  error?: string;
  /** When true the field is non-interactive and rendered dimmed. */
  disabled?: boolean;
  /** Mask input for sensitive entry. */
  secureTextEntry?: boolean;
  /** Accessibility label; defaults to `label` or `placeholder`. */
  accessibilityLabel?: string;
}

export function Input({
  value,
  onChangeText,
  placeholder,
  label,
  error,
  disabled = false,
  secureTextEntry = false,
  accessibilityLabel,
}: InputProps): React.JSX.Element {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const [focused, setFocused] = useState(false);

  const hasError = error !== undefined && error.length > 0;

  const handleFocus = (): void => {
    setFocused(true);
  };

  const handleBlur = (): void => {
    setFocused(false);
  };

  return (
    <View style={styles.container}>
      {label !== undefined && label.length > 0 ? (
        <Text style={styles.label}>{label}</Text>
      ) : null}
      <TextInput
        accessibilityLabel={accessibilityLabel ?? label ?? placeholder}
        accessibilityState={{ disabled }}
        editable={!disabled}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
        secureTextEntry={secureTextEntry}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={[
          styles.field,
          focused && !hasError && styles.focused,
          hasError && styles.error,
          disabled && styles.disabled,
        ]}
      />
      {hasError ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}
