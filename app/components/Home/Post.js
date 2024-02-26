import React, { useState, useEffect } from "react";
import { Card, Button, Text, Image, Input } from "react-native-elements";
import { Avatar, Icon } from "@rneui/themed";
import { View } from "react-native";
import COLORS from "../../color.js";
import { UserAuth } from "../../context/AuthContext.js";
import Carousel from "react-native-snap-carousel";
import { ViewPropTypes } from "deprecated-react-native-prop-types";
import { Dimensions } from "react-native";

const Post = ({ navigation, post, timeElapsed }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [showDesc, setshowDesc] = useState(false);
  const sliderWidth = Dimensions.get("window").width;
  const itemWidth = sliderWidth * 0.76;

  post = {
    postTitle: "Cozy Mountain Cabin Retreat",
    price: "200",
    user: {
      firstName: "Alex",
      lastName: "Johnson",
      photoURL:
        "https://utradeu.s3.amazonaws.com/uploads/2024-02-20T19%3A01%3A31.837Z_1537AEBA-C1BA-4701-B639-FBB25CDD79BD.jpg",
    },
    quality: "New",
    description:
      "Experience the serenity of the mountains in our cozy cabin. Perfect for weekend getaways. Fully furnished with a fireplace and a stunning mountain view.",
    images: [
      "https://utradeu.s3.amazonaws.com/uploads/2024-02-20T19%3A01%3A31.837Z_1537AEBA-C1BA-4701-B639-FBB25CDD79BD.jpg",
      "https://utradeu.s3.amazonaws.com/uploads/2024-02-20T19%3A20%3A42.730Z_297D45CB-946B-4ECF-8A33-146A3FFB64E1.jpg",
    ],
  };

  const toggleShowAll = (e) => {
    e.stopPropagation(); // Prevent the click event from propagating to the parent link
    e.preventDefault(); // Prevent the default link navigation behavior
    setshowDesc(!showDesc);
  };

  // Render carousel item
  const renderItem = ({ item, index }) => {
    return (
      <View style={{ height: 200, width: itemWidth }}>
        <Image
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
          source={{ uri: item }}
        />
      </View>
    );
  };

  return (
    <Card
      containerStyle={{
        borderRadius: 10,
        borderWidth: 1,
        overflow: "hidden",
        marginBottom: 16,
        padding: 0,
      }}
    >
      {/* <Card.Image
        style={{
          height: 200,
        }}
        resizeMode="cover"
        source={{
          uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
        }}
      > */}
      <View>
        <Carousel
          data={post.images}
          renderItem={renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          loop
        />
        <View
          style={{
            position: "absolute",
            bottom: 0,
            backgroundColor: COLORS.red,
            paddingHorizontal: 12,
            paddingVertical: 6,
          }}
        >
          <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 16 }}>
            ${post.price}
          </Text>
        </View>

        <View
          style={{
            position: "absolute",
            top: 80,
            right: 0,
            paddingHorizontal: 12,
            paddingVertical: 6,
          }}
        >
          <Icon name="arrow-forward-ios" color="white" />
        </View>
        <View
          style={{
            position: "absolute",
            top: 80,
            left: 0,
            paddingHorizontal: 12,
            paddingVertical: 6,
          }}
        >
          <Icon name="arrow-back-ios" color="white" />
        </View>
      </View>

      {/* </Card.Image> */}

      <Card.Divider />
      <View style={{ padding: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 10,
          }}
        >
          <Avatar size={30} rounded source={{ uri: post?.user?.photoURL }} />
          <Text style={{ paddingLeft: 6, fontSize: 18 }}>
            {post?.user?.firstName} {post?.user?.lastName}
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text h4 h4Style={{ marginBottom: 10, fontWeight: "bold" }}>
            {post?.postTitle}
          </Text>
          {/* <Icon name="fiber_new" type="material" color="#00aced" /> */}
          <Text
            style={{
              paddingLeft: 2,
              marginBottom: 10,
              fontWeight: "bold",
              color: COLORS.red,
            }}
          >
            {post?.quality.toUpperCase()}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text style={{ fontWeight: "light", color: "black", fontSize: 15 }}>
            {showDesc ? post?.description : post?.description?.substring(0, 48)}{" "}
            {post?.description?.length > 3 && (
              <Text
                style={{
                  paddingLeft: 4,
                  fontWeight: "light",
                  color: "#555",
                  fontSize: 15,
                  // cursor: "pointer",
                }}
                onPress={toggleShowAll}
              >
                {showDesc ? "See Less..." : "See More..."}
              </Text>
            )}
          </Text>
        </View>
        <Text style={{ color: "#555", marginBottom: 10, fontSize: 12 }}>
          {timeElapsed}
        </Text>
        {/* <Button
          title="Learn more"
          buttonStyle={{
            backgroundColor: COLORS.red,
          }}
          onPress={() => navigation.navigate("Login")}
        /> */}
      </View>
    </Card>
  );
};

export default Post;

// Gaming Chair
// I have used it for only a few years. Didn’t wanna sell but my brother got me a new one so am selling it now.
// 22
