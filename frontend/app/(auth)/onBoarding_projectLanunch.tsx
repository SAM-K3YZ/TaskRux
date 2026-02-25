import BackButton from "@/components/BackButton";
import DefaultButton from "@/components/DefaultButton";
import Input from "@/components/Input";
import OnboardingStep from "@/components/OnboardngStep";
import QuickSettings from "@/components/QuickSettings";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { light, palette, radius, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";
import * as Icons from "phosphor-react-native";
import React, { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

function OnBoarding_projectLanunch() {
  const nameRef = useRef("");
  const siteRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async () => {
    //logic
    router.push("/(auth)/onBoarding_projectLanunch");
    console.log("To onboarding project launch screen...");
  };
  const [selectedSettings, setSelectedSettings] = React.useState<string[]>([
    "alerts",
  ]);
  const handleToggle = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedSettings((prev) => [...prev, id]);
    } else {
      setSelectedSettings((prev) => prev.filter((item) => item !== id));
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScreenWrapper style={styles.container}>
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
              <OnboardingStep step={4} totalSteps={4} />
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
                <Icons.UsersThreeIcon
                  size={verticalScale(24)}
                  color={light.primary}
                />
              </View>
              {/* Header text*/}
              <View>
                <Typo size={28} fontWeight={"600"} color={light.textPrimary}>
                  Launch Your First Project
                </Typo>
                <Typo size={14} color={palette.neutral600}>
                  {
                    " You're all set! Create a quick project profile to start tracking site activities immediatiely."
                  }
                </Typo>
              </View>
            </View>

            <View style={styles.textInputs}>
              {/* Text Inputs*/}
              <Input
                placeholder="e.g. Downtown Pffoce Renovation"
                onChangeText={(value: string) => {
                  nameRef.current = value;
                  console.log("project name: ", value);
                }}
                label="Project Name"
                icon={
                  <Icons.UserIcon
                    size={verticalScale(26)}
                    color={palette.neutral600}
                  />
                }
              />
              <Input
                placeholder="e.g. 123 Main St, Springfield"
                onChangeText={(value: string) => {
                  siteRef.current = value;
                  console.log("site address: ", value);
                }}
                label="Site Address"
                icon={
                  <Icons.MapPinIcon
                    size={verticalScale(26)}
                    color={palette.neutral600}
                  />
                }
              />
              <QuickSettings
                items={[
                  {
                    id: "alerts",
                    label: "Enable Alerts",
                    icon: Icons.BellIcon,
                  },
                  {
                    id: "crew",
                    label: "Auto-assign Crew",
                    icon: Icons.UserIcon,
                  },
                ]}
                selected={selectedSettings}
                onToggle={handleToggle}
              />
              <View style={styles.footer}>
                {/*Next Button*/}
                <View style={styles.nextBtn}>
                  <DefaultButton loading={isLoading} onPress={handleSubmit}>
                    <Typo
                      fontWeight={"bold"}
                      color={light.textOnPrimary}
                      size={20}
                    >
                      Start Managing
                    </Typo>

                    <View style={styles.btnIcon}>
                      <Icons.CheckCircleIcon
                        color={light.textOnPrimary}
                        size={20}
                      />
                    </View>
                  </DefaultButton>
                </View>

                {/* Email Invite text*/}
                <Typo
                  size={10}
                  color={light.textSecondary}
                  style={styles.footerTxt}
                >
                  Your 14-day trial begins when you create your first project.
                </Typo>
              </View>
            </View>
          </ScrollView>
        </View>
      </ScreenWrapper>
    </KeyboardAvoidingView>
  );
}

export default OnBoarding_projectLanunch;

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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerContainer: {
    alignSelf: "flex-start",
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

    textAlign: "center",
  },
});
