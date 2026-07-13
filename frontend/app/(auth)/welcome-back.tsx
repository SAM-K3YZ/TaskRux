import DefaultButton from '@/src/shared/components/DefaultButton';
import Input from '@/src/shared/components/Input';
import OutlineButton from '@/src/shared/components/OutlineButton';
import ScreenWrapper from '@/src/shared/components/ScreenWrapper';
import Typo from '@/src/shared/components/Typo';
import { light, palette, spacingX, spacingY } from '@/src/constants/theme';
import { handleBiometric, osType } from '@/src/features/auth/services/authService';
import { verticalScale } from '@/src/shared/utils/styling';
import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Icons from 'phosphor-react-native';
import React, { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function WelcomeBack() {
  const insets = useSafeAreaInsets();
  const passwordRef = useRef('');
  const emailRef = useRef('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    // TODO: POST to /api/auth/login and store token before navigating
    router.push('/(tabs)');
  };

  const toSignUp = () => {
    router.push('/(auth)/onboarding');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScreenWrapper showBg={true} bgOpacity={0.5}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: spacingX._20,
            paddingBottom: insets.bottom + spacingY._10,
          }}
        >
          <View style={styles.header}>
            <Typo size={verticalScale(60)} color={palette.white} fontWeight={'bold'}>
              TaskRux
            </Typo>
            <Typo color={palette.white} size={verticalScale(13)} fontWeight={'medium'} style={{ marginTop: spacingY._5 }}>
              Sign in to manage your site operations
            </Typo>
          </View>

          <View style={{ flex: 1, paddingBottom: insets.bottom + spacingY._10 }}>
            <ScrollView
              contentContainerStyle={[styles.form, { flexGrow: 1, justifyContent: 'center' }]}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.textInputs}>
                <Input
                  placeholder="Enter your email address"
                  onChangeText={(val) => { emailRef.current = val; }}
                  label="Email Address"
                  labelStyle={{ color: palette.white }}
                  icon={<Icons.EnvelopeSimpleIcon size={verticalScale(26)} color={palette.neutral600} />}
                />
                <Input
                  placeholder="Enter your password"
                  label="Password"
                  labelStyle={{ color: palette.white }}
                  inputType="password"
                  helpText="Forgot Password?"
                  helpTextStyle={{ fontWeight: 'bold' }}
                  onHelpTextPress={() => router.push('/(auth)/forgot-password')}
                  onChangeText={(val) => { passwordRef.current = val; }}
                  icon={<Icons.LockSimpleIcon size={verticalScale(20)} color={palette.neutral600} />}
                />
              </View>

              <View style={{ gap: spacingY._20 }}>
                <DefaultButton loading={isLoading} onPress={handleSubmit}>
                  <Typo fontWeight={'bold'} color={light.textOnPrimary} size={verticalScale(20)}>
                    Sign In
                  </Typo>
                  <View style={styles.btnIcon}>
                    <FontAwesome6 name="arrow-right" color={light.textOnPrimary} size={18} />
                  </View>
                </DefaultButton>

                <View style={styles.continueArea}>
                  <View style={styles.continueBorder} />
                  <Typo>Or continue with</Typo>
                  <View style={styles.continueBorder} />
                </View>

                <OutlineButton onPress={() => handleBiometric(router)} style={{ gap: 10 }}>
                  <Typo fontWeight={'bold'} color={light.surface} size={verticalScale(16)}>
                    Log in with {osType}
                  </Typo>
                  <Icons.FingerprintIcon color={light.surface} size={verticalScale(18)} />
                </OutlineButton>

                <View style={styles.newUserArea}>
                  <Typo>New to the platform?</Typo>
                  <View style={styles.newUserLinks}>
                    <Pressable>
                      <Typo>Request Access</Typo>
                    </Pressable>
                    <Typo>or</Typo>
                    <Pressable onPress={toSignUp}>
                      <Typo>Sign Up</Typo>
                    </Pressable>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </ScreenWrapper>
    </KeyboardAvoidingView>
  );
}

export default WelcomeBack;

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: spacingY._40,
  },
  form: {
    paddingHorizontal: spacingX._15,
    gap: spacingY._30,
  },
  textInputs: {
    gap: spacingY._15,
    marginBottom: spacingY._10,
  },
  btnIcon: {
    marginStart: spacingX._10,
  },
  continueArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacingX._10,
  },
  continueBorder: {
    flex: 1,
    borderWidth: 1,
    borderColor: light.border,
  },
  newUserArea: {
    alignItems: 'center',
    gap: spacingY._7,
  },
  newUserLinks: {
    flexDirection: 'row',
    gap: spacingX._7,
    alignItems: 'center',
  },
});
