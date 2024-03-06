import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { ListItem, Avatar } from "@rneui/themed";
import { UserAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
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

const InboxUsersScreen = ({ navigation }) => {
  const { user } = UserAuth();
  const [chatUsers, setChatUsers] = useState([]);

  useEffect(() => {
    const fetchChatUsers = async () => {
      const uniqueUserIds = new Set();
      const users = [];

      // Query for messages where the current user is the sender or receiver
      const messagesRef = collection(db, "messages");
      const qSender = query(messagesRef, where("senderId", "==", user.uid));
      const qReceiver = query(messagesRef, where("receiverId", "==", user.uid));

      try {
        // Fetch messages where the user is the sender
        const querySnapshotSender = await getDocs(qSender);
        querySnapshotSender.forEach((doc) => {
          uniqueUserIds.add(doc.data().receiverId);
        });

        // Fetch messages where the user is the receiver
        const querySnapshotReceiver = await getDocs(qReceiver);
        querySnapshotReceiver.forEach((doc) => {
          uniqueUserIds.add(doc.data().senderId);
        });

        // Remove the current user's ID from the set
        uniqueUserIds.delete(user.uid);

        // Fetch user details for each unique user ID
        for (let userId of uniqueUserIds) {
          const userRef = doc(db, "users", userId);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            users.push({ uid: userId, ...userSnap.data() });
          }
        }
        // console.log(users);
        setChatUsers(users);
      } catch (error) {
        console.error("Error fetching chat users: ", error);
      }
    };

    if (user?.uid) {
      fetchChatUsers();
    }
  }, [user?.uid]);

  return (
    <View>
      {chatUsers.map((chatUser, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate("Chat", {
                firstName: chatUser?.firstName,
                lastName: chatUser?.lastName,
                senderId: user?.uid,
                receiverId: chatUser?.uid,
              })
            }
          >
            <ListItem bottomDivider>
              {chatUser.photoURL ? (
                <Avatar
                  rounded
                  source={{
                    uri: chatUser.photoURL,
                  }}
                />
              ) : (
                <Avatar
                  rounded
                  icon={{
                    name: "person-outline",
                    type: "material",
                    size: 26,
                  }}
                  containerStyle={{ backgroundColor: "#c2c2c2" }}
                />
              )}
              <ListItem.Content>
                <ListItem.Title>
                  {chatUser.firstName} {user.lastName}
                </ListItem.Title>
                {/* <ListItem.Subtitle>
                  {chatUser.lastMessage.length > 30
                    ? chatUser.lastMessage.slice(0, 30) + "..."
                    : chatUser.lastMessage}
                </ListItem.Subtitle> */}
              </ListItem.Content>
            </ListItem>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default InboxUsersScreen;
