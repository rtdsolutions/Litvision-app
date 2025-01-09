import React, { useEffect, useState, useRef } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Background } from "../components/Background";
import { Logo } from "../components/Logo";
// import NfcManager, { NfcTech } from "react-native-nfc-manager";
// import { v4 as uuidv4 } from "uuid";

export const NFCScreen = () => {
  const [nfcKey, setNfcKey] = useState("");
  const isMounted = useRef(true);

  useEffect(() => {
    // NfcManager.start();
    return () => {
      isMounted.current = false; // Mark as unmounted
      // NfcManager.stop();
      // NfcManager.setEventListener(NfcTech.NfcA, 'stateChange', 'off');
    };
  }, []);

  const generateNfcKey = async () => {
    try {
      // const key = uuidv4(); // Generate a unique NFC key
      const newNfcKey = Math.random().toString(36).substr(2, 9);
      if (isMounted.current) {
        setNfcKey(newNfcKey);
      }

      // await NfcManager.start();
      console.log("Generated NFC Key:", newNfcKey);
    } catch (error) {
      console.log("Error generating NFC key:", error);
    }
  };

  // const writeToTag = async () => {
  //   if (nfcKey) {
  //     try {
  //       await NfcManager.requestTechnology(NfcTech.NfcA);
  //       // Write the NFC key to the tag
  //       await NfcManager.writeNfcText(nfcKey);
  //       console.log('NFC Key written to the tag!');
  //     } catch (error) {
  //       console.log('Error writing to NFC tag', error);
  //     } finally {
  //       NfcManager.setEventListener(NfcTech.NfcA, 'stateChange', 'off');
  //     }
  //   }
  // };

  return (
    <Background>
      {/* <Logo /> */}
      <View>
        {/* <Text>Generated NFC Key</Text> */}
        <Button title="Generate Key" onPress={generateNfcKey} />
        {/* <Button title="Write NFC Key to Tag" onPress={writeToTag} disabled={!nfcKey} /> */}
        <Text style={styles.nfcText}>{nfcKey}</Text>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  nfcText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000000",
  },
});
