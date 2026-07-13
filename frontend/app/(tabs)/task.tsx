import Typo from '@/src/shared/components/Typo';
import FilterTabs from '@/src/shared/components/FilterTabs';
import { MOCK_TASKS } from '@/src/shared/data/mockData';
import { light, palette, radius, spacingX, spacingY } from '@/src/constants/theme';
import { verticalScale } from '@/src/shared/utils/styling';
import * as Icon from 'phosphor-react-native';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Task } from '@/src/types';

const FILTER_TABS = ['All', 'Pending', 'In Progress', 'Done'];

const PRIORITY_CONFIG = {
  high:   { color: '#EF4444', bg: '#FEE2E2', label: 'High' },
  medium: { color: '#F59E0B', bg: '#FEF3C7', label: 'Medium' },
  low:    { color: palette.successGreen, bg: palette.greenLight, label: 'Low' },
};

const STATUS_CONFIG = {
  pending:     { color: palette.neutral500, bg: palette.neutral200, label: 'Pending' },
  in_progress: { color: '#1193D4', bg: palette.blueLight, label: 'In Progress' },
  done:        { color: palette.successGreen, bg: palette.greenLight, label: 'Done' },
};

const TAB_TO_STATUS: Record<string, Task['status'] | null> = {
  All: null,
  Pending: 'pending',
  'In Progress': 'in_progress',
  Done: 'done',
};

const TaskScreen = () => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('All');

  const filtered = MOCK_TASKS.filter((t) => {
    const statusFilter = TAB_TO_STATUS[activeTab];
    return statusFilter === null || t.status === statusFilter;
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.top}>
        <Typo size={verticalScale(16)} color={light.textPrimary} fontWeight={'bold'}>
          Tasks
        </Typo>
        <Pressable onPress={() => router.push('/notifications')}>
          <Icon.BellIcon size={verticalScale(25)} color={light.textSecondary} />
        </Pressable>
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
            <Icon.ClipboardTextIcon size={verticalScale(56)} color={light.border} weight="thin" />
            <Typo size={verticalScale(16)} color={light.textSecondary} fontWeight={'500'}>
              No tasks found
            </Typo>
            <Typo size={verticalScale(13)} color={light.textMuted} style={{ textAlign: 'center' }}>
              Tasks assigned to you or your team will appear here.
            </Typo>
          </View>
        ) : (
          filtered.map((task) => {
            const p = PRIORITY_CONFIG[task.priority];
            const s = STATUS_CONFIG[task.status];
            return (
              <Pressable
                key={task.id}
                style={styles.card}
                onPress={() =>
                  router.push({ pathname: '/task-detail', params: { id: task.id } })
                }
              >
                <View style={styles.cardTop}>
                  <Typo
                    size={verticalScale(14)}
                    color={light.textPrimary}
                    fontWeight={'600'}
                    style={{ flex: 1 }}
                    numberOfLines={2}
                  >
                    {task.title}
                  </Typo>
                  <View style={[styles.badge, { backgroundColor: p.bg }]}>
                    <Typo size={verticalScale(10)} fontWeight={'700'} color={p.color}>
                      {p.label}
                    </Typo>
                  </View>
                </View>

                <View style={styles.statusRow}>
                  <View style={[styles.statusChip, { backgroundColor: s.bg }]}>
                    <Typo size={verticalScale(11)} fontWeight={'600'} color={s.color}>
                      {s.label}
                    </Typo>
                  </View>
                </View>

                <View style={styles.metaRow}>
                  <Icon.MapPinIcon size={verticalScale(12)} color={light.textMuted} weight="fill" />
                  <Typo size={verticalScale(12)} color={light.textSecondary}>
                    {task.site}
                  </Typo>
                </View>

                <View style={styles.metaRow}>
                  <Icon.UserIcon size={verticalScale(12)} color={light.textMuted} weight="fill" />
                  <Typo size={verticalScale(12)} color={light.textSecondary}>
                    {task.assigneeName}
                  </Typo>
                  <View style={styles.metaSpacer} />
                  <Icon.CalendarIcon size={verticalScale(12)} color={light.textMuted} weight="fill" />
                  <Typo size={verticalScale(12)} color={light.textMuted}>
                    {task.dueDate}
                  </Typo>
                </View>
              </Pressable>
            );
          })
        )}
      </ScrollView>

      <Pressable
        style={[styles.fab, { bottom: insets.bottom + 72 + 16 }]}
        onPress={() => router.push('/create-task')}
      >
        <Icon.PlusIcon size={verticalScale(24)} color={light.textOnPrimary} weight="bold" />
      </Pressable>
    </View>
  );
};

export default TaskScreen;

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
    gap: spacingY._7,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacingX._10,
  },
  badge: {
    paddingHorizontal: spacingX._10,
    paddingVertical: spacingY._3,
    borderRadius: radius.full,
  },
  statusRow: {
    flexDirection: 'row',
  },
  statusChip: {
    paddingHorizontal: spacingX._10,
    paddingVertical: spacingY._3,
    borderRadius: radius.full,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacingX._5,
  },
  metaSpacer: {
    flex: 1,
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
