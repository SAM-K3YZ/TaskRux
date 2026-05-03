import Typo from '@/components/Typo';
import { light, spacingX, spacingY } from '@/constants/theme';
import { verticalScale } from '@/utils/styling';
import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import * as Icon from 'phosphor-react-native';
import SearchInput from '@/components/SearchInput';
import Input from '@/components/Input';

const ProjectScreen = () => {
  const toNotification = async () => {
    try {
      Alert.alert('Notification Page', 'Screen Coming soon...');
      //router.push('/');
    } catch (error) {
      console.log('error:', error);
    }
    console.log('To notification screen...');
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.topLeft}>
          <Typo
            size={verticalScale(16)}
            color={light.textPrimary}
            fontWeight={'bold'}
            style={{ justifyContent: 'flex-start' }}
          >
            Projects
          </Typo>
        </View>
        <View style={styles.topRight}>
          <Pressable onPress={toNotification}>
            <Icon.BellIcon
              size={verticalScale(25)}
              color={light.textSecondary}
            />
          </Pressable>
        </View>
      </View>

      <View>
        <SearchInput />
      </View>

      <View>
      </View>
    </View>
  );
};

export default ProjectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
    paddingVertical: spacingY._20,
    backgroundColor: light.background,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacingY._10,
    marginTop: spacingY._15,
    alignItems: 'center',
    backgroundColor: light.background,
  },
  topLeft: {
    gap: spacingY._5,
  },
  topRight: {
    flexDirection: 'row',
    gap: spacingY._25,
  },
});
