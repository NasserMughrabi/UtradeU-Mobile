// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDioqv9AqbtFwFsucIxmtsrbg5ypZhbnxw",
  authDomain: "utradeu-bcdf2.firebaseapp.com",
  projectId: "utradeu-bcdf2",
  storageBucket: "utradeu-bcdf2.appspot.com",
  messagingSenderId: "512000492631",
  appId: "1:512000492631:web:fce5e7eca1446770230f12",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize firestore
const db = getFirestore(app);

// Initialize authentication
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { app, db, auth };
