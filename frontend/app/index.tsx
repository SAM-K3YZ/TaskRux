import { dark, palette } from '@/src/constants/theme';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

export default function SplashScreen() {
  const opacity = useRef<Animated.Value>(new Animated.Value(0)).current;
  const scale = useRef<Animated.Value>(new Animated.Value(0.8)).current;
  const router = useRouter();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      router.replace('/(auth)/welcome');
    }, 1500);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[styles.title, { opacity, transform: [{ scale }] }]}
      >
        TaskRux
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.brandOrange,
  },
  title: {
    fontSize: 70,
    fontWeight: 'bold',
    color: dark.textOnPrimary,
  },
});
