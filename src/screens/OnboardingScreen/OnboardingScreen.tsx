/**
 * OnboardingScreen — Screen 1 (Figma frame `1:725`, initial route).
 *
 * The "SmartLearn — Personalized Learning" welcome screen, reproduced with
 * absolute positioning that mirrors the measured Figma coordinates. Every
 * geometry literal is the exact Figma value (x/y/width/height/rotation), scaled
 * by `SF = deviceWidth / 393` so the layout keeps its proportions across screen
 * sizes. Colors are the exact Figma fills (hardcoded below).
 *
 * Layer order matches Figma back-to-front: pink tag → green tag → blue card →
 * blue-card contents → wordmark/book → buttons → star/bulb. The blue card
 * therefore covers the lower half of the green tag (so "Personalized" is never
 * occluded), and the green tag covers the lower half of the pink tag — the
 * layered "sticker" look from the design.
 *
 * Everything for this page (markup + styles) lives in this single file.
 */

import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Bundled illustration assets (exported from the Figma frame).
import BOOK_ICON from '../../assets/images/book_icon.png';
import CHILD_ON_APPLE from '../../assets/images/real-removebg-preview.png';

// --- Scale: map Figma 393-wide frame values to the device width ---
const BASE_WIDTH = 393;
const SCREEN_WIDTH = Dimensions.get('window').width;
const SF = SCREEN_WIDTH / BASE_WIDTH;
const s = (n: number): number => n * SF;

// --- Exact Figma fills / type colors ---
const WHITE = '#FFFFFF';
const PINK = '#F2D1D0'; // "Instant Feedback" tag
const GREEN = '#DFF28A'; // "Fun Games & Activities" tag
const BLUE = '#CADDF7'; // hero card
const PILL = '#71A6EE'; // "Learning" pill
const NAVY = '#1C274C'; // primary / buttons / star
const BLACK = '#010000'; // titles
const BODY = 'rgba(28,39,76,0.5)'; // body copy
const BULB = '#F4B400'; // idea / bulb glyph
const DOT = 'rgba(28,39,76,0.18)'; // inactive page dot

// --- Inter family keys (loaded in App.tsx via @expo-google-fonts/inter) ---
const FONT_REGULAR = 'Inter_400Regular';
const FONT_MEDIUM = 'Inter_500Medium';
const FONT_SEMIBOLD = 'Inter_600SemiBold';
const FONT_BOLD = 'Inter_700Bold';

const STAR_SIZE = s(33);
const BULB_SIZE = s(31);

/** Minimal navigation slice this screen needs. */
export interface OnboardingNavigation {
  navigate: (screen: 'Home') => void;
}

export interface OnboardingScreenProps {
  /** Optional navigation object. */
  navigation?: OnboardingNavigation;
  /** Override for the Sign up action. Defaults to navigating to "Home". */
  onSignUp?: () => void;
  /** Override for the Log in action. Defaults to navigating to "Home". */
  onLogIn?: () => void;
}

