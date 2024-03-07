import React, { useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { Avatar, Button, ButtonGroup, Text, Icon, Input } from "@rneui/themed";
import { Picker } from "@react-native-picker/picker";
import { UserAuth } from "../../context/AuthContext";
import { auth, db } from "../../services/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import COLORS from "../../color";

const items = [
  "Books",
  "Electronics",
  "Appliances",
  "Furniture",
  "Clothing",
  "Gaming",
  "Outdoor",
  "Other",
];

const ItemForm = ({ navigation, postData, setPostData }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [images, setImages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = UserAuth();

  const handlePost = async () => {
    if (!user) {
      alert("You must be logged in to post.");
      return;
    }

    if (
      !postData.category ||
      !postData.postTitle ||
      !postData.description ||
      !postData.price ||
      !postData.quality
    ) {
      alert("All fields required!");
      return;
    }

    if (postData.postTitle.length > 20) {
      alert("Title cannot be more than 20 characters!");
      return;
    }

    if (postData.description.length > 200) {
      alert("Description cannot be more than 200 characters!");
      return;
    }

    if (postData.price > 10000) {
      alert("Enter a reasonable price, please!");
      return;
    }

    if (isLoading) {
      alert("Please wait for images to upload!");
      return;
    }


    // Assuming 'postData' contains all the information of the post
    const newPostData = {
      ...postData,
      userId: user.uid, // Link the post to the user by their UID
      timestamp: serverTimestamp(), // Add a timestamp for when the post is created/updated
      images: images,
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

  const handleImagePick = async () => {
    // Request permission
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }
    // Pick the images
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
    });
    if (pickerResult.canceled) {
      return;
    }

    // Set the selected images
    setIsLoading(true);
    const uploadPromises = pickerResult.assets.map((asset) =>
      uploadImageToS3(asset.uri)
    );
    const imageUrls = await Promise.all(uploadPromises);
    const successfulUploads = imageUrls.filter(url => url !== null);
    setImages(successfulUploads);
    setIsLoading(false);
  };

  const uploadImageToS3 = async (imageUri) => {
    const s3 = new AWS.S3();
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();

      const uploadParams = {
        Bucket: "utradeu",
        Key: `uploads/${new Date().toISOString()}_${imageUri.split("/").pop()}`,
        Body: blob,
        // ACL: "public-read", // Uploaded files are publicly accessible
      };

      const data = await s3.upload(uploadParams).promise();
      return data.Location; // Return the URL of the uploaded image
    } catch (err) {
      alert("Upload Error");
      return null;
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
          {items.map((item, index) => {
            return <Picker.Item key={index} label={item} value={item.toLowerCase()} />;
          })}
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
          containerStyle={{ marginBottom: 70 }}
        />

        <View
          style={{
            position: "absolute",
            bottom: 70,
            right: 15,
          }}
        >
          {isLoading ? (
            <Button
              radius={"sm"}
              type="solid"
              buttonStyle={{ backgroundColor: "black" }}
              loading
            ></Button>
          ) : (
            <Button
              radius={"sm"}
              type="solid"
              buttonStyle={{ backgroundColor: "black" }}
              onPress={handleImagePick}
            >
              <Icon name="image" color="white" size={17} />
            </Button>
          )}
        </View>

        <Button
          title="Post"
          buttonStyle={{
            backgroundColor: COLORS.red,
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
