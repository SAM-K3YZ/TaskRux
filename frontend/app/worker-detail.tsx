import Typo from '@/src/shared/components/Typo';
import { MOCK_WORKERS, MOCK_TASKS } from '@/src/shared/data/mockData';
import { light, palette, radius, spacingX, spacingY } from '@/src/constants/theme';
import { verticalScale, scale } from '@/src/shared/utils/styling';
import * as Icon from 'phosphor-react-native';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { TaskStatus } from '@/src/types';

const STATUS_CONFIG: Record<TaskStatus, { color: string; bg: string; label: string }> = {
  pending:     { color: palette.neutral500, bg: palette.neutral200, label: 'Pending' },
  in_progress: { color: '#1193D4', bg: palette.blueLight, label: 'In Progress' },
  done:        { color: palette.successGreen, bg: palette.greenLight, label: 'Done' },
};

const WorkerDetailScreen = () => {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const worker = MOCK_WORKERS.find((w) => w.id === id);

  if (!worker) {
    return (
      <View style={[styles.container, { paddingTop: insets.top + spacingY._15 }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Icon.ArrowLeftIcon size={verticalScale(22)} color={light.textPrimary} />
        </Pressable>
        <View style={styles.notFound}>
          <Typo size={verticalScale(15)} color={light.textSecondary}>Worker not found.</Typo>
        </View>
      </View>
    );
  }

  const isOnSite = worker.status === 'on_site';
  const workerTasks = MOCK_TASKS.filter((t) => t.assigneeId === worker.id);

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacingY._15 }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Icon.ArrowLeftIcon size={verticalScale(22)} color={light.textPrimary} />
        </Pressable>
        <Typo size={verticalScale(16)} color={light.textPrimary} fontWeight={'bold'} numberOfLines={1}>
          {worker.name}
        </Typo>
        <View style={styles.headerRight} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.heroCard}>
          <View style={styles.avatarCircle}>
            <Typo size={verticalScale(32)} fontWeight={'bold'} color={palette.white}>
              {worker.name.charAt(0).toUpperCase()}
            </Typo>
          </View>
          <Typo size={verticalScale(18)} fontWeight={'bold'} color={light.textPrimary}>
            {worker.name}
          </Typo>
          <Typo size={verticalScale(13)} color={light.textSecondary}>
            {worker.role}
          </Typo>
          <View style={[styles.statusBadge, { backgroundColor: isOnSite ? palette.greenLight : palette.neutral200 }]}>
            <View style={[styles.statusDot, { backgroundColor: isOnSite ? palette.successGreen : palette.neutral400 }]} />
            <Typo size={verticalScale(12)} fontWeight={'600'} color={isOnSite ? palette.successGreen : palette.neutral500}>
              {isOnSite ? 'On Site' : 'Off Site'}
            </Typo>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Typo size={verticalScale(20)} fontWeight={'bold'} color={light.textPrimary}>
              {worker.taskCount}
            </Typo>
            <Typo size={verticalScale(11)} color={light.textSecondary}>Tasks</Typo>
          </View>
          <View style={styles.statDivider} />
          <View style={[styles.statItem, { flex: 2 }]}>
            <Typo size={verticalScale(14)} fontWeight={'bold'} color={light.textPrimary} numberOfLines={1}>
              {worker.site}
            </Typo>
            <Typo size={verticalScale(11)} color={light.textSecondary}>Current site</Typo>
          </View>
        </View>

        <View style={styles.card}>
          <Typo size={verticalScale(13)} fontWeight={'600'} color={light.textSecondary}>
            Contact Info
          </Typo>
          <View style={styles.infoRow}>
            <Icon.PhoneIcon size={verticalScale(16)} color={light.primary} weight="fill" />
            <Typo size={verticalScale(13)} color={light.textPrimary}>{worker.phone}</Typo>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Icon.EnvelopeIcon size={verticalScale(16)} color={light.primary} weight="fill" />
            <Typo size={verticalScale(13)} color={light.textPrimary}>{worker.email}</Typo>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Icon.CalendarIcon size={verticalScale(16)} color={light.primary} weight="fill" />
            <Typo size={verticalScale(13)} color={light.textPrimary}>
              Started {worker.startDate}
            </Typo>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Icon.MapPinIcon size={verticalScale(16)} color={light.primary} weight="fill" />
            <Typo size={verticalScale(13)} color={light.textPrimary}>{worker.site}</Typo>
          </View>
        </View>

        {workerTasks.length > 0 && (
          <View style={styles.card}>
            <Typo size={verticalScale(13)} fontWeight={'600'} color={light.textSecondary}>
              Current Tasks
            </Typo>
            {workerTasks.map((task, idx) => {
              const s = STATUS_CONFIG[task.status];
              return (
                <View key={task.id}>
                  {idx > 0 && <View style={styles.divider} />}
                  <View style={styles.taskRow}>
                    <Typo size={verticalScale(13)} color={light.textPrimary} style={{ flex: 1 }} numberOfLines={2}>
                      {task.title}
                    </Typo>
                    <View style={[styles.statusChip, { backgroundColor: s.bg }]}>
                      <Typo size={verticalScale(11)} fontWeight={'600'} color={s.color}>
                        {s.label}
                      </Typo>
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

export default WorkerDetailScreen;

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
  headerRight: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacingX._20,
    paddingBottom: spacingY._80,
    gap: spacingY._15,
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
    marginBottom: spacingY._5,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacingX._7,
    paddingHorizontal: spacingX._12,
    paddingVertical: spacingY._5,
    borderRadius: radius.full,
    marginTop: spacingY._5,
  },
  statusDot: {
    width: scale(8),
    height: verticalScale(8),
    borderRadius: radius.full,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: light.surface,
    borderRadius: radius._12,
    padding: spacingX._15,
    gap: spacingX._15,
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
  statDivider: {
    width: 1,
    backgroundColor: light.border,
    alignSelf: 'stretch',
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
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacingX._10,
    paddingVertical: spacingY._5,
  },
  divider: {
    height: 1,
    backgroundColor: light.border,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacingX._10,
    paddingVertical: spacingY._7,
  },
  statusChip: {
    paddingHorizontal: spacingX._10,
    paddingVertical: spacingY._3,
    borderRadius: radius.full,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
