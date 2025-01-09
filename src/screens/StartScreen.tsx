import React, { useEffect } from "react";
import { Button } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { Background } from "../components/Background";
import { Logo } from "../components/Logo";
import { Header } from "../components/Header";

export const StartScreen = ({ navigation }: any) => {
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      SplashScreen.hide();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Background>
      <Logo />
      <Header />
      <Button
        title="Login"
        onPress={() => navigation.navigate("LoginScreen")}
      />
    </Background>
  );
};
