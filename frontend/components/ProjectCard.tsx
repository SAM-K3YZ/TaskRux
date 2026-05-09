import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { light, palette, spacingY } from '@/constants/theme';
import Typo from './Typo';
import { ProjectCardProps } from '@/types';
import { verticalScale } from '@/utils/styling';

const STATUS_CONFIG = {
  active: {
    color: palette.successGreen,
    bg: palette.greenLight,
    label: 'active',
  },
  onHold: { color: '#B45309', bg: '#FEF3C7', label: 'onHold' },
  planning: { color: '#1D4ED8', bg: '#DBEAFE', label: 'planning' },
};

const ProjectCard = ({ projectName, address, status }: ProjectCardProps) => {
  const statusConfig = STATUS_CONFIG[status];

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Typo
          size={verticalScale(20)}
          color={light.textPrimary}
          fontWeight={'bold'}
        >
          {projectName}
        </Typo>
        <View style={styles.statusArea}>
          <Typo
            size={verticalScale(10)}
            fontWeight={'bold'}
            color={statusConfig.color}
            style={{ backgroundColor: statusConfig.bg }}
          >
            {statusConfig.label}
          </Typo>
        </View>
      </View>
    </View>
  );
};

export default ProjectCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    elevation: 2,
    backgroundColor: light.surfaceRaised,
  },
  top: {
    gap: spacingY._5,
  },
  statusArea: {},
});
