import React, { useEffect, useState } from "react";
import { FIRESTORE_DB } from "../firebase/firebase.config"; // Import your Firebase configuration
import {
  collection,
  query,
  where,
  onSnapshot,
  FieldPath,
} from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import { View, Text } from "react-native";

function useFetchUpcoming() {
  const [upComing, setUpComing] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Function to fetch data
  const fetchData = () => {
    const colRef = collection(FIRESTORE_DB, "exhibition");
    const currentDate = moment().format("YYYY-MM-DD");
    // const timestamp = Timestamp.fromDate(new Date(currentDate));
    const q = query(
      colRef,
      where("date", "==", "fromDate"),
      where("fromDate", "==", new Date(currentDate))
    );
    // FieldPath;

    onSnapshot(
      q,
      (querySnapshot) => {
        const collection = [];
        querySnapshot.docs.forEach((doc) => {
          collection.push({ ...doc.data(), key: doc.id });
        });

        // Update the state with the new data
        setUpComing(collection);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching data:", error);
        setIsError(true);
      }
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log("upcoming : ", upComing);
  if (isLoading) {
    return (
      <View style={{ color: "white", backgroundColor: "white" }}>
        <Text style={{ color: "white", backgroundColor: "white" }}>
          Loading...
        </Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={{ color: "white", backgroundColor: "white" }}>
        <Text style={{ color: "white", backgroundColor: "white" }}>
          Error fetching data
        </Text>
      </View>
    );
  }

  return (
    <View style={{ color: "white", backgroundColor: "white" }}>
      {upComing.map((item) => (
        <>
          <Text style={{ color: "white", backgroundColor: "white" }}>
            Upcoming Data
          </Text>
          <Text
            style={{ color: "white", backgroundColor: "white" }}
            key={item.key}
          >
            {item.name}
          </Text>
        </>
      ))}
    </View>
  );
}

export default useFetchUpcoming;
