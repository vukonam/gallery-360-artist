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
import { FIRESTORE_DB, storage } from "../firebase/firebase.config";

export const useFetchArtworks = () => {
  const [artworkData, setArtworkData] = useState([]);
  const [firebaseArtworks, setFirebaseArtworks] = useState(null);

  useEffect(() => {
    const colRef = collection(FIRESTORE_DB, "newArtworks");
    getDocs(colRef).then((snapshot) => {
      let collection = [];

      snapshot.docs.forEach((doc) => {
        collection.push({ ...doc.data(), key: doc.id });
      });
      collection.map((item) =>
        artworkData.push({ value: item.name, key: item.key })
      );
      console.log("ArtworkData : ", artworkData);
      setFirebaseArtworks(collection);
    });
  }, []);

  return { artworkData, firebaseArtworks };
};
