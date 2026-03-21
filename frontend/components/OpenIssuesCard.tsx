import { light, palette, radius, spacingX } from '@/constants/theme';
import { OpenIssuesCardProps } from '@/types';
import { scale, verticalScale } from '@/utils/styling';
import * as Icon from 'phosphor-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Typo from './Typo';
const OpenIssuesCard = ({
  number,
  subtext,
  icon,
  iconBgStyle,
  newProjectNumber = 0,
}: OpenIssuesCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconRow}>
        <View
          style={[
            styles.iconBackground,
            iconBgStyle && { backgroundColor: iconBgStyle },
          ]}
        >
          {icon ?? ( // fallback to WarningIcon if no icon passed
            <Icon.WarningIcon
              size={verticalScale(20)}
              color={light.primary}
              weight="bold"
            />
          )}
        </View>
      </View>
      <View style={styles.textArea}>
        <Typo
          size={verticalScale(20)}
          fontWeight={'500'}
          color={light.textPrimary}
        >
          {String(number)}
        </Typo>
        <Typo
          size={verticalScale(14)}
          fontWeight={'regular'}
          color={light.textPrimary}
        >
          {subtext}
        </Typo>
      </View>
    </View>
  );
};

export default OpenIssuesCard;

const styles = StyleSheet.create({
  container: {
    height: verticalScale(163),
    width: scale(144),
    borderRadius: radius._12,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    padding: spacingX._15,
    justifyContent: 'space-between',
    backgroundColor: light.surface,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconBackground: {
    padding: spacingX._5,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    borderRadius: radius._3,
    backgroundColor: light.primaryLight,
  },
  newBackground: {
    padding: spacingX._5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    borderRadius: radius._3,
    flexShrink: 1,
    maxWidth: '70%',
    backgroundColor: palette.greenLight,
  },
  textArea: {
    gap: 5,
  },
});
