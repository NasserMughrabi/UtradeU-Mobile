import React from "react";
import {
  View,
  TextInput,
  Text,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import COLORS from "../../color";
import { useState, useEffect, useRef } from "react";
import { ViewPropTypes } from "deprecated-react-native-prop-types";

const ChatInput = ({ handleSend, handleInputChange, input }) => {
  const [value, setValue] = useState("");
  const [inputHeight, setInputHeight] = useState(40); // Initial height set to 40

  const handleChange = (text) => {
    // setValue(text);
    handleInputChange(text);
  };

  // Handle the content size change
  const handleContentSizeChange = (event) => {
    setInputHeight(event.nativeEvent.contentSize.height);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 10,
          justifyContent: "space-between",
          height: 80,
          paddingBottom: 40,
        }}
      >
        <TextInput
          // value={message}
          // onChangeText={(text) => setMessage(text)}
          // ref={textareaRef}
          value={input}
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: "#dddddd",
            borderRadius: 20,
            paddingHorizontal: 10,
            backgroundColor: "white",
            paddingVertical: 10,
            alignItems: "center",
          }}
          // style={[styles.textInput, { height: inputHeight }]}
          placeholder="Type a message..."
          // multiline={true}
          // numberOfLines={10}
          textAlignVertical="top"
          onChangeText={handleChange}
          //   onContentSizeChange={handleContentSizeChange}
        />
        <Pressable
          onPress={handleSend}
          style={{
            backgroundColor: COLORS.red,
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 20,
            marginHorizontal: 8,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Send</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: "row",
    // alignItems: "center",
    // paddingHorizontal: 10,
    // paddingVertical: 10,
    // justifyContent: "space-between",
    // Adjust the container height dynamically or use a fixed height
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginHorizontal: 5, // Provide some spacing around TextInput
    paddingVertical: 10, // Padding inside TextInput
    backgroundColor: "white",
  },
});

export default ChatInput;
