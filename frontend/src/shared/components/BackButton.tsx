import { palette } from '@/src/constants/theme';
import { BackButtonProps } from '@/src/types';
import { verticalScale } from '@/src/shared/utils/styling';
import { useRouter } from 'expo-router';
import { CaretLeftIcon } from 'phosphor-react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
const BackButton = ({
  style,
  iconSize = 26,
  color = palette.brandOrange,
}: BackButtonProps) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.back()}
      style={style}
    >
      <CaretLeftIcon
        size={verticalScale(iconSize)}
        color={color}
        weight="bold"
      />
    </TouchableOpacity>
  );
};

export default BackButton;
