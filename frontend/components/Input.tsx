import { light, palette, radius, spacingX, spacingY } from "@/constants/theme";
import { InputProps } from "@/types";
import { verticalScale } from "@/utils/styling";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const Input = (props: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={[styles.wrapper, props.wrapperStyle]}>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <View
        style={[
          styles.container,
          props.containerStyle && props.containerStyle,
          isFocused && styles.primaryBorder,
        ]}
      >
        {props.icon && props.icon}
        <TextInput
          style={[styles.input, props.inputStyle]}
          placeholderTextColor={palette.neutral400}
          ref={props.inputRef && props.inputRef}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  wrapper: {
    gap: spacingY._7,
  },
  label: {
    fontSize: verticalScale(16),
    color: light.textPrimary,
    fontWeight: "bold",
    paddingLeft: spacingX._5,
  },
  container: {
    flexDirection: "row",
    height: verticalScale(56),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: palette.neutral200,
    borderRadius: radius.full,
    borderCurve: "continuous",
    paddingHorizontal: spacingX._15,
    backgroundColor: palette.neutral100,
    gap: spacingX._10,
  },
  primaryBorder: {
    borderColor: light.primary,
  },
  input: {
    flex: 1,
    color: light.textPrimary,
    fontSize: verticalScale(14),
  },
});
