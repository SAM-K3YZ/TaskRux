import ActiveProjectCard from '@/components/ActiveProjectCard';
import OpenIssuesCard from '@/components/OpenIssuesCard';
import Typo from '@/components/Typo';
import { light, palette, spacingX, spacingY } from '@/constants/theme';
import { verticalScale } from '@/utils/styling';
import * as Icon from 'phosphor-react-native';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

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
            style={{ justifyContent: 'flex-start' }}
          >
            Operations
          </Typo>
        </View>
        <View style={styles.topRight}>
          <Pressable>
            <Icon.BellIcon
              size={verticalScale(25)}
              color={light.textSecondary}
            />
          </Pressable>
          <Pressable>
            <Icon.UserCircleIcon
              size={verticalScale(25)}
              color={light.textSecondary}
            />
          </Pressable>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.body}>
          <View style={styles.overviewArea}>
            <View style={styles.overviewRow}>
              <ActiveProjectCard
                number={12}
                subtext="Active Projects"
                newProjectNumber={2}
              />
              <OpenIssuesCard number={5} subtext="Open issues" />
            </View>
            <View style={styles.overviewRow}>
              <OpenIssuesCard
                number={8}
                subtext="Pending Tasks"
                iconBgStyle={palette.blue}
                icon={
                  <Icon.ClipboardTextIcon
                    size={verticalScale(20)}
                    color={palette.blueLight}
                    weight="bold"
                  />
                }
              />
            </View>
          </View>
        </View>
      </ScrollView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacingY._15,
  },
  topLeft: {
    gap: spacingY._5,
  },
  topRight: {
    flexDirection: 'row',
    gap: spacingY._25,
  },
  body: {
    paddingHorizontal: spacingX._5,
  },
  overviewArea: {
    marginVertical: spacingY._30,
    alignItems: 'center',
    gap: 20,
  },
  overviewRow: {
    gap: 20,
    flexDirection: 'row',
  },
});
