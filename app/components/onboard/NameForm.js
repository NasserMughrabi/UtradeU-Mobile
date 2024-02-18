import React, { useState } from "react";
import { View, Alert } from "react-native";
import { Input, Button } from "@rneui/themed";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../services/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const NameForm = ({ formData, setFormData, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const updateUserProfile = async (user) => {
    try {
      await updateProfile(user, {
        displayName: `${formData.firstName} ${formData.lastName}`,
      });
    } catch (error) {
      throw new Error("Failed to update user profile.");
    }
  };

  const updateFirestoreUser = async (user) => {
    const userDocRef = doc(db, "users", user.uid);
    try {
      await setDoc(
        userDocRef,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
        },
        { merge: true }
      );
    } catch (error) {
      throw new Error("Failed to update Firestore user.");
    }
  };

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      await updateUserProfile(user);
      await updateFirestoreUser(user);

      navigation.navigate("Home");
    } catch (error) {
      let errorMsg = "Signup Error";
      if (error.code === "auth/email-already-in-use") {
        errorMsg = "Email already in use. Please choose a different email";
      } else if (error.code === "auth/weak-password") {
        errorMsg = "Weak password. Please choose a strong password";
      } else if (error.message) {
        errorMsg = error.message;
      }
      Alert.alert("Signup Error", errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      <Input
        placeholder="First Name"
        leftIcon={{ type: "material", name: "person" }}
        value={formData?.firstName}
        onChangeText={(text) => setFormData({ ...formData, firstName: text })}
      />
      <Input
        placeholder="Last Name"
        leftIcon={{ type: "material", name: "person" }}
        value={formData?.lastName}
        onChangeText={(text) => setFormData({ ...formData, lastName: text })}
      />
      <Button
        title="Create"
        buttonStyle={{
          backgroundColor: "black",
          borderWidth: 2,
          borderColor: "white",
          borderRadius: 30,
        }}
        titleStyle={{ fontWeight: "bold" }}
        onPress={handleRegister}
        disabled={isLoading}
      />
    </View>
  );
};

export default NameForm;
