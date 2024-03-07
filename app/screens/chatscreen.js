import React, { useState, useEffect } from "react";
import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import Messages from "../components/inbox/Messages";
import ChatInput from "../components/inbox/ChatInput";
import { db } from "../services/firebaseConfig";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";

const ChatScreen = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { user } = UserAuth();
  const { firstName, lastName, senderId, receiverId } = route.params;
  navigation.setOptions({ title: `${firstName} ${lastName}` });

  // Example function to generate a chatId from senderId and receiverId
  const generateChatId = (senderId, receiverId) => {
    return [senderId, receiverId].sort().join("_");
  };

  useEffect(() => {
    // Reference to messages collection
    const chatId = generateChatId(senderId, receiverId);
    const messagesRef = collection(db, "messages");

    // Query to fetch messages where the current user is either the sender or the receiver
    // Query to fetch messages for the chatId
    const q = query(
      messagesRef,
      where("chatId", "==", chatId),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        _id: doc.id,
        ...doc.data(),
      }));
      setMessages(messages);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [senderId, receiverId]);

  const handleInputChange = (text) => {
    setInput(text);
  };

  const handleSend = async () => {
    if (input.trim() === "") return; // Prevent sending empty messages

    const chatId = generateChatId(senderId, receiverId);
    await addDoc(collection(db, "messages"), {
      text: input,
      senderId,
      receiverId,
      chatId,
      createdAt: serverTimestamp(),
    });

    setInput(""); // Clear input after sending
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={80}
    >
      <View>
        <Messages messages={messages} />
        <ChatInput
          handleSend={handleSend}
          handleInputChange={handleInputChange}
          input={input}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
