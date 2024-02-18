import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Input, Button, Text } from "@rneui/themed";
import Logo from "../components/main/Logo"; // Make sure your Logo component is adapted if needed
import COLORS from "../color";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import SignupForm from "../components/onboard/SignupForm";
import NameForm from "../components/onboard/NameForm";

const RegisterScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const displayStep = () => {
    if (step === 1) {
      return (
        <SignupForm
          formData={formData}
          setFormData={setFormData}
          setStep={setStep}
        />
      );
    } else {
      return (
        <NameForm
          formData={formData}
          setFormData={setFormData}
          setStep={setStep}
          navigation={navigation}
        />
      );
    }
  };

  return (
    <View style={styles.center}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Logo />
          <Text h4 h4Style={styles.heading}>
            Sign up to continue!
          </Text>
        </View>
        {displayStep()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    maxWidth: 290,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  heading: {
    color: COLORS.coolGray600, // Adjust as needed
    marginTop: 10,
  },
  button: {
    marginTop: 20,
  },
});

export default RegisterScreen;
