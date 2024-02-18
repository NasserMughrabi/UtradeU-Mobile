import React, { useContext } from "react";
import { View } from "react-native";
import { Avatar, Button, Text } from "@rneui/themed";
import { UserAuth } from "../context/AuthContext";

const ProfileScreen = ({ navigation }) => {
  const { user, logOut } = UserAuth();

  const handleLogout = () => {
    logOut();
    // Resetting navigation state to the Login screen
    navigation.reset({
      index: 0, // Resets the stack to the initial screen (Login) with no history
      routes: [{ name: "Login" }], // Sets Login as the initial route
    });
  };
  return (
    <View style={{ height: "100%", padding: 10 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Avatar
          size={80}
          rounded
          source={{ uri: "https://randomuser.me/api/portraits/men/35.jpg" }}
        />
        <Text>{user?.displayName}</Text>
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
    </View>
  );
};

export default ProfileScreen;
