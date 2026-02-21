import BackButton from "@/components/BackButton";
import DefaultButton from "@/components/DefaultButton";
import RadioInput from "@/components/RadioInput";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { light, palette, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as Icons from "phosphor-react-native";
import React, { useRef, useState } from "react";
import {
  Alert,
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
  const emailRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [selected, setSelected] = useState("general");
  const handleSubmit = async () => {
    if (!nameRef.current || !emailRef.current || !licenseRef.current) {
      Alert.alert(
        "Continue to location...",
        "Please fill all the fields with astericks(*)",
      );
      return;
    }
  };

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
                  {"Let's set up your company"}
                </Typo>
                <Typo size={14} color={palette.neutral600}>
                  Enter your legal business details to start managing your sites
                  and workers efficiently.
                </Typo>
              </View>

              <View style={styles.textInputs}>
                {/*Company Input*/}
                <Input
                  placeholder="Enter your company name"
                  onChangeText={(value: string) => {
                    nameRef.current = value;
                    console.log("name: ", value);
                  }}
                  label="Company Name"
                  icon={
                    <Icons.UserIcon
                      size={verticalScale(26)}
                      color={palette.neutral600}
                    />
                  }
                />
                {/*Company Email Input*/}
                <Input
                  placeholder="Enter your company email address"
                  label="Company Email Address"
                  onChangeText={(value: string) => {
                    emailRef.current = value;
                    console.log("email: ", value);
                  }}
                  icon={
                    <Icons.AtIcon
                      size={verticalScale(26)}
                      color={palette.neutral600}
                    />
                  }
                />
                {/*Company License Number Input*/}
                <Input
                  placeholder="e.g. RC-1234567"
                  onChangeText={(value: string) => {
                    licenseRef.current = value;
                    console.log("license: ", value);
                  }}
                  label="Company Registered License"
                  icon={
                    <Icons.CertificateIcon
                      size={verticalScale(26)}
                      color={palette.neutral600}
                    />
                  }
                />
              </View>

              {/*Company Industry*/}
              <View style={styles.radioGroup}>
                <View style={styles.industrySec}>
                  <Typo size={16} fontWeight={"bold"} color={light.textPrimary}>
                    Primary Industry
                  </Typo>
                </View>

                <View style={styles.radioBtns}>
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

                {/*Footer*/}
                <View style={styles.footer}>
                  {/*Next Button*/}
                  <View style={styles.nextBtn}>
                    <DefaultButton loading={isLoading} onPress={handleSubmit}>
                      <Typo
                        fontWeight={"bold"}
                        color={light.textOnPrimary}
                        size={20}
                      >
                        Continue to Location
                      </Typo>
                      <View style={styles.btnIcon}>
                        <FontAwesome6
                          name="arrow-right"
                          color={light.textOnPrimary}
                          size={18}
                        />
                      </View>
                    </DefaultButton>
                  </View>

                  {/* Terms*/}
                  <Typo
                    size={10}
                    color={light.textSecondary}
                    style={styles.footerTxt}
                  >
                    By continuing, you agree to our Terms and Services
                  </Typo>
                </View>
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
    marginTop: spacingX._15,
  },
  radioGroup: {
    marginTop: spacingY._20,
  },
  radioBtns: {
    marginTop: spacingX._15,
    gap: spacingY._12,
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
