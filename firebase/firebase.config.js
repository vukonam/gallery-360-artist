// import { initializeApp } from "firebase/app";
// import firebase from "firebase/app"
// //import "firebase/auth";
// import { getAuth } from "firebase/auth";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export default auth = getAuth(app);

import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import { getDatabase} from "firebase/database"
import { getStorage } from "firebase/storage";
// Initializing Firebase with config
const firebaseConfig = {
  apiKey: "AIzaSyBCqBD_w3D_yiV2w63rlLoH8ZSqRPS-wCM",
  authDomain: "gallery-360-africa.firebaseapp.com",
  projectId: "gallery-360-africa",
  storageBucket: "gallery-360-africa.appspot.com",
  messagingSenderId: "977191750253",
  appId: "1:977191750253:web:e904658e10a43b0e5fcd64",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export default FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const storage = getStorage(app);
//export const db = getDatabase(app);
