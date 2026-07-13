import { dark } from '@/src/constants/theme';
import { TypoProps } from '@/src/types';
import { verticalScale } from '@/src/shared/utils/styling';
import React from 'react';
import { Text, TextStyle } from 'react-native';

const Typo = ({
  size = 16,
  color = dark.textOnPrimary,
  fontWeight = '400',
  children,
  style,
  textProps = {},
  numberOfLines,
}: TypoProps) => {
  const textStyle: TextStyle = {
    fontSize: verticalScale(size),
    color,
    fontWeight,
  };

  return (
    <Text style={[textStyle, style]} numberOfLines={numberOfLines} {...textProps}>
      {children}
    </Text>
  );
};

export default Typo;
