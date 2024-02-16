import React from "react";
import { View, Image } from "react-native";

const Logo = () => {
  return (
    <View
      style={{
        alignItems: "center",
        width: 250,
        height: 100,
      }}
    >
      <Image
        source={require("../assets/logo.png")}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      />
    </View>
  );
};

export default Logo;
