import { light, palette, radius, spacingX, spacingY } from '@/src/constants/theme';
import { NotificationCardProps } from '@/src/types';
import { verticalScale, scale } from '@/src/shared/utils/styling';
import * as Icon from 'phosphor-react-native';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Typo from '@/src/shared/components/Typo';

const TYPE_CONFIG = {
  task:     { icon: Icon.ClipboardTextIcon, color: '#F96706', bg: '#FFF3EC' },
  report:   { icon: Icon.FileTextIcon,      color: '#22C55E', bg: '#DCFCE7' },
  delivery: { icon: Icon.TruckIcon,         color: '#1193D4', bg: '#cbe7f7' },
  worker:   { icon: Icon.HardHatIcon,       color: '#9333EA', bg: '#FAF5FF' },
  project:  { icon: Icon.CraneIcon,         color: '#1E2938', bg: '#E2E8F0' },
};

const NotificationCard = ({ item, onPress }: NotificationCardProps) => {
  const cfg = TYPE_CONFIG[item.type];
  const TypeIcon = cfg.icon;

  return (
    <Pressable
      style={[styles.container, !item.read && styles.unread]}
      onPress={onPress}
    >
      <View style={styles.iconArea}>
        <View style={[styles.iconCircle, { backgroundColor: cfg.bg }]}>
          <TypeIcon size={verticalScale(20)} color={cfg.color} weight="bold" />
        </View>
        {!item.read && <View style={styles.unreadDot} />}
      </View>

      <View style={styles.textArea}>
        <Typo size={verticalScale(13)} fontWeight={'600'} color={light.textPrimary}>
          {item.title}
        </Typo>
        <Typo
          size={verticalScale(12)}
          color={light.textSecondary}
          numberOfLines={2}
          style={styles.message}
        >
          {item.message}
        </Typo>
        <Typo size={verticalScale(11)} color={light.textMuted}>
          {item.time}
        </Typo>
      </View>
    </Pressable>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacingX._12,
    paddingVertical: spacingY._12,
    paddingHorizontal: spacingX._15,
    backgroundColor: light.surface,
    borderBottomWidth: 1,
    borderBottomColor: light.border,
  },
  unread: {
    backgroundColor: '#FFF3EC',
  },
  iconArea: {
    position: 'relative',
  },
  iconCircle: {
    width: scale(44),
    height: verticalScale(44),
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: scale(8),
    height: verticalScale(8),
    borderRadius: radius.full,
    backgroundColor: light.primary,
  },
  textArea: {
    flex: 1,
    gap: spacingY._3,
  },
  message: {
    lineHeight: verticalScale(18),
  },
});
