import { StyleSheet, View } from 'react-native';
import React from 'react';
import { light, palette, radius, spacingX, spacingY } from '@/src/constants/theme';
import { ProjectCardProps } from '@/src/types';
import { verticalScale } from '@/src/shared/utils/styling';
import Typo from '@/src/shared/components/Typo';
import * as Icon from 'phosphor-react-native';

const STATUS_CONFIG = {
  active:   { color: palette.successGreen, bg: palette.greenLight,  label: 'Active'   },
  onHold:   { color: '#B45309',            bg: '#FEF3C7',           label: 'On Hold'  },
  planning: { color: '#1D4ED8',            bg: '#DBEAFE',           label: 'Planning' },
};

const ProjectCard = ({ projectName, address, status }: ProjectCardProps) => {
  const s = STATUS_CONFIG[status];

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Typo size={verticalScale(16)} color={light.textPrimary} fontWeight={'bold'}>
          {projectName}
        </Typo>
        <View style={[styles.badge, { backgroundColor: s.bg }]}>
          <Typo size={verticalScale(11)} fontWeight={'600'} color={s.color}>
            {s.label}
          </Typo>
        </View>
      </View>
      <View style={styles.addressRow}>
        <Icon.MapPinIcon size={verticalScale(13)} color={light.textMuted} weight="fill" />
        <Typo size={verticalScale(12)} color={light.textSecondary} numberOfLines={1}>
          {address}
        </Typo>
      </View>
    </View>
  );
};

export default ProjectCard;

const styles = StyleSheet.create({
  container: {
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
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
});
