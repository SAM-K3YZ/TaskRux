import Typo from '@/components/Typo';
import { light, spacingX, spacingY } from '@/constants/theme';
import { verticalScale } from '@/utils/styling';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.topLeft}>
          <Typo
            size={verticalScale(13)}
            color={light.textSecondary}
            fontWeight={'medium'}
          >
            WELCOME BACK
          </Typo>
          <Typo
            size={verticalScale(16)}
            color={light.textPrimary}
            fontWeight={'bold'}
          >
            Operations
          </Typo>
        </View>
      </View>
      <ScrollView></ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
    paddingVertical: spacingY._20,
    backgroundColor: light.background,
  },
  top: {
    justifyContent: 'space-between',
  },
  topLeft: {
    flexDirection: 'row',
  },
});
