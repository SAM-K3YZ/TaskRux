import BackButton from '@/src/shared/components/BackButton';
import DefaultButton from '@/src/shared/components/DefaultButton';
import Input from '@/src/shared/components/Input';
import ScreenWrapper from '@/src/shared/components/ScreenWrapper';
import Typo from '@/src/shared/components/Typo';
import { light, palette, radius, spacingX, spacingY } from '@/src/constants/theme';
import { verticalScale } from '@/src/shared/utils/styling';
import * as Icons from 'phosphor-react-native';
import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

function ForgotPassword() {
  const emailRef = useRef('');
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    // TODO: POST to /api/auth/forgot-password
    setSent(true);
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton color={light.textSecondary} iconSize={28} />
        </View>

        <View style={styles.body}>
          <View style={styles.headerIcon}>
            <Icons.LockKeyIcon size={verticalScale(24)} color={light.primary} />
          </View>

          <Typo size={28} fontWeight={'600'} color={light.textPrimary}>
            Forgot Password?
          </Typo>
          <Typo size={14} color={palette.neutral600}>
            Enter the email address linked to your account and we'll send a reset link.
          </Typo>

          {sent ? (
            <View style={styles.sentBox}>
              <Icons.CheckCircleIcon size={verticalScale(32)} color={light.success} weight="fill" />
              <Typo size={16} color={light.success} fontWeight={'600'}>
                Reset link sent!
              </Typo>
              <Typo size={13} color={palette.neutral500} style={{ textAlign: 'center' }}>
                Check your inbox and follow the link to reset your password.
              </Typo>
            </View>
          ) : (
            <View style={styles.form}>
              <Input
                placeholder="you@company.com"
                onChangeText={(val) => { emailRef.current = val; }}
                label="Email Address"
                icon={<Icons.EnvelopeSimpleIcon size={verticalScale(20)} color={palette.neutral600} />}
              />
              <DefaultButton loading={isLoading} onPress={handleSubmit}>
                <Typo fontWeight={'bold'} color={light.textOnPrimary} size={18}>
                  Send Reset Link
                </Typo>
              </DefaultButton>
            </View>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
}

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: light.background,
    paddingHorizontal: spacingX._20,
  },
  header: {
    paddingTop: spacingY._15,
    paddingBottom: spacingY._10,
  },
  body: {
    flex: 1,
    gap: spacingY._15,
    paddingTop: spacingY._20,
  },
  headerIcon: {
    alignSelf: 'flex-start',
    padding: spacingY._15,
    backgroundColor: light.primaryLight,
    borderRadius: radius._15,
    marginBottom: spacingY._5,
  },
  form: {
    gap: spacingY._20,
    marginTop: spacingY._10,
  },
  sentBox: {
    alignItems: 'center',
    gap: spacingY._10,
    paddingTop: spacingY._30,
  },
});
