import BackButton from '@/components/BackButton';
import DefaultButton from '@/components/DefaultButton';
import OnboardngStep from '@/components/OnboardngStep';
import RadioInput from '@/components/RadioInput';
import ScreenWrapper from '@/components/ScreenWrapper';
import Typo from '@/components/Typo';
import { light, palette, radius, spacingX, spacingY } from '@/constants/theme';
import { verticalScale } from '@/utils/styling';
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
import Input from '../../components/Input';

function OnBoarding() {
  const nameRef = useRef('');
  const licenseRef = useRef('');
  const emailRef = useRef('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [selected, setSelected] = useState('general');
  const handleSubmit = async () => {
    // if (!nameRef.current || !emailRef.current || !licenseRef.current) {
    //   Alert.alert(
    //     "Continue to location...",
    //     "Please fill all the fields with astericks(*)",
    //   );
    //   return;
    // }
    router.push('/(auth)/onBoarding_location');
    console.log('To onboarding location screen...');
  };
  const handleFileUpload = async () => {
    try {
      // file upload logic here
      Alert.prompt('Company logo', 'Feature coming soon...');
      console.log('File upload initiated');
    } catch (error) {
      Alert.alert('Error', 'Failed to upload file');
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScreenWrapper>
        <View style={styles.container}>
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
                <OnboardngStep step={1} totalSteps={4} />
              </View>
            </View>
          </View>

          {/*Screen Middle */}
          <View>
            <ScrollView
              contentContainerStyle={styles.form}
              showsVerticalScrollIndicator={false}
            >
              <View style={{ gap: spacingY._10, marginBottom: spacingY._15 }}>
                {/* Header icon*/}
                <View style={styles.headerContainer}>
                  <Icons.BuildingOfficeIcon
                    size={verticalScale(24)}
                    color={light.primary}
                  />
                </View>
                {/* Header text*/}
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
                {/*Company Input*/}
                <Input
                  placeholder="Enter your company name"
                  onChangeText={(value: string) => {
                    nameRef.current = value;
                    console.log('name: ', value);
                  }}
                  label="Company Name"
                  icon={
                    <Icons.UserIcon
                      size={verticalScale(26)}
                      color={palette.neutral600}
                    />
                  }
                />
                {/*Company Email Input*/}
                <Input
                  placeholder="Enter your company email address"
                  label="Company Email Address"
                  onChangeText={(value: string) => {
                    emailRef.current = value;
                    console.log('email: ', value);
                  }}
                  icon={
                    <Icons.AtIcon
                      size={verticalScale(20)}
                      color={palette.neutral600}
                    />
                  }
                />
                {/*Company License Number Input*/}
                <Input
                  placeholder="e.g. RC-1234567"
                  onChangeText={(value: string) => {
                    licenseRef.current = value;
                    console.log('license: ', value);
                  }}
                  label="Company Registered License"
                  icon={
                    <Icons.CertificateIcon
                      size={verticalScale(26)}
                      color={palette.neutral600}
                    />
                  }
                />
              </View>

              {/*Company Industry*/}
              <View style={styles.radioGroup}>
                <View>
                  <Typo size={16} fontWeight={'bold'} color={light.textPrimary}>
                    Primary Industry
                  </Typo>
                </View>
                {/*Radio buttons*/}
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
                    value="plumbling"
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

              {/*Company log upload */}
              <View style={styles.companyLogo}>
                <View>
                  <Typo size={16} color={light.textPrimary} fontWeight={'bold'}>
                    Company Logo
                  </Typo>
                </View>
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
                </View>

                {/* Terms*/}
                <Typo
                  size={10}
                  color={light.textSecondary}
                  style={styles.footerTxt}
                >
                  By continuing, you agree to our Terms and Services
                </Typo>
              </View>
            </ScrollView>
          </View>
        </View>
      </ScreenWrapper>
    </KeyboardAvoidingView>
  );
}

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
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
  radioGroup: {
    marginTop: spacingY._20,
  },
  radioBtns: {
    marginTop: spacingX._15,
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
    borderCurve: 'continuous',
  },
  nextBtn: {
    marginTop: spacingY._25,
    gap: spacingY._15,
  },
  btnIcon: {
    marginStart: spacingY._10,
  },
  footer: {
    marginBottom: 110,
  },
  footerTxt: {
    marginTop: spacingY._10,
    textAlign: 'center',
  },
});
