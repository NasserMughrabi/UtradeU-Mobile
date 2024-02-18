import React from "react";
import { ScrollView } from "react-native";
import Post from "../components/home/Post";
import MobileBottomTabs from "../components/home/MobileBottomTabs";
import Header from "../components/home/Header";
import { useState, useEffect } from "react";
import { SearchBar } from "@rneui/themed";
import { db } from "../services/firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";

const HomeScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Home");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts"),
      async (snapshot) => {
        const postsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Use a map to fetch user details in parallel for efficiency
        const usersPromises = postsList.map(async (post) => {
          const userRef = doc(db, "users", post.userId);
          const userSnap = await getDoc(userRef);
          return userSnap.exists() ? userSnap.data() : null;
        });

        // Await all promises to resolve
        const users = await Promise.all(usersPromises);

        // Combine post with user details
        const postsWithUser = postsList.map((post, index) => ({
          ...post,
          user: users[index], // Append user details to the post
        }));

        setPosts(postsWithUser.reverse());
      }
    );

    return () => unsubscribe(); // Detach the listener when the component unmounts
  }, []);

  return (
    <>
      <Header />
      <ScrollView>
        {posts.map((post, index) => {
          return <Post navigation={navigation} post={post} key={index} />;
        })}
      </ScrollView>
      <MobileBottomTabs
        navigation={navigation}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </>
  );
};

export default HomeScreen;
