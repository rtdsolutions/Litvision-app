import React from "react";
import { StyleSheet, Button as PaperButton } from "react-native";
import { colors } from "../theme/colors";

export const Button = ({ mode, style, ...props }: any) => {
  return (
    <PaperButton
      style={[
        styles.button,
        mode === "outlined" && { backgroundColor: colors.primary },
        style,
      ]}
      labelStyle={styles.text}
      mode={mode}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    marginVertical: 10,
    paddingVertical: 2,
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 26,
  },
});
