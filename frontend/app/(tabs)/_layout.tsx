import Typo from '@/components/Typo';
import { light, radius, spacingY } from '@/constants/theme';
import { scale, verticalScale } from '@/utils/styling';
import { Tabs } from 'expo-router';
import * as Icons from 'phosphor-react-native';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

function TabLayout() {
  const { width, height } = Dimensions.get('window');
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: spacingY._20,
          left: 16,
          right: 16,
          height: 72,
          elevation: 3,
          backgroundColor: light.surface,
          borderRadius: radius._15,
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
    >
      <Tabs.Screen
        name="project"
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  paddingTop: spacingY._10,
                  width: width / 5,
                }}
              >
                {/* Home */}
                <Icons.CraneIcon
                  size={verticalScale(20)}
                  color={focused ? light.primary : light.textSecondary}
                  weight={focused ? 'fill' : 'regular'}
                />
                <Typo
                  color={focused ? light.primary : light.textSecondary}
                  size={verticalScale(12)}
                  style={{ marginTop: 4 }}
                >
                  Projects
                </Typo>
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="task"
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  paddingTop: spacingY._10,
                  width: width / 5,
                }}
              >
                {/* Task */}
                <Icons.ListChecksIcon
                  size={verticalScale(20)}
                  color={focused ? light.primary : light.textSecondary}
                  weight={focused ? 'fill' : 'regular'}
                />
                <Typo
                  color={focused ? light.primary : light.textSecondary}
                  size={verticalScale(12)}
                  style={{ marginTop: 4 }}
                >
                  Task
                </Typo>
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  height: verticalScale(60),
                  width: scale(60),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: radius.full,
                  backgroundColor: light.primaryDark,
                  marginBottom: spacingY._30,
                }}
              >
                {/* Home */}
                <Icons.HouseIcon
                  size={verticalScale(24)}
                  color={light.textOnPrimary}
                  weight="fill"
                />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="workers"
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  paddingTop: spacingY._10,
                  width: width / 5,
                }}
              >
                {/* Workers */}
                <Icons.HardHatIcon
                  size={verticalScale(20)}
                  color={focused ? light.primary : light.textSecondary}
                  weight={focused ? 'fill' : 'regular'}
                />
                <Typo
                  color={focused ? light.primary : light.textSecondary}
                  size={verticalScale(12)}
                  style={{ marginTop: 4 }}
                >
                  Workers
                </Typo>
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  paddingTop: spacingY._10,
                  width: width / 5,
                }}
              >
                {/* Profile */}
                <Icons.GearIcon
                  size={verticalScale(20)}
                  color={focused ? light.primary : light.textSecondary}
                  weight={focused ? 'fill' : 'regular'}
                />
                <Typo
                  color={focused ? light.primary : light.textSecondary}
                  size={verticalScale(12)}
                  style={{ marginTop: 4 }}
                >
                  Settings
                </Typo>
              </View>
            );
          },
        }}
      />
    </Tabs>
  );
}

export default TabLayout;

const styles = StyleSheet.create({});
