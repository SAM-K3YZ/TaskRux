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

function OnboardingTeam() {
  const [isLoading, setIsLoading] = useState(false);
  const [members, setMembers] = useState([
    { id: '1', email: '', role: 'supervisor' },
  ]);
  const router = useRouter();

  const handleSubmit = async () => {
    // TODO: POST member invites to /api/team/invite before navigating
    router.push('/(auth)/onboarding-launch');
  };

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
        <View style={styles.top}>
          <View style={styles.header}>
            <BackButton color={light.textSecondary} iconSize={28} />
            <Typo size={14} color={light.textSecondary}>Need help?</Typo>
          </View>
          <View style={styles.steps}>
            <OnboardingStep step={3} totalSteps={4} />
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.form}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ gap: spacingY._10, marginBottom: spacingY._15 }}>
            <View style={styles.headerIcon}>
              <Icons.UsersThreeIcon size={verticalScale(24)} color={light.primary} />
            </View>
            <View>
              <Typo size={28} fontWeight={'600'} color={light.textPrimary}>
                Build Your Crew
              </Typo>
              <Typo size={14} color={palette.neutral600}>
                Invite key personnel to manage sites and tasks. Assign roles now to streamline site safety and operations.
              </Typo>
            </View>
          </View>

          <View style={styles.textInputs}>
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
            <AddMemberButton onPress={addMember} />
          </View>

          <View style={styles.footer}>
            <DefaultButton loading={isLoading} onPress={handleSubmit}>
              <Typo fontWeight={'bold'} color={light.textOnPrimary} size={20}>
                Finish Setup
              </Typo>
              <View style={styles.btnIcon}>
                <Icons.ArrowRightIcon color={light.textOnPrimary} size={20} />
              </View>
            </DefaultButton>
            <Typo size={10} color={light.textSecondary} style={styles.footerTxt}>
              Invites will be sent via email immediately.
            </Typo>
          </View>
        </ScrollView>
      </ScreenWrapper>
    </KeyboardAvoidingView>
  );
}

export default OnboardingTeam;

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
  headerIcon: {
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
    marginTop: spacingY._15,
  },
  addBtn: {
    marginTop: spacingY._20,
    marginBottom: spacingY._35,
  },
  btnIcon: {
    marginStart: spacingX._10,
  },
  footer: {
    marginBottom: 140,
    gap: spacingY._10,
  },
  footerTxt: {
    textAlign: 'center',
  },
});
