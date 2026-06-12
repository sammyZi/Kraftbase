/**
 * Components barrel — single import surface for reusable UI primitives.
 *
 * Re-exports each prop-driven component and its public prop/variant types so
 * screens import from `../../components` rather than deep paths
 * (Requirements 7.1, 7.2, 7.4).
 */

// Primitives
export { Button, type ButtonProps, type ButtonVariant } from './Button/Button';
export { Input, type InputProps } from './Input/Input';
export { Card, type CardProps, type CardTint } from './Card/Card';
export { Avatar, type AvatarProps } from './Avatar/Avatar';

// Composition / list primitives
export { ListItem, type ListItemProps } from './ListItem/ListItem';
export { Header, type HeaderProps } from './Header/Header';
export { EmptyState, type EmptyStateProps } from './EmptyState/EmptyState';
export { ErrorBoundary, type ErrorBoundaryProps } from './ErrorBoundary/ErrorBoundary';

// Home cards
export { LessonCard, type LessonCardProps } from './LessonCard/LessonCard';
export { ProgressCard, type ProgressCardProps } from './ProgressCard/ProgressCard';
export { BannerCard, type BannerCardProps } from './BannerCard/BannerCard';

// Domain-specific components
export {
  StreakTracker,
  type StreakTrackerProps,
  type StreakDay,
} from './StreakTracker/StreakTracker';
export {
  BarChart,
  type BarChartProps,
  type BarChartDatum,
} from './BarChart/BarChart';
export {
  LessonStep,
  type LessonStepProps,
  type LessonStepStatus,
} from './LessonStep/LessonStep';

// Domain-specific navigation / filter components
export {
  TabBar,
  type TabBarProps,
  type TabBarItem,
  type TabBarIconName,
} from './TabBar/TabBar';
export {
  CategoryTabs,
  type CategoryTabsProps,
  type CategoryTabItem,
} from './CategoryTabs/CategoryTabs';
export {
  StateAwareList,
  type StateAwareListProps,
} from './StateAwareList/StateAwareList';
