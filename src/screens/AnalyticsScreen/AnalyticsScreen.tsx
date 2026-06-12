/**
 * AnalyticsScreen — Screen 3 (Figma frame "Analytics").
 *
 * Self-contained (markup + styles in this single file), scrollable, with exact
 * Figma fills hardcoded:
 *   - Header: "Analytics" title + notification bell.
 *   - "Your streak" card: streak progress pill, a weekly track with green
 *     completed days and a raised fire marker for the current day, day labels
 *     and an inline tip banner.
 *   - "Skill progress" card: a week selector, category filter tabs
 *     (Letters / Colors / Shapes / Animals) and a weekday bar chart with
 *     diagonally-hatched bars, the current day highlighted as a solid navy pill
 *     with a "+30%" badge.
 *
 * The bottom tab bar is rendered by the navigator on top of this screen, so the
 * scroll content reserves space at the bottom for it.
 */

import { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import ROBO_IMG from '../../assets/images/robo.png';

// --- Exact Figma fills ---
const WHITE = '#FFFFFF';
const BLACK = '#010000';
const GRAY = '#708892';
const NAVY = '#1C274C';
const TINT_BLUE = '#EAF1F9';
const CARD_GRAY = '#F5F4F3';
const GREEN = '#DFF28A';
const GREEN_TICK = '#A9CC72';
const TRACK_GRAY = '#E7E7E5';
const HATCH_LINE = 'rgba(28,39,76,0.45)';
const HATCH_BG = 'rgba(28,39,76,0.04)';
const BADGE_GRAY = '#9AA3BE';
const BELL_DOT = '#F26D6D';

const FONT_REGULAR = 'Inter_400Regular';
const FONT_MEDIUM = 'Inter_500Medium';
const FONT_SEMIBOLD = 'Inter_600SemiBold';
const FONT_BOLD = 'Inter_700Bold';

const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
// Days completed in the current streak; the next day shows the fire marker.
const COMPLETED = 3; // Mon, Tue, Wed done -> Thu is current (fire)

const CATEGORIES = ['Letters', 'Colors', 'Shapes', 'Animals'] as const;
type Category = (typeof CATEGORIES)[number];

interface DayBar {
  label: string;
  height: number;
  active?: boolean;
  badge?: string;
}

const BAR_WIDTH = 30;
const CHART_HEIGHT = 210;
const BARS: DayBar[] = [
  { label: 'Mon', height: 118 },
  { label: 'Tue', height: 158 },
  { label: 'Wed', height: 140 },
  { label: 'Thu', height: 200, active: true, badge: '+30%' },
  { label: 'Fri', height: 108 },
  { label: 'Sat', height: 72 },
  { label: 'Sun', height: 128 },
];

/** Diagonal hatch fill rendered with rotated thin lines (no image asset). */
function Hatch({ height }: { height: number }): React.JSX.Element {
  const spacing = 8;
  const lineLength = (BAR_WIDTH + height) * 2;
  const count = Math.ceil((BAR_WIDTH + height) / spacing) + 2;
  const top = (height - lineLength) / 2;
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <View
          key={i}
          style={{
            position: 'absolute',
            top,
            left: i * spacing - height / 2,
            width: 1.5,
            height: lineLength,
            backgroundColor: HATCH_LINE,
            transform: [{ rotate: '45deg' }],
          }}
        />
      ))}
    </>
  );
}

export interface AnalyticsScreenProps {
  /** Key of the week shown initially. Reserved for future wiring. */
  initialWeekKey?: string;
}

