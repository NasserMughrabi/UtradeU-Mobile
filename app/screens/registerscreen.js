import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Input, Button, Text } from "@rneui/themed";
import Logo from "../components/Logo"; // Make sure your Logo component is adapted if needed
import COLORS from "../color";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConfig";

const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.code === "auth/email-already-in-use") {
          alert("Email already in use. Please choose a different email");
        } else if (error.code === "auth/weak-password") {
          alert("Weak password. Please choose a strong password");
        } else {
          alert("Signup Error:", error);
        }
      });
  };

  const getStep = () => {
    if (step === 1) {
      return (
        <StepOne
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          setStep={setStep}
        />
      );
    } else {
      return (
        <StepTwo
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          handleRegister={handleRegister}
          setStep={setStep}
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
        {getStep()}
      </View>
    </View>
  );
};

const StepOne = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  setStep,
}) => {
  return (
    <View>
      <Input
        placeholder="First Name"
        inputStyle={styles.input}
        leftIcon={{ type: "material", name: "person" }}
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <Input
        placeholder="Last Name"
        inputStyle={styles.input}
        leftIcon={{ type: "material", name: "person" }}
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      <Button
        title="Next"
        buttonStyle={{
          backgroundColor: "black",
          borderWidth: 2,
          borderColor: "white",
          borderRadius: 30,
        }}
        titleStyle={{ fontWeight: "bold" }}
        onPress={() => setStep((step) => step + 1)}
      />
    </View>
  );
};

const StepTwo = ({
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  handleRegister,
}) => {
  return (
    <View>
      <Input
        // label="Email"
        placeholder="Email"
        inputStyle={styles.input}
        leftIcon={{ type: "material", name: "email" }}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        placeholder="password"
        secureTextEntry={true}
        inputStyle={styles.input}
        leftIcon={{ type: "material", name: "lock" }}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Input
        placeholder="Confirm password"
        secureTextEntry={true}
        inputStyle={styles.input}
        leftIcon={{ type: "material", name: "lock" }}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />

      <Button
        title="SIGN UP"
        buttonStyle={{
          backgroundColor: "black",
          borderWidth: 2,
          borderColor: "white",
          borderRadius: 30,
        }}
        titleStyle={{ fontWeight: "bold" }}
        onPress={handleRegister}
      />
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
  input: {},
  button: {
    marginTop: 20,
  },
});

export default RegisterScreen;
