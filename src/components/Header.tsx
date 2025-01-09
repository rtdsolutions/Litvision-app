import React from "react";
import { Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export const Header = () => {
  return <Text style={styles.header}>Sign in to EntryLink</Text>;
};

const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    color: colors.primary,
    fontWeight: "bold",
    paddingVertical: 12,
  },
});
