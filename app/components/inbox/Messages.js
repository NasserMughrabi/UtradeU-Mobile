import React, { useEffect, useRef } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import { Avatar, Button, Input } from "react-native-elements";
import COLORS from "../../color";
import { Entypo } from "@expo/vector-icons";
import { UserAuth } from "../../context/AuthContext";

const Messages = ({ messages }) => {
  const { user } = UserAuth();

  const sortedMessages = messages.sort((a, b) => {
    return a.timestamp - b.timestamp;
  });

  // Scroll to the bottom whenever the messages state updates
  //   const scrollViewRef = useRef();
  //   useEffect(() => {
  //     scrollViewRef.current.scrollToEnd({ animated: true });
  //   }, [sortedMessages, isLoading]);

  return (
    <ScrollView
      //   ref={scrollViewRef}
      style={{
        height: "90%",
        paddingVertical: 20,
      }}
    >
      <Text></Text>
      {sortedMessages.map((message, index) => (
        <View
          key={index}
          style={{
            margin: 8,
            alignSelf:
              message.senderId === user.uid ? "flex-end" : "flex-start",
          }}
        >
          {/* <Text
            style={{
              fontSize: 12,
              fontWeight: "bold",
              color: "white",
              textAlign: message.senderId === user.uid ? "right" : "left",
            }}
          >
            {message.senderId === user.uid ? "You" : "Nas"}
          </Text> */}
          <View
            style={{
              backgroundColor:
                message.senderId === user.uid ? COLORS.red : "white",
              color: message.senderId === user.uid ? "white" : "black",
              padding: 8,
              borderRadius: 8,
              maxWidth: "80%",
              alignSelf:
                message.senderId === user.uid ? "flex-end" : "flex-start",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: message.senderId === user.uid ? "white" : "black",
              }}
            >
              {message.text}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 12,
              color: "gray",
              marginTop: 4,
              textAlign: message.senderId === user.uid ? "right" : "left",
            }}
          ></Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Messages;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    marginBottom: 50,
  },
  listView: {
    flex: 2,
    padding: 10,
  },
  newInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 16,
    padding: 10,
    height: 50,
  },
});

// {isLoading && (
//     <View style={{ margin: 8, maxWidth: "70%" }}>
//       {/* React Native Elements does not have a Skeleton component.
//           You might need a custom implementation or third-party library for loading placeholders. */}
//       <Text>Loading...</Text>
//     </View>
//   )}
