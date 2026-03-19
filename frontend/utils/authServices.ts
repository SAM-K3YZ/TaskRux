import * as LocalAuthentication from 'expo-local-authentication';
import { Alert } from 'react-native';
import { Platform } from 'react-native';
import { Router } from 'expo-router';

export const osType = Platform.OS === 'ios' ? 'Face ID' : 'Fingerprint';

export const handleBiometric = async (router: Router) => {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  if (!hasHardware) {
    Alert.alert(
      'Error',
      'Your device does not support biometric authentication',
    );
    return;
  }

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: `Sign in with ${osType}`,
    fallbackLabel: 'Use PIN instead',
  });

  if (result.success) {
    router.push('/(tabs)');
  } else {
    Alert.alert('Failed', 'Biometric authentication failed. Try again.');
  }
};
