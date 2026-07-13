import Typo from '@/src/shared/components/Typo';
import Input from '@/src/shared/components/Input';
import FilterTabs from '@/src/shared/components/FilterTabs';
import ProgressBar from '@/src/shared/components/ProgressBar';
import { MOCK_PROJECTS } from '@/src/shared/data/mockData';
import { light, palette, radius, spacingX, spacingY } from '@/src/constants/theme';
import { verticalScale } from '@/src/shared/utils/styling';
import * as Icon from 'phosphor-react-native';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Project } from '@/src/types';

const FILTER_TABS = ['All', 'Active', 'On Hold', 'Planning'];

const STATUS_CONFIG = {
  active:   { color: palette.successGreen, bg: palette.greenLight, label: 'Active' },
  onHold:   { color: '#B45309', bg: '#FEF3C7', label: 'On Hold' },
  planning: { color: '#1D4ED8', bg: '#DBEAFE', label: 'Planning' },
};

const TAB_TO_STATUS: Record<string, Project['status'] | null> = {
  All: null,
  Active: 'active',
  'On Hold': 'onHold',
  Planning: 'planning',
};

const ProjectScreen = () => {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const filtered = MOCK_PROJECTS.filter((p) => {
    const statusFilter = TAB_TO_STATUS[activeTab];
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.address.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === null || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.top}>
        <Typo size={verticalScale(16)} color={light.textPrimary} fontWeight={'bold'}>
          Projects
        </Typo>
        <Pressable onPress={() => router.push('/notifications')}>
          <Icon.BellIcon size={verticalScale(25)} color={light.textSecondary} />
        </Pressable>
      </View>

      <View style={styles.searchArea}>
        <Input
          placeholder="Search projects..."
          icon={
            <Icon.MagnifyingGlassIcon
              size={verticalScale(18)}
              color={palette.neutral400}
            />
          }
          value={search}
          onChangeText={setSearch}
          wrapperStyle={{ flex: 0 }}
        />
      </View>

      <View style={styles.tabsArea}>
        <FilterTabs tabs={FILTER_TABS} active={activeTab} onChange={setActiveTab} />
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
            <Icon.CraneIcon size={verticalScale(56)} color={light.border} weight="thin" />
            <Typo size={verticalScale(16)} color={light.textSecondary} fontWeight={'500'}>
              No projects found
            </Typo>
            <Typo size={verticalScale(13)} color={light.textMuted} style={{ textAlign: 'center' }}>
              Projects will appear here once they are created.
            </Typo>
          </View>
        ) : (
          filtered.map((project) => {
            const s = STATUS_CONFIG[project.status];
            return (
              <Pressable
                key={project.id}
                style={styles.card}
                onPress={() =>
                  router.push({ pathname: '/project-detail', params: { id: project.id } })
                }
              >
                <View style={styles.cardTop}>
                  <Typo
                    size={verticalScale(15)}
                    color={light.textPrimary}
                    fontWeight={'bold'}
                    style={{ flex: 1 }}
                    numberOfLines={1}
                  >
                    {project.name}
                  </Typo>
                  <View style={[styles.badge, { backgroundColor: s.bg }]}>
                    <Typo size={verticalScale(11)} fontWeight={'600'} color={s.color}>
                      {s.label}
                    </Typo>
                  </View>
                </View>

                <View style={styles.addressRow}>
                  <Icon.MapPinIcon size={verticalScale(12)} color={light.textMuted} weight="fill" />
                  <Typo size={verticalScale(12)} color={light.textSecondary} numberOfLines={1}>
                    {project.address}
                  </Typo>
                </View>

                <View style={styles.progressArea}>
                  <View style={styles.progressHeader}>
                    <Typo size={verticalScale(11)} color={light.textSecondary}>
                      Progress
                    </Typo>
                    <Typo size={verticalScale(11)} fontWeight={'600'} color={light.textPrimary}>
                      {project.progress}%
                    </Typo>
                  </View>
                  <ProgressBar progress={project.progress} />
                </View>

                <View style={styles.statsRow}>
                  <View style={styles.statItem}>
                    <Icon.UsersIcon size={verticalScale(13)} color={light.textMuted} weight="fill" />
                    <Typo size={verticalScale(12)} color={light.textSecondary}>
                      {project.workerCount} workers
                    </Typo>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Icon.ClipboardTextIcon
                      size={verticalScale(13)}
                      color={light.textMuted}
                      weight="fill"
                    />
                    <Typo size={verticalScale(12)} color={light.textSecondary}>
                      {project.taskCount} tasks
                    </Typo>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Icon.CalendarIcon
                      size={verticalScale(13)}
                      color={light.textMuted}
                      weight="fill"
                    />
                    <Typo size={verticalScale(12)} color={light.textMuted}>
                      {project.deadline}
                    </Typo>
                  </View>
                </View>
              </Pressable>
            );
          })
        )}
      </ScrollView>

      <Pressable
        style={[styles.fab, { bottom: insets.bottom + 72 + 16 }]}
        onPress={() => router.push('/create-project')}
      >
        <Icon.PlusIcon size={verticalScale(24)} color={light.textOnPrimary} weight="bold" />
      </Pressable>
    </View>
  );
};

export default ProjectScreen;

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
  tabsArea: {
    marginBottom: spacingY._12,
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
    gap: spacingY._10,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacingX._10,
  },
  badge: {
    paddingHorizontal: spacingX._10,
    paddingVertical: spacingY._3,
    borderRadius: radius.full,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacingX._5,
  },
  progressArea: {
    gap: spacingY._5,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacingX._10,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacingX._5,
  },
  statDivider: {
    width: 1,
    height: verticalScale(12),
    backgroundColor: light.border,
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