export function AnalyticsScreen(_props: AnalyticsScreenProps = {}): React.JSX.Element {
  const [category, setCategory] = useState<Category>('Letters');

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Analytics</Text>
          <View style={styles.bell}>
            <Ionicons name="notifications" size={20} color={NAVY} />
            <View style={styles.bellDot} />
          </View>
        </View>

        {/* Your streak */}
        <View style={styles.streakCard}>
          <View style={styles.streakTop}>
            <Text style={styles.streakTitle}>Your streak</Text>
            <View style={styles.streakPill}>
              <Text style={styles.streakValue}>3822</Text>
              <Text style={styles.streakGoal}>/5000</Text>
            </View>
          </View>

          <View style={styles.track}>
            {WEEK_DAYS.map((day, index) => {
              const done = index < COMPLETED;
              const isCurrent = index === COMPLETED;
              if (isCurrent) {
                return (
                  <View key={day} style={styles.trackCellCurrent}>
                    <View style={styles.trackCellUnderlay}>
                      <View style={styles.trackCellUnderlayLeft} />
                      <View style={styles.trackCellUnderlayRight} />
                    </View>
                    <View style={styles.fireMarker}>
                      <Text style={styles.fireEmoji}>🔥</Text>
                    </View>
                  </View>
                );
              }
              return (
                <View
                  key={day}
                  style={[
                    styles.trackCell,
                    done ? styles.trackCellDone : styles.trackCellTodo,
                    index === 0 && { borderTopLeftRadius: 17, borderBottomLeftRadius: 17 },
                    index === WEEK_DAYS.length - 1 && { borderTopRightRadius: 17, borderBottomRightRadius: 17 },
                  ]}
                >
                  <View style={done ? styles.tickDone : styles.tickTodo} />
                </View>
              );
            })}
          </View>

          <View style={styles.dayRow}>
            {WEEK_DAYS.map((day, index) => {
              const isCurrent = index === COMPLETED;
              const isPast = index < COMPLETED;
              return (
                <Text
                  key={day}
                  style={isCurrent ? styles.dayLabelCurrent : (isPast ? styles.dayLabelActive : styles.dayLabel)}
                >
                  {day}
                </Text>
              );
            })}
          </View>

          {/* Inline tip banner */}
          <View style={styles.tip}>
            <View style={styles.tipIcon}>
              <Image source={ROBO_IMG} style={styles.tipRobo} resizeMode="contain" />
            </View>
            <Text style={styles.tipText} numberOfLines={1}>
              You learn best with 5-min lessons.
            </Text>
            <Pressable hitSlop={8}>
              <Ionicons name="close" size={18} color={BLACK} />
            </Pressable>
          </View>
        </View>

        {/* Skill progress */}
        <View style={styles.skillCard}>
          <View style={styles.skillTop}>
            <Text style={styles.skillTitle}>Skill progress</Text>
            <Pressable style={styles.weekPill}>
              <Text style={styles.weekLabel}>This Week</Text>
              <Ionicons name="chevron-down" size={13} color={NAVY} />
            </Pressable>
          </View>
          <Text style={styles.skillSubtitle}>Avg improvement this week</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.catRow}
          >
            {CATEGORIES.map((cat) => {
              const active = cat === category;
              return (
                <Pressable
                  key={cat}
                  onPress={() => setCategory(cat)}
                  style={active ? [styles.catTab, styles.catTabActive] : styles.catTab}
                >
                  <Text style={active ? [styles.catLabel, styles.catLabelActive] : styles.catLabel}>
                    {cat}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          {/* Bar chart */}
          <View style={styles.chart}>
            {BARS.map((bar) => (
              <View key={bar.label} style={styles.barColumn}>
                <View style={styles.barArea}>
                  {bar.badge ? (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{bar.badge}</Text>
                    </View>
                  ) : null}
                  <View
                    style={[
                      styles.bar,
                      { height: bar.height },
                      bar.active ? styles.barActive : styles.barHatchBg,
                    ]}
                  >
                    {!bar.active ? <Hatch height={bar.height} /> : null}
                  </View>
                </View>
                <Text style={bar.active ? styles.barLabelActive : styles.barLabel}>
                  {bar.label}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: WHITE },
  content: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 130, gap: 22 },

  // Header
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontFamily: FONT_SEMIBOLD, fontSize: 28, color: BLACK },
  bell: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F4F3F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellDot: {
    position: 'absolute',
    top: 11,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: BELL_DOT,
  },

  // Your streak card
  streakCard: {
    backgroundColor: CARD_GRAY,
    borderRadius: 28,
    padding: 18,
  },
  streakTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  streakTitle: { fontFamily: FONT_BOLD, fontSize: 19, color: BLACK },
  streakPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WHITE,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  streakValue: { fontFamily: FONT_BOLD, fontSize: 13, color: BLACK },
  streakGoal: { fontFamily: FONT_MEDIUM, fontSize: 13, color: GRAY },

  track: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    height: 34,
    gap: 0,
  },
  trackCell: {
    flex: 1,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackCellCurrent: { flex: 1, height: 34, alignItems: 'center', justifyContent: 'center', zIndex: 2 },
  trackCellUnderlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
  },
  trackCellUnderlayLeft: { flex: 1, backgroundColor: GREEN },
  trackCellUnderlayRight: { flex: 1, backgroundColor: WHITE },
  trackCellDone: { backgroundColor: GREEN },
  trackCellTodo: { backgroundColor: WHITE },
  tickDone: { width: 1.5, height: 12, backgroundColor: '#4B7B2E', borderRadius: 1 }, // Darker green for contrast
  tickTodo: { width: 1.5, height: 12, backgroundColor: '#E2E2E2', borderRadius: 1 }, // Very light grey
  fireMarker: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.14,
    shadowRadius: 6,
    elevation: 5,
  },
  fireEmoji: { fontSize: 19 },

  dayRow: { flexDirection: 'row', marginTop: 10, gap: 0 },
  dayLabel: { flex: 1, textAlign: 'center', fontFamily: FONT_MEDIUM, fontSize: 12, color: '#A0AABF' },
  dayLabelActive: { flex: 1, textAlign: 'center', fontFamily: FONT_SEMIBOLD, fontSize: 12, color: BLACK },
  dayLabelCurrent: { flex: 1, textAlign: 'center', fontFamily: FONT_SEMIBOLD, fontSize: 12, color: '#71A6EE' },

  tip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: WHITE,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginTop: 18,
  },
  tipIcon: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipRobo: { width: 40, height: 40 },
  tipText: { flex: 1, fontFamily: FONT_MEDIUM, fontSize: 11, color: BLACK },

  // Skill progress card
  skillCard: {
    backgroundColor: TINT_BLUE,
    borderRadius: 28,
    padding: 20,
  },
  skillTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  skillTitle: { fontFamily: FONT_SEMIBOLD, fontSize: 24, color: BLACK },
  weekPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#DCECF5',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  weekLabel: { fontFamily: FONT_MEDIUM, fontSize: 11, color: NAVY },
  skillSubtitle: { fontFamily: FONT_REGULAR, fontSize: 13, color: GRAY, marginTop: 4 },

  catRow: { gap: 8, paddingTop: 18, paddingRight: 10 },
  catTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 40,
    backgroundColor: TINT_BLUE,
    borderWidth: 1,
    borderColor: 'rgba(28,39,76,0.12)',
  },
  catTabActive: { backgroundColor: NAVY, borderColor: NAVY },
  catLabel: { fontFamily: FONT_MEDIUM, fontSize: 13, color: NAVY },
  catLabelActive: { color: WHITE },

  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 26,
  },
  barColumn: { flex: 1, alignItems: 'center' },
  barArea: { height: CHART_HEIGHT, justifyContent: 'flex-end', alignItems: 'center' },
  bar: { width: BAR_WIDTH, borderRadius: BAR_WIDTH / 2, overflow: 'hidden' },
  barHatchBg: { backgroundColor: HATCH_BG },
  barActive: { backgroundColor: NAVY },
  badge: {
    position: 'absolute',
    top: -22,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: BADGE_GRAY,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  badgeText: { fontFamily: FONT_SEMIBOLD, fontSize: 10, color: WHITE },
  barLabel: { fontFamily: FONT_MEDIUM, fontSize: 12, color: GRAY, marginTop: 12 },
  barLabelActive: { fontFamily: FONT_SEMIBOLD, fontSize: 12, color: BLACK, marginTop: 12 },
});
