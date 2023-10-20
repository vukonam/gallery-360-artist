import { useEffect, useState } from "react";
import {
  setDoc,
  doc,
  getDoc,
  getDocs,
  addDoc,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { FIRESTORE_DB, storage } from "../../../../firebase/firebase.config";

export const useCollection = () => {
  const [collectionData, setCollectionData] = useState([]);
  const [firebaseCollection, setFirebaseCollection] = useState(null);

  useEffect(() => {
    const colRef = collection(FIRESTORE_DB, "collection");
    getDocs(colRef).then((snapshot) => {
      let collection = [];

      snapshot.docs.forEach((doc) => {
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
