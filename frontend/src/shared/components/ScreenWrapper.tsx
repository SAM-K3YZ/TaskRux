import { dark, palette } from '@/src/constants/theme';
import { ScreenWrapperProps } from '@/src/types';
import React from 'react';
import {
  Dimensions,
  ImageBackground,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

const { height } = Dimensions.get('window');

const ScreenWrapper = ({
  style,
  children,
  showBg = false,
  isModal = false,
  bgOpacity = 1,
}: ScreenWrapperProps) => {
  let paddingTop = Platform.OS === 'ios' ? height * 0.06 : 40;
  let paddingBottom = 0;

  if (isModal) {
    paddingTop = Platform.OS === 'ios' ? height * 0.02 : 45;
    paddingBottom = height * 0.02;
  }

  return (
    <ImageBackground
      style={{
        flex: 1,
        backgroundColor: isModal ? dark.textOnPrimary : palette.neutral900,
      }}
      imageStyle={{ opacity: showBg ? bgOpacity : 0 }}
      source={require('@/assets/images/bgImage.png')}
    >
      <View style={[{ paddingTop, paddingBottom, flex: 1 }, style]}>
        <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} />
        {children}
      </View>
    </ImageBackground>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
