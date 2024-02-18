import React, { useRef, useState } from "react";
import { ScrollView, View, Text, StyleSheet, TextInput } from "react-native";
import {
  CheckBox,
  Input,
  ButtonGroup,
  Textarea,
  Button,
} from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import { UserAuth } from "../../context/AuthContext";
import { auth, db } from "../../services/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const ItemForm = ({ navigation, postData, setPostData }) => {
  const [isChecked, setIsChecked] = useState(false);
  const { user } = UserAuth();

  const handlePost = async () => {
    if (!user) {
      alert("You must be logged in to post.");
      return;
    }

    // Assuming 'postData' contains all the information of the post
    const newPostData = {
      ...postData,
      userId: user.uid, // Link the post to the user by their UID
      //   timestamp: serverTimestamp(), // Add a timestamp for when the post is created/updated
    };

    try {
      // Create a new document with a unique ID in the 'posts' collection
      const postRef = doc(
        db,
        "posts",
        user.uid + "_" + new Date().toISOString()
      ); // Example doc ID
      await setDoc(postRef, newPostData, { merge: true });
      navigation.navigate("Home");
    } catch (error) {
      alert("Failed to update post.");
    }
  };

  return (
    <ScrollView>
      <View style={{ padding: 10, paddingTop: 0 }}>
        <Picker
          selectedValue={postData?.category}
          onValueChange={(itemValue, itemIndex) =>
            setPostData({ ...postData, category: itemValue })
          }
        >
          <Picker.Item label="Select Category" value="" />
          <Picker.Item label="Appliances" value="appliances" />
          <Picker.Item label="Books" value="books" />
        </Picker>

        <Input
          placeholder="Title"
          value={postData?.postTitle}
          onChangeText={(value) =>
            setPostData({ ...postData, postTitle: value })
          }
          containerStyle={{ marginTop: 20 }}
        />

        <Input
          placeholder="Description"
          value={postData?.description}
          onChangeText={(value) =>
            setPostData({ ...postData, description: value })
          }
          multiline={true}
          numberOfLines={10}
        />

        <Input
          placeholder="Enter amount"
          value={postData?.price}
          onChangeText={(value) => setPostData({ ...postData, price: value })}
          leftIcon={{ type: "font-awesome", name: "dollar" }}
        />

        <ButtonGroup
          onPress={(selectedIndex) => {
            const quality = ["new", "good", "fair"][selectedIndex];
            setPostData({ ...postData, quality });
          }}
          selectedIndex={["new", "good", "fair"].indexOf(postData?.quality)}
          buttons={["New", "Good", "Fair"]}
          containerStyle={{ marginBottom: 20 }}
        />

        <Button
          title="Post"
          buttonStyle={{
            backgroundColor: "black",
            borderWidth: 2,
            borderColor: "white",
            borderRadius: 10,
          }}
          titleStyle={{ fontWeight: "bold" }}
          onPress={handlePost}
        />
      </View>
    </ScrollView>
  );
};

export default ItemForm;
