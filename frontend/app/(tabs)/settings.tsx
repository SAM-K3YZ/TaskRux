import Typo from '@/src/shared/components/Typo';
import { light, palette, radius, spacingX, spacingY } from '@/src/constants/theme';
import { verticalScale } from '@/src/shared/utils/styling';
import * as Icon from 'phosphor-react-native';
import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';

// TODO: replace Alert stubs with real navigation once screens exist

type SettingRow = {
  icon: React.ComponentType<any>;
  label: string;
  onPress: () => void;
  danger?: boolean;
};

type SettingSection = {
  title: string;
  rows: SettingRow[];
};

const SECTIONS: SettingSection[] = [
  {
    title: 'Account',
    rows: [
      { icon: Icon.UserCircleIcon, label: 'Profile', onPress: () => Alert.alert('Profile', 'Coming soon.') },
      { icon: Icon.LockKeyIcon,    label: 'Change Password', onPress: () => Alert.alert('Password', 'Coming soon.') },
      { icon: Icon.BuildingOfficeIcon, label: 'Company Settings', onPress: () => Alert.alert('Company', 'Coming soon.') },
    ],
  },
  {
    title: 'Preferences',
    rows: [
      { icon: Icon.BellIcon,    label: 'Notifications', onPress: () => Alert.alert('Notifications', 'Coming soon.') },
      { icon: Icon.GlobeIcon,   label: 'Region & Compliance', onPress: () => Alert.alert('Region', 'Coming soon.') },
      { icon: Icon.PaletteIcon, label: 'Appearance', onPress: () => Alert.alert('Appearance', 'Coming soon.') },
    ],
  },
  {
    title: 'Support',
    rows: [
      { icon: Icon.QuestionIcon,     label: 'Help Center', onPress: () => Alert.alert('Help', 'Coming soon.') },
      { icon: Icon.ChatCircleIcon,   label: 'Contact Support', onPress: () => Alert.alert('Support', 'Coming soon.') },
      { icon: Icon.InfoIcon,         label: 'About TaskRux', onPress: () => Alert.alert('TaskRux', 'Version 1.0.0') },
    ],
  },
  {
    title: 'Danger Zone',
    rows: [
      { icon: Icon.SignOutIcon, label: 'Sign Out', onPress: () => Alert.alert('Sign Out', 'Coming soon.'), danger: true },
    ],
  },
];

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Typo size={verticalScale(16)} color={light.textPrimary} fontWeight={'bold'}>
          Settings
        </Typo>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {SECTIONS.map((section) => (
          <View key={section.title} style={styles.section}>
            <Typo size={verticalScale(11)} color={light.textMuted} fontWeight={'600'} style={styles.sectionTitle}>
              {section.title.toUpperCase()}
            </Typo>

            <View style={styles.sectionCard}>
              {section.rows.map((row, i) => {
                const RowIcon = row.icon;
                const isLast = i === section.rows.length - 1;
                return (
                  <Pressable
                    key={row.label}
                    style={[styles.row, !isLast && styles.rowBorder]}
                    onPress={row.onPress}
                  >
                    <View style={[styles.iconWrap, row.danger && styles.iconWrapDanger]}>
                      <RowIcon
                        size={verticalScale(18)}
                        color={row.danger ? palette.errorRed : light.primary}
                        weight="fill"
                      />
                    </View>
                    <Typo
                      size={verticalScale(14)}
                      color={row.danger ? palette.errorRed : light.textPrimary}
                      fontWeight={'500'}
                      style={{ flex: 1 }}
                    >
                      {row.label}
                    </Typo>
                    <Icon.CaretRightIcon
                      size={verticalScale(14)}
                      color={light.textMuted}
                      weight="bold"
                    />
                  </Pressable>
                );
              })}
            </View>
          </View>
        ))}

        <Typo size={verticalScale(11)} color={light.textMuted} style={styles.version}>
          TaskRux v1.0.0
        </Typo>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: light.background,
    paddingHorizontal: spacingX._20,
    paddingVertical: spacingY._20,
  },
  top: {
    marginTop: spacingY._15,
    paddingVertical: spacingY._10,
  },
  scroll: {
    gap: spacingY._20,
    paddingBottom: spacingY._80,
  },
  section: {
    gap: spacingY._7,
  },
  sectionTitle: {
    letterSpacing: 0.8,
    paddingLeft: spacingX._5,
  },
  sectionCard: {
    backgroundColor: light.surface,
    borderRadius: radius._12,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacingX._15,
    paddingVertical: spacingY._15,
    gap: spacingX._12,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: light.border,
  },
  iconWrap: {
    width: verticalScale(34),
    height: verticalScale(34),
    borderRadius: radius._10,
    backgroundColor: light.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapDanger: {
    backgroundColor: '#FEE2E2',
  },
  version: {
    textAlign: 'center',
    paddingBottom: spacingY._10,
  },
});
