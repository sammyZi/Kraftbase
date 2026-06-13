/**
 * LessonDetailScreen — Screen 4 (Figma frame "Lesson detail").
 *
 * Self-contained (markup + styles in this single file), scrollable, with exact
 * Figma fills hardcoded:
 *   - Green hero: back control, the "girl + ABC" illustration, a "Letters"
 *     eyebrow, the "Learn ABC with fun sounds" title, lesson meta chips and an
 *     inset AI-buddy banner with a circular progress ring.
 *   - A vertical stepper timeline: a connected node rail (done → green check,
 *     current → green ring, upcoming → gray ring) beside pastel lesson cards
 *     each with a duration and a state-aware action (Replay / Continue /
 *     Start Lesson).
 *
 * The bottom tab bar is rendered by the navigator on top of this screen, so the
 * scroll content reserves space at the bottom for it.
 */

import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import Svg, { Circle } from 'react-native-svg';

import ABC_ILLUS from '../../assets/images/abc.png';
import ROBO_IMG from '../../assets/images/robo.png';

// --- Exact Figma fills ---
const WHITE = '#FFFFFF';
const BLACK = '#010000';
const GRAY = '#708892';
const NAVY = '#1C274C';
const HERO_GREEN = '#D8E79B';
const NODE_GREEN = '#8FBF3F';
const NODE_GRAY = '#D8DCD2';
const ROBOT_BG = '#3C425F';

const FONT_REGULAR = 'Inter_400Regular';
const FONT_MEDIUM = 'Inter_500Medium';
const FONT_SEMIBOLD = 'Inter_600SemiBold';
const FONT_BOLD = 'Inter_700Bold';

type StepStatus = 'done' | 'current' | 'todo' | 'locked';

interface LessonStepData {
  id: string;
  title: string;
  duration: string;
  desc: string;
  action: string;
  tint: string;
  status: StepStatus;
}

/** A word for each letter, used to build the A–Z lesson list. */
const ALPHABET_WORDS: Record<string, string> = {
  A: 'Apple', B: 'Ball', C: 'Cat', D: 'Dog', E: 'Elephant', F: 'Fish',
  G: 'Goat', H: 'Hat', I: 'Igloo', J: 'Jug', K: 'Kite', L: 'Lion',
  M: 'Monkey', N: 'Nest', O: 'Orange', P: 'Pen', Q: 'Queen', R: 'Rabbit',
  S: 'Sun', T: 'Tiger', U: 'Umbrella', V: 'Van', W: 'Watch', X: 'Xylophone',
  Y: 'Yak', Z: 'Zebra',
};

const STEP_TINTS = ['#ECE6D2', '#F6DAD9', '#D7E7F2', '#E7D9F5'];
const STEP_DURATIONS = ['2 min', '3 min', '5 min', '10 min'];

/** Build the full A–Z lesson timeline: first done, second current, rest to-do. */
const STEPS: LessonStepData[] = Object.entries(ALPHABET_WORDS).map(
  ([letter, word], index) => {
    const status: StepStatus =
      index === 0 ? 'done' : index === 1 ? 'current' : 'todo';
    const action =
      status === 'done' ? 'Replay' : status === 'current' ? 'Continue' : 'Start Lesson';
    return {
      id: letter.toLowerCase(),
      title: `${letter} for ${word}`,
      duration: STEP_DURATIONS[index % STEP_DURATIONS.length],
      desc: `Learn the sound of ${letter} and words that start with ${letter}.`,
      action,
      tint: STEP_TINTS[index % STEP_TINTS.length],
      status,
    };
  },
);

export interface LessonDetailScreenProps {
  /** Identity of the lesson to show. Reserved for future fixture wiring. */
  lessonId?: string;
  /** Back/dismiss handler wired to navigation. */
  onBack?: () => void;
}

