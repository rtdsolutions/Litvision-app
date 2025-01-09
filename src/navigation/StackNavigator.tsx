import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { PokedexScreen } from "../screens/PokedexScreen";
import { PokemonScreen } from "../screens/PokemonScreen";
import { PokemonCustom } from "../types/pokemonList";
import { LoginScreen } from "../screens/Login";
import { StartScreen } from "../screens/StartScreen";
import { NFCScreen } from "../screens/NFCScreen";

export type RootStackParams = {
  Home: undefined;
  StartScreen: undefined;
  LoginScreen: undefined;
  NFCScreen: undefined;
  Pokemon: { pokemonItem: PokemonCustom; color: string };
  Search: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParams {}
  }
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="StartScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="NFCScreen" component={NFCScreen} />
      {/* <Stack.Screen name="Pokemon" component={PokemonScreen} /> */}
    </Stack.Navigator>
  );
};
