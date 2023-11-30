import { useEffect, useState } from "react";
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
import auth from "../firebase/firebase.config.js";

export const useFetchProfileData = () => {
  const profilePic = require("../assets/images/userImage.jpg"); // Replace with the actual path to the profile picture

  const sign = require("../assets/images/Jon_Kirsch's_Signature.png");
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState("John Doe");
  const [image, setImage] = useState(profilePic);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [bio, setBio] = useState("John Doe");
  const [signature, setSignature] = useState(sign);
  //const [data, setData] = useState([]);
  useEffect(() => {
    /*

    const user = auth.currentUser;
    const colRef = collection(FIRESTORE_DB, "exhibition");

    const q = query(colRef, where("userid", "==", user.uid));

    onSnapshot(q, (querySnapshot) => {
      const collection = [];
      querySnapshot?.docs.forEach((doc) => {
        collection.push({ ...doc.data(), key: doc.id });
      });
      collection.map((item) =>
        exhibionData.push({ value: item.name, key: item.key })
      );
      console.log("exhibionData : ", exhibionData);
      setFirebaseExhibition(collection);
    });
    */

    const fetchData = async () => {
      const user = auth.currentUser;
      const colRef = collection(FIRESTORE_DB, "users");
      const q = query(colRef, where("userid", "==", user.uid));

      // const querySnapshot = onSnapshot(q);
      // const data = querySnapshot.docs[0]?.data();
      onSnapshot(q, (querySnapshot) => {
        querySnapshot?.docs.forEach((doc) => {
          // console.log("see the data : ", doc.data());
          // let dataCol = [];
          // dataCol.push(doc.data());
          const data = doc.data();
          // console.log("see the data : ", doc.data());
          // let dataCol = [];
          // dataCol.push(doc.data());
          // setData(dataCol);
          console.log("data", data);
          setUserData(data);
          setName(data?.fullname);
          setImage({ uri: data?.imageUrl });
          setDateOfBirth(data?.dateofbirth);
          setBio(data?.biography);
          setSignature({ uri: data?.signature });
        });
      });
      console.log("data profile: ", data);
      //if (!data) return;
      // if (data.length !== 0) {
      //   console.log("data", data);
      // setUserData(data);
      // setName(data[0].fullname);
      // setImage({ uri: data[0].imageUrl });
      // setDateOfBirth(data[0].dateofbirth);
      // setBio(data[0].biography);
      // setSignature({ uri: data[0].signature });
      // } else {
      //   console.log("No data found for the user");
      // }
      // } catch (error) {
      //   console.error("Error fetching data:", error);
      //   // Handle the error gracefully, e.g., display an error message to the user.
      // }
    };

    // const fetchData = async () => {
    //   const user = auth.currentUser;
    //   const colRef = collection(FIRESTORE_DB, "users");
    //   const q = query(colRef, where("userid", "==", user.uid));

    //   try {
    //     const querySnapshot = await onSnapshot(q);
    //     const data = querySnapshot.docs[0]?.data();
    //     if (!data) return;
    //     if (data) {
    //       setUserData(data);
    //       setName(data.fullname);
    //       setImage({ uri: data.imageUrl });
    //       setDateOfBirth(data.dateofbirth);
    //       setBio(data.biography);
    //       setSignature({ uri: data.signature });
    //     } else {
    //       console.log("No data found for the user");
    //     }
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //     // Handle the error gracefully, e.g., display an error message to the user.
    //   }
    // };

    fetchData();
  }, []);
  return { userData, name, image, dateOfBirth, bio, signature };
};
