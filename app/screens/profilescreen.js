import React, { useContext } from "react";
import { View } from "react-native";
import { Avatar, Button, Text, Icon, Input } from "@rneui/themed";
import { UserAuth } from "../context/AuthContext";
import COLORS from "../color";
import * as ImagePicker from "expo-image-picker";
import AWS from "aws-sdk";
import { updateProfile } from "firebase/auth";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

AWS.config.update({
  accessKeyId: "AKIAU5OI5J3WUBNBYV2V",
  secretAccessKey: "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",
  region: "us-east-1",
});

const ProfileScreen = ({ navigation }) => {
  const { user, logOut } = UserAuth();
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    logOut();
    // Resetting navigation state to the Login screen
    navigation.reset({
      index: 0, // Resets the stack to the initial screen (Login) with no history
      routes: [{ name: "Login" }], // Sets Login as the initial route
    });
  };

  const handleImagePick = async () => {
    // Request permission
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }
    // Pick the image
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.canceled) {
      return;
    }

    // Set the selected image
    setImage(pickerResult.assets[0].uri);
    setIsLoading(true);
    const uploadedImageUrl = await uploadImageToS3(pickerResult.assets[0].uri);
    if (uploadedImageUrl) await updateUserProfileImage(uploadedImageUrl);
    setIsLoading(false);
  };

  const uploadImageToS3 = async (imageUri) => {
    const s3 = new AWS.S3();
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();

      const uploadParams = {
        Bucket: "utradeu",
        Key: `uploads/${new Date().toISOString()}_${imageUri.split("/").pop()}`,
        Body: blob,
        // ACL: "public-read", // Uploaded files are publicly accessible
      };

      const data = await s3.upload(uploadParams).promise();
      return data.Location; // Return the URL of the uploaded image
    } catch (err) {
      alert("Upload Error");
      return null;
    }
  };

  const updateUserProfileImage = async (imageUrl) => {
    try {
      await updateProfile(user, {
        photoURL: imageUrl,
      });
      await updateFirestoreUser(imageUrl);
    } catch (error) {
      alert("Update Error:", "Failed to update user profile.");
    }
  };

  const updateFirestoreUser = async (imageUrl) => {
    const userDocRef = doc(db, "users", user.uid);
    try {
      await setDoc(
        userDocRef,
        {
          photoURL: imageUrl,
        },
        { merge: true }
      );
    } catch (error) {
      console.log("Failed to update Firestore user.");
    }
  };

  return (
    <View style={{ height: "100%", padding: 10 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingBottom: 20,
        }}
      >
        <View
          style={{
            position: "relative",
            flexDirection: "row",
            width: 100,
          }}
        >
          <Avatar size={80} rounded source={{ uri: user.photoURL }} />
          <View
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
            }}
          >
            {isLoading ? (
              <Button
                radius={"sm"}
                type="solid"
                buttonStyle={{ backgroundColor: "black" }}
                loading
              ></Button>
            ) : (
              <Button
                radius={"sm"}
                type="solid"
                buttonStyle={{ backgroundColor: "black" }}
                onPress={handleImagePick}
              >
                <Icon name="image" color="white" size={15} />
              </Button>
            )}
          </View>
        </View>
        <Text h4 h4Style={{ paddingLeft: 10 }}>
          {user?.displayName}
        </Text>
      </View>
      <Button
        title="LOG OUT"
        buttonStyle={{
          backgroundColor: "black",
          borderWidth: 2,
          borderColor: "white",
          borderRadius: 30,
        }}
        titleStyle={{ fontWeight: "bold" }}
        onPress={handleLogout}
      />
    </View>
  );
};

export default ProfileScreen;
