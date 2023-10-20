import auth from "../firebase/firebase.config";
import { useState, useEffect } from "react";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB, storage } from "../firebase/firebase.config";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setData } from "../features/loginDetails.js";

export const useProfileData = () => {
  const profilePic = require("../assets/images/userImage.jpg"); // Replace with the actual path to the profile picture

  const [userData, setUserData] = useState(null);
  const [name, setName] = useState("John Doe");
  const [image, setImage] = useState(profilePic);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = auth.currentUser;
    console.log(user.uid);
    getDoc(doc(FIRESTORE_DB, "galleryUsers", user.uid), {})
      .then((docData) => {
        // Success callback
        console.log("data ", docData.data());
        if (docData.exists()) {
          let data = docData.data();
          dispatch(setData(data));
          setUserData(data);
          setName(data.fullname);
          setImage({ uri: data.imageUrl });
        } else console.log("NO SUCH DATA");
      })
      .catch((error) => {
        // Error callback
        console.log("firestore error : ", error.message);
        alert("Your database is offline at the moment!");
        // alert(`Something went wrong while fetching the document:\n${error}`);
        console.log("error ", error);
      });
  }, []);

  return { name, userData, image };
};
