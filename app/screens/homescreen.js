import React from "react";
import { ScrollView, RefreshControl } from "react-native";
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
import { formatDistanceToNow } from "date-fns";

const HomeScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Home");
  const [posts, setPosts] = useState([
    {
      category: "Books",
      postTitle: "Math 2",
      description: "math book that is not for use lskdf hhdf klsd nfnmd lksjf",
      price: 12,
      quality: "Good",
      user: {
        firstName: "Nasser",
        lastName: "Mughrabi",
        photoUrl:
          "https://utradeu.s3.amazonaws.com/uploads/2024-02-20T19%3A01%3A31.837Z_1537AEBA-C1BA-4701-B639-FBB25CDD79BD.jpg",
      },
    },
  ]);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      onSnapshot(collection(db, "posts"), async (snapshot) => {
        const postsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          timeElapsed: calculateTimeElapsed(doc.data().timestamp),
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

        setPosts(postsWithUser);
      });
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      setRefreshing(false); // Reset refreshing state
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts"),
      async (snapshot) => {
        const postsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          timeElapsed: calculateTimeElapsed(doc.data().timestamp),
        }));

        // Use a map to fetch user details in parallel for efficiency
        const usersPromises = postsList.map(async (post) => {
          const userRef = doc(db, "users", post.userId);
          const userSnap = await getDoc(userRef);
          if (!userSnap.exists()) {
            console.log("No such user!");
            return null;
          }
          return { uid: post.userId, ...userSnap.data() }; // Ensure UID is included in user data
        });

        // Await all promises to resolve
        const users = await Promise.all(usersPromises);

        // Combine post with user details
        const postsWithUser = postsList.map((post, index) => ({
          ...post,
          user: users[index], // Append user details to the post
        }));

        setPosts(postsWithUser);
      }
    );

    return () => unsubscribe(); // Detach the listener when the component unmounts
  }, []);

  const calculateTimeElapsed = (timestamp) => {
    // console.log(timestamp);
    if (!timestamp) {
      return "unkown time";
    }
    const date = new Date(
      timestamp?.seconds * 1000 + timestamp?.nanoseconds / 1000000
    );
    return formatDistanceToNow(date, {
      addSuffix: true,
    });
  };

  return (
    <>
      <Header />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {posts
          .sort((a, b) => b?.timestamp?.seconds - a?.timestamp?.seconds)
          .map((post, index) => {
            return (
              <Post
                navigation={navigation}
                post={post}
                timeElapsed={post.timeElapsed}
                key={index}
              />
            );
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
