/**
 * AnalyticsScreen — Screen 3 (Figma frame "Analytics").
 *
 * The progress / stats screen. Composition follows the Figma frame ordering
 * (Req 3.1, 3.2) with the text content from the design (Req 3.4):
 *   - "Your streak" weekly tracker (`StreakTracker`).
 *   - A tip banner (`BannerCard`).
 *   - "Skill progress" bar chart (`BarChart`) with category filters
 *     (Letters / Colors / Shapes / Animals, plus "All") and a week selector,
 *     both rendered as reusable `CategoryTabs`.
 *
 * The screen is scrollable so content taller than the viewport stays reachable
 * (Req 3.3). The streak row and bar chart are driven by local fixture data
 * (`analyticsFixtures`) selected through `useMemo`; the week selector and
 * category filter are local `useState`. Selecting the empty "Next week" (or a
 * filter that yields no data) drives the Empty_State via `StateAwareList`, while
 * weeks with data drive the Filled_State (Req 6.1, 6.2).
 *
 * All styling flows through `makeStyles(theme)`; there are no inline style
 * object literals (Req 8.1, 8.2) and every visual value comes from the theme
 * tokens (Req 8.3).
 */

import { useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  Avatar,
  BannerCard,
  BarChart,
  CategoryTabs,
  EmptyState,
  StreakTracker,
  type BarChartDatum,
  type CategoryTabItem,
} from '../../components';
import { useTheme } from '../../theme';

import { makeStyles } from './AnalyticsScreen.styles';
import {
  analyticsWeeks,
  skillCategoryLabels,
  type AnalyticsWeek,
  type SkillCategory,
} from './analyticsFixtures';

/** Category-filter key: the literal skill categories plus the "all" pass-through. */
type SkillFilterKey = 'all' | SkillCategory;

export interface AnalyticsScreenProps {
  /** Key of the week shown initially. Defaults to the first fixture week. */
  initialWeekKey?: string;
}

export function AnalyticsScreen({
  initialWeekKey,
}: AnalyticsScreenProps): React.JSX.Element {
  const theme = useTheme();
  const styles = makeStyles(theme);

  const [selectedWeekKey, setSelectedWeekKey] = useState<string>(
    initialWeekKey ?? analyticsWeeks[0].key,
  );
  const [selectedCategory, setSelectedCategory] = useState<SkillFilterKey>('all');

  // Week selector tabs derived from the fixtures (This week / Last week / …).
  const weekTabs = useMemo<CategoryTabItem[]>(
    () => analyticsWeeks.map((week) => ({ key: week.key, label: week.label })),
    [],
  );

  // The active week's data; falls back to the first week if the key is unknown.
  const activeWeek = useMemo<AnalyticsWeek>(
    () =>
      analyticsWeeks.find((week) => week.key === selectedWeekKey) ??
      analyticsWeeks[0],
    [selectedWeekKey],
  );

  // Category-filter tabs: "All" plus the four skill categories.
  const categoryTabs = useMemo<CategoryTabItem[]>(
    () => [
      { key: 'all', label: 'All' },
      { key: 'letters', label: skillCategoryLabels.letters },
      { key: 'colors', label: skillCategoryLabels.colors },
      { key: 'shapes', label: skillCategoryLabels.shapes },
      { key: 'animals', label: skillCategoryLabels.animals },
    ],
    [],
  );

  // Filtered chart data drives the Filled_State; an empty result (an empty week
  // or a filter with no match) drives the Empty_State (Req 6.1, 6.2).
  const chartData = useMemo<BarChartDatum[]>(() => {
    const skills =
      selectedCategory === 'all'
        ? activeWeek.skills
        : activeWeek.skills.filter((skill) => skill.category === selectedCategory);
    return skills.map((skill) => ({ label: skill.label, value: skill.value }));
  }, [activeWeek, selectedCategory]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.screenTitle}>Analytics</Text>

        {/* Your streak */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your streak</Text>
          <StreakTracker days={activeWeek.streak} />
        </View>

        {/* Tip banner */}
        <BannerCard
          title="Daily tip"
          message="Practice a little every day to keep your streak alive!"
          tint="purple"
          right={<Avatar name="Tip" accessibilityLabel="Daily tip" />}
        />

        {/* Skill progress */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skill progress</Text>

          <CategoryTabs
            items={weekTabs}
            selectedKey={selectedWeekKey}
            onSelect={setSelectedWeekKey}
          />

          <CategoryTabs
            items={categoryTabs}
            selectedKey={selectedCategory}
            onSelect={(key) => setSelectedCategory(key as SkillFilterKey)}
          />

          {/* Filled_State: bar chart when the week/filter has data; otherwise the
              Empty_State placeholder (Req 6.1, 6.2). */}
          {chartData.length > 0 ? (
            <BarChart data={chartData} />
          ) : (
            <EmptyState
              title="No progress yet"
              message="Complete a lesson this week to see your skill progress."
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
