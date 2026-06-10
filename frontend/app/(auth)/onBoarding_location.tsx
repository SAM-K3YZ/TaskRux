import BackButton from '@/src/shared/components/BackButton';
import DefaultButton from '@/src/shared/components/DefaultButton';
import Input from '@/src/shared/components/Input';
import OnboardingStep from '@/src/features/auth/components/OnboardingStep';
import ScreenWrapper from '@/src/shared/components/ScreenWrapper';
import Typo from '@/src/shared/components/Typo';
import { light, palette, radius, spacingX, spacingY } from '@/src/constants/theme';
import { verticalScale } from '@/src/shared/utils/styling';
import { useRouter } from 'expo-router';
import * as Icons from 'phosphor-react-native';
import React, { useRef, useState } from 'react';
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

function OnBoarding_location() {
  const addressRef = useRef('');
  const cityRef = useRef('');
  const stateRef = useRef('');
  const codeRef = useRef('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async () => {
    // if (!addressRef.current || !cityRef.current || !stateRef.current) {
    //   Alert.alert(
    //     "Continue to team...",
    //     "Please fill all the fields with astericks(*)",
    //   );
    //   return;
    // }
    router.push('/(auth)/onBoarding_team');
    console.log('To onboarding team screen...');
  };

  const viewMap = async () => {
    try {
      Alert.alert('Map', 'Feature coming soon');
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
                <OnboardingStep step={2} totalSteps={4} />
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
                  <Icons.MapPinIcon
                    size={verticalScale(24)}
                    color={light.primary}
                  />
                </View>
                {/* Header text*/}
                <View>
                  <Typo size={28} fontWeight={'600'} color={light.textPrimary}>
                    Where are you based?
                  </Typo>
                  <Typo size={14} color={palette.neutral600}>
                    We need your headquaters address for offical documentation
                    and locailzed compilance settings.
                  </Typo>
                </View>
              </View>

              <View style={styles.textInputs}>
                {/*Address Input*/}
                <Input
                  placeholder="e.g. 123 Construction Way..."
                  onChangeText={(value: string) => {
                    addressRef.current = value;
                    console.log('Address: ', value);
                  }}
                  label="Headquaters Address"
                  style={{ flex: 1 }}
                  icon={
                    <Icons.MagnifyingGlassIcon
                      size={verticalScale(26)}
                      color={palette.neutral600}
                    />
                  }
                />
                {/*Map */}
                <ImageBackground
                  source={require('../../assets/images/map_image_wrapper.png')}
                  style={styles.mapArea}
                  imageStyle={{ borderRadius: radius._15 }}
                >
                  <Pressable onPress={viewMap}>
                    <View style={styles.mapButton}>
                      <Icons.MapTrifoldIcon
                        size={verticalScale(20)}
                        color={light.primary}
                      />
                      <Typo
                        color={light.primary}
                        size={verticalScale(14)}
                        fontWeight={'bold'}
                      >
                        Verify Location on Map
                      </Typo>
                    </View>
                  </Pressable>
                  <Typo
                    color={palette.neutral400}
                    size={verticalScale(12)}
                    fontWeight={'semibold'}
                  >
                    Tap to pin exact location
                  </Typo>
                </ImageBackground>

                {/*City & State */}
                <View style={styles.twoInputs}>
                  <Input
                    placeholder="City"
                    label="City"
                    onChangeText={(value: string) => {
                      cityRef.current = value;
                    }}
                    wrapperStyle={{ flex: 1 }}
                  />
                  <Input
                    placeholder="State"
                    label="State/Province"
                    onChangeText={(value: string) => {
                      stateRef.current = value;
                    }}
                    wrapperStyle={{ flex: 1 }}
                  />
                </View>
                {/*Postal Code Input*/}
                <Input
                  placeholder="e.g. 230226"
                  onChangeText={(value: string) => {
                    codeRef.current = value;
                    console.log('Postal code: ', value);
                  }}
                  label="State/Province"
                  style={{ flex: 1 }}
                />
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
                      Continue to Teams
                    </Typo>
                    <View style={styles.btnIcon}>
                      <Icons.UsersThreeIcon
                        color={light.textOnPrimary}
                        size={20}
                      />
                    </View>
                  </DefaultButton>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </ScreenWrapper>
    </KeyboardAvoidingView>
  );
}
export default OnBoarding_location;

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
