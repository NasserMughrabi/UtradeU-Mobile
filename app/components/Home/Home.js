import React from "react";
import { ScrollView } from "react-native";
import Post from "./Post";
import MobileBottomTabs from "./MobileBottomTabs";
import Header from "./Header";
import { useState } from "react";
import { SearchBar } from "@rneui/themed";

const Home = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Home");
  const posts = [1, 2, 3];
  return (
    <>
      <Header />
      <ScrollView>
        {posts.map((post, index) => {
          return <Post navigation={navigation} key={index} />;
        })}
      </ScrollView>
      <MobileBottomTabs activeTab={activeTab} setActiveTab={setActiveTab} />
    </>
  );
};

export default Home;
