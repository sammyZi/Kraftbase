/**
 * RootNavigator — the app's navigation tree (React Navigation).
 *
 * A native-stack navigator (`@react-navigation/native-stack`) with `Onboarding`
 * as the initial route (Req 2.4) and `LessonDetail` as a full-screen stack route
 * (design "Screen 4"). Nested inside the stack is a bottom-tab navigator
 * (`@react-navigation/bottom-tabs`) backing the tab bar shared by `Home` and
 * `Analytics`, so Onboarding and LessonDetail remain full-screen routes while
 * Home/Analytics live behind the tab bar (per the design Navigation flow).
 *
 * Navigation controls are wired per the design (Req 2.2, 2.3):
 *   - Onboarding Sign up / Log in → the Home tab.
 *   - Home lesson-card tap → LessonDetail with the tapped `lessonId`.
 *   - LessonDetail back control → previous screen.
 *   - The tab bar switches between Home and Analytics.
 *
 * The existing `TabBar` component renders the bottom bar via the tab
 * navigator's `tabBar` render prop, so the design's bar is reused rather than
 * the default. Each route is adapted by a thin wrapper that maps React
 * Navigation's typed `navigation`/`route` onto the props the existing screens
 * already expect (callbacks such as `onOpenLesson` / `onBack`), keeping screen
 * components decoupled from the navigator (Req 7.2).
 */

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createBottomTabNavigator,
  type BottomTabBarProps,
} from '@react-navigation/bottom-tabs';

import {
  TabBar,
  type TabBarIconName,
  type TabBarItem,
} from '../components';
import {
  AnalyticsScreen,
  HomeScreen,
  LessonDetailScreen,
  OnboardingScreen,
} from '../screens';

import type {
  MainTabParamList,
  MainTabScreenProps,
  RootStackParamList,
  RootStackScreenProps,
} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

/** Label + icon metadata for each bottom-tab route. */
const TAB_META: Record<keyof MainTabParamList, { label: string; icon: TabBarIconName }> = {
  Home: { label: 'Home', icon: 'home' },
  Analytics: { label: 'Analytics', icon: 'stats-chart' },
};

/**
 * Bridges the bottom-tab navigator state onto the existing `TabBar` component.
 * The design's bar shows four icons; `Home` and `Analytics` are the real routes
 * and the other two ("buddy" / "profile") are decorative (non-navigating).
 */
function AppTabBar({ state, navigation }: BottomTabBarProps): React.JSX.Element {
  const activeRoute = state.routes[state.index];

  const items: TabBarItem[] = [
    { key: 'Home', label: 'Home', icon: 'home' },
    { key: 'buddy', label: 'AI buddy', icon: 'book-outline' },
    { key: 'Analytics', label: 'Analytics', icon: 'stats-chart' },
    { key: 'profile', label: 'Profile', icon: 'person-outline' },
  ];

  const handleTabPress = (key: string): void => {
    const target = state.routes.find((route) => route.name === key);
    if (target === undefined) {
      // Decorative icon (no matching route) — ignore.
      return;
    }
    const isFocused = target.key === activeRoute.key;
    const event = navigation.emit({
      type: 'tabPress',
      target: target.key,
      canPreventDefault: true,
    });
    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(target.name);
    }
  };

  return (
    <TabBar items={items} activeKey={activeRoute.name} onTabPress={handleTabPress} />
  );
}

/** Onboarding route: Sign up / Log in advance into the Home tab (Req 2.2). */
function OnboardingRoute({
  navigation,
}: RootStackScreenProps<'Onboarding'>): React.JSX.Element {
  return (
    <OnboardingScreen
      navigation={{
        navigate: () => navigation.navigate('MainTabs', { screen: 'Home' }),
      }}
    />
  );
}

/** Home route: tapping a lesson card opens LessonDetail with its id (Req 2.2). */
function HomeRoute({ navigation }: MainTabScreenProps<'Home'>): React.JSX.Element {
  return (
    <HomeScreen
      onOpenLesson={(lessonId) => navigation.navigate('LessonDetail', { lessonId })}
    />
  );
}

/** Analytics route: no navigation controls beyond the shared tab bar. */
function AnalyticsRoute(): React.JSX.Element {
  return <AnalyticsScreen />;
}

/** LessonDetail route: reads the `lessonId` param; back returns to previous (Req 2.3). */
function LessonDetailRoute({
  navigation,
  route,
}: RootStackScreenProps<'LessonDetail'>): React.JSX.Element {
  return (
    <LessonDetailScreen
      lessonId={route.params.lessonId}
      onBack={() => navigation.goBack()}
    />
  );
}

/** Nested bottom-tab navigator (Home / Analytics) using the design's TabBar. */
function MainTabs(): React.JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <AppTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeRoute} />
      <Tab.Screen name="Analytics" component={AnalyticsRoute} />
    </Tab.Navigator>
  );
}

/**
 * The root native-stack navigator. `Onboarding` is the initial route (Req 2.4);
 * `MainTabs` hosts the nested tab navigator; `LessonDetail` is a full-screen
 * stack route. Headers are disabled because each screen renders its own.
 */
export function RootNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingRoute} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="LessonDetail" component={LessonDetailRoute} />
    </Stack.Navigator>
  );
}