export function OnboardingScreen({
  navigation,
  onSignUp,
  onLogIn,
}: OnboardingScreenProps): React.JSX.Element {
  const goHome = (): void => navigation?.navigate('Home');
  const handleSignUp = onSignUp ?? goHome;
  const handleLogIn = onLogIn ?? goHome;

  return (
    <View style={styles.root}>
      {/* Pink tag (back) */}
      <View style={styles.pinkCard}>
        <Text style={styles.cardLabel}>Instant Feedback</Text>
      </View>

      {/* Green tag — covers the lower half of the pink tag */}
      <View style={styles.greenCard}>
        <Text style={styles.cardLabel}>Fun Games &amp; Activities</Text>
      </View>

      {/* Blue hero card — covers the lower half of the green tag */}
      <View style={styles.blueCard} />

      {/* Blue-card contents (in front of the blue card) */}
      <Text style={styles.personalized}>Personalized</Text>
      <View style={styles.learningPill}>
        <Text style={styles.learningLabel}>Learning</Text>
      </View>
      <Text style={styles.body}>
        Lessons adapt to your child&apos;s pace, focusing on what they need
        most.
      </Text>
      <View style={styles.dots}>
        <View style={styles.dotActive} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
      <Image
        source={CHILD_ON_APPLE}
        style={styles.child}
        resizeMode="contain"
        accessibilityRole="image"
        accessibilityLabel="Child sitting on an apple reading"
      />

      {/* Wordmark + book badge */}
      <View style={styles.bookRing}>
        <Image
          source={BOOK_ICON}
          style={styles.bookIcon}
          resizeMode="contain"
          accessibilityRole="image"
          accessibilityLabel="SmartLearn book logo"
        />
      </View>
      <Text style={styles.wordmark}>SmartLearn</Text>

      {/* Actions */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Sign up"
        onPress={handleSignUp}
        style={({ pressed }) =>
          pressed ? [styles.signUp, styles.pressed] : styles.signUp
        }
      >
        <Text style={styles.signUpLabel}>Sign up</Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Log in"
        onPress={handleLogIn}
        style={({ pressed }) =>
          pressed ? [styles.logIn, styles.pressed] : styles.logIn
        }
      >
        <Text style={styles.logInLabel}>Log in</Text>
      </Pressable>

      {/* Decorative glyphs (front) */}
      <Ionicons name="star" size={STAR_SIZE} color={NAVY} style={styles.star} />
      <Ionicons name="bulb" size={BULB_SIZE} color={BULB} style={styles.bulb} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: WHITE,
  },

  // --- Pink "Instant Feedback" tag (Figma 1:729, rotated -7°) ---
  pinkCard: {
    position: 'absolute',
    left: s(118),
    top: s(232),
    width: s(222),
    height: s(96),
    borderRadius: s(20),
    borderWidth: s(6),
    borderColor: WHITE,
    backgroundColor: PINK,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '-7deg' }],
    shadowColor: NAVY,
    shadowOffset: { width: 0, height: s(4) },
    shadowOpacity: 0.08,
    shadowRadius: s(8),
    elevation: 4,
  },

  // --- Green "Fun Games & Activities" tag (Figma 1:731, rotated -7°) ---
  greenCard: {
    position: 'absolute',
    left: s(70),
    top: s(298),
    width: s(286),
    height: s(100),
    borderRadius: s(20),
    borderWidth: s(6),
    borderColor: WHITE,
    backgroundColor: GREEN,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: s(16),
    paddingLeft: s(30),
    transform: [{ rotate: '-7deg' }],
    shadowColor: NAVY,
    shadowOffset: { width: 0, height: s(4) },
    shadowOpacity: 0.08,
    shadowRadius: s(8),
    elevation: 3,
  },

  cardLabel: {
    fontFamily: FONT_MEDIUM,
    fontSize: s(16),
    lineHeight: s(20),
    letterSpacing: -0.176,
    color: BLACK,
  },

  // --- Blue hero card (Figma 1:733, not rotated) ---
  blueCard: {
    position: 'absolute',
    left: s(23),
    top: s(362),
    width: s(349),
    height: s(321),
    borderRadius: s(24),
    borderWidth: s(7),
    borderColor: WHITE,
    backgroundColor: BLUE,
    shadowColor: NAVY,
    shadowOffset: { width: 0, height: s(6) },
    shadowOpacity: 0.08,
    shadowRadius: s(12),
    elevation: 5,
  },

  // --- Blue-card contents ---
  personalized: {
    position: 'absolute',
    left: s(54),
    top: s(388),
    width: s(220),
    fontFamily: FONT_BOLD,
    fontSize: s(28),
    letterSpacing: -0.3,
    lineHeight: s(34),
    color: BLACK,
  },
  learningPill: {
    position: 'absolute',
    left: s(48),
    top: s(428),
    width: s(126),
    height: s(38),
    borderRadius: s(19),
    backgroundColor: PILL,
    alignItems: 'center',
    justifyContent: 'center',
  },
  learningLabel: {
    fontFamily: FONT_BOLD,
    fontSize: s(22),
    letterSpacing: -0.24,
    color: WHITE,
  },
  body: {
    position: 'absolute',
    left: s(54),
    top: s(480),
    width: s(160),
    fontFamily: FONT_REGULAR,
    fontSize: s(13.5),
    letterSpacing: -0.154,
    lineHeight: s(19),
    color: BODY,
  },

  // Page dots (Figma 1:741)
  dots: {
    position: 'absolute',
    left: s(54),
    top: s(610),
    flexDirection: 'row',
    alignItems: 'center',
  },
  dotActive: {
    width: s(24),
    height: s(9),
    borderRadius: s(4.5),
    backgroundColor: NAVY,
    marginRight: s(6),
  },
  dot: {
    width: s(8),
    height: s(8),
    borderRadius: s(4),
    backgroundColor: DOT,
    marginRight: s(6),
  },

  // Child-on-apple illustration (bottom-right of card, clear of the text column).
  child: {
    position: 'absolute',
    left: s(188),
    top: s(460),
    width: s(196),
    height: s(214),
  },

  // --- Wordmark + book badge ---
  wordmark: {
    position: 'absolute',
    top: s(179),
    left: 0,
    right: 0,
    textAlign: 'center',
    fontFamily: FONT_SEMIBOLD,
    fontSize: s(24),
    letterSpacing: -0.264,
    color: BLACK,
  },
  bookRing: {
    position: 'absolute',
    left: s(149),
    top: s(56),
    width: s(96),
    height: s(96),
    borderRadius: s(48),
    borderWidth: s(3),
    borderColor: BLUE,
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: NAVY,
    shadowOffset: { width: 0, height: s(4) },
    shadowOpacity: 0.06,
    shadowRadius: s(8),
    elevation: 2,
  },
  bookIcon: {
    width: s(56),
    height: s(56),
  },

  // --- Actions (Figma 1:762) ---
  signUp: {
    position: 'absolute',
    left: s(34),
    top: s(700),
    width: s(325),
    height: s(56),
    borderRadius: s(28),
    backgroundColor: NAVY,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  signUpLabel: {
    fontFamily: FONT_MEDIUM,
    fontSize: s(16),
    letterSpacing: -0.176,
    color: WHITE,
  },
  logIn: {
    position: 'absolute',
    left: s(34),
    top: s(762),
    width: s(325),
    height: s(56),
    borderRadius: s(28),
    backgroundColor: WHITE,
    borderWidth: s(1.5),
    borderColor: NAVY,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  logInLabel: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: s(14),
    letterSpacing: -0.154,
    color: NAVY,
  },
  pressed: {
    opacity: 0.85,
  },

  // --- Decorative icons (rendered last → on top) ---
  star: {
    position: 'absolute',
    left: s(25),
    top: s(360),
    zIndex: 20,
    transform: [{ rotate: '45deg' }],
  },
  bulb: {
    position: 'absolute',
    left: s(351),
    top: s(239),
    zIndex: 10,
    transform: [{ rotate: '45deg' }],
  },
});
