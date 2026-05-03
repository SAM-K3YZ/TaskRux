import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { light, palette, radius, spacingY } from '@/constants/theme';
import * as Icon from 'phosphor-react-native';
import { verticalScale } from '@/utils/styling';
import Typo from './Typo';

const SearchInput = () => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Icon.MagnifyingGlassIcon color={light.border} />
        <Typo
          size={verticalScale(14)}
          fontWeight={'200'}
          color={light.textMuted}
        >
          Search projects...
        </Typo>
      </View>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    gap: spacingY._7,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: verticalScale(56),
    gap: spacingY._10,
    borderColor: palette.blueLight,
    padding: spacingY._7,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: radius.full,
    backgroundColor: light.inputBg,
  },
  inputItems: {},
});
