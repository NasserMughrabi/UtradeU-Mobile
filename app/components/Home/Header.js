import React, { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Input, Icon } from "react-native-elements";
import COLORS from "../../color";

const Header = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          { display: Platform.OS === "web" && "none" },
        ]}
      >
        <Input
          placeholder="Items • Services • Events"
          inputContainerStyle={{
            borderWidth: 1,
            borderColor: isFocused ? "black" : "#CDCDCD",
            borderRadius: 30,
            backgroundColor: "white",
            paddingLeft: 15,
          }}
          leftIcon={
            <Icon
              name="search"
              type="feather" // Or any other icon type you prefer
              color={"black"}
            />
          }
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          inputStyle={{ marginLeft: 10 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
  },
  inputContainer: {
    width: "100%",
  },
});

export default Header;
