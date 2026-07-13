import Typo from '@/src/shared/components/Typo';
import { light, palette, radius, spacingX, spacingY } from '@/src/constants/theme';
import { verticalScale, scale } from '@/src/shared/utils/styling';
import * as Icon from 'phosphor-react-native';
import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const STATS = [
  { label: 'Projects', value: '4' },
  { label: 'Workers', value: '45' },
  { label: 'Tasks', value: '28' },
  { label: 'Reports', value: '12' },
];

const ProfileScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Icon.ArrowLeftIcon size={verticalScale(22)} color={light.textPrimary} />
        </Pressable>
        <Typo size={verticalScale(16)} color={light.textPrimary} fontWeight={'bold'}>
          Profile
        </Typo>
        <View style={styles.headerRight} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.heroCard}>
          <View style={styles.avatarCircle}>
            <Typo size={verticalScale(32)} fontWeight={'bold'} color={palette.white}>
              O
            </Typo>
          </View>
          <Typo size={verticalScale(18)} fontWeight={'bold'} color={light.textPrimary}>
            Operations Manager
          </Typo>
          <Typo size={verticalScale(13)} color={light.textSecondary}>
            Site Administrator
          </Typo>
        </View>

        <View style={styles.statsRow}>
          {STATS.map((stat) => (
            <View key={stat.label} style={styles.statItem}>
              <Typo size={verticalScale(20)} fontWeight={'bold'} color={light.textPrimary}>
                {stat.value}
              </Typo>
              <Typo size={verticalScale(11)} color={light.textSecondary}>
                {stat.label}
              </Typo>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Typo size={verticalScale(13)} fontWeight={'600'} color={light.textSecondary} style={styles.sectionLabel}>
            PERSONAL
          </Typo>
          <View style={styles.infoCard}>
            <InfoRow icon={<Icon.UserIcon size={verticalScale(16)} color={light.primary} weight="fill" />} label="Full name" value="Operations Manager" />
            <View style={styles.divider} />
            <InfoRow icon={<Icon.EnvelopeIcon size={verticalScale(16)} color={light.primary} weight="fill" />} label="Email" value="ops@taskrux.ng" />
            <View style={styles.divider} />
            <InfoRow icon={<Icon.PhoneIcon size={verticalScale(16)} color={light.primary} weight="fill" />} label="Phone" value="+234 800 000 0000" />
          </View>
        </View>

        <View style={styles.section}>
          <Typo size={verticalScale(13)} fontWeight={'600'} color={light.textSecondary} style={styles.sectionLabel}>
            COMPANY
          </Typo>
          <View style={styles.infoCard}>
            <InfoRow icon={<Icon.BuildingsIcon size={verticalScale(16)} color={light.primary} weight="fill" />} label="Company" value="TaskRux Construction Ltd." />
            <View style={styles.divider} />
            <InfoRow icon={<Icon.CraneIcon size={verticalScale(16)} color={light.primary} weight="fill" />} label="Industry" value="Construction & Engineering" />
            <View style={styles.divider} />
            <InfoRow icon={<Icon.IdentificationCardIcon size={verticalScale(16)} color={light.primary} weight="fill" />} label="License" value="COREN/2023/04512" />
          </View>
        </View>

        <View style={styles.section}>
          <Typo size={verticalScale(13)} fontWeight={'600'} color={light.textSecondary} style={styles.sectionLabel}>
            ACCOUNT
          </Typo>
          <View style={styles.infoCard}>
            <InfoRow icon={<Icon.CalendarCheckIcon size={verticalScale(16)} color={light.primary} weight="fill" />} label="Member since" value="January 2024" />
          </View>
        </View>

        <Pressable
          style={styles.editBtn}
          onPress={() => Alert.alert('Edit Profile', 'Coming soon.')}
        >
          <Typo size={verticalScale(15)} fontWeight={'600'} color={light.textOnPrimary}>
            Edit Profile
          </Typo>
        </Pressable>

        <Pressable
          style={styles.signOutBtn}
          onPress={() => Alert.alert('Sign Out', 'Coming soon.')}
        >
          <Icon.SignOutIcon size={verticalScale(18)} color={light.error} />
          <Typo size={verticalScale(15)} fontWeight={'600'} color={light.error}>
            Sign Out
          </Typo>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <View style={infoStyles.row}>
    <View style={infoStyles.iconWrap}>{icon}</View>
    <View style={infoStyles.text}>
      <Typo size={verticalScale(11)} color={light.textMuted}>
        {label}
      </Typo>
      <Typo size={verticalScale(13)} color={light.textPrimary} fontWeight={'500'}>
        {value}
      </Typo>
    </View>
  </View>
);

export default ProfileScreen;

const infoStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacingX._12,
    paddingVertical: spacingY._10,
  },
  iconWrap: {
    width: scale(32),
    height: verticalScale(32),
    borderRadius: radius.full,
    backgroundColor: '#FFF3EC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
    gap: spacingY._3,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: light.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacingX._20,
    paddingVertical: spacingY._10,
  },
  backBtn: {
    marginRight: spacingX._12,
  },
  headerRight: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacingX._20,
    paddingBottom: spacingY._80,
    gap: spacingY._20,
  },
  heroCard: {
    backgroundColor: light.surface,
    borderRadius: radius._15,
    padding: spacingX._20,
    alignItems: 'center',
    gap: spacingY._7,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  avatarCircle: {
    width: scale(80),
    height: verticalScale(80),
    borderRadius: radius.full,
    backgroundColor: light.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacingY._7,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: light.surface,
    borderRadius: radius._12,
    padding: spacingX._15,
    gap: spacingX._10,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: spacingY._3,
  },
  section: {
    gap: spacingY._7,
  },
  sectionLabel: {
    paddingLeft: spacingX._5,
  },
  infoCard: {
    backgroundColor: light.surface,
    borderRadius: radius._12,
    paddingHorizontal: spacingX._15,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  divider: {
    height: 1,
    backgroundColor: light.border,
  },
  editBtn: {
    backgroundColor: light.primary,
    borderRadius: radius.full,
    paddingVertical: spacingY._15,
    alignItems: 'center',
  },
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacingX._10,
    borderRadius: radius.full,
    paddingVertical: spacingY._15,
    borderWidth: 1.5,
    borderColor: light.error,
    backgroundColor: light.surface,
  },
});
