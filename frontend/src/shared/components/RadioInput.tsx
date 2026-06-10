import { light, palette, radius, spacingX } from '@/src/constants/theme';
import { RadioInputProps } from '@/src/types';
import { verticalScale } from '@/src/shared/utils/styling';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Typo from './Typo';

const RadioInput = ({
  label,
  value,
  selectedValue,
  onPress,
  icon,
  containerStyle,
  disabled = false,
}: RadioInputProps) => {
  const isSelected = selectedValue === value;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      onPress={() => onPress(value)}
      style={[
        styles.container,
        isSelected && styles.selectedContainer,
        disabled && styles.disabled,
        containerStyle,
      ]}
    >
      {/* Radio Circle */}
      <View
        style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}
      >
        {isSelected && <View style={styles.radioInner} />}
      </View>

      {/* Optional Icon */}
      {icon && (
        <View style={styles.iconWrapper}>
          {React.createElement(icon, {
            size: verticalScale(20),
            color: isSelected ? light.primary : palette.neutral600,
            weight: isSelected ? 'fill' : 'regular',
          })}
        </View>
      )}

      {/* Label */}
      <Typo
        size={16}
        fontWeight={isSelected ? '600' : '500'}
        color={isSelected ? light.primary : light.textPrimary}
        style={styles.label}
      >
        {label}
      </Typo>
    </TouchableOpacity>
  );
};

export default RadioInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(56),
    paddingHorizontal: spacingX._15,
    borderWidth: 1.5,
    borderColor: palette.neutral300,
    borderRadius: radius.full,
    backgroundColor: light.surface,
  },

  selectedContainer: {
    borderColor: light.primary,
    backgroundColor: '#fff7ed',
  },

  disabled: {
    opacity: 0.5,
  },

  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: palette.neutral400,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacingX._12,
  },

  radioOuterSelected: {
    borderColor: light.primary,
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: light.primary,
  },

  iconWrapper: {
    marginRight: spacingX._12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  label: {
    flex: 1,
  },
});
