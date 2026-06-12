/**
 * ErrorBoundary — top-level recoverable fallback for uncaught render errors.
 *
 * A React class component (the only way to implement an error boundary) that
 * implements `getDerivedStateFromError` and `componentDidCatch`. When a
 * descendant throws during render, instead of unmounting the whole tree to a
 * blank white screen, the boundary renders a styled, recoverable fallback UI
 * with a "Try again" control that clears the error state and re-renders
 * `children`.
 *
 * It is intended to wrap the entire app tree (including `ThemeProvider`), so it
 * cannot consume the theme via `useTheme()`. The fallback is therefore styled
 * from the static `lightTheme` tokens through `makeStyles` — still token-driven
 * with no inline style object literals (Requirements 8.1, 8.2, 8.3).
 *
 * Requirements: 1.3, 1.4 (render the initial screen without a runtime-error
 * blank screen on iOS/Android by recovering gracefully).
 */

import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { lightTheme } from '../../theme';

import { makeStyles } from './ErrorBoundary.styles';

export interface ErrorBoundaryProps {
  /** The app subtree the boundary protects. */
  children: ReactNode;
}

interface ErrorBoundaryState {
  /** Whether a descendant render error is currently being shown. */
  hasError: boolean;
}

/** Styles resolved once from the static light theme (boundary sits above the provider). */
const styles = makeStyles(lightTheme);

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  /** Flip to the fallback when a child throws during render. */
  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  /** Surface the error for diagnostics without crashing the app. */
  componentDidCatch(error: Error, info: ErrorInfo): void {
    // eslint-disable-next-line no-console
    console.error('Uncaught error caught by ErrorBoundary:', error, info.componentStack);
  }

  /** Clear the error so `children` get another chance to render. */
  private readonly handleRetry = (): void => {
    this.setState({ hasError: false });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <Text style={styles.title}>Something went wrong</Text>
            <Text style={styles.message}>
              The app ran into an unexpected problem. You can try again to
              continue.
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Try again"
              style={styles.button}
              onPress={this.handleRetry}
            >
              <Text style={styles.buttonLabel}>Try again</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      );
    }

    return this.props.children;
  }
}
