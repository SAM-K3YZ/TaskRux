import { light, spacingX, spacingY } from '@/src/constants/theme';
import { EmptyStateProps } from '@/src/types';
import { verticalScale } from '@/src/shared/utils/styling';
import { scale } from '@/src/shared/utils/styling';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Typo from './Typo';

const EmptyState = ({ icon, title, subtitle }: EmptyStateProps) => {
  return (
    <View style={styles.container}>
      {icon}
      <Typo
        size={verticalScale(16)}
        color={light.textSecondary}
        fontWeight={'500'}
        style={styles.title}
      >
        {title}
      </Typo>
      {subtitle ? (
        <Typo
          size={verticalScale(13)}
          color={light.textMuted}
          style={styles.subtitle}
        >
          {subtitle}
        </Typo>
      ) : null}
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacingY._12,
    paddingHorizontal: spacingX._20,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    maxWidth: scale(240),
  },
});
