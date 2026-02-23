import { light, radius, spacingY } from "@/constants/theme";
import React from "react";
import { StyleSheet, View } from "react-native";
import Typo from "./Typo";

interface OnboardingStepProps {
  step: number;
  totalSteps: number;
}

function OnboardingStep({ step, totalSteps }: OnboardingStepProps) {
  const progress = (step / totalSteps) * 100;

  return (
    <View style={styles.wrapper}>
      <Typo color={light.primaryDark} fontWeight={"bold"} size={13}>
        Step {String(step)} of {String(totalSteps)}
      </Typo>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${progress}%` }]} />
      </View>
    </View>
  );
}

export default OnboardingStep;

const styles = StyleSheet.create({
  wrapper: {
    gap: spacingY._7,
  },
  track: {
    height: spacingY._7,
    backgroundColor: light.border,
    borderRadius: radius.full,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    backgroundColor: light.primary,
    borderRadius: radius.full,
  },
});
