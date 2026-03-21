import DefaultButton from '@/components/DefaultButton';
import OutlineButton from '@/components/OutlineButton';
import ScreenWrapper from '@/components/ScreenWrapper';
import Typo from '@/components/Typo';
import { light, palette, spacingX, spacingY } from '@/constants/theme';
import { handleBiometric, osType } from '@/utils/authServices';
import { verticalScale } from '@/utils/styling';
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
import Input from '../../components/Input';

function WelcomeBack() {
  const insets = useSafeAreaInsets();
  const passwordRef = useRef('');
  const emailRef = useRef('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async () => {
    //logic
    router.push('/(tabs)');
    console.log('To Home screen...');
  };
  const toSignUp = async () => {
    //logic
    router.push('/(auth)/onBoarding');
    console.log('To onboarding sign up screen...');
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
          {/*Screen Top */}
          <View style={styles.header}>
            <Typo
              size={verticalScale(60)}
              color={palette.white}
              fontWeight={'bold'}
            >
              TaskRux
            </Typo>
            <Typo
              color={palette.white}
              size={verticalScale(13)}
              fontWeight={'medium'}
              style={{ marginTop: spacingY._5 }}
            >
              Sign in to manage your site operations
            </Typo>
          </View>

          {/*Screen Middle */}
          <View
            style={{
              flex: 1,
              paddingBottom: insets.bottom + spacingY._10,
            }}
          >
            <ScrollView
              contentContainerStyle={[
                ,
                styles.form,
                { flexGrow: 1, justifyContent: 'center' },
              ]}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.textInputs}>
                {/*Email Input*/}
                <Input
                  placeholder="Enter your email address"
                  onChangeText={(value: string) => {
                    emailRef.current = value;
                    console.log('name: ', value);
                  }}
                  label="Email Address"
                  labelStyle={{ color: palette.white }}
                  icon={
                    <Icons.EnvelopeSimpleIcon
                      size={verticalScale(26)}
                      color={palette.neutral600}
                    />
                  }
                />
                {/*Password Input*/}
                <Input
                  placeholder="Enter your password"
                  label="Password"
                  labelStyle={{ color: palette.white }}
                  inputType="password"
                  helpText="Forget Passowrd?"
                  helpTextStyle={{ fontWeight: 'bold' }}
                  onHelpTextPress={() => router.push('/(auth)/forgetPassword')}
                  onChangeText={(value: string) => {
                    passwordRef.current = value;
                    console.log('email: ', value);
                  }}
                  icon={
                    <Icons.LockSimpleIcon
                      size={verticalScale(20)}
                      color={palette.neutral600}
                    />
                  }
                />
              </View>

              {/*Footer*/}
              <View style={{ gap: spacingY._20 }}>
                {/*Sign in Button*/}
                <DefaultButton loading={isLoading} onPress={handleSubmit}>
                  <Typo
                    fontWeight={'bold'}
                    color={light.textOnPrimary}
                    size={verticalScale(20)}
                  >
                    Sign In
                  </Typo>
                  <View style={styles.btnIcon}>
                    <FontAwesome6
                      name="arrow-right"
                      color={light.textOnPrimary}
                      size={18}
                    />
                  </View>
                </DefaultButton>

                {/* Continue with */}
                <View style={styles.continueArea}>
                  <View style={styles.continueBorder}></View>
                  <Typo>Or continue with</Typo>
                  <View style={styles.continueBorder}></View>
                </View>

                {/* Second button */}
                <OutlineButton
                  onPress={() => handleBiometric(router)}
                  style={{ gap: 10 }}
                >
                  <Typo
                    fontWeight={'bold'}
                    color={light.surface}
                    size={verticalScale(16)}
                  >
                    Log in with {osType}
                  </Typo>
                  <Icons.FingerprintIcon
                    color={light.surface}
                    size={verticalScale(18)}
                  />
                </OutlineButton>

                {/* New users */}
                <View style={styles.newUserArea}>
                  <View>
                    <Typo>New to the platform?</Typo>
                  </View>
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
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  textInputs: {
    gap: spacingY._15,
    marginBottom: spacingY._10,
  },
  btnIcon: {
    marginStart: spacingY._10,
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
