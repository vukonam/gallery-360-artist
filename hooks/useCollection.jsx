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

  useEffect(() => {
    const user = auth.currentUser;
    const colRef = collection(FIRESTORE_DB, "collection");
    const q = query(colRef, where("uid", "==", user.uid));
    onSnapshot(q, (querySnapShot) => {
      let collection = [];
      querySnapShot.docs.forEach((doc) => {
        collection.push({ ...doc.data(), key: doc.id });
      });
      collection.map((item) =>
        collectionData.push({ value: item.name, key: item.key })
      );
      console.log("collectionData : ", collectionData);
      setFirebaseCollection(collection);
    });
  }, []);

  return { collectionData, firebaseCollection };
};
