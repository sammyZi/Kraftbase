/**
 * HomeScreen — Screen 2 (Figma frame "Home").
 *
 * The "Hello Max / Good Morning" dashboard. Self-contained (markup + styles in
 * this single file), scrollable, with exact Figma fills hardcoded:
 *   - Header: avatar, "Hello Max 👋" eyebrow + "Good Morning", a language
 *     selector pill and a notification bell.
 *   - "Your A.i buddy" banner + inset "Today's pick: Shapes" progress row.
 *   - "Let's learn" section: horizontally scrollable category tabs
 *     (All / Letters / Colors) and lesson cards (Colors / Letters) driven by the
 *     local fixtures.
 *
 * The bottom tab bar is rendered by the navigator on top of this screen, so the
 * scroll content reserves space at the bottom for it.
 */

import { useMemo, useState } from 'react';
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
import { BlurView } from 'expo-blur';

import AVATAR_IMG from '../../assets/images/book_icon.png';
import BUDDY_ILLUS from '../../assets/images/girl-pencil.png';
import ROBO_IMG from '../../assets/images/robo.png';
import LESSON_ILLUS from '../../assets/images/real-removebg-preview.png';

import { homeLessons, type HomeLesson } from './homeFixtures';

// --- Exact Figma fills ---
const WHITE = '#FFFFFF';
const BLACK = '#010000';
const GRAY = '#708892';
const NAVY = '#1C274C';
const TINT_BLUE = '#EAF1F9';
const PURPLE = '#E5CDFF';
const LIME = '#E1F18C';
const TEAL = '#073647';
const CHIP_GRAY = '#F4F3F3';
const ROBOT_BG = '#3C425F';
const BELL_DOT = '#F26D6D';

const FONT_REGULAR = 'Inter_400Regular';
const FONT_MEDIUM = 'Inter_500Medium';
const FONT_SEMIBOLD = 'Inter_600SemiBold';
const FONT_BOLD = 'Inter_700Bold';

type HomeFilterKey = 'all' | HomeLesson['category'];

interface CategoryTab {
  key: HomeFilterKey;
  label: string;
  count: string;
  icon?: keyof typeof Ionicons.glyphMap;
  prefix?: string;
}

/** Map a lesson tint to its card background + category-label color. */
const TINT: Record<string, { bg: string; label: string }> = {
  purple: { bg: PURPLE, label: '#9881B3' },
  accent: { bg: LIME, label: TEAL },
  blue: { bg: TINT_BLUE, label: TEAL },
  pink: { bg: '#F2D1D0', label: TEAL },
};

export interface HomeScreenProps {
  /** Display name shown in the greeting. Defaults to "Max". */
  userName?: string;
  /** Invoked with the tapped lesson's id; wired to navigation by the navigator. */
  onOpenLesson?: (lessonId: string) => void;
}

