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

function OnboardingLocation() {
  const addressRef = useRef('');
  const cityRef = useRef('');
  const stateRef = useRef('');
  const postalRef = useRef('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    // TODO: validate and POST to /api/company/location before navigating
    router.push('/(auth)/onboarding-team');
  };

  const viewMap = () => {
    // TODO: open native maps or embedded map picker
    Alert.alert('Map', 'Map picker coming soon.');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScreenWrapper>
        <View style={styles.container}>
          <View style={styles.top}>
            <View style={styles.header}>
              <BackButton color={light.textSecondary} iconSize={28} />
              <Typo size={14} color={light.textSecondary}>Need help?</Typo>
            </View>
            <View style={styles.steps}>
              <OnboardingStep step={2} totalSteps={4} />
            </View>
          </View>

          <ScrollView
            contentContainerStyle={styles.form}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ gap: spacingY._10, marginBottom: spacingY._15 }}>
              <View style={styles.headerIcon}>
                <Icons.MapPinIcon size={verticalScale(24)} color={light.primary} />
              </View>
              <View>
                <Typo size={28} fontWeight={'600'} color={light.textPrimary}>
                  Where are you based?
                </Typo>
                <Typo size={14} color={palette.neutral600}>
                  We need your headquarters address for official documentation and localized compliance settings.
                </Typo>
              </View>
            </View>

            <View style={styles.textInputs}>
              <Input
                placeholder="e.g. 123 Construction Way..."
                onChangeText={(val) => { addressRef.current = val; }}
                label="Headquarters Address"
                icon={<Icons.MagnifyingGlassIcon size={verticalScale(26)} color={palette.neutral600} />}
              />

              <ImageBackground
                source={require('../../assets/images/map_image_wrapper.png')}
                style={styles.mapArea}
                imageStyle={{ borderRadius: radius._15 }}
              >
                <Pressable onPress={viewMap}>
                  <View style={styles.mapButton}>
                    <Icons.MapTrifoldIcon size={verticalScale(20)} color={light.primary} />
                    <Typo color={light.primary} size={verticalScale(14)} fontWeight={'bold'}>
                      Verify Location on Map
                    </Typo>
                  </View>
                </Pressable>
                <Typo color={palette.neutral400} size={verticalScale(12)} fontWeight={'semibold'}>
                  Tap to pin exact location
                </Typo>
              </ImageBackground>

              <View style={styles.twoInputs}>
                <Input
                  placeholder="City"
                  label="City"
                  onChangeText={(val) => { cityRef.current = val; }}
                  wrapperStyle={{ flex: 1 }}
                />
                <Input
                  placeholder="State"
                  label="State / Province"
                  onChangeText={(val) => { stateRef.current = val; }}
                  wrapperStyle={{ flex: 1 }}
                />
              </View>

              <Input
                placeholder="e.g. 230226"
                onChangeText={(val) => { postalRef.current = val; }}
                label="Postal Code"
              />
            </View>

            <View style={styles.footer}>
              <DefaultButton loading={isLoading} onPress={handleSubmit}>
                <Typo fontWeight={'bold'} color={light.textOnPrimary} size={20}>
                  Continue to Team
                </Typo>
                <View style={styles.btnIcon}>
                  <Icons.UsersThreeIcon color={light.textOnPrimary} size={20} />
                </View>
              </DefaultButton>
            </View>
          </ScrollView>
        </View>
      </ScreenWrapper>
    </KeyboardAvoidingView>
  );
}

export default OnboardingLocation;

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
  mapArea: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacingX._5,
  },
  twoInputs: {
    flexDirection: 'row',
    gap: spacingX._10,
  },
  btnIcon: {
    marginStart: spacingX._10,
  },
  footer: {
    marginTop: spacingY._25,
    marginBottom: 110,
  },
});
