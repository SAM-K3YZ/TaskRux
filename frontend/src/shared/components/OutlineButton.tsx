import { palette, radius } from '@/src/constants/theme';
import { ButtonProps } from '@/src/types';
import { verticalScale } from '@/src/shared/utils/styling';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import LoadingButton from './LoadingButton';

const OutlineButton = ({
  style,
  children,
  onPress,
  loading = false,
}: ButtonProps) => {
  if (loading) {
    return (
      <View style={[styles.button, style]}>
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

export default OutlineButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    borderRadius: radius.full,
    borderCurve: 'continuous',
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: palette.neutral300,
    justifyContent: 'center',
    alignItems: 'center',
    height: verticalScale(56),
    flexDirection: 'row',
  },
});
