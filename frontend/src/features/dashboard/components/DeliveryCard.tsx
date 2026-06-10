import { light, palette, radius, spacingX, spacingY } from '@/constants/theme';
import { DeliveryCardProps } from '@/types';
import { formatTime } from '@/utils/formatTime';
import { verticalScale } from '@/utils/styling';
import { router } from 'expo-router';
import * as Icon from 'phosphor-react-native';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Typo from './Typo';
import Dot from './Dot';

const STATUS_CONFIG = {
  success: {
    color: palette.successGreen,
    bg: palette.greenLight,
    label: 'Delivered',
  },
  warning: { color: '#F59E0B', bg: '#FEF3C7', label: 'Warning' },
  delayed: { color: '#EF4444', bg: '#FEE2E2', label: 'Delayed' },
};

const TYPE_CONFIG = {
  material: {
    icon: Icon.TruckIcon,
    bg: palette.blueLight,
    color: palette.blue,
  },
  machine: {
    icon: Icon.WrenchIcon,
    bg: palette.purpleLight,
    color: palette.purple,
  },
};

const DeliveryCard = ({
  title,
  site,
  time,
  type,
  status,
}: DeliveryCardProps) => {
  const statusConfig = STATUS_CONFIG[status];
  const typeConfig = TYPE_CONFIG[type];
  const TypeIcon = typeConfig.icon;

  return (
    <Pressable
      style={styles.container}
      onPress={() => router.push('/(tabs)/task')}
    >
      <View style={styles.leftSide}>
        {/* Icon */}
        <View style={[styles.iconWrapper, { backgroundColor: typeConfig.bg }]}>
          <TypeIcon
            size={verticalScale(20)}
            color={typeConfig.color}
            weight="bold"
          />
        </View>

        {/* Text */}
        <View style={styles.textArea}>
          <View style={styles.textTitle}>
            <Typo
              color={light.textPrimary}
              size={verticalScale(12)}
              fontWeight={'bold'}
            >
              {title}
            </Typo>
            {/* Status Badge */}
            <View style={[styles.badge, { backgroundColor: statusConfig.bg }]}>
              <Typo
                size={verticalScale(10)}
                fontWeight={'bold'}
                color={statusConfig.color}
              >
                {statusConfig.label}
              </Typo>
            </View>
          </View>
          <View style={styles.subDetailsText}>
            <Typo
              color={light.textSecondary}
              size={verticalScale(10)}
              fontWeight={'light'}
            >
              {site}
            </Typo>
            <Dot />
            <Typo
              color={light.textSecondary}
              size={verticalScale(10)}
              fontWeight={'light'}
            >
              {formatTime(time)}
            </Typo>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default DeliveryCard;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    flexDirection: 'row',
    gap: spacingY._25,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderRadius: radius._12,
    backgroundColor: light.surface,
    justifyContent: 'space-between',
  },
  leftSide: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacingY._10,
  },
  iconWrapper: {
    width: verticalScale(44),
    height: verticalScale(44),
    borderRadius: verticalScale(22),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textArea: {
    flex: 1,
    gap: spacingY._7,
  },
  textTitle: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    //backgroundColor: light.border,
  },
  badge: {
    paddingHorizontal: spacingY._10,
    paddingVertical: spacingY._5,
    borderRadius: radius._12,
  },
  subDetailsText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacingX._5,
  },
});
