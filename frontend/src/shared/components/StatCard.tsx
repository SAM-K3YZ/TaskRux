import { light, radius, spacingX, spacingY } from '@/src/constants/theme';
import { StatCardProps } from '@/src/types';
import { verticalScale, scale } from '@/src/shared/utils/styling';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Typo from './Typo';

const StatCard = ({ label, value, icon, iconBg, style }: StatCardProps) => {
  return (
    <View style={[styles.card, style]}>
      {icon ? (
        <View style={[styles.iconCircle, { backgroundColor: iconBg ?? light.surfaceRaised }]}>
          {icon}
        </View>
      ) : null}
      <Typo size={verticalScale(22)} fontWeight={'bold'} color={light.textPrimary}>
        {value}
      </Typo>
      <Typo size={verticalScale(12)} color={light.textSecondary}>
        {label}
      </Typo>
    </View>
  );
};

export default StatCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: light.surface,
    borderRadius: radius._12,
    padding: spacingX._15,
    alignItems: 'center',
    gap: spacingY._5,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  iconCircle: {
    width: scale(36),
    height: verticalScale(36),
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacingY._3,
  },
});
