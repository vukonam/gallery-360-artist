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
  //const [data, setData] = useState([]);
  // useEffect(() => {
  //   const user = auth.currentUser;
  //   const colRef = collection(FIRESTORE_DB, "users");

  //   const q = query(colRef, where("userid", "==", user.uid));

  //   onSnapshot(q, (querySnapshot) => {
  //     let data = querySnapshot?.docs[0].data();
  //     setUserData(data);
  //     setName(data.fullname);
  //     setImage({ uri: data.imageUrl });
  //   });
  // }, []);
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      //   const user = auth.currentUser;
      //   const colRef = collection(FIRESTORE_DB, "users");
      //   const q = query(colRef, where("userid", "==", user.uid));

      //   try {
      //     const querySnapshot = await onSnapshot(q);
      //     const data = querySnapshot.docs[0]?.data();

      //     if (data) {
      // setUserData(data);
      // setName(data?.fullname);
      // setImage({ uri: data?.imageUrl });
      //     } else {
      //       console.log("No data found for the user");
      //     }
      //   } catch (error) {
      //     console.log("Error fetching data:", error);
      //     // Handle the error gracefully, e.g., display an error message to the user.
      //   }
      // };
      const user = auth.currentUser;
      const colRef = collection(FIRESTORE_DB, "users");
      const q = query(colRef, where("userid", "==", user.uid));

      // const querySnapshot = onSnapshot(q);
      // const data = querySnapshot.docs[0]?.data();
      try {
        onSnapshot(q, (querySnapshot) => {
          querySnapshot?.docs.forEach((doc) => {
            const data = doc.data();
            // console.log("see the data : ", doc.data());
            // let dataCol = [];
            // dataCol.push(doc.data());
            // setData(dataCol);
            console.log("data", data);
            setUserData(data);
            setName(data.fullname);
            setImage({ uri: data.imageUrl });
          });
        });
        console.log("data profile: ", data);
        //if (!data) return;
        // if (data.length !== 0) {
        //   console.log("data", data);
        //   setUserData(data);
        //   setName(data[0].fullname);
        //   setImage({ uri: data[0].imageUrl });
        // } else {
        //   console.log("No data found for the user");
        // }
      } catch (error) {
        console.log("new error : ", error);
      }
    };
    fetchData();
  }, []);

  // Your component rendering and JSX code here...

  return { name, userData, image };
};
