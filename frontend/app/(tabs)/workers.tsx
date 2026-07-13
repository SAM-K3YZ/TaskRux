import Typo from '@/src/shared/components/Typo';
import Input from '@/src/shared/components/Input';
import WorkerCard from '@/src/features/workforce/components/WorkerCard';
import { MOCK_WORKERS } from '@/src/shared/data/mockData';
import { light, palette, radius, spacingX, spacingY } from '@/src/constants/theme';
import { verticalScale } from '@/src/shared/utils/styling';
import * as Icon from 'phosphor-react-native';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

type StatusFilter = 'All' | 'On Site' | 'Off Site';

const WorkersScreen = () => {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');

  const filtered = MOCK_WORKERS.filter((w) => {
    const matchesSearch =
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.role.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'On Site' && w.status === 'on_site') ||
      (statusFilter === 'Off Site' && w.status === 'off_site');
    return matchesSearch && matchesStatus;
  });

  const statusPills: StatusFilter[] = ['All', 'On Site', 'Off Site'];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.top}>
        <Typo size={verticalScale(16)} color={light.textPrimary} fontWeight={'bold'}>
          Workers
        </Typo>
        <Pressable onPress={() => router.push('/notifications')}>
          <Icon.BellIcon size={verticalScale(25)} color={light.textSecondary} />
        </Pressable>
      </View>

      <View style={styles.searchArea}>
        <Input
          placeholder="Search workers..."
          icon={<Icon.MagnifyingGlassIcon size={verticalScale(18)} color={palette.neutral400} />}
          value={search}
          onChangeText={setSearch}
          wrapperStyle={{ flex: 0 }}
        />
      </View>

      <View style={styles.pillRow}>
        {statusPills.map((pill) => {
          const isActive = statusFilter === pill;
          return (
            <Pressable
              key={pill}
              style={[styles.pill, isActive && styles.pillActive]}
              onPress={() => setStatusFilter(pill)}
            >
              <Typo
                size={verticalScale(12)}
                fontWeight={isActive ? '600' : '500'}
                color={isActive ? light.textOnPrimary : light.textSecondary}
              >
                {pill}
              </Typo>
            </Pressable>
          );
        })}
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
            <Icon.HardHatIcon size={verticalScale(56)} color={light.border} weight="thin" />
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
            <WorkerCard
              key={worker.id}
              worker={worker}
              onPress={() =>
                router.push({ pathname: '/worker-detail', params: { id: worker.id } })
              }
            />
          ))
        )}
      </ScrollView>

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
  pillRow: {
    flexDirection: 'row',
    gap: spacingX._10,
    marginBottom: spacingY._12,
  },
  pill: {
    paddingHorizontal: spacingX._15,
    paddingVertical: spacingY._7,
    borderRadius: radius.full,
    backgroundColor: light.surface,
  },
  pillActive: {
    backgroundColor: light.primary,
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
  fab: {
    position: 'absolute',
    right: spacingX._20,
    width: verticalScale(56),
    height: verticalScale(56),
    borderRadius: radius.full,
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
