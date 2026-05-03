import { light, palette, radius, spacingX, spacingY } from '@/constants/theme';
import { ReportCardProps } from '@/types';
import { formatTime } from '@/utils/formatTime';
import { verticalScale } from '@/utils/styling';
import { router } from 'expo-router';
import * as Icon from 'phosphor-react-native';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Typo from './Typo';
import Dot from './Dot';

const WorkReportCard = ({ title, site, time, status }: ReportCardProps) => {
  const isSubmitted = status === 'submitted';

  return (
    <Pressable
      style={styles.container}
      onPress={() => router.push('/(tabs)/task')}
    >
      <View style={styles.leftSide}>
        {/* Icon */}
        <View
          style={[
            styles.iconWrapper,
            {
              backgroundColor: isSubmitted
                ? palette.greenLight
                : palette.neutral200,
            },
          ]}
        >
          <Icon.FileTextIcon
            size={verticalScale(20)}
            color={isSubmitted ? palette.successGreen : palette.neutral400}
            weight="bold"
          />
        </View>

        {/* Text */}
        <View style={styles.textArea}>
          <Typo
            color={light.textPrimary}
            size={verticalScale(12)}
            fontWeight={'bold'}
          >
            {title}
          </Typo>
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

      {/* Status Icon */}
      {isSubmitted ? (
        <Icon.CheckCircleIcon
          size={verticalScale(20)}
          color={palette.successGreen}
          weight="fill"
        />
      ) : (
        <Icon.ClockIcon
          size={verticalScale(20)}
          color={palette.neutral400}
          weight="fill"
        />
      )}
    </Pressable>
  );
};

export default WorkReportCard;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    flexDirection: 'row',
    gap: spacingY._15,
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
    gap: spacingY._3,
  }, 
  subDetailsText: {
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: spacingX._5,
  },
});
