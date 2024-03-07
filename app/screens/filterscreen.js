import React from "react";
import { View, Text } from "react-native";
import Drawer from "../components/home/Drawer";

const FilterScreen = ({navigation}) => {
  return (
    // <View>
    //   <Text>Filter Screen</Text>
    // </View>
    <Drawer navigation={navigation} />
  );
};

export default FilterScreen;
