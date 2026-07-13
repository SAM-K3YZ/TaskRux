import Typo from '@/src/shared/components/Typo';
import { light, palette, spacingX, spacingY } from '@/src/constants/theme';
import { verticalScale } from '@/src/shared/utils/styling';
import * as Icon from 'phosphor-react-native';
import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// TODO: replace mock with data from useTasksQuery() once backend is ready
const MOCK_TASKS: {
  id: string;
  title: string;
  site: string;
  assignee: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'done';
}[] = [];

const PRIORITY_COLOR = {
  high:   { color: '#EF4444', bg: '#FEE2E2' },
  medium: { color: '#F59E0B', bg: '#FEF3C7' },
  low:    { color: palette.successGreen, bg: palette.greenLight },
};

const TaskScreen = () => {
  const insets = useSafeAreaInsets();

  const toNotification = () => {
    Alert.alert('Notifications', 'Coming soon.');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.top}>
        <Typo size={verticalScale(16)} color={light.textPrimary} fontWeight={'bold'}>
          Tasks
        </Typo>
        <Pressable onPress={toNotification}>
          <Icon.BellIcon size={verticalScale(25)} color={light.textSecondary} />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          MOCK_TASKS.length === 0 && styles.emptyScroll,
        ]}
      >
        {MOCK_TASKS.length === 0 ? (
          // Empty state — shows until real data arrives from the API
          <View style={styles.emptyState}>
            <Icon.ClipboardTextIcon
              size={verticalScale(56)}
              color={light.border}
              weight="thin"
            />
            <Typo size={verticalScale(16)} color={light.textSecondary} fontWeight={'500'}>
              No tasks yet
            </Typo>
            <Typo size={verticalScale(13)} color={light.textMuted} style={{ textAlign: 'center' }}>
              Tasks assigned to you or your team will appear here.
            </Typo>
          </View>
        ) : (
          MOCK_TASKS.map((task) => {
            const p = PRIORITY_COLOR[task.priority];
            return (
              <Pressable key={task.id} style={styles.card}>
                <View style={styles.cardTop}>
                  <Typo size={verticalScale(14)} color={light.textPrimary} fontWeight={'600'} style={{ flex: 1 }}>
                    {task.title}
                  </Typo>
                  <View style={[styles.priorityBadge, { backgroundColor: p.bg }]}>
                    <Typo size={verticalScale(10)} fontWeight={'700'} color={p.color}>
                      {task.priority}
                    </Typo>
                  </View>
                </View>
                <View style={styles.cardMeta}>
                  <Icon.MapPinIcon size={verticalScale(12)} color={light.textMuted} weight="fill" />
                  <Typo size={verticalScale(12)} color={light.textSecondary}>{task.site}</Typo>
                </View>
              </Pressable>
            );
          })
        )}
      </ScrollView>

      {/* FAB — add task, positioned above the 72pt floating tab bar */}
      <Pressable
        style={[styles.fab, { bottom: insets.bottom + 72 + 16 }]}
        onPress={() => Alert.alert('Add Task', 'Coming soon.')}
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
    borderRadius: 12,
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
    alignItems: 'center',
    gap: spacingX._10,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacingX._5,
  },
  priorityBadge: {
    paddingHorizontal: spacingX._10,
    paddingVertical: spacingY._3,
    borderRadius: 99,
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
