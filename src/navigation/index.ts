/**
 * Navigation barrel — single import surface for the navigation layer.
 *
 * Re-exports the `RootNavigator` and the typed route param lists so the app
 * entry (App.tsx, task 9.2) and screens import from `../navigation` rather than
 * deep paths (Requirement 7.3).
 */

export { RootNavigator } from './RootNavigator';
export type {
  RootStackParamList,
  MainTabParamList,
  RootStackScreenProps,
  MainTabScreenProps,
} from './types';
