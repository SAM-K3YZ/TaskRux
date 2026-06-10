import { AddMemberButton } from '@/src/features/auth/components/AddMemberButton';
import BackButton from '@/src/shared/components/BackButton';
import DefaultButton from '@/src/shared/components/DefaultButton';
import OnboardingStep from '@/src/features/auth/components/OnboardingStep';
import ScreenWrapper from '@/src/shared/components/ScreenWrapper';
import TeamMemberCard from '@/src/features/auth/components/TeamMemberCard';
import Typo from '@/src/shared/components/Typo';
import { light, palette, radius, spacingX, spacingY } from '@/src/constants/theme';
import { verticalScale } from '@/src/shared/utils/styling';
import { useRouter } from 'expo-router';
import * as Icons from 'phosphor-react-native';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

function OnBoarding_team() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async () => {
    //logic
    router.push('/(auth)/onBoarding_projectLanunch');
    console.log('To onboarding project launch screen...');
  };

  const [members, setMembers] = useState([
    { id: '1', email: '', role: 'supervisor' },
  ]);

  const addMember = () => {
    setMembers((prev) => [
      ...prev,
      { id: Date.now().toString(), email: '', role: 'worker' },
    ]);
  };

  const removeMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const updateMember = (id: string, field: 'email' | 'role', value: string) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m)),
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScreenWrapper style={styles.container}>
        {/*Screen Top */}
        <View style={styles.top}>
          <View style={styles.header}>
            <BackButton color={light.textSecondary} iconSize={28} />
            <Typo size={14} color={light.textSecondary}>
              Need help?
            </Typo>
          </View>
          {/*Progressional steps */}
          <View>
            <View style={styles.steps}>
              <OnboardingStep step={3} totalSteps={4} />
            </View>
          </View>
        </View>

        {/*Form area */}
        <View>
          <ScrollView
            contentContainerStyle={styles.form}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ gap: spacingY._10, marginBottom: spacingY._15 }}>
              {/* Header icon*/}
              <View style={styles.headerContainer}>
                <Icons.UsersThreeIcon
                  size={verticalScale(24)}
                  color={light.primary}
                />
              </View>
              {/* Header text*/}
              <View>
                <Typo size={28} fontWeight={'600'} color={light.textPrimary}>
                  Build Your Crew
                </Typo>
                <Typo size={14} color={palette.neutral600}>
                  invite key personnel to manage sites and tasks. Assign roles
                  now to streamline site safety and operations.
                </Typo>
              </View>
            </View>

            <View style={styles.textInputs}>
              {/*Cards Input*/}
              {members.map((member, index) => (
                <TeamMemberCard
                  key={member.id}
                  member={member}
                  index={index}
                  isFirst={index === 0 && members.length === 1}
                  onRemove={removeMember}
                  onUpdate={updateMember}
                />
              ))}
            </View>

            <View style={styles.addBtn}>
              {/*New Member Button */}
              <AddMemberButton onPress={addMember} />
            </View>

            {/*Footer*/}
            <View style={styles.footer}>
              {/*Next Button*/}
              <View style={styles.nextBtn}>
                <DefaultButton loading={isLoading} onPress={handleSubmit}>
                  <Typo
                    fontWeight={'bold'}
                    color={light.textOnPrimary}
                    size={20}
                  >
                    Finish Setup
                  </Typo>
                  <View style={styles.btnIcon}>
                    <Icons.ArrowRightIcon
                      color={light.textOnPrimary}
                      size={20}
                    />
                  </View>
                </DefaultButton>
              </View>

              {/* Email Invite text*/}
              <Typo
                size={10}
                color={light.textSecondary}
                style={styles.footerTxt}
              >
                Invites will be sent voa email immediately.
              </Typo>
            </View>
          </ScrollView>
        </View>
      </ScreenWrapper>
    </KeyboardAvoidingView>
  );
}

export default OnBoarding_team;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: light.background,
  },
  top: {
    paddingHorizontal: spacingX._20,
    paddingTop: spacingY._15,
    paddingBottom: spacingY._10,
  },
  header: {
    paddingBottom: spacingY._15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContainer: {
    alignSelf: 'flex-start',
    padding: spacingY._15,
    backgroundColor: light.primaryLight,
    borderRadius: radius._15,
  },
  steps: {
    marginBottom: spacingY._15,
  },
  form: {
    paddingHorizontal: spacingX._20,
    paddingBottom: spacingY._30,
  },
  textInputs: {
    gap: spacingY._15,
    marginTop: spacingX._15,
  },
  mapArea: {
    height: 120,
    marginTop: spacingY._10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapButton: {
    columnGap: spacingX._5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  twoInputs: {
    flexDirection: 'row',
    gap: spacingX._10,
  },
  addBtn: {
    marginTop: spacingY._20,
    marginBottom: spacingY._35,
  },
  nextBtn: {
    marginTop: spacingY._25,
    gap: spacingY._15,
  },
  btnIcon: {
    marginStart: spacingY._10,
  },
  footer: {
    marginBottom: 140,
  },
  footerTxt: {
    marginTop: spacingY._10,

    textAlign: 'center',
  },
});
