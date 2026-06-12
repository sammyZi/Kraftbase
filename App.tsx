import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { lightColors } from './src/theme/colors';

/**
 * Placeholder app entry. The full implementation (font loading, splash gating,
 * ThemeProvider, NavigationContainer + RootNavigator, error boundary) is added
 * in task 9.2. This minimal shell keeps the project compiling and runnable.
 */
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SmartLearn</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightColors.background,
  },
  title: {
    color: lightColors.textPrimary,
    fontSize: 24,
    fontWeight: '700',
  },
});
