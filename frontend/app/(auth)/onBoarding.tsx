import BackButton from '@/src/shared/components/BackButton';
import DefaultButton from '@/src/shared/components/DefaultButton';
import OnboardingStep from '@/src/features/auth/components/OnboardingStep';
import RadioInput from '@/src/shared/components/RadioInput';
import ScreenWrapper from '@/src/shared/components/ScreenWrapper';
import Typo from '@/src/shared/components/Typo';
import { light, palette, radius, spacingX, spacingY } from '@/src/constants/theme';
import { verticalScale } from '@/src/shared/utils/styling';
import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Icons from 'phosphor-react-native';
import React, { useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Input from '@/src/shared/components/Input';

function Onboarding() {
  const nameRef = useRef('');
  const licenseRef = useRef('');
  const emailRef = useRef('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [selected, setSelected] = useState('general');

  const handleSubmit = async () => {
    // TODO: validate fields and POST to /api/company/setup
    router.push('/(auth)/onboarding-location');
  };

  const handleFileUpload = async () => {
    try {
      // TODO: wire up image picker / file upload
      Alert.alert('Company Logo', 'Feature coming soon...');
    } catch (error) {
      Alert.alert('Error', 'Failed to upload file');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScreenWrapper>
        <View style={styles.container}>
          {/* Header + progress */}
          <View style={styles.top}>
            <View style={styles.header}>
              <BackButton color={light.textSecondary} iconSize={28} />
              <Typo size={14} color={light.textSecondary}>
                Need help?
              </Typo>
            </View>
            <View style={styles.steps}>
              <OnboardingStep step={1} totalSteps={4} />
            </View>
          </View>

          {/* Form */}
          <ScrollView
            contentContainerStyle={styles.form}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ gap: spacingY._10, marginBottom: spacingY._15 }}>
              <View style={styles.headerContainer}>
                <Icons.BuildingOfficeIcon
                  size={verticalScale(24)}
                  color={light.primary}
                />
              </View>
              <View>
                <Typo size={28} fontWeight={'600'} color={light.textPrimary}>
                  {"Let's set up your company"}
                </Typo>
                <Typo size={14} color={palette.neutral600}>
                  Enter your legal business details to start managing your
                  sites and workers efficiently.
                </Typo>
              </View>
            </View>

            <View style={styles.textInputs}>
              <Input
                placeholder="Enter your company name"
                onChangeText={(value: string) => { nameRef.current = value; }}
                label="Company Name"
                icon={
                  <Icons.UserIcon
                    size={verticalScale(26)}
                    color={palette.neutral600}
                  />
                }
              />
              <Input
                placeholder="Enter your company email address"
                label="Company Email Address"
                onChangeText={(value: string) => { emailRef.current = value; }}
                icon={
                  <Icons.AtIcon
                    size={verticalScale(20)}
                    color={palette.neutral600}
                  />
                }
              />
              <Input
                placeholder="e.g. RC-1234567"
                onChangeText={(value: string) => { licenseRef.current = value; }}
                label="Company Registered License"
                icon={
                  <Icons.CertificateIcon
                    size={verticalScale(26)}
                    color={palette.neutral600}
                  />
                }
              />
            </View>

            {/* Industry selector */}
            <View style={styles.radioGroup}>
              <Typo size={16} fontWeight={'bold'} color={light.textPrimary}>
                Primary Industry
              </Typo>
              <View style={styles.radioBtns}>
                <RadioInput
                  label="General Contracting"
                  value="general"
                  selectedValue={selected}
                  onPress={setSelected}
                  icon={Icons.HouseIcon}
                />
                <RadioInput
                  label="Electrical"
                  value="electrical"
                  selectedValue={selected}
                  onPress={setSelected}
                  icon={Icons.LightningIcon}
                />
                <RadioInput
                  label="Plumbing & HVAC"
                  value="plumbing"
                  selectedValue={selected}
                  onPress={setSelected}
                  icon={Icons.DropIcon}
                />
                <RadioInput
                  label="Civil Engineering"
                  value="civil"
                  selectedValue={selected}
                  onPress={setSelected}
                  icon={Icons.CraneIcon}
                />
              </View>
            </View>

            {/* Logo upload */}
            <View style={styles.companyLogo}>
              <Typo size={16} color={light.textPrimary} fontWeight={'bold'}>
                Company Logo
              </Typo>
              <Pressable onPress={handleFileUpload}>
                <View style={styles.uploadArea}>
                  <Icons.UploadSimpleIcon
                    size={verticalScale(20)}
                    color={light.textSecondary}
                  />
                  <Typo
                    color={light.primary}
                    size={verticalScale(14)}
                    fontWeight={'bold'}
                  >
                    Tap to upload
                  </Typo>
                </View>
              </Pressable>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <DefaultButton loading={isLoading} onPress={handleSubmit}>
                <Typo fontWeight={'bold'} color={light.textOnPrimary} size={20}>
                  Continue to Location
                </Typo>
                <View style={styles.btnIcon}>
                  <FontAwesome6
                    name="arrow-right"
                    color={light.textOnPrimary}
                    size={18}
                  />
                </View>
              </DefaultButton>
              <Typo size={10} color={light.textSecondary} style={styles.footerTxt}>
                By continuing, you agree to our Terms and Services
              </Typo>
            </View>
          </ScrollView>
        </View>
      </ScreenWrapper>
    </KeyboardAvoidingView>
  );
}

export default Onboarding;

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
    padding: spacingX._15,
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
  radioGroup: {
    marginTop: spacingY._20,
  },
  radioBtns: {
    marginTop: spacingY._15,
    gap: spacingY._12,
  },
  companyLogo: {
    marginTop: spacingY._20,
  },
  uploadArea: {
    height: 120,
    marginTop: spacingY._10,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderColor: light.border,
    borderWidth: 2,
    borderRadius: radius._10,
  },
  footer: {
    marginTop: spacingY._25,
    marginBottom: 140,
    gap: spacingY._15,
  },
  btnIcon: {
    marginStart: spacingX._10,
  },
  footerTxt: {
    textAlign: 'center',
  },
});
