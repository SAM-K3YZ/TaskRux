import BackButton from '@/src/shared/components/BackButton';
import DefaultButton from '@/src/shared/components/DefaultButton';
import Input from '@/src/shared/components/Input';
import OnboardingStep from '@/src/features/auth/components/OnboardingStep';
import QuickSettings from '@/src/features/auth/components/QuickSettings';
import ScreenWrapper from '@/src/shared/components/ScreenWrapper';
import Typo from '@/src/shared/components/Typo';
import { light, palette, radius, spacingX, spacingY } from '@/src/constants/theme';
import { verticalScale } from '@/src/shared/utils/styling';
import { useRouter } from 'expo-router';
import * as Icons from 'phosphor-react-native';
import React, { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

function OnboardingLaunch() {
  const nameRef = useRef('');
  const siteRef = useRef('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSettings, setSelectedSettings] = useState<string[]>(['alerts']);
  const router = useRouter();

  const handleSubmit = async () => {
    // TODO: POST first project to /api/projects/create then navigate to tabs
    router.push('/(tabs)');
  };

  const handleToggle = (id: string, checked: boolean) => {
    setSelectedSettings((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id),
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
            <OnboardingStep step={4} totalSteps={4} />
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.form}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ gap: spacingY._10, marginBottom: spacingY._15 }}>
            <View style={styles.headerIcon}>
              <Icons.RocketLaunchIcon size={verticalScale(24)} color={light.primary} />
            </View>
            <View>
              <Typo size={28} fontWeight={'600'} color={light.textPrimary}>
                Launch Your First Project
              </Typo>
              <Typo size={14} color={palette.neutral600}>
                {"You're all set! Create a quick project profile to start tracking site activities immediately."}
              </Typo>
            </View>
          </View>

          <View style={styles.textInputs}>
            <Input
              placeholder="e.g. Downtown Office Renovation"
              onChangeText={(val) => { nameRef.current = val; }}
              label="Project Name"
              icon={<Icons.FolderIcon size={verticalScale(26)} color={palette.neutral600} />}
            />
            <Input
              placeholder="e.g. 123 Main St, Springfield"
              onChangeText={(val) => { siteRef.current = val; }}
              label="Site Address"
              icon={<Icons.MapPinIcon size={verticalScale(26)} color={palette.neutral600} />}
            />
            <QuickSettings
              items={[
                { id: 'alerts', label: 'Enable Alerts', icon: Icons.BellIcon },
                { id: 'crew', label: 'Auto-assign Crew', icon: Icons.UserIcon },
              ]}
              selected={selectedSettings}
              onToggle={handleToggle}
            />
          </View>

          <View style={styles.footer}>
            <DefaultButton loading={isLoading} onPress={handleSubmit}>
              <Typo fontWeight={'bold'} color={light.textOnPrimary} size={20}>
                Start Managing
              </Typo>
              <View style={styles.btnIcon}>
                <Icons.CheckCircleIcon color={light.textOnPrimary} size={20} />
              </View>
            </DefaultButton>
            <Typo size={10} color={light.textSecondary} style={styles.footerTxt}>
              Your 14-day trial begins when you create your first project.
            </Typo>
          </View>
        </ScrollView>
      </ScreenWrapper>
    </KeyboardAvoidingView>
  );
}

export default OnboardingLaunch;

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
  btnIcon: {
    marginStart: spacingX._10,
  },
  footer: {
    marginTop: spacingY._25,
    marginBottom: 110,
    gap: spacingY._10,
  },
  footerTxt: {
    textAlign: 'center',
  },
});
