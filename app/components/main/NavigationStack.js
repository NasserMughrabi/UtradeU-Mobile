import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserAuth } from "../../context/AuthContext.js";
import RegisterScreen from "../../screens/registerscreen.js";
import LoginScreen from "../../screens/loginscreen.js";
import ProfileScreen from "../../screens/profilescreen.js";
import HomeScreen from "../../screens/homescreen.js";
import CreatePostScreen from "../../screens/createpostscreen.js";
import ChatScreen from "../../screens/chatscreen.js";
import InboxUsersScreen from "../../screens/inboxusersscreen.js";
import FilterScreen from "../../screens/filterscreen.js";

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
            name="Filter"
            component={FilterScreen}
            options={{ title: "Filter" }}
          />
          <Stack.Screen
            name="Listing"
            component={CreatePostScreen}
            options={{ title: "Listing" }}
          />
          <Stack.Screen
            name="Inbox"
            component={InboxUsersScreen}
            options={{ title: "Inbox" }}
          />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={{ title: "Person Name" }}
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
