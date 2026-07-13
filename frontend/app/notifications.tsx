import Typo from '@/src/shared/components/Typo';
import FilterTabs from '@/src/shared/components/FilterTabs';
import NotificationCard from '@/src/features/notifications/components/NotificationCard';
import { MOCK_NOTIFICATIONS } from '@/src/shared/data/mockData';
import { light, spacingX, spacingY } from '@/src/constants/theme';
import { verticalScale } from '@/src/shared/utils/styling';
import * as Icon from 'phosphor-react-native';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { AppNotification } from '@/src/types';

const FILTER_TABS = ['All', 'Unread', 'Tasks', 'Reports'];

const NotificationsScreen = () => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('All');
  const [notifications, setNotifications] = useState<AppNotification[]>(MOCK_NOTIFICATIONS);

  const filtered = notifications.filter((n) => {
    if (activeTab === 'Unread') return !n.read;
    if (activeTab === 'Tasks') return n.type === 'task';
    if (activeTab === 'Reports') return n.type === 'report';
    return true;
  });

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handlePress = (item: AppNotification) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, read: true } : n)),
    );
    if (item.type === 'task') {
      router.push({ pathname: '/task-detail', params: { id: item.relatedId } });
    } else if (item.type === 'project') {
      router.push({ pathname: '/project-detail', params: { id: item.relatedId } });
    } else if (item.type === 'worker') {
      router.push({ pathname: '/worker-detail', params: { id: item.relatedId } });
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacingY._15 }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Icon.ArrowLeftIcon size={verticalScale(22)} color={light.textPrimary} />
        </Pressable>
        <Typo size={verticalScale(16)} color={light.textPrimary} fontWeight={'bold'} style={{ flex: 1 }}>
          Notifications
        </Typo>
        <Pressable onPress={markAllRead}>
          <Typo size={verticalScale(13)} color={light.primary} fontWeight={'500'}>
            Mark all read
          </Typo>
        </Pressable>
      </View>

      <View style={styles.tabsArea}>
        <FilterTabs tabs={FILTER_TABS} active={activeTab} onChange={setActiveTab} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon.BellSlashIcon size={verticalScale(48)} color={light.border} weight="thin" />
            <Typo size={verticalScale(15)} color={light.textSecondary} fontWeight={'500'}>
              No notifications
            </Typo>
          </View>
        ) : (
          filtered.map((item) => (
            <NotificationCard key={item.id} item={item} onPress={() => handlePress(item)} />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default NotificationsScreen;

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
  tabsArea: {
    paddingHorizontal: spacingX._20,
    marginBottom: spacingY._10,
  },
  scrollContent: {
    paddingBottom: spacingY._80,
  },
  emptyState: {
    paddingTop: spacingY._60,
    alignItems: 'center',
    gap: spacingY._12,
  },
});
