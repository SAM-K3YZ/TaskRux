import { palette, radius } from '@/src/constants/theme';
import { ButtonProps } from '@/src/types';
import { verticalScale } from '@/src/shared/utils/styling';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import LoadingButton from './LoadingButton';

const DefaultButton = ({
  style,
  children,
  onPress,
  loading = false,
}: ButtonProps) => {
  if (loading) {
    return (
      <View style={[styles.button, style, { backgroundColor: 'transparent' }]}>
        <LoadingButton />
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      {children}
    </TouchableOpacity>
  );
};

export default DefaultButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: palette.brandOrange,
    borderRadius: radius.full,
    borderCurve: 'continuous',
    justifyContent: 'center',
    alignItems: 'center',
    height: verticalScale(56),
    flexDirection: 'row',
  },
});
