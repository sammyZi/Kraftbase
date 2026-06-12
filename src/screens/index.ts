/**
 * Screens barrel — single import surface for screen view components.
 *
 * Re-exports each screen and its public prop types so navigation imports from
 * `../screens` rather than deep paths (Requirements 7.2, 7.3). Additional
 * screens (Home, Analytics, LessonDetail) are appended here as they land.
 */

export {
  OnboardingScreen,
  type OnboardingScreenProps,
  type OnboardingNavigation,
} from './OnboardingScreen/OnboardingScreen';

export { HomeScreen, type HomeScreenProps } from './HomeScreen/HomeScreen';

export {
  AnalyticsScreen,
  type AnalyticsScreenProps,
} from './AnalyticsScreen/AnalyticsScreen';

export {
  ProfileScreen,
  type ProfileScreenProps,
} from './ProfileScreen/ProfileScreen';

export {
  LessonDetailScreen,
  type LessonDetailScreenProps,
} from './LessonDetailScreen/LessonDetailScreen';
