import Typo from '@/src/shared/components/Typo';
import ProgressBar from '@/src/shared/components/ProgressBar';
import MilestoneCard from '@/src/features/projects/components/MilestoneCard';
import { MOCK_PROJECTS, MOCK_MILESTONES, MOCK_WORKERS, MOCK_TASKS } from '@/src/shared/data/mockData';
import { light, palette, radius, spacingX, spacingY } from '@/src/constants/theme';
import { verticalScale, scale } from '@/src/shared/utils/styling';
import * as Icon from 'phosphor-react-native';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { TaskStatus } from '@/src/types';

const PROJECT_STATUS_CONFIG = {
  active:   { color: palette.successGreen, bg: palette.greenLight, label: 'Active' },
  onHold:   { color: '#B45309', bg: '#FEF3C7', label: 'On Hold' },
  planning: { color: '#1D4ED8', bg: '#DBEAFE', label: 'Planning' },
};

const TASK_STATUS_CONFIG: Record<TaskStatus, { color: string; bg: string; label: string }> = {
  pending:     { color: palette.neutral500, bg: palette.neutral200, label: 'Pending' },
  in_progress: { color: '#1193D4', bg: palette.blueLight, label: 'In Progress' },
  done:        { color: palette.successGreen, bg: palette.greenLight, label: 'Done' },
};

const PRIORITY_CONFIG = {
  high:   { color: '#EF4444', bg: '#FEE2E2', label: 'High' },
  medium: { color: '#F59E0B', bg: '#FEF3C7', label: 'Medium' },
  low:    { color: palette.successGreen, bg: palette.greenLight, label: 'Low' },
};

