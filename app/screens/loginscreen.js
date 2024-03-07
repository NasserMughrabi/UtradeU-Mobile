import React from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { Input, Button, Text } from "@rneui/themed";
import Logo from "../components/main/Logo"; // Assuming Logo is a compatible React component or image
import COLORS from "../color";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConfig";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setIsLoading(false);
        if (user) {
          navigation.navigate("Home");
        }
        // setEmail("");
        // setPassword("");
      })
      .catch((error) => {
        setIsLoading(false);
        alert(error);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={80}
    >
      <View style={styles.centeredView}>
        <View style={styles.box}>
          <View style={styles.logoContainer}>
            <Logo />
            <Text h4 h4Style={styles.heading}>
              Sign in to continue!
            </Text>
          </View>

          <View style={styles.formContainer}>
            <Input
              placeholder="Email"
              leftIcon={{ type: "material", name: "email" }}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />

            <Input
              placeholder="password"
              secureTextEntry={true}
              leftIcon={{ type: "material", name: "lock" }}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <Button
              title="LOG IN"
              buttonStyle={{
                backgroundColor: "black",
                borderWidth: 2,
                borderColor: "white",
                borderRadius: 30,
              }}
              titleStyle={{ fontWeight: "bold" }}
              onPress={handleLogin}
            />
            <Text style={styles.signupText}>
              Don't have an account?{" "}
              <Text
                style={styles.signupLink}
                onPress={() => navigation.navigate("Register")}
              >
                Signup
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: "90%",
    maxWidth: 290,
    paddingVertical: 32,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  heading: {
    color: COLORS.coolGray600, // Adjust the color as needed
    marginTop: 10,
  },
  formContainer: {
    marginTop: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  signupText: {
    marginTop: 15,
    textAlign: "center",
  },
  signupLink: {
    color: COLORS.blue600, // Adjust the color as needed
    fontWeight: "bold",
  },
});

export default LoginScreen;
