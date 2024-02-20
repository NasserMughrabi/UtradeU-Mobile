import React, { useState } from "react";
import { Card, Button, Text, Image } from "react-native-elements";
import { Avatar } from "@rneui/themed";
import { View } from "react-native";
import COLORS from "../../color.js";
import { UserAuth } from "../../context/AuthContext.js";

const Post = ({ navigation, post }) => {
  const [isPressed, setIsPressed] = useState(false);

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
      <Card.Image
        style={{
          height: 200,
        }}
        resizeMode="cover"
        source={{
          uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
        }}
      >
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
      </Card.Image>

      <Card.Divider />
      <View style={{ padding: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 10,
          }}
        >
          <Avatar
            size={32}
            rounded
            // source={{ uri: "https://randomuser.me/api/portraits/men/35.jpg" }}
            source={{ uri: post?.user?.photoURL }}
          />
          <Text h4 h4Style={{ paddingLeft: 10 }}>
            {post?.user?.firstName} {post?.user?.lastName}
          </Text>
        </View>

        <Text h4 h4Style={{ marginBottom: 10, fontWeight: "bold" }}>
          {post?.postTitle}
        </Text>
        <Text style={{ color: "#555", marginBottom: 10 }}>6 mins ago</Text>
        <Button
          title="Learn more"
          buttonStyle={{
            backgroundColor: COLORS.red,
          }}
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </Card>
  );
};

export default Post;
