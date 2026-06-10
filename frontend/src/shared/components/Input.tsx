import { light, palette, radius, spacingX, spacingY } from '@/constants/theme';
import { InputProps } from '@/types';
import { verticalScale } from '@/utils/styling';
import * as Icons from 'phosphor-react-native';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Typo from './Typo';

const Input = (props: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    icon,
    containerStyle,
    wrapperStyle,
    inputStyle,
    inputRef,
    label,
    helpText,
    labelStyle,
    helpTextStyle,
    onHelpTextPress,
    inputType = 'text',
    ...textInputProps
  } = props;

  const isPassword = inputType === 'password';
  const keyboardType = inputType === 'number' ? 'numeric' : 'default';

  return (
    <View style={[styles.wrapper, wrapperStyle]}>
      <View style={styles.labelArea}>
        {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
        {helpText && (
          <TouchableOpacity
            onPress={onHelpTextPress}
            disabled={!onHelpTextPress}
          >
            <Typo
              color={light.primary}
              size={verticalScale(13)}
              style={helpTextStyle}
            >
              {helpText}
            </Typo>
          </TouchableOpacity>
        )}
      </View>
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
          secureTextEntry={isPassword && !showPassword}
          keyboardType={keyboardType}
          {...textInputProps}
        />

        {/* Eye icon only for password */}
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
            {showPassword ? (
              <Icons.EyeIcon
                size={verticalScale(20)}
                color={palette.neutral400}
              />
            ) : (
              <Icons.EyeSlashIcon
                size={verticalScale(20)}
                color={palette.neutral400}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    gap: spacingY._7,
  },
  labelArea: {
    justifyContent: 'space-between',
    flexDirection: 'row',
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
