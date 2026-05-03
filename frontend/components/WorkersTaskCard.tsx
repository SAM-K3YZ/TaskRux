import { light, radius, spacingX, spacingY } from '@/constants/theme';
import { WorkerTaskCardProps } from '@/types';
import { formatTime } from '@/utils/formatTime';
import { verticalScale } from '@/utils/styling';
import { router } from 'expo-router';
import * as Icon from 'phosphor-react-native';
import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import Typo from './Typo';
import Dot from './Dot';

const WorkersTaskCard = ({ worker, task, time }: WorkerTaskCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSide}>
        {/* Image */}
        <View style={styles.avatarWrapper}>
          {worker?.image ? (
            <Image source={{ uri: worker.image }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarFallback}>
              <Typo size={verticalScale(14)} color={'#fff'} fontWeight={'bold'}>
                {worker?.name?.charAt(0).toUpperCase()}
              </Typo>
            </View>
          )}
        </View>

        {/* Text */}
        <View style={styles.textArea}>
          <Typo
            color={light.textPrimary}
            size={verticalScale(12)}
            fontWeight={'bold'}
          >
            {`${worker?.name} completed a task`}
          </Typo>
          <View style={styles.subDetailsText}>
            <Typo
              color={light.textSecondary}
              size={verticalScale(10)}
              fontWeight={'light'}
            >
              {task}
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

      {/* Button */}
      <Pressable style={styles.rightSide} onPress={() => router.push('/(tabs)/workers')}>
        <Icon.CaretRightIcon
          size={verticalScale(15)}
          color={light.borderStrong}
          weight="bold"
        />
      </Pressable>
    </View>
  );
};

export default WorkersTaskCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  leftSide: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacingY._5,
    justifyContent: 'center',
  },
  rightSide: {
    alignItems: 'center',
  },
  avatarWrapper: {
    width: verticalScale(44),
    height: verticalScale(44),
    borderRadius: verticalScale(22),
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  avatarFallback: {
    width: '100%',
    height: '100%',
    backgroundColor: light.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textArea: {
    flex: 1,
    gap: spacingY._3,
    justifyContent: 'center',
  },
  subDetailsText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacingX._5,
  },
});
