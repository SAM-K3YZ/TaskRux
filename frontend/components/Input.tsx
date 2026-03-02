import { light, palette, radius, spacingX, spacingY } from '@/constants/theme';
import { InputProps } from '@/types';
import { verticalScale } from '@/utils/styling';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const Input = (props: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const {
    icon,
    containerStyle,
    wrapperStyle,
    inputStyle,
    inputRef,
    label,
    ...textInputProps
  } = props;

  return (
    <View style={[styles.wrapper, wrapperStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.container,
          containerStyle && containerStyle,
          isFocused && styles.primaryBorder,
        ]}
      >
        {icon && icon}
        <TextInput
          style={[styles.input, inputStyle]}
          placeholderTextColor={palette.neutral400}
          ref={inputRef && inputRef}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...textInputProps}
        />
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  wrapper: {
    gap: spacingY._7,
  },
  label: {
    fontSize: verticalScale(16),
    color: light.textPrimary,
    fontWeight: 'bold',
    paddingLeft: spacingX._5,
  },
  container: {
    flexDirection: 'row',
    height: verticalScale(56),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: palette.neutral200,
    borderRadius: radius.full,
    borderCurve: 'continuous',
    paddingHorizontal: spacingX._15,
    backgroundColor: palette.neutral100,
    gap: spacingX._10,
  },
  primaryBorder: {
    borderColor: light.primary,
  },
  input: {
    flex: 1,
    color: light.textPrimary,
    fontSize: verticalScale(14),
  },
});
