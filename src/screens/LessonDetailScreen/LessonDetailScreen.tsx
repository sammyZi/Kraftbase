/**
 * LessonDetailScreen — Screen 4 (Figma frame "Lesson detail").
 *
 * The "Learn ABC with fun sounds" lesson-detail view. Composition follows the
 * Figma frame ordering (Req 3.1, 3.2) with the text content from the design
 * (Req 3.4):
 *   - Header: lesson title + a back control (`Header`, Req 2.3), with the lesson
 *     meta ("26 lessons", "30 min") rendered as chips beneath it.
 *   - An AI buddy banner (`BannerCard`).
 *   - A vertical stepper / timeline of lessons (A for Apple, B for Ball, …),
 *     each rendered as a `LessonStep` whose `status` selects the per-step action
 *     (done → Replay, in-progress → Continue, start → Start Lesson, locked → none)
 *     so every defined interactive state is reachable (Req 6.3, 6.4).
 *
 * The screen reads a `lessonId` param (design "Screen 4" /
 * `RootStackParamList.LessonDetail: { lessonId: string }`) and uses it to select
 * the fixture lesson via `getLessonDetail`; the derived data is memoized
 * (`useMemo`) following the Home/Analytics pattern.
 *
 * The screen is scrollable so content taller than the viewport stays reachable
 * (Req 3.3). All styling flows through `makeStyles(theme)`; there are no inline
 * style object literals (Req 8.1, 8.2) and every visual value comes from the
 * theme tokens.
 *
 * Navigation wiring is task 9: the back control invokes the optional `onBack`
 * callback rather than importing the navigator directly.
 */

import { useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  Avatar,
  BannerCard,
  Header,
  LessonStep,
  type CardTint,
} from '../../components';
import { useTheme } from '../../theme';

import { makeStyles } from './LessonDetailScreen.styles';
import { getLessonDetail } from './lessonDetailFixtures';

/** Rotating pastel tints applied to consecutive timeline steps for variety. */
const STEP_TINTS: CardTint[] = ['blue', 'purple', 'pink', 'accent'];

export interface LessonDetailScreenProps {
  /** Identity of the lesson to show; selects the fixture. Wired via the route param in task 9. */
  lessonId?: string;
  /** Back/dismiss handler; wired to navigation in task 9. */
  onBack?: () => void;
}

export function LessonDetailScreen({
  lessonId,
  onBack,
}: LessonDetailScreenProps): React.JSX.Element {
  const theme = useTheme();
  const styles = makeStyles(theme);

  // Select the lesson-detail fixture for the param; falls back to the first.
  const lesson = useMemo(() => getLessonDetail(lessonId), [lessonId]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header: lesson title + back control (Req 2.3) */}
        <Header title={lesson.title} onBack={onBack} />

        {/* Lesson meta chips ("26 lessons", "30 min") */}
        <View style={styles.metaRow}>
          {lesson.meta.map((chip) => (
            <View key={chip} style={styles.metaChip}>
              <Text style={styles.metaText}>{chip}</Text>
            </View>
          ))}
        </View>

        {/* AI buddy banner */}
        <BannerCard
          title="Your AI buddy"
          message={lesson.buddyMessage}
          tint="blue"
          right={<Avatar name="AI" accessibilityLabel="AI buddy" />}
        />

        {/* Vertical stepper / timeline of lessons (Req 6.3, 6.4) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lessons</Text>
          <View style={styles.timeline}>
            {lesson.steps.map((step, index) => (
              <LessonStep
                key={step.id}
                label={step.label}
                duration={step.duration}
                status={step.status}
                tint={STEP_TINTS[index % STEP_TINTS.length]}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