export function HomeScreen({
  userName = 'Max',
  onOpenLesson,
}: HomeScreenProps): React.JSX.Element {
  const [selected, setSelected] = useState<HomeFilterKey>('all');

  const tabs = useMemo<CategoryTab[]>(() => {
    const letters = homeLessons.filter((l) => l.category === 'letters').length;
    const colors = homeLessons.filter((l) => l.category === 'colors').length;
    const pad = (n: number): string => n.toString().padStart(2, '0');
    return [
      { key: 'all', label: 'All', count: pad(homeLessons.length) },
      { key: 'letters', label: 'Letters', count: pad(letters), prefix: 'Aa' },
      { key: 'colors', label: 'Colors', count: pad(colors), icon: 'color-palette-outline' },
    ];
  }, []);

  const lessons = useMemo<HomeLesson[]>(
    () =>
      selected === 'all'
        ? homeLessons
        : homeLessons.filter((l) => l.category === selected),
    [selected],
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <Image source={AVATAR_IMG} style={styles.avatarImage} />
          <View style={styles.greeting}>
            <Text style={styles.hello}>Hello {userName} 👋</Text>
            <Text style={styles.morning} numberOfLines={1}>Good Morning</Text>
          </View>
          <View style={styles.headerRight}>
            <Pressable style={styles.langPill}>
              <Text style={styles.flag}>🇬🇧</Text>
              <Text style={styles.langLabel}>English</Text>
              <Ionicons name="chevron-down" size={14} color={NAVY} />
            </Pressable>
            <View style={styles.bell}>
              <Ionicons name="notifications" size={20} color={NAVY} />
              <View style={styles.bellDot} />
            </View>
          </View>
        </View>

        {/* AI buddy + Today's pick card */}
        <View style={styles.buddyCard}>
          <View style={styles.buddyRow}>
            <View style={styles.robot}>
              <Image source={ROBO_IMG} style={styles.robotImg} resizeMode="contain" />
            </View>
            <View style={styles.buddyText}>
              <Text style={styles.buddyEyebrow}>Your A.i buddy</Text>
              <Text style={styles.buddyTitle} numberOfLines={1}>You&apos;re learning great today!</Text>
            </View>
          </View>
          
          <Image source={BUDDY_ILLUS} style={styles.buddyIllus} resizeMode="contain" />


          <View style={styles.pickCard}>
            <View style={styles.pickLeft}>
              <Text style={styles.pickTitle}>Today&apos;s pick: Shapes</Text>
              <View style={styles.pickMetaRow}>
                <Ionicons name="book-outline" size={13} color={GRAY} />
                <Text style={styles.pickMeta}>12 lessons</Text>
                <Text style={styles.pickDot}>·</Text>
                <Ionicons name="time-outline" size={13} color={GRAY} />
                <Text style={styles.pickMeta}>10 min</Text>
              </View>
            </View>
            <Text style={styles.pickPercent}>
              20% <Text style={styles.pickPercentMuted}>complete</Text>
            </Text>
            <View style={styles.playBtnRing}>
              <View style={styles.playBtn}>
                <Ionicons name="play" size={16} color={NAVY} />
              </View>
            </View>
          </View>
        </View>

        {/* Let's learn */}
        <Text style={styles.sectionTitle}>Let&apos;s learn</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          overScrollMode="never"
          contentContainerStyle={styles.tabsRow}
        >
          {tabs.map((tab) => {
            const active = tab.key === selected;
            return (
              <Pressable
                key={tab.key}
                onPress={() => setSelected(tab.key)}
                style={active ? [styles.tab, styles.tabActive] : styles.tab}
              >
                {tab.prefix ? (
                  <Text style={active ? [styles.tabPrefixText, styles.tabPrefixTextActive] : styles.tabPrefixText}>
                    {tab.prefix}
                  </Text>
                ) : null}
                {tab.icon !== undefined ? (
                  <Ionicons
                    name={tab.icon}
                    size={16}
                    color={active ? WHITE : NAVY}
                  />
                ) : null}
                <Text style={active ? [styles.tabLabel, styles.tabLabelActive] : styles.tabLabel}>
                  {tab.label}
                </Text>
                <View style={active ? [styles.tabCount, styles.tabCountActive] : styles.tabCount}>
                  <Text style={active ? [styles.tabCountText, styles.tabCountTextActive] : styles.tabCountText}>
                    {tab.count}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          overScrollMode="never"
          contentContainerStyle={styles.cardsRow}
        >
          {lessons.map((lesson) => {
            const tint = TINT[lesson.tint] ?? TINT.blue;
            return (
              <Pressable
                key={lesson.id}
                onPress={
                  onOpenLesson !== undefined
                    ? () => onOpenLesson(lesson.id)
                    : undefined
                }
                style={[styles.lessonCard, { backgroundColor: tint.bg }]}
              >
                <View style={styles.lessonTop}>
                  <View style={styles.lessonIcon}>
                    <Ionicons name="color-palette-outline" size={18} color={NAVY} />
                  </View>
                  <View style={styles.lessonChips}>
                    {lesson.meta.map((m) => (
                      <View key={m} style={styles.lessonChip}>
                        <Text style={styles.lessonChipText}>{m}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <Text style={[styles.lessonCategory, { color: tint.label }]}>
                  {lesson.categoryLabel}
                </Text>
                <Text style={styles.lessonTitle}>{lesson.title}</Text>

                <Image source={LESSON_ILLUS} style={styles.lessonIllus} resizeMode="contain" />

                <BlurView intensity={40} tint="light" style={styles.startRow}>
                  <Text style={styles.startLabel}>Start learning</Text>
                  <View style={styles.startPlay}>
                    <Ionicons name="play" size={14} color={NAVY} />
                  </View>
                </BlurView>
              </Pressable>
            );
          })}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: WHITE },
  content: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 130 },

  // Header
  header: { flexDirection: 'row', alignItems: 'center' },
  avatarImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#C5E2D6', // Fallback color
  },
  greeting: { flex: 1, marginLeft: 12 },
  hello: { fontFamily: FONT_REGULAR, fontSize: 13, color: GRAY },
  morning: { fontFamily: FONT_SEMIBOLD, fontSize: 14, color: BLACK, marginTop: 2 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  langPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 24,
    backgroundColor: CHIP_GRAY,
  },
  flag: { fontSize: 10 },
  langLabel: { fontFamily: FONT_MEDIUM, fontSize: 12, color: NAVY },
  bell: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: CHIP_GRAY,
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

  // AI buddy card
  buddyCard: {
    marginTop: 22,
    borderRadius: 28,
    backgroundColor: TINT_BLUE,
    paddingTop: 16,
    paddingHorizontal: 6,
    paddingBottom: 6,
  },
  buddyRow: { flexDirection: 'row', alignItems: 'center', zIndex: 2, width: '78%' },
  robot: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  robotImg: { width: 54, height: 54 },
  buddyText: { flex: 1, marginLeft: 12 },
  buddyEyebrow: { fontFamily: FONT_REGULAR, fontSize: 10, color: GRAY },
  buddyTitle: { fontFamily: FONT_SEMIBOLD, fontSize: 12, color: BLACK, marginTop: 2 },
  buddyIllus: {
    position: 'absolute',
    right: -20,
    top: -13,
    width: 130,
    height: 110,
    zIndex: 1,
  },
  buddyBulb: {
    position: 'absolute',
    right: 10,
    top: 50,
    zIndex: 2,
    transform: [{ rotate: '45deg' }],
  },

  pickCard: {
    marginTop: 14,
    borderRadius: 30,
    backgroundColor: WHITE,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  },
  pickLeft: { flex: 1 },
  pickTitle: { fontFamily: FONT_SEMIBOLD, fontSize: 15, color: BLACK },
  pickMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  pickMeta: { fontFamily: FONT_REGULAR, fontSize: 12, color: GRAY },
  pickDot: { color: GRAY, marginHorizontal: 2 },
  pickPercent: { fontFamily: FONT_SEMIBOLD, fontSize: 13, color: BLACK, marginRight: 10 },
  pickPercentMuted: { fontFamily: FONT_REGULAR, color: GRAY },
  playBtnRing: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: NAVY,
    borderLeftColor: 'rgba(28, 39, 76, 0.1)', // Simulate progress
    borderTopColor: 'rgba(28, 39, 76, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Section
  sectionTitle: { fontFamily: FONT_BOLD, fontSize: 24, color: BLACK, marginTop: 24 },

  // Category tabs
  tabsRow: { gap: 10, paddingTop: 16, paddingRight: 20 },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
    backgroundColor: WHITE,
  },
  tabActive: { backgroundColor: NAVY, borderColor: NAVY },
  tabPrefixText: { fontFamily: FONT_BOLD, fontSize: 12, color: NAVY },
  tabPrefixTextActive: { color: WHITE },
  tabLabel: { fontFamily: FONT_MEDIUM, fontSize: 12, color: NAVY },
  tabLabelActive: { color: WHITE },
  tabCount: {
    minWidth: 24,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    backgroundColor: CHIP_GRAY,
    alignItems: 'center',
  },
  tabCountActive: { backgroundColor: WHITE },
  tabCountText: { fontFamily: FONT_SEMIBOLD, fontSize: 11, color: GRAY },
  tabCountTextActive: { color: NAVY },

  // Lesson cards
  cardsRow: { gap: 16, paddingTop: 16, paddingRight: 20 },
  lessonCard: {
    width: 280,
    borderRadius: 28,
    padding: 18,
    minHeight: 300,
  },
  lessonTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  lessonIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lessonChips: { flexDirection: 'row', gap: 6 },
  lessonChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  lessonChipText: { fontFamily: FONT_MEDIUM, fontSize: 11, color: NAVY },
  lessonCategory: { fontFamily: FONT_MEDIUM, fontSize: 14, marginTop: 20 },
  lessonTitle: { fontFamily: FONT_BOLD, fontSize: 24, color: BLACK, marginTop: 4, lineHeight: 30, maxWidth: '75%', zIndex: 2 },
  lessonIllus: {
    position: 'absolute',
    right: 0,
    bottom: 60,
    width: 140,
    height: 140,
    zIndex: 1,
  },
  startRow: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 40,
    overflow: 'hidden',
    paddingLeft: 20,
    paddingRight: 6,
    paddingVertical: 13,
    zIndex: 3,
  },
  startLabel: { fontFamily: FONT_SEMIBOLD, fontSize: 16, color: TEAL },
  startPlay: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