const ProjectDetailScreen = () => {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const project = MOCK_PROJECTS.find((p) => p.id === id);
  const milestones = id ? (MOCK_MILESTONES[id] ?? []) : [];
  const assignedWorkers = MOCK_WORKERS.filter((w) => w.siteId === id);
  const recentTasks = MOCK_TASKS.filter((t) => t.siteId === id);

  if (!project) {
    return (
      <View style={[styles.container, { paddingTop: insets.top + spacingY._15 }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Icon.ArrowLeftIcon size={verticalScale(22)} color={light.textPrimary} />
        </Pressable>
        <View style={styles.notFound}>
          <Typo size={verticalScale(15)} color={light.textSecondary}>Project not found.</Typo>
        </View>
      </View>
    );
  }

  const s = PROJECT_STATUS_CONFIG[project.status];

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacingY._15 }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Icon.ArrowLeftIcon size={verticalScale(22)} color={light.textPrimary} />
        </Pressable>
        <Typo
          size={verticalScale(15)}
          color={light.textPrimary}
          fontWeight={'bold'}
          numberOfLines={1}
          style={{ flex: 1 }}
        >
          {project.name}
        </Typo>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <Typo size={verticalScale(18)} fontWeight={'bold'} color={light.textPrimary} style={{ flex: 1 }}>
              {project.name}
            </Typo>
            <View style={[styles.badge, { backgroundColor: s.bg }]}>
              <Typo size={verticalScale(11)} fontWeight={'600'} color={s.color}>{s.label}</Typo>
            </View>
          </View>
          <View style={styles.addressRow}>
            <Icon.MapPinIcon size={verticalScale(13)} color={light.textMuted} weight="fill" />
            <Typo size={verticalScale(12)} color={light.textSecondary}>{project.address}</Typo>
          </View>
          <View style={styles.progressArea}>
            <View style={styles.progressHeader}>
              <Typo size={verticalScale(12)} color={light.textSecondary}>Progress</Typo>
              <Typo size={verticalScale(12)} fontWeight={'700'} color={light.textPrimary}>
                {project.progress}% complete
              </Typo>
            </View>
            <ProgressBar progress={project.progress} />
          </View>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Icon.UsersIcon size={verticalScale(20)} color={light.primary} weight="fill" />
            <Typo size={verticalScale(18)} fontWeight={'bold'} color={light.textPrimary}>
              {project.workerCount}
            </Typo>
            <Typo size={verticalScale(11)} color={light.textSecondary}>Workers</Typo>
          </View>
          <View style={styles.statCard}>
            <Icon.ClipboardTextIcon size={verticalScale(20)} color={light.primary} weight="fill" />
            <Typo size={verticalScale(18)} fontWeight={'bold'} color={light.textPrimary}>
              {project.taskCount}
            </Typo>
            <Typo size={verticalScale(11)} color={light.textSecondary}>Tasks</Typo>
          </View>
          <View style={styles.statCard}>
            <Icon.CurrencyNgnIcon size={verticalScale(20)} color={light.primary} weight="fill" />
            <Typo size={verticalScale(13)} fontWeight={'bold'} color={light.textPrimary} numberOfLines={1}>
              {project.budget}
            </Typo>
            <Typo size={verticalScale(11)} color={light.textSecondary}>Budget</Typo>
          </View>
          <View style={styles.statCard}>
            <Icon.ChartLineUpIcon size={verticalScale(20)} color={light.primary} weight="fill" />
            <Typo size={verticalScale(13)} fontWeight={'bold'} color={light.textPrimary} numberOfLines={1}>
              {project.spent}
            </Typo>
            <Typo size={verticalScale(11)} color={light.textSecondary}>Spent</Typo>
          </View>
        </View>

        <View style={styles.card}>
          <Typo size={verticalScale(13)} fontWeight={'600'} color={light.textSecondary}>
            Description
          </Typo>
          <Typo size={verticalScale(13)} color={light.textPrimary} style={{ lineHeight: verticalScale(20) }}>
            {project.description}
          </Typo>
        </View>

        {milestones.length > 0 && (
          <View style={styles.card}>
            <Typo size={verticalScale(13)} fontWeight={'600'} color={light.textSecondary}>
              Milestones
            </Typo>
            {milestones.map((m, idx) => (
              <MilestoneCard key={m.id} milestone={m} isLast={idx === milestones.length - 1} />
            ))}
          </View>
        )}

        {assignedWorkers.length > 0 && (
          <View style={styles.card}>
            <Typo size={verticalScale(13)} fontWeight={'600'} color={light.textSecondary}>
              Assigned Workers
            </Typo>
            <View style={styles.workerChips}>
              {assignedWorkers.map((worker) => (
                <View key={worker.id} style={styles.workerChip}>
                  <View style={styles.workerAvatar}>
                    <Typo size={verticalScale(12)} fontWeight={'bold'} color={palette.white}>
                      {worker.name.charAt(0)}
                    </Typo>
                  </View>
                  <Typo size={verticalScale(12)} color={light.textPrimary} fontWeight={'500'}>
                    {worker.name}
                  </Typo>
                </View>
              ))}
            </View>
          </View>
        )}

        {recentTasks.length > 0 && (
          <View style={styles.card}>
            <Typo size={verticalScale(13)} fontWeight={'600'} color={light.textSecondary}>
              Recent Tasks
            </Typo>
            {recentTasks.map((task, idx) => {
              const p = PRIORITY_CONFIG[task.priority];
              const ts = TASK_STATUS_CONFIG[task.status];
              return (
                <View key={task.id}>
                  {idx > 0 && <View style={styles.divider} />}
                  <View style={styles.taskRow}>
                    <Typo size={verticalScale(13)} color={light.textPrimary} style={{ flex: 1 }} numberOfLines={2}>
                      {task.title}
                    </Typo>
                    <View style={[styles.chip, { backgroundColor: p.bg }]}>
                      <Typo size={verticalScale(10)} fontWeight={'700'} color={p.color}>{p.label}</Typo>
                    </View>
                    <View style={[styles.chip, { backgroundColor: ts.bg }]}>
                      <Typo size={verticalScale(10)} fontWeight={'600'} color={ts.color}>{ts.label}</Typo>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ProjectDetailScreen;

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
    gap: spacingX._12,
  },
  backBtn: {},
  scrollContent: {
    paddingHorizontal: spacingX._20,
    paddingBottom: spacingY._80,
    gap: spacingY._15,
  },
  heroCard: {
    backgroundColor: light.surface,
    borderRadius: radius._15,
    padding: spacingX._15,
    gap: spacingY._10,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
    gap: spacingY._7,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacingX._10,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: light.surface,
    borderRadius: radius._12,
    padding: spacingX._12,
    alignItems: 'center',
    gap: spacingY._5,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
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
  workerChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacingX._10,
  },
  workerChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacingX._7,
    paddingHorizontal: spacingX._10,
    paddingVertical: spacingY._7,
    backgroundColor: light.surfaceRaised,
    borderRadius: radius.full,
  },
  workerAvatar: {
    width: scale(24),
    height: verticalScale(24),
    borderRadius: radius.full,
    backgroundColor: light.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: light.border,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacingX._7,
    paddingVertical: spacingY._7,
  },
  chip: {
    paddingHorizontal: spacingX._7,
    paddingVertical: spacingY._3,
    borderRadius: radius.full,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