export function LessonDetailScreen({
  onBack,
}: LessonDetailScreenProps): React.JSX.Element {
  // The green hero extends up behind the status bar: we drop the SafeAreaView
  // top edge and instead pad the hero down by the status bar inset, so the
  // hero color fills the status bar area while content stays clear of the clock.
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={styles.safe} edges={['left', 'right']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        contentContainerStyle={styles.content}
      >
        {/* Green hero */}
        <View style={[styles.hero, { paddingTop: insets.top + 8 }]}>
          <Image source={ABC_ILLUS} style={styles.heroIllus} resizeMode="contain" />

          <Pressable style={styles.backBtn} onPress={onBack} hitSlop={8}>
            <View style={styles.backBtnBlur}>
              <Ionicons name="arrow-back" size={20} color={NAVY} />
            </View>
          </Pressable>

          <Text style={styles.eyebrow}>Letters</Text>
          <Text style={styles.heroTitle}>Learn ABC with{'\n'}fun sounds</Text>

          <View style={styles.chipRow}>
            <View style={styles.chip}>
              <Ionicons name="book-outline" size={13} color={NAVY} />
              <Text style={styles.chipText}>26 lessons</Text>
            </View>
            <View style={styles.chip}>
              <Ionicons name="time-outline" size={13} color={NAVY} />
              <Text style={styles.chipText}>1hr 30 min</Text>
            </View>
          </View>

          {/* AI buddy banner — real frosted-glass blur */}
          <BlurView intensity={40} tint="light" style={styles.buddy}>
            <View style={styles.robot}>
              <Image source={ROBO_IMG} style={styles.robotImg} resizeMode="contain" />
            </View>
            <View style={styles.buddyText}>
              <Text style={styles.buddyEyebrow}>Your A.I. Buddy</Text>
              <Text style={styles.buddyTitle} numberOfLines={1}>
                You&apos;re learning great today!
              </Text>
            </View>
            <View style={styles.ringContainer}>
              <Svg width={52} height={52} viewBox="0 0 52 52" style={{ position: 'absolute', transform: [{ rotate: '-90deg' }] }}>
                <Circle cx={26} cy={26} r={24} stroke="#F4F4F4" strokeWidth={4} fill="transparent" />
                <Circle cx={26} cy={26} r={24} stroke={NODE_GREEN} strokeWidth={4} fill="transparent" strokeDasharray="18.1 150.8" strokeLinecap="round" />
              </Svg>
              <Text style={styles.ringText}>12%</Text>
            </View>
          </BlurView>
        </View>

        {/* Stepper timeline */}
        <View style={styles.timeline}>
          {STEPS.map((step, index) => {
            const topGreen = index > 0 && STEPS[index - 1].status === 'done';
            const bottomGreen = step.status === 'done';
            const last = index === STEPS.length - 1;
            const locked = step.status === 'locked';
            return (
              <View key={step.id} style={styles.row}>
                {/* Node rail */}
                <View style={styles.rail}>
                  {index > 0 ? (
                    <View
                      style={[
                        styles.connectorTop,
                        { backgroundColor: topGreen ? NODE_GREEN : NODE_GRAY },
                      ]}
                    />
                  ) : null}
                  {!last ? (
                    <View
                      style={[
                        styles.connectorBottom,
                        { backgroundColor: bottomGreen ? NODE_GREEN : NODE_GRAY },
                      ]}
                    />
                  ) : null}
                  <View
                    style={[
                      styles.nodeOuter,
                      step.status === 'done' && styles.nodeOuterDone,
                      (step.status === 'todo' || locked) && styles.nodeOuterTodo,
                    ]}
                  >
                    {step.status === 'current' && (
                      <Svg width={56} height={56} viewBox="0 0 56 56" style={{ position: 'absolute', transform: [{ rotate: '-90deg' }] }}>
                        <Circle cx={28} cy={28} r={26} stroke="#F2F4F5" strokeWidth={4} fill="transparent" />
                        <Circle cx={28} cy={28} r={26} stroke="#7EB127" strokeWidth={4} fill="transparent" strokeDasharray="163.4" strokeDashoffset="40.85" strokeLinecap="round" />
                      </Svg>
                    )}
                    <View
                      style={[
                        styles.nodeInner,
                        step.status === 'done' && styles.nodeInnerDone,
                        step.status === 'current' && styles.nodeInnerCurrent,
                        (step.status === 'todo' || locked) && styles.nodeInnerTodo,
                      ]}
                    >
                      {step.status === 'done' ? (
                        <Ionicons name="checkmark" size={24} color={WHITE} />
                      ) : (
                        <Text style={styles.nodeNum}>{index + 1}</Text>
                      )}
                    </View>
                  </View>
                </View>

                {/* Lesson card */}
                {locked ? (
                  <View style={styles.lockedCard}>
                    <Text style={styles.lockedTitle}>{step.title}</Text>
                    <View style={styles.timeRow}>
                      <Ionicons name="time-outline" size={13} color={GRAY} />
                      <Text style={styles.timeText}>{step.duration}</Text>
                    </View>
                  </View>
                ) : (
                  <View style={[styles.card, { backgroundColor: step.tint }]}>
                    <View style={styles.cardTop}>
                      <Text style={styles.cardTitle}>{step.title}</Text>
                      <View style={styles.timeRow}>
                        <Ionicons name="time-outline" size={13} color={GRAY} />
                        <Text style={styles.timeText}>{step.duration}</Text>
                      </View>
                    </View>
                    <Text style={styles.cardDesc}>{step.desc}</Text>
                    <View style={styles.actionRow}>
                      <View style={styles.actionBtn}>
                        <Text style={styles.actionLabel}>{step.action}</Text>
                        <View style={styles.playCircle}>
                          <Ionicons name="play" size={13} color={WHITE} />
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const NODE_SIZE = 52;
const RAIL_WIDTH = 64;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: WHITE },
  content: { paddingBottom: 130 },

  // Hero
  hero: {
    backgroundColor: HERO_GREEN,
    paddingTop: 8,
    paddingHorizontal: 20,
    paddingBottom: 18,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  heroIllus: {
    position: 'absolute',
    right: -10,
    top: 60,
    width: 200,
    height: 250,
    zIndex: 0,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  backBtnBlur: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyebrow: { fontFamily: FONT_MEDIUM, fontSize: 14, color: '#6E7A52', marginTop: 18 },
  heroTitle: { fontFamily: FONT_SEMIBOLD, fontSize: 23, color: BLACK, marginTop: 4, lineHeight: 34 },

  chipRow: { flexDirection: 'row', gap: 10, marginTop: 18 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 16,
    overflow: 'hidden',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipText: { fontFamily: FONT_MEDIUM, fontSize: 12, color: NAVY },

  buddy: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 24,
    overflow: 'hidden',
    padding: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    // Sit above the illustration so the kid's leg tucks behind this blur card.
    zIndex: 2,
  },
  robot: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  robotImg: { width: 58, height: 58 },
  buddyText: { flex: 1 },
  buddyEyebrow: { fontFamily: FONT_MEDIUM, fontSize: 12, color: 'rgba(28, 39, 76, 0.6)' },
  buddyTitle: { fontFamily: FONT_BOLD, fontSize: 15, color: NAVY, marginTop: 2 },
  ringContainer: {
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: WHITE,
    borderRadius: 26,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  ringText: { fontFamily: FONT_BOLD, fontSize: 13, color: NAVY },

  // Timeline
  timeline: { paddingHorizontal: 20, paddingTop: 18 },
  row: { flexDirection: 'row' },
  rail: { width: RAIL_WIDTH, alignItems: 'center', justifyContent: 'center' },
  connectorTop: {
    position: 'absolute',
    top: 0,
    height: '50%',
    width: 3,
  },
  connectorBottom: {
    position: 'absolute',
    bottom: 0,
    height: '50%',
    width: 3,
  },
  nodeOuter: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: WHITE,
    zIndex: 2,
  },
  nodeOuterDone: { borderWidth: 4, borderColor: '#7EB127' },
  nodeOuterCurrent: { borderWidth: 4, borderColor: '#7EB127' },
  nodeOuterTodo: { borderWidth: 4, borderColor: '#F2F4F5' },

  nodeInner: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeInnerDone: { backgroundColor: '#7EB127' },
  nodeInnerCurrent: { backgroundColor: '#EBF1F5' },
  nodeInnerTodo: { backgroundColor: WHITE },

  nodeNum: { fontFamily: FONT_SEMIBOLD, fontSize: 18, color: BLACK },

  card: {
    flex: 1,
    borderRadius: 28,
    padding: 16,
    marginVertical: 8,
  },
  cardTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardTitle: { fontFamily: FONT_SEMIBOLD, fontSize: 16, color: BLACK, flex: 1 },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  timeText: { fontFamily: FONT_MEDIUM, fontSize: 12, color: GRAY },
  cardDesc: { fontFamily: FONT_REGULAR, fontSize: 13, color: GRAY, marginTop: 8, lineHeight: 18 },
  actionRow: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 14 },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: WHITE,
    borderRadius: 40,
    paddingLeft: 16,
    paddingRight: 5,
    paddingVertical: 5,
  },
  actionLabel: { fontFamily: FONT_SEMIBOLD, fontSize: 13, color: NAVY },
  playCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: NAVY,
    alignItems: 'center',
    justifyContent: 'center',
  },

  lockedCard: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginVertical: 8,
    opacity: 0.45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lockedTitle: { fontFamily: FONT_SEMIBOLD, fontSize: 16, color: BLACK },
});
