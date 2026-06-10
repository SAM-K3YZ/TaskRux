import { light, radius, spacingX, spacingY } from '@/constants/theme';
import { AddMemberButtonProps } from '@/types';
import { verticalScale } from '@/utils/styling';
import * as Icons from 'phosphor-react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Typo from './Typo';

export function AddMemberButton({ onPress }: AddMemberButtonProps) {
  return (
    <TouchableOpacity style={styles.addBtn} onPress={onPress}>
      <Icons.PlusIcon
        size={verticalScale(16)}
        color={light.primary}
        weight="bold"
      />
      <Typo size={14} color={light.primary} fontWeight={'600'}>
        Add Another Member
      </Typo>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacingX._7,
    borderWidth: 1.5,
    borderColor: light.primary,
    borderStyle: 'dashed',
    borderRadius: radius._15,
    paddingVertical: spacingY._15,
  },
});
