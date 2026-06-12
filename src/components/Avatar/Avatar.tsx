/**
 * Avatar — user image or initials.
 *
 * Prop-driven component (Requirement 7.4) that renders the user's image when a
 * `uri` is provided, otherwise falls back to derived initials, and finally to a
 * neutral empty placeholder when neither is available (Requirement 6.1). All
 * styling comes from the theme via `makeStyles` (Requirements 8.1–8.3).
 */

import { Image, Text, View } from 'react-native';

import { useTheme } from '../../theme';

import { makeStyles } from './Avatar.styles';

export interface AvatarProps {
  /** Remote/local image URI. When present the image is rendered. */
  uri?: string;
  /** Display name used to derive initials when no `uri` is given. */
  name?: string;
  /** Accessibility label; defaults to `name` or a generic description. */
  accessibilityLabel?: string;
}

/** Derive up to two uppercase initials from a display name. */
function initialsFor(name: string | undefined): string {
  if (name === undefined) {
    return '';
  }
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return '';
  }
  const first = parts[0].charAt(0);
  const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : '';
  return (first + last).toUpperCase();
}

export function Avatar({
  uri,
  name,
  accessibilityLabel,
}: AvatarProps): React.JSX.Element {
  const theme = useTheme();
  const styles = makeStyles(theme);

  const initials = initialsFor(name);

  return (
    <View
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel ?? name ?? 'User avatar'}
      style={styles.base}
    >
      {uri !== undefined && uri.length > 0 ? (
        <Image source={{ uri }} style={styles.image} resizeMode="cover" />
      ) : (
        <Text style={styles.initials}>{initials}</Text>
      )}
    </View>
  );
}
