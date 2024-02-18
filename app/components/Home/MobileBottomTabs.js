import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import COLORS from "../../color";

const bottomTabs = [
  {
    icon: "home",
    label: "Home",
    type: "feather",
  },
  {
    icon: "sliders",
    label: "Filter",
    type: "feather",
  },
  {
    icon: "plus-circle",
    label: "Listing",
    type: "feather",
  },
  {
    icon: "message-circle",
    label: "Inbox",
    type: "feather",
    disabled: true,
  },
  {
    icon: "user",
    label: "Profile",
    type: "feather",
  },
];

const MobileBottomTabs = ({ navigation, activeTab, setActiveTab }) => {
  return (
    <View style={styles.container}>
      {bottomTabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={styles.tab}
          onPress={() => {
            if (!tab.disabled) {
              setActiveTab(tab.label);
              if (tab.label === "Profile" || tab.label === "Home") {
                navigation.navigate(tab.label);
              }
              if (tab.label === "Listing") {
                navigation.navigate("CreatePost");
              }
              // Handle "Listing" and "Filter" actions here
            }
          }}
          disabled={tab.disabled}
        >
          <Icon
            name={tab.icon}
            type={tab.type}
            color={activeTab === tab.label ? COLORS.red : "#BDBDBD"}
            size={24}
          />
          <Text
            style={{
              color:
                activeTab.toLowerCase() === tab.label.toLowerCase()
                  ? COLORS.red
                  : "#BDBDBD",
              fontSize: 12,
            }}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 80,
    // position: "absolute",
    // bottom: 0,
    // left: 0,
    // right: 0,
    backgroundColor: "white",
    paddingTop: 0,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  tab: {
    alignItems: "center",
  },
});

export default MobileBottomTabs;
