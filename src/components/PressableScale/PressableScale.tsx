/**
 * PressableScale — a Pressable that springs down slightly while pressed.
 *
 * A reusable micro-interaction primitive (Requirement 11: smooth animations /
 * micro-interactions). It scales its content to `activeScale` on press-in and
 * springs back to 1 on press-out using React Native's built-in `Animated` API
 * with the native driver, so it stays at 60fps and adds no new dependencies.
 *
 * Use it anywhere a tappable control should feel responsive: buttons, cards,
 * list rows, icon buttons, tabs.
 */

import { useRef } from 'react';
import {
  Animated,
  Pressable,
  type GestureResponderEvent,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface PressableScaleProps extends PressableProps {
  /** Scale applied while pressed. Defaults to 0.96. */
  activeScale?: number;
  /** Style for the pressable container. */
  style?: StyleProp<ViewStyle>;
}

export function PressableScale({
  activeScale = 0.96,
  style,
  onPressIn,
  onPressOut,
  children,
  ...rest
}: PressableScaleProps): React.JSX.Element {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = (e: GestureResponderEvent): void => {
    Animated.spring(scale, {
      toValue: activeScale,
      useNativeDriver: true,
      // Smooth, damped press-in (no oscillation).
      friction: 7,
      tension: 90,
    }).start();
    onPressIn?.(e);
  };

  const handlePressOut = (e: GestureResponderEvent): void => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      // Soft settle back with a hint of bounce.
      friction: 6,
      tension: 80,
    }).start();
    onPressOut?.(e);
  };

  return (
    <AnimatedPressable
      {...rest}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[style, { transform: [{ scale }] }]}
    >
      {children}
    </AnimatedPressable>
  );
}
