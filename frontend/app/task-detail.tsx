import Typo from '@/src/shared/components/Typo';
import { MOCK_TASKS } from '@/src/shared/data/mockData';
import { light, palette, radius, spacingX, spacingY } from '@/src/constants/theme';
import { verticalScale } from '@/src/shared/utils/styling';
import * as Icon from 'phosphor-react-native';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { TaskStatus } from '@/src/types';

const PRIORITY_CONFIG = {
  high:   { color: '#EF4444', bg: '#FEE2E2', label: 'High' },
  medium: { color: '#F59E0B', bg: '#FEF3C7', label: 'Medium' },
  low:    { color: palette.successGreen, bg: palette.greenLight, label: 'Low' },
};

const STATUS_CONFIG: Record<TaskStatus, { color: string; bg: string; label: string }> = {
  pending:     { color: palette.neutral500, bg: palette.neutral200, label: 'Pending' },
  in_progress: { color: '#1193D4', bg: palette.blueLight, label: 'In Progress' },
  done:        { color: palette.successGreen, bg: palette.greenLight, label: 'Done' },
};

const STATUSES: TaskStatus[] = ['pending', 'in_progress', 'done'];

const ACTIVITY_LOG = [
  { id: 'a1', text: 'Task created', time: 'Jan 20, 2025' },
  { id: 'a2', text: 'Status changed to In Progress', time: 'Jan 24, 2025' },
  { id: 'a3', text: 'Comment added by supervisor', time: 'Jan 28, 2025' },
];

const TaskDetailScreen = () => {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const task = MOCK_TASKS.find((t) => t.id === id);
  const [status, setStatus] = useState<TaskStatus>(task?.status ?? 'pending');

  if (!task) {
    return (
      <View style={[styles.container, { paddingTop: insets.top + spacingY._15 }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Icon.ArrowLeftIcon size={verticalScale(22)} color={light.textPrimary} />
        </Pressable>
        <View style={styles.notFound}>
          <Typo size={verticalScale(15)} color={light.textSecondary}>Task not found.</Typo>
        </View>
      </View>
    );
  }

  const p = PRIORITY_CONFIG[task.priority];

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
          {task.title}
        </Typo>
        <View style={[styles.badge, { backgroundColor: p.bg }]}>
          <Typo size={verticalScale(11)} fontWeight={'700'} color={p.color}>
            {p.label}
          </Typo>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Typo size={verticalScale(13)} fontWeight={'600'} color={light.textSecondary}>
            Status
          </Typo>
          <View style={styles.statusChips}>
            {STATUSES.map((s) => {
              const cfg = STATUS_CONFIG[s];
              const isActive = status === s;
              return (
                <Pressable
                  key={s}
                  style={[styles.statusChip, isActive && { backgroundColor: cfg.bg, borderColor: cfg.color }]}
                  onPress={() => setStatus(s)}
                >
                  <Typo
                    size={verticalScale(12)}
                    fontWeight={isActive ? '600' : '400'}
                    color={isActive ? cfg.color : light.textSecondary}
                  >
                    {cfg.label}
                  </Typo>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.card}>
          <Typo size={verticalScale(13)} fontWeight={'600'} color={light.textSecondary}>
            Description
          </Typo>
          <Typo size={verticalScale(13)} color={light.textPrimary} style={{ lineHeight: verticalScale(20) }}>
            {task.description}
          </Typo>
        </View>

        <View style={styles.card}>
          <Typo size={verticalScale(13)} fontWeight={'600'} color={light.textSecondary}>
            Details
          </Typo>
          <DetailRow icon={<Icon.MapPinIcon size={verticalScale(14)} color={light.primary} weight="fill" />} label="Site" value={task.site} />
          <View style={styles.divider} />
          <DetailRow icon={<Icon.UserIcon size={verticalScale(14)} color={light.primary} weight="fill" />} label="Assignee" value={task.assigneeName} />
          <View style={styles.divider} />
          <DetailRow icon={<Icon.CalendarIcon size={verticalScale(14)} color={light.primary} weight="fill" />} label="Due date" value={task.dueDate} />
          <View style={styles.divider} />
          <DetailRow icon={<Icon.ClockIcon size={verticalScale(14)} color={light.primary} weight="fill" />} label="Created" value={task.createdAt} />
        </View>

        <View style={styles.card}>
          <Typo size={verticalScale(13)} fontWeight={'600'} color={light.textSecondary}>
            Activity
          </Typo>
          {ACTIVITY_LOG.map((a) => (
            <View key={a.id} style={styles.activityRow}>
              <View style={styles.activityDot} />
              <View style={styles.activityText}>
                <Typo size={verticalScale(13)} color={light.textPrimary}>{a.text}</Typo>
                <Typo size={verticalScale(11)} color={light.textMuted}>{a.time}</Typo>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const DetailRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <View style={detailStyles.row}>
    {icon}
    <Typo size={verticalScale(13)} color={light.textSecondary} style={{ width: spacingX._40 }}>
      {label}
    </Typo>
    <Typo size={verticalScale(13)} color={light.textPrimary} fontWeight={'500'} style={{ flex: 1 }}>
      {value}
    </Typo>
  </View>
);

const detailStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacingX._10,
    paddingVertical: spacingY._7,
  },
});

export default TaskDetailScreen;

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
    gap: spacingX._10,
  },
  backBtn: {
    marginRight: spacingX._5,
  },
  badge: {
    paddingHorizontal: spacingX._10,
    paddingVertical: spacingY._3,
    borderRadius: radius.full,
  },
  scrollContent: {
    paddingHorizontal: spacingX._20,
    paddingBottom: spacingY._80,
    gap: spacingY._15,
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
  statusChips: {
    flexDirection: 'row',
    gap: spacingX._10,
  },
  statusChip: {
    flex: 1,
    paddingVertical: spacingY._10,
    borderRadius: radius._10,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: light.border,
    backgroundColor: light.surfaceRaised,
  },
  divider: {
    height: 1,
    backgroundColor: light.border,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacingX._10,
    paddingVertical: spacingY._5,
  },
  activityDot: {
    width: spacingX._10,
    height: verticalScale(10),
    borderRadius: radius.full,
    backgroundColor: light.primary,
    marginTop: verticalScale(4),
  },
  activityText: {
    flex: 1,
    gap: spacingY._3,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
