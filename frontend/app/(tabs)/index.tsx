import ActiveProjectCard from '@/src/features/dashboard/components/ActiveProjectCard';
import DeliveryCard from '@/src/features/dashboard/components/DeliveryCard';
import OpenIssuesCard from '@/src/features/dashboard/components/OpenIssuesCard';
import SiteOverviewCard from '@/src/features/dashboard/components/SiteOverviewCard';
import Typo from '@/src/shared/components/Typo';
import WorkersOnSiteCard from '@/src/features/dashboard/components/WorkersOnSiteCard';
import WorkersTaskCard from '@/src/features/tasks/components/WorkersTaskCard';
import WorkReportCard from '@/src/features/reports/components/WorkReportCard';
import { light, palette, spacingX, spacingY } from '@/src/constants/theme';
import { verticalScale } from '@/src/shared/utils/styling';
import * as Icon from 'phosphor-react-native';
import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const toProfile = () => {
    router.push('/profile');
  };
  const toNotification = () => {
    router.push('/notifications');
  };
  const toViewAllRecentsActivities = async () => {
    try {
      Alert.alert('Recent Activities', 'Screen Coming soon...');
      //router.push('/');
    } catch (error) {
      console.log('error:', error);
    }
    console.log('To view all recent activity screen...');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
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
          <Pressable onPress={toNotification}>
            <Icon.BellIcon
              size={verticalScale(25)}
              color={light.textSecondary}
            />
          </Pressable>
          <Pressable onPress={toProfile}>
            <Icon.UserCircleIcon
              size={verticalScale(25)}
              color={light.textSecondary}
            />
          </Pressable>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spacingY._80 }}
      >
        <View style={styles.body}>
          {/* Overview section */}
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
                iconBgStyle={palette.blueLight}
                icon={
                  <Icon.ClipboardTextIcon
                    size={verticalScale(20)}
                    color={palette.blue}
                    weight="bold"
                  />
                }
              />
              <WorkersOnSiteCard
                number={45}
                subtext="Workers On Site"
                workers={[
                  {
                    id: '1',
                    name: 'John Doe',
                    image: 'https://i.pravatar.cc/100?img=1',
                  },
                  {
                    id: '2',
                    name: 'Sarah J',
                    image: 'https://i.pravatar.cc/100?img=2',
                  },
                ]}
              />
            </View>
          </View>

          {/* Recent Activity section */}
          <View>
            <View style={styles.sectionHeader}>
              <Typo
                size={verticalScale(16)}
                color={light.textPrimary}
                fontWeight={'bold'}
              >
                Recent Activity
              </Typo>
              <Pressable onPress={toViewAllRecentsActivities}>
                <Typo
                  size={verticalScale(12)}
                  color={palette.blue}
                  fontWeight={'regular'}
                >
                  View All
                </Typo>
              </Pressable>
            </View>

            {/* Activities cards */}
            <View style={styles.actvityCardContainer}>
              {/* task card */}
              <WorkersTaskCard
                worker={{
                  id: '1',
                  name: 'John Doe',
                  image: 'https://i.pravatar.cc/100?img=1',
                }}
                task="Foundation inspection"
                time="10 mins ago"
              />

              {/* safetly report card */}
              <WorkReportCard
                title="Safety report submitted"
                site="Rumuigbo Town"
                time="1 hour ago"
                status="submitted"
              />

              {/* delivery card */}
              <DeliveryCard
                title="Material delivery delayed"
                site="Site B - Residential Block"
                time="2 hours ago"
                type="material"
                status="warning"
              />

              {/* delivery card */}
              <DeliveryCard
                title="Excavator arrived on site"
                site="Site C - Marina Tower"
                time="30 mins ago"
                type="machine"
                status="success"
              />
            </View>
          </View>

          {/* Site Overview */}
          <View style={styles.sectionHeader}>
            <Typo
              size={verticalScale(16)}
              color={light.textPrimary}
              fontWeight={'bold'}
            >
              Site Overview
            </Typo>
          </View>
          <SiteOverviewCard
            siteName="Downtown Complex"
            address="452 Main St."
            mapImage=""
          />
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
  body: {
    paddingHorizontal: spacingX._5,
  },
  overviewArea: {
    marginVertical: spacingY._10,
    alignItems: 'center',
    gap: 20,
  },
  overviewRow: {
    gap: 20,
    flexDirection: 'row',
  },
  sectionHeader: {
    marginBottom: spacingY._10,
    marginTop: spacingY._10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actvityCardContainer: {
    marginTop: spacingY._10,
    gap: spacingY._15,
  },
});
