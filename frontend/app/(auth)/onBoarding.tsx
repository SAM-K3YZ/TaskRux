import RadioInput from "@/components/RadioInput";
import BackButton from "@/components/BackButton";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { light, palette, spacingX, spacingY } from "@/constants/theme";
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
import Input from "../../components/Input";

const onBoarding = () => {
  const nameRef = useRef("");
  const licenseRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [selected, setSelected] = useState("general");

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScreenWrapper>
        <View style={styles.container}>
          <View style={styles.header}>
            <BackButton color={light.textSecondary} iconSize={28} />
            <Typo size={14} color={light.textSecondary}>
              Need help?
            </Typo>
          </View>

          <View>
            <ScrollView
              contentContainerStyle={styles.form}
              showsVerticalScrollIndicator={false}
            >
              <View style={{ gap: spacingY._10, marginBottom: spacingY._15 }}>
                <Typo size={28} fontWeight={"600"} color={light.textPrimary}>
                  Let's set up your company
                </Typo>
                <Typo size={14} color={palette.neutral600}>
                  Enter your legal business details to start managing your sites
                  and workers efficiently.
                </Typo>
              </View>

              <View style={styles.textInputs}>
                <Input
                  placeholder="Enter your company name"
                  onChangeText={(value: string) => {
                    nameRef.current = value;
                    console.log("name: ", value);
                  }}
                  icon={
                    <Icons.UserIcon
                      size={verticalScale(26)}
                      color={palette.neutral600}
                    />
                  }
                />
              </View>

              <View style={styles.radioGroup}>
                <RadioInput
                  label="General Contracting"
                  value="general"
                  selectedValue={selected}
                  onPress={setSelected}
                  icon={Icons.HouseIcon}
                />

                <RadioInput
                  label="Electrical"
                  value="electrical"
                  selectedValue={selected}
                  onPress={setSelected}
                  icon={Icons.LightningIcon}
                />
                <RadioInput
                  label="Plumbing & HVAC"
                  value="plumbling"
                  selectedValue={selected}
                  onPress={setSelected}
                  icon={Icons.DropIcon}
                />
                <RadioInput
                  label="Civil Engineering"
                  value="civil"
                  selectedValue={selected}
                  onPress={setSelected}
                  icon={Icons.CraneIcon}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </ScreenWrapper>
    </KeyboardAvoidingView>
  );
};

export default onBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    backgroundColor: light.background,
  },
  header: {
    paddingHorizontal: spacingX._20,
    paddingTop: spacingY._15,
    paddingBottom: spacingY._25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  form: {
    paddingHorizontal: spacingX._20,
    paddingBottom: spacingY._30,
  },
  textInputs: {
    gap: spacingY._15,
  },
  radioGroup: {
    gap: spacingY._12,
    marginTop: spacingY._20,
  },
});
