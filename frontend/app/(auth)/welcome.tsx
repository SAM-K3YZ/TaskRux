import DefaultButton from "@/components/DefaultButton";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { dark, palette, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

const Welcome = () => {
  const router = useRouter();
  return (
    <ScreenWrapper showBg={true} bgOpacity={0.5}>
      <View style={styles.container}>
        <View style={styles.top}>
          <Typo size={64} fontWeight={"bold"}>
            TaskRux
          </Typo>
          <Typo>Build Smarter, Manage Better.</Typo>
        </View>

        <View style={styles.bottom}>
          <View style={[styles.rowOne, styles.row]}>
            <Typo size={13} style={{ textAlign: "center" }}>
              Streamline your site operations, manage your workforce, and track
              progress in real-time.
            </Typo>
          </View>

          <View style={[styles.rowTow, styles.row]}>
            <View style={styles.btn}>
              <DefaultButton onPress={() => router.push("/(auth)/onBoarding")}>
                <Typo size={20} fontWeight={"bold"}>
                  Get Started
                </Typo>

                <View style={styles.btnIcon}>
                  <FontAwesome6
                    name="arrow-right"
                    color={dark.textOnPrimary}
                    size={18}
                  />
                </View>
              </DefaultButton>
            </View>
            <View style={styles.toSignIn}>
              <Typo size={16}>Already have an account?</Typo>
              <Pressable
                style={styles.signInBtn}
                onPress={() => router.push("/(auth)/welcomeBack")}
              >
                <Typo size={16} fontWeight={"bold"} color={palette.brandOrange}>
                  Sign In
                </Typo>
              </Pressable>
            </View>
          </View>

          <View style={[styles.rowThree, styles.row]}>
            <Typo
              size={13}
              color={palette.neutral400}
              style={styles.agreementText}
            >
              By countinuing, you agree to out Terms of Service and Privacy
              Policy.
            </Typo>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacingX._20,
    paddingVertical: spacingY._10,
  },
  background: {
    flex: 1,
    backgroundColor: palette.neutral900,
  },
  welcomeImage: {
    height: verticalScale(300),
    aspectRatio: 1,
    alignSelf: "center",
  },
  top: {
    alignItems: "center",
    marginTop: spacingY._10,
  },
  bottom: {
    marginBottom: spacingY._10,
    justifyContent: "space-between",
  },
  row: {
    marginBottom: spacingX._25,
  },
  btn: {
    marginBottom: spacingX._5,
  },
  btnIcon: {
    marginStart: spacingY._10,
  },
  toSignIn: {
    justifyContent: "center",
    flexDirection: "row",
  },
  signInBtn: {
    marginStart: spacingY._10,
  },
  agreementText: {
    textAlign: "center",
  },
});
