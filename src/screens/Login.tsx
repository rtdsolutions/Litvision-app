import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Background } from "../components/Background";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { entrylinkUrlAPI, pokeAPI } from "../api/pokeapi";

import { colors } from "../theme/colors";

export const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [fieldTextType, setFieldTextType] = useState(false);

  const onLoginPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    setIsLoading(true);
    try {
      console.log("entrylinkUrlAPI: ", entrylinkUrlAPI);

      const response = await pokeAPI.post(entrylinkUrlAPI, {
        email: email.value,
        password: password.value,
      });

      if (response.data.success) {
        navigation.reset({
          index: 0,
          routes: [{ name: "NFCScreen" }],
        });
      }
    } catch (error) {
      console.log("login", error);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const togglePasswordVisibility = () => {
    setFieldTextType(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>EntryLink</Text>
        <Text style={styles.subtitle}>Sign in to EntryLink</Text>
      </View>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          returnKeyType="next"
          value={email.value}
          onChangeText={text => setEmail({ value: text, error: "" })}
          placeholder="Enter email"
          autoCapitalize="none"
          autoCompleteType="email"
          keyboardType="email-address"
          placeholderTextColor="#8a8a8a"
        />
        <Text style={styles.errorText}>{email.error}</Text>
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.input}
            returnKeyType="done"
            value={password.value}
            onChangeText={text => setPassword({ value: text, error: "" })}
            placeholder="Enter password"
            secureTextEntry={!fieldTextType}
            placeholderTextColor="#8a8a8a"
          />
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.togglePassword}>
            <Text style={styles.togglePasswordText}>
              {fieldTextType ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.errorText}>{password.error}</Text>
      </View>

      {/* Login Button */}
      <TouchableOpacity
        style={[styles.loginButton, isLoading && styles.loadingButton]}
        onPress={onLoginPressed}
        disabled={isLoading}>
        {isLoading ? (
          <Text style={styles.loadingText}>Please wait...</Text>
        ) : (
          <Text style={styles.loginButtonText}>Login</Text>
        )}
      </TouchableOpacity>

      {/* Register Link */}
      {/* <TouchableOpacity
        onPress={() => Alert.alert("Redirect to Register Screen")}
        style={styles.registerLinkContainer}>
        <Text style={styles.registerLink}>Don't have an account? Register</Text>
      </TouchableOpacity> */}

      {/* Forgot Password Link */}
      {/* <TouchableOpacity
        onPress={() => Alert.alert("Redirect to Forgot Password Screen")}
        style={styles.forgotPasswordLinkContainer}>
        <Text style={styles.forgotPasswordLink}>Forgot password?</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#007bff",
  },
  subtitle: {
    fontSize: 16,
    color: "#6c757d",
  },
  inputContainer: {
    marginBottom: 20,
    width: "100%",
  },
  label: {
    fontSize: 14,
    color: "#495057",
  },
  input: {
    height: 50,
    borderColor: "#ced4da",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fff",
    marginTop: 5,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  togglePassword: {
    marginLeft: 10,
  },
  togglePasswordText: {
    color: "#007bff",
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingButton: {
    backgroundColor: "#6c757d",
  },
  loadingText: {
    color: "#fff",
    fontSize: 16,
  },
  registerLinkContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  registerLink: {
    color: "#007bff",
    fontSize: 14,
  },
  forgotPasswordLinkContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  forgotPasswordLink: {
    color: "#007bff",
    fontSize: 14,
  },
  inputError: {
    borderColor: "red", // Highlight border with red on error
  },
  errorText: {
    fontSize: 12,
    color: "red",
    marginTop: 5,
  },
});
