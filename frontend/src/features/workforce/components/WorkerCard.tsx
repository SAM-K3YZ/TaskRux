import { light, palette, radius, spacingX, spacingY } from '@/src/constants/theme';
import { WorkerCardProps } from '@/src/types';
import { verticalScale, scale } from '@/src/shared/utils/styling';
import * as Icon from 'phosphor-react-native';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Typo from '@/src/shared/components/Typo';

const WorkerCard = ({ worker, onPress }: WorkerCardProps) => {
  const isOnSite = worker.status === 'on_site';

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.avatar}>
        <Typo size={verticalScale(18)} fontWeight={'bold'} color={palette.white}>
          {worker.name.charAt(0).toUpperCase()}
        </Typo>
      </View>

      <View style={styles.info}>
        <Typo size={verticalScale(14)} color={light.textPrimary} fontWeight={'600'}>
          {worker.name}
        </Typo>
        <Typo size={verticalScale(12)} color={light.textSecondary}>
          {worker.role}
        </Typo>
        <View style={styles.siteRow}>
          <Icon.MapPinIcon size={verticalScale(12)} color={light.textMuted} weight="fill" />
          <Typo size={verticalScale(11)} color={light.textMuted}>
            {worker.site}
          </Typo>
        </View>
      </View>

      <View
        style={[
          styles.statusDot,
          { backgroundColor: isOnSite ? palette.successGreen : palette.neutral300 },
        ]}
      />
    </Pressable>
  );
};

export default WorkerCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: light.surface,
    borderRadius: radius._12,
    padding: spacingX._15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacingX._12,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  avatar: {
    width: verticalScale(44),
    height: verticalScale(44),
    borderRadius: verticalScale(22),
    backgroundColor: light.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    gap: spacingY._3,
  },
  siteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacingX._3,
  },
  statusDot: {
    width: scale(10),
    height: verticalScale(10),
    borderRadius: radius.full,
  },
});
