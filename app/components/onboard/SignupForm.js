import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Input, Button, Text } from "@rneui/themed";
import { useState } from "react";

const SignupForm = ({ formData, setFormData, setStep }) => {
  const isValidEmail = (email) => {
    // should be a valid email with @ and .
    const regexp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email.toLowerCase());
  };

  const isValidPassword = (password) => {
    // should be at least 6 characters long
    return password.length >= 6;
  };

  const handleNext = (e) => {
    // if (formData.email === "" || formData.password === "") {
    //   toast({
    //     title: "Attention",
    //     description: "Email and password cannot be empty!",
    //     status: "error",
    //     duration: 3000,
    //     isClosable: true,
    //     position: "top",
    //   });
    //   return;
    // }
    // if (!isValidEmail(formData.email)) {
    //   toast({
    //     title: "Attention",
    //     description: "Your email is not valid!",
    //     status: "error",
    //     duration: 3000,
    //     isClosable: true,
    //     position: "top",
    //   });
    //   return;
    // }
    // if (!isValidPassword(formData.password)) {
    //   toast({
    //     title: "Attention",
    //     description: "Your password should be at least 6 characters long!",
    //     status: "error",
    //     duration: 3000,
    //     isClosable: true,
    //     position: "top",
    //   });
    //   return;
    // }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    setStep(2);
  };
  return (
    <View>
      <Input
        placeholder="Email"
        leftIcon={{ type: "material", name: "email" }}
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
      />
      <Input
        placeholder="password"
        secureTextEntry={true}
        leftIcon={{ type: "material", name: "lock" }}
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
      />
      <Input
        placeholder="Confirm password"
        secureTextEntry={true}
        leftIcon={{ type: "material", name: "lock" }}
        value={formData.confirmPassword}
        onChangeText={(text) =>
          setFormData({ ...formData, confirmPassword: text })
        }
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
        onPress={handleNext}
      />
    </View>
  );
};

export default SignupForm;
