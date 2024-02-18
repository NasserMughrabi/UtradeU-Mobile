import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserAuth } from "../../context/AuthContext.js";
import RegisterScreen from "../../screens/registerscreen.js";
import LoginScreen from "../../screens/loginscreen.js";
import ProfileScreen from "../../screens/profilescreen.js";
import HomeScreen from "../../screens/homescreen.js";
import CreatePostScreen from "../../screens/createpostscreen.js";

const Stack = createNativeStackNavigator();

const NavigationStack = () => {
  const { user } = UserAuth();

  return (
    <Stack.Navigator>
      {user ? (
        // Screens that logged-in users can access
        <>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Home" }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ title: "Profile" }}
          />
          <Stack.Screen
            name="CreatePost"
            component={CreatePostScreen}
            options={{ title: "Create Post" }}
          />
        </>
      ) : (
        // Authentication screens
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: "Sign In" }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ title: "Register" }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default NavigationStack;
