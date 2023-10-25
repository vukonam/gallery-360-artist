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

export const useCollection = () => {
  const [collectionData, setCollectionData] = useState([]);
  const [firebaseCollection, setFirebaseCollection] = useState(null);
  const [collectionDataCopy, setCollectionDataCopy] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    const colRef = collection(FIRESTORE_DB, "collection");
    const q = query(colRef, where("uid", "==", user.uid));
    onSnapshot(q, (querySnapShot) => {
      let collection = [];
      setCollectionDataCopy([...collectionData]); // make a copy of collectionData

      querySnapShot.docs.forEach((doc) => {
        collection.push({ ...doc.data(), key: doc.id });
      });
      collection.forEach((item) => {
        // Check for duplicates in collectionData
        if (!collectionDataCopy.some((data) => data.value === item.name)) {
          collectionDataCopy.push({ value: item.name, key: item.key });
        }
      });
      console.log("collectionData : ", collectionDataCopy);
      setFirebaseCollection(collection);
      setCollectionData(collectionDataCopy);
    });
  }, []);

  return { collectionData, firebaseCollection };
};
