import React from "react";
import { Text } from "react-native";
import { useState } from "react";
import ItemForm from "../components/listing/ItemForm";

const CreatePostScreen = ({navigation}) => {
  const [postData, setPostData] = useState({});
  return <ItemForm navigation={navigation} postData={postData} setPostData={setPostData} />;
};

export default CreatePostScreen;
