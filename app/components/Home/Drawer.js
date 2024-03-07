import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Button } from "@rneui/themed";
import { COLORS } from "../../assets/static";
import styles from "./styles";
import Icon from "react-native-vector-icons/FontAwesome";
import Slider from "@react-native-community/slider";
const items = [
  "Books",
  "Electronics",
  "Appliances",
  "Furniture",
  "Clothing",
  "Gaming",
  "Outdoor",
  "All",
];

const Drawer = ({ navigation }) => {
  const [location, setLocation] = useState();
  const [cuisines, setCuisines] = useState(0);

  const [open, setOpen] = useState(false);
  const [creditCard, setCreditCard] = useState(false);
  const [free, setFree] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.item}>
          <Text style={styles.title}>Category</Text>
          <View style={styles.row}>
            {items.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setCuisines(index);
                  }}
                  style={[
                    styles.category,
                    {
                      borderColor:
                        cuisines === index ? COLORS.primary : COLORS.grey,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.subtitle,
                      {
                        color:
                          cuisines === index ? COLORS.primary : COLORS.grey,
                      },
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.item}>
          <Text style={styles.title}>Quality</Text>
          <View style={styles.line} />
          <TouchableOpacity
            onPress={() => {
              setOpen(!open);
            }}
            style={styles.rowFilter}
          >
            <Text style={styles.text}>New</Text>
            {open && <Icon name="check" size={20} color={COLORS.primary} />}
          </TouchableOpacity>
          <View style={styles.line} />
          <TouchableOpacity
            onPress={() => {
              setCreditCard(!creditCard);
            }}
            style={styles.rowFilter}
          >
            <Text style={styles.text}>Good</Text>
            {creditCard && (
              <Icon name="check" size={20} color={COLORS.primary} />
            )}
          </TouchableOpacity>
          <View style={styles.line} />
          <TouchableOpacity
            onPress={() => {
              setFree(!free);
            }}
            style={styles.rowFilter}
          >
            <Text style={styles.text}>Fair</Text>
            {free && <Icon name="check" size={20} color={COLORS.primary} />}
          </TouchableOpacity>
          <View style={styles.line} />
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>PRICE RANGE ($)</Text>
          {/* <RangeSlider
            min={0}
            max={300}
            handleColor={COLORS.primary}
            tintColor={COLORS.title}
            handleDiameter={20}
            tintColorBetweenHandles={COLORS.primary}
            lineHeight={5}
            onChange={(min, max) => {}}
          /> */}
          <Slider
            style={{ flex: 1, height: 40 }}
            minimumValue={0}
            maximumValue={1000}
            minimumTrackTintColor={COLORS.primary}
            maximumTrackTintColor="gray"
          />
        </View>
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.closeDrawer();
          }}
        >
          <Text style={styles.buttonTxt}>Apply Filters</Text>
        </TouchableOpacity> */}

        <Button
          title="Apply Filters"
          buttonStyle={{
            backgroundColor: COLORS.primary,
            borderWidth: 2,
            borderColor: "white",
            borderRadius: 10,
          }}
          titleStyle={{ fontWeight: "bold" }}
          // onPress={handlePost}
          onPress={() => navigation.navigate("Home")}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Drawer;
