import Typo from '@/components/Typo';
import { light, radius, spacingY } from '@/constants/theme';
import { scale, verticalScale } from '@/utils/styling';
import { Tabs } from 'expo-router';
import * as Icons from 'phosphor-react-native';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function TabLayout() {
  const { width, height } = Dimensions.get('window');
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: insets.bottom + spacingY._10,
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
                {/* Projects */}
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
            if (focused) {
              // FAB when active
              return (
                <View style={styles.fabWrapper}>
                  <View style={styles.fab}>
                    <Icons.HouseIcon
                      size={verticalScale(24)}
                      color={light.textOnPrimary}
                      weight="fill"
                    />
                  </View>
                </View>
              );
            }

            // Regular tab icon when not active
            return (
              <View
                style={{
                  alignItems: 'center',
                  paddingTop: spacingY._10,
                  width: width / 5,
                }}
              >
                <Icons.HouseIcon
                  size={verticalScale(20)}
                  color={light.textSecondary}
                  weight="regular"
                />
                <Typo
                  color={light.textSecondary}
                  size={verticalScale(12)}
                  style={{ marginTop: 4 }}
                >
                  Home
                </Typo>
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

const styles = StyleSheet.create({
  fabWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    top: -28,
  },
  fab: {
    height: verticalScale(62),
    width: scale(62),
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: light.primaryDark,
    elevation: 5,
    shadowColor: light.primary,
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    borderWidth: 4,
    borderColor: light.background,
  },
});
