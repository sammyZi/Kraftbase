/**
 * App entry — font loading, splash gating, theming, navigation, and a
 * top-level error boundary.
 *
 * Startup sequence (Requirements 1.3, 1.4, 5.1, 5.2, 5.4):
 *   1. `SplashScreen.preventAutoHideAsync()` is called at module load so the
 *      native splash stays visible while the bundled Inter font families load
 *      (Req 5.1, 5.2 — fonts are ready before text that depends on them shows).
 *   2. `useFonts` (expo-font) loads the `@expo-google-fonts/inter` weights used
 *      by the typography tokens.
 *   3. The app renders nothing (splash held) until fonts RESOLVE — either
 *      loaded successfully OR errored. Once resolved we hide the splash and
 *      render the tree. Rendering on error means the app keeps working with the
 *      documented system fallback rather than getting stuck on the splash
 *      (Req 5.4 — `theme/typography.ts` `fonts.fallback` / `lib/fonts.ts`
 *      `SYSTEM_FALLBACK`; React Native substitutes the platform system family
 *      for any unregistered Inter key).
 *
 * The tree is `ErrorBoundary` → `ThemeProvider` → `SafeAreaProvider` →
 * `NavigationContainer` → `RootNavigator`. The boundary is outermost so it can
 * recover from a render error anywhere below — including the providers — into a
 * recoverable fallback instead of a blank white screen (Req 1.3, 1.4).
 */

import { useCallback, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ErrorBoundary } from './src/components';
import { RootNavigator } from './src/navigation';
import { ThemeProvider } from './src/theme';

// Hold the native splash screen until fonts resolve. Guard the promise so a
// rejection (e.g. the splash was already hidden) never becomes unhandled.
void SplashScreen.preventAutoHideAsync().catch(() => {
  /* no-op: hiding is also attempted below once fonts resolve */
});

export default function App(): React.JSX.Element | null {
  // Family keys here match the `Inter_*` names referenced by the typography
  // tokens (`theme/typography.ts`). `fontError` is non-null if any file fails.
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  // Fonts have "resolved" once they are loaded OR have errored — in both cases
  // we stop gating so the app continues (the system fallback covers failures).
  const fontsResolved = fontsLoaded || fontError !== null;

  // Hide the splash exactly once, after the first commit where fonts resolved,
  // so the initial screen is painted before the splash disappears.
  const onLayoutRootView = useCallback(async (): Promise<void> => {
    if (fontsResolved) {
      await SplashScreen.hideAsync().catch(() => {
        /* no-op: splash may already be hidden */
      });
    }
  }, [fontsResolved]);

  useEffect(() => {
    void onLayoutRootView();
  }, [onLayoutRootView]);

  // Keep the splash visible (render nothing) until fonts resolve.
  if (!fontsResolved) {
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.root}>
      <ErrorBoundary>
        <ThemeProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
            {/* App is light-mode only with light backgrounds, so force dark
                (black) status bar text/icons for legibility. */}
            <StatusBar style="dark" />
          </SafeAreaProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
