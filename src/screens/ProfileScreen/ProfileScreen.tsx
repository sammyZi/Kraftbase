/**
 * ProfileScreen — user profile / settings (matches the app's Figma theme).
 *
 * Self-contained (markup + styles in this single file). Designed as a single,
 * non-scrolling screen: every section fits within the viewport above the
 * floating bottom tab bar. Uses the same hardcoded Figma fills and Inter
 * typography as the other screens:
 *   - Header: "Profile" title + a settings button.
 *   - Profile card: avatar, name, a level/role line and an "Edit profile" pill.
 *   - Stats row: three pastel stat tiles (lessons / streak / points).
 *   - "Achievements" badges row (four badges, evenly spaced).
 *   - "Settings" list (notifications toggle, language, help, privacy) and a
 *     log-out button.
 */

import { Image, Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

import AVATAR_IMG from '../../assets/images/profille.png';

// --- Exact Figma fills ---
const WHITE = '#FFFFFF';
const BLACK = '#010000';
const GRAY = '#708892';
const NAVY = '#1C274C';
const TINT_BLUE = '#EAF1F9';
const PURPLE = '#E5CDFF';
const LIME = '#E1F18C';
const PINK = '#F2D1D0';
const CARD_GRAY = '#F5F4F3';
const CHIP_GRAY = '#F4F3F3';
const DANGER = '#E2554E';

const FONT_REGULAR = 'Inter_400Regular';
const FONT_MEDIUM = 'Inter_500Medium';
const FONT_SEMIBOLD = 'Inter_600SemiBold';
const FONT_BOLD = 'Inter_700Bold';

interface Stat {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  tint: string;
}

const STATS: Stat[] = [
  { label: 'Lessons', value: '26', icon: 'book-outline', tint: TINT_BLUE },
  { label: 'Day streak', value: '12', icon: 'flame-outline', tint: LIME },
  { label: 'Points', value: '3822', icon: 'star-outline', tint: PURPLE },
];

interface Achievement {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  tint: string;
  color: string;
}

const ACHIEVEMENTS: Achievement[] = [
  { label: 'First lesson', icon: 'ribbon', tint: PURPLE, color: '#7A4FA3' },
  { label: '7-day streak', icon: 'flame', tint: LIME, color: '#5E7A12' },
  { label: 'Quick learner', icon: 'flash', tint: PINK, color: '#B5564F' },
  { label: 'Explorer', icon: 'compass', tint: TINT_BLUE, color: '#2E6F8E' },
];

interface SettingRow {
  key: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  tint: string;
}

const SETTINGS: SettingRow[] = [
  { key: 'lang', label: 'Language', icon: 'language-outline', tint: TINT_BLUE },
  { key: 'help', label: 'Help & support', icon: 'help-circle-outline', tint: LIME },
];

export interface ProfileScreenProps {
  /** Display name shown on the profile card. Defaults to "Max". */
  userName?: string;
  /** Callback fired when the log out button is tapped. */
  onLogOut?: () => void;
}

export function ProfileScreen({
  userName = 'Max',
  onLogOut,
}: ProfileScreenProps): React.JSX.Element {
  const [notifications, setNotifications] = useState(true);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <Pressable style={styles.iconBtn}>
            <BlurView intensity={40} tint="light" style={styles.blurIconBtn}>
              <Ionicons name="settings-outline" size={20} color={NAVY} />
            </BlurView>
          </Pressable>
        </View>

        {/* Profile card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarRing}>
            <Image source={AVATAR_IMG} style={styles.avatar} />
          </View>
          <View style={styles.profileText}>
            <Text style={styles.name}>{userName}</Text>
            <Text style={styles.role}>Level 4 · Curious Explorer</Text>
          </View>
          <Pressable style={styles.editIconBtn}>
            <BlurView intensity={40} tint="light" style={styles.blurIconBtn}>
              <Ionicons name="pencil" size={18} color={NAVY} />
            </BlurView>
          </Pressable>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {STATS.map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: stat.tint }]}>
                <Ionicons name={stat.icon} size={17} color={NAVY} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Achievements */}
        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.badgeRow}>
          {ACHIEVEMENTS.map((ach) => (
            <View key={ach.label} style={styles.badge}>
              <View style={[styles.badgeIcon, { backgroundColor: ach.tint }]}>
                <Ionicons name={ach.icon} size={20} color={ach.color} />
              </View>
              <Text style={styles.badgeLabel} numberOfLines={1}>
                {ach.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Settings */}
        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.settingsCard}>
          <View style={styles.settingRow}>
            <View style={[styles.settingIcon, { backgroundColor: PINK }]}>
              <Ionicons name="notifications-outline" size={17} color={NAVY} />
            </View>
            <Text style={styles.settingLabel}>Notifications</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#D8DCD2', true: NAVY }}
              thumbColor={WHITE}
            />
          </View>

          {SETTINGS.map((row) => (
            <Pressable key={row.key} style={styles.settingRow}>
              <View style={[styles.settingIcon, { backgroundColor: row.tint }]}>
                <Ionicons name={row.icon} size={17} color={NAVY} />
              </View>
              <Text style={styles.settingLabel}>{row.label}</Text>
              <Ionicons name="chevron-forward" size={18} color={GRAY} />
            </Pressable>
          ))}
        </View>

        {/* Log out */}
        <Pressable style={styles.logout} onPress={onLogOut}>
          <Ionicons name="log-out-outline" size={18} color={DANGER} />
          <Text style={styles.logoutLabel}>Log out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: WHITE },
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 130 },

  // Header
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontFamily: FONT_SEMIBOLD, fontSize: 26, color: BLACK },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    overflow: 'hidden',
    backgroundColor: 'rgba(244, 243, 243, 0.4)',
  },
  blurIconBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Profile card
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: TINT_BLUE,
    borderRadius: 28,
    padding: 14,
    marginTop: 14,
  },
  avatarRing: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: { width: 58, height: 58, borderRadius: 29, backgroundColor: '#C5E2D6' },
  profileText: { flex: 1 },
  name: { fontFamily: FONT_BOLD, fontSize: 20, color: BLACK },
  role: { fontFamily: FONT_REGULAR, fontSize: 12, color: GRAY, marginTop: 2 },
  editIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.4)',
  },

  // Stats
  statsRow: { flexDirection: 'row', gap: 12, marginTop: 12 },
  statCard: {
    flex: 1,
    backgroundColor: CARD_GRAY,
    borderRadius: 22,
    alignItems: 'center',
    paddingVertical: 12,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: { fontFamily: FONT_BOLD, fontSize: 18, color: BLACK, marginTop: 8 },
  statLabel: { fontFamily: FONT_REGULAR, fontSize: 11, color: GRAY, marginTop: 2 },

  // Sections
  sectionTitle: { fontFamily: FONT_SEMIBOLD, fontSize: 17, color: BLACK, marginTop: 16 },

  // Achievements
  badgeRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  badge: { alignItems: 'center', width: 72 },
  badgeIcon: {
    width: 54,
    height: 54,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeLabel: { fontFamily: FONT_MEDIUM, fontSize: 10, color: NAVY, marginTop: 6, textAlign: 'center' },

  // Settings
  settingsCard: {
    backgroundColor: CARD_GRAY,
    borderRadius: 22,
    paddingHorizontal: 14,
    marginTop: 12,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 10,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingLabel: { flex: 1, fontFamily: FONT_MEDIUM, fontSize: 14, color: BLACK },

  // Log out
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FCEBEA',
    borderRadius: 40,
    paddingVertical: 14,
    marginTop: 24,
  },
  logoutLabel: { fontFamily: FONT_SEMIBOLD, fontSize: 15, color: DANGER },
});
