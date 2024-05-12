import auth from "../firebase/firebase.config";
import { useState, useEffect } from "react";
import {
  setDoc,
  doc,
  getDoc,
  getDocs,
  addDoc,
  query,
  where,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { FIRESTORE_DB, storage } from "../firebase/firebase.config";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setData } from "../features/loginDetails.js";

export const useProfileData = () => {
  const profilePic = require("../assets/images/userImage.jpg"); // Replace with the actual path to the profile picture

  const [userData, setUserData] = useState(null);
  const [name, setName] = useState("John Doe");
  const [image, setImage] = useState(profilePic);

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      const colRef = collection(FIRESTORE_DB, "users");
      const q = query(colRef, where("userid", "==", user.uid));

      try {
        onSnapshot(q, (querySnapshot) => {
          querySnapshot?.docs.forEach((doc) => {
            const data = doc.data();
            console.log("data", data);
            setUserData(data);
            setName(data.fullname);
            setImage({ uri: data.imageUrl });
          });
        });
        console.log("data profile: ", data);
      } catch (error) {
        console.log("new error : ", error);
      }
    };
    fetchData();
  }, []);

  // Your component rendering and JSX code here...

  return { name, userData, image };
};
