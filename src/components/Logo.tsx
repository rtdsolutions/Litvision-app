import React from "react";
import { Image, StyleSheet } from "react-native";

export const Logo = () => {
  return <Image source={require("../assets/logo.png")} style={styles.image} />;
};

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 52,
    marginBottom: 8,
  },
});
