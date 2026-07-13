import Typo from '@/src/shared/components/Typo';
import Input from '@/src/shared/components/Input';
import { light, palette, radius, spacingX, spacingY } from '@/src/constants/theme';
import { verticalScale } from '@/src/shared/utils/styling';
import * as Icon from 'phosphor-react-native';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// TODO: replace with data from useWorkersQuery() once backend is ready
const MOCK_WORKERS: {
  id: string;
  name: string;
  role: string;
  site: string;
  status: 'on_site' | 'off_site';
}[] = [];

const WorkersScreen = () => {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');

  const filtered = MOCK_WORKERS.filter((w) =>
    w.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.top}>
        <Typo size={verticalScale(16)} color={light.textPrimary} fontWeight={'bold'}>
          Workers
        </Typo>
        <Pressable onPress={() => Alert.alert('Notifications', 'Coming soon.')}>
          <Icon.BellIcon size={verticalScale(25)} color={light.textSecondary} />
        </Pressable>
      </View>

      {/* Search */}
      <View style={styles.searchArea}>
        <Input
          placeholder="Search workers..."
          icon={<Icon.MagnifyingGlassIcon size={verticalScale(18)} color={palette.neutral400} />}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          filtered.length === 0 && styles.emptyScroll,
        ]}
      >
        {filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon.HardHatIcon
              size={verticalScale(56)}
              color={light.border}
              weight="thin"
            />
            <Typo size={verticalScale(16)} color={light.textSecondary} fontWeight={'500'}>
              {search ? 'No workers found' : 'No workers yet'}
            </Typo>
            <Typo size={verticalScale(13)} color={light.textMuted} style={{ textAlign: 'center' }}>
              {search
                ? 'Try a different name or role.'
                : 'Workers added to your team will appear here.'}
            </Typo>
          </View>
        ) : (
          filtered.map((worker) => (
            <Pressable key={worker.id} style={styles.card}>
              {/* Avatar */}
              <View style={styles.avatar}>
                <Typo size={verticalScale(18)} fontWeight={'bold'} color={palette.white}>
                  {worker.name.charAt(0).toUpperCase()}
                </Typo>
              </View>

              {/* Info */}
              <View style={styles.info}>
                <Typo size={verticalScale(14)} color={light.textPrimary} fontWeight={'600'}>
                  {worker.name}
                </Typo>
                <Typo size={verticalScale(12)} color={light.textSecondary}>
                  {worker.role}
                </Typo>
                <View style={styles.siteRow}>
                  <Icon.MapPinIcon size={verticalScale(12)} color={light.textMuted} weight="fill" />
                  <Typo size={verticalScale(11)} color={light.textMuted}>{worker.site}</Typo>
                </View>
              </View>

              {/* Status dot */}
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: worker.status === 'on_site' ? palette.successGreen : palette.neutral300 },
                ]}
              />
            </Pressable>
          ))
        )}
      </ScrollView>

      {/* FAB — invite worker, positioned above the 72pt floating tab bar */}
      <Pressable
        style={[styles.fab, { bottom: insets.bottom + 72 + 16 }]}
        onPress={() => Alert.alert('Invite Worker', 'Coming soon.')}
      >
        <Icon.UserPlusIcon size={verticalScale(22)} color={light.textOnPrimary} weight="bold" />
      </Pressable>
    </View>
  );
};

export default WorkersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: light.background,
    paddingHorizontal: spacingX._20,
    paddingVertical: spacingY._20,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacingY._15,
    paddingVertical: spacingY._10,
  },
  searchArea: {
    marginBottom: spacingY._10,
  },
  scrollContent: {
    gap: spacingY._12,
    paddingBottom: spacingY._80,
  },
  emptyScroll: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacingY._12,
    paddingHorizontal: spacingX._20,
  },
  card: {
    backgroundColor: light.surface,
    borderRadius: radius._12,
    padding: spacingX._15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacingX._12,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  avatar: {
    width: verticalScale(44),
    height: verticalScale(44),
    borderRadius: verticalScale(22),
    backgroundColor: light.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    gap: spacingY._3,
  },
  siteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacingX._3,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  fab: {
    position: 'absolute',
    right: spacingX._20,
    width: verticalScale(56),
    height: verticalScale(56),
    borderRadius: 99,
    backgroundColor: light.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: light.primary,
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
});
