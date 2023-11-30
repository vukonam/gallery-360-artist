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
  Timestamp,
  FieldPath,
} from "firebase/firestore";
import { FIRESTORE_DB, storage } from "../firebase/firebase.config";
import auth from "../firebase/firebase.config.js";
import moment from "moment";

export const useFetchExhibition = () => {
  const [exhibionData, setExhibionData] = useState([]);
  const [firebaseExhibition, setFirebaseExhibition] = useState(null);
  const [upComing, setUpComing] = useState([]);
  const [past, setPast] = useState([]);
  // const [collectionDataCopy, setCollectionDataCopy] = useState([]);
  // const [collectionDataCopy2, setCollectionDataCopy2] = useState([]);

  /*
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

  */

  useEffect(() => {
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
  }, []);

  // useEffect(() => {
  //   const colRef = collection(FIRESTORE_DB, "exhibition");

  //   // const currentDate = new Date();
  //   const currentDate = moment();

  //   // const targetDate = moment(currentDate, "DD MMM, YYYY");

  //   // console.log("targetDate : ", targetDate);
  //   const formattedDate = moment(currentDate, "YYYY-MM-DD").format(
  //     "YYYY-MM-DD"
  //   );
  //   console.log("formattedData : ", formattedDate);

  //   const timestamp = Timestamp.fromDate(new Date(formattedDate));
  //   // console.log("Formatted Date:", formattedDate);
  //   // colRef.where("date.fromDate", "==", targetDate);

  //   // console.log("newDate : ", newDate);
  //   // Create a target date from your date string
  //   //const dateString = "29 Jun, 2024";
  //   //  where("a", "==", 1), where("c", "==", 3);
  //   const q = query(
  //     colRef,
  //     // where("date", "==", "fromDate"),
  //     where("date.fromDate", ">", timestamp)
  //   );
  //   onSnapshot(q, (querySnapshot) => {
  //     const collection = [];
  //     querySnapshot?.docs.forEach((doc) => {
  //       collection.push({ ...doc.data(), key: doc.id });
  //     });
  //     // collection.map((item) =>
  //     //   exhibionData.push({ value: item.name, key: item.key })
  //     // );
  //     // console.log("exhibionData : ", exhibionData);
  //     setUpComing(collection);
  //   });
  // }, []);

  // useEffect(() => {
  //   const colRef = collection(FIRESTORE_DB, "exhibition");

  //   const currentDate = moment();

  //   // // console.log("newDate : ", newDate);
  //   // // Create a target date from your date string
  //   // //const dateString = "29 Jun, 2024";
  //   // const targetDate = moment(currentDate, "DD MMM, YYYY");
  //   const formattedDate = moment(currentDate, "YYYY-MM-DD").format(
  //     "YYYY-MM-DD"
  //   );
  //   console.log("formattedData : ", formattedDate);
  //   const timestamp = Timestamp.fromDate(new Date(formattedDate));
  //   // console.log("Formatted Date:", formattedDate);
  //   // colRef.where("date.fromDate", "==", targetDate);

  //   // console.log("newDate : ", newDate);
  //   // Create a target date from your date string
  //   //const dateString = "29 Jun, 2024";
  //   //  where("a", "==", 1), where("c", "==", 3);
  //   const q = query(
  //     colRef,
  //     // where("date", "==", "fromDate"),
  //     where("date.fromDate", "<", timestamp)
  //   );
  //   onSnapshot(q, (querySnapshot) => {
  //     const collection = [];
  //     querySnapshot?.docs.forEach((doc) => {
  //       collection.push({ ...doc.data(), key: doc.id });
  //     });
  //     // collection.map((item) =>
  //     //   exhibionData.push({ value: item.name, key: item.key })
  //     // );
  //     // console.log("exhibionData : ", exhibionData);
  //     setPast(collection);
  //   });
  // });

  // useEffect(() => {
  //   // let collection = [];
  //   setCollectionDataCopy([...upComing]); // make a copy of collectionData
  //   setCollectionDataCopy2([...past]); // make a copy of collectionData

  //   firebaseExhibition?.filter((item) => {
  //     const newDate = item?.date?.toDate;

  //     const currentDate = moment();

  //     console.log("newDate : ", newDate);
  //     // Create a target date from your date string
  //     //const dateString = "29 Jun, 2024";
  //     const targetDate = moment(newDate, "DD MMM, YYYY");

  //     // let dateStatus = "";
  //     if (currentDate.isBefore(targetDate)) {
  //       if (!collectionDataCopy.some((data) => data.value === item.title)) {
  //         collectionDataCopy.push(item);
  //       }
  //       //  upComing.push(item);
  //     } else if (currentDate.isAfter(targetDate)) {
  //       if (!collectionDataCopy2.some((data) => data.value === item.title)) {
  //         collectionDataCopy2.push(item);
  //       }
  //       //  past.push(item);
  //     } else {
  //       return;
  //     }
  //   });
  //   setUpComing(collectionDataCopy);
  //   setPast(collectionDataCopy2);
  // }, [
  //   firebaseExhibition,
  //   past,
  //   upComing,
  //   collectionDataCopy,
  //   collectionDataCopy2,
  // ]);

  return { exhibionData, firebaseExhibition, past, upComing };
};
