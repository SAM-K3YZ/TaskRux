import { light, radius, spacingX, spacingY } from '@/src/constants/theme';
import { AddMemberButtonProps } from '@/src/types';
import { verticalScale } from '@/src/shared/utils/styling';
import * as Icons from 'phosphor-react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Typo from '@/src/shared/components/Typo';


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
