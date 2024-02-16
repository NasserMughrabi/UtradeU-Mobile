import React, { useState } from "react";
import { Card, Button, Text, Image } from "react-native-elements";
import { View } from "react-native";
import COLORS from "../../color.js";

const Post = ({ navigation }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Card
      containerStyle={{
        borderRadius: 10,
        borderWidth: 1,
        overflow: "hidden",
        marginBottom: 16,
        // backgroundColor: "red",
        padding: 0,
      }}
      // wrapperStyle={{backgroundColor: "blue"}}
    >
      <Card.Image
        style={{
          // backgroundColor: "green",
          height: 200,
          // padding: 0,
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
          <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>$10</Text>
        </View>
      </Card.Image>

      <Card.Divider />
      <View style={{padding: 10}}>
        <Text h4 h4Style={{ marginBottom: 10 }}>
          Math Book
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
