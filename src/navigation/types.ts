/**
 * Navigation type definitions (React Navigation, typed routes).
 *
 * Declares the typed route maps used across the app so route names and params
 * are checked at compile time (Requirement 7.3 maintainability; Requirement 2
 * navigation). Two param lists are defined per the design Screen Inventory:
 *
 *   - `MainTabParamList` — the bottom-tab navigator shared by Home and Analytics
 *     (both take no params).
 *   - `RootStackParamList` — the native-stack navigator: `Onboarding` (entry /
 *     initial route, Req 2.4), `MainTabs` (the nested tab navigator), and
 *     `LessonDetail` which carries `{ lessonId: string }` (design "Screen 4").
 *
 * `CompositeScreenProps` is used to give tab screens access to the parent
 * stack's routes (e.g. navigating Home → LessonDetail) while staying typed.
 */

import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

/** Bottom-tab routes (Home / Analytics / Profile) — none take params. */
export type MainTabParamList = {
  Home: undefined;
  Analytics: undefined;
  Profile: undefined;
};

/** Root native-stack routes. */
export type RootStackParamList = {
  Onboarding: undefined;
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  LessonDetail: { lessonId: string };
};

/** Screen-props helper for a root-stack route. */
export type RootStackScreenProps<RouteName extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, RouteName>;

/**
 * Screen-props helper for a bottom-tab route, composed with the parent stack so
 * tab screens can navigate to stack routes (e.g. `LessonDetail`) in a typed way.
 */
export type MainTabScreenProps<RouteName extends keyof MainTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, RouteName>,
    NativeStackScreenProps<RootStackParamList>
  >;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // Makes `useNavigation()` (and friends) default to the root param list.
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends RootStackParamList {}
  }
}
