import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
//import Icon from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/FontAwesome5";
import styles from "./styles";
// import ProfilePic from "../../components/ProfilePic";
import { useSelector } from "react-redux";
// import { setLoading } from "../../features/loginDetails.js";
// import { useDispatch } from "react-redux";
import auth from "../../firebase/firebase.config.js";
// import { setDoc, doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB, storage } from "../../firebase/firebase.config";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import Carousel from "react-native-snap-carousel"; // Import the library for the carousel.
//import Icon from "react-native-vector-icons/FontAwesome5";
import { useImageFunctions } from "../../hooks/useImageFunctions";
//import { AsyncStorage } from "@react-native-async-storage/async-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import { StatusBar } from "expo-status-bar";
//import { StyleSheet, Button, View, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
//import { useState } from "react";

// Replace "FontAwesome5" with the icon library of your choice.
const SetupProfileScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [desc, setDesc] = useState("");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");

  const [selectedArtworks, setSelectedArtworks] = useState([]);
  useEffect(() => {
    AsyncStorage.getItem("selectedArtworks").then((data) => {
      if (data) {
        setSelectedArtworks(JSON.parse(data));

        AsyncStorage.removeItem("selectedArtworks")
          .then(() => {
            console.log("Data removed from AsyncStorage");
          })
          .catch((error) => {
            console.error("Error removing data from AsyncStorage: ", error);
          });
      } else {
        // Handle the case when there's no data in AsyncStorage.
        // For example, set a default value.
        console.log("The asyncStorage is empty");
        setSelectedArtworks([]); // Set an empty array as the default value
      }
    });
  }, []);

  const onChange = (e, selectedDate, targetState) => {
    if (targetState === "fromDate") {
      setFromDate(selectedDate);
      setShow(false);
    } else if (targetState === "toDate") {
      setToDate(selectedDate);
      setShow(false);
    } else if (targetState === "fromTime") {
      setFromTime(selectedDate);
      setShow(false);
    } else if (targetState === "toTime") {
      setToTime(selectedDate);
      setShow(false);
    }
  };
  // const onChange = (e, selectedDate) => {
  //   setDate(selectedDate);
  //   setShow(false);
  // };

  // const showMode = (modeToShow) => {
  //   setShow(true);
  //   setMode(modeToShow);
  // };
  const showMode = (modeToShow, targetState) => {
    setMode(modeToShow);
    setShow(true); // Open the picker
    //setDate(date);
    // Pass the target state to onChange
    //onChange(null, date, targetState);
  };
  const user = auth.currentUser;
  const colRef = collection(FIRESTORE_DB, "exhibition");

  const { pickImage, image, imagesUrls, images } = useImageFunctions();

  const writeUserData = () => {
    const handleAddDoc = () => {
      addDoc(colRef, {
        name,
        email,
        contactNumber,
        address,
        date: { fromDate: fromDate, toDate: toDate },
        time: { fromTime: fromTime, toTime: toTime },
        desc,
        imgUrls: imagesUrls,
        collections: selectedArtworks,
        userid: user.uid,
      })
        .then((result) => {
          // Success callback
          console.log("data ", result);
          alert("data saved");
        })
        .catch((error) => {
          // Error callback
          alert(error);
          console.log("error ", error);
        });
    };
    handleAddDoc();
  };

  const handleSaveProfile = () => {
    // Here you can save the profile data to your backend or perform any necessary actions
    // For simplicity, we'll just log the data for now.
    console.log("Profile Data:");
    console.log("Image:", image);
    console.log("Full Name:", name);
    console.log("Contact Number:", contactNumber);
    console.log("Email:", email);
    console.log("Desc:", desc);
    navigation.navigate("ExhibitionShow", {
      image,
      images,
      name,
      email,
      contactNumber,
      address,
      desc,
    });

    writeUserData();
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.header}>New Exhibition</Text>
        </View>
        <View>
          {image ? (
            <>
              <View>
                <Image
                  source={image}
                  style={{
                    width: 150,
                    height: 150,
                    alignSelf: "center",
                    borderRadius: 75,
                    marginTop: 40,
                    padding: 20,
                    borderRadius: 10,
                    width: "100%",
                    height: 500, // Adjust this value to control the image height
                    resizeMode: "cover",
                    borderRadius: 10,
                    marginBottom: 20,
                  }}
                />
              </View>
              <Text style={styles.header2}>EXHIBITION CONTENT</Text>
              <Carousel
                data={images}
                renderItem={({ item }) => (
                  <Image source={item} style={styles.carouselImage} />
                )}
                sliderWidth={300}
                itemWidth={160}
              />
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  padding: 20,
                  marginHorizontal: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "black",
                  height: 120,
                  borderWidth: 2,
                  borderColor: "white",
                  borderRadius: 10,
                  borderStyle: "dashed",
                }}
                onPress={pickImage}
              >
                <Icon
                  name="camera"
                  size={20}
                  color="gray"
                  style={styles.cameraIcon}
                />
                <Text style={styles.textIcon}>Upload More</Text>
                <Text style={styles.textIcon2}>
                  Gallery must be from the same artwork
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <View>
              <TouchableOpacity
                style={styles.imageContainer}
                onPress={pickImage}
              >
                <Icon
                  name="camera"
                  size={20}
                  color="gray"
                  style={styles.cameraIcon}
                />
                <Text style={styles.textIcon}>Exhibition Thumbnail</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            style={styles.imageContainer2}
            onPress={() => {
              navigation.navigate("ExhibitionCollection");
            }}
          >
            <Icon
              name="image"
              size={20}
              color="gray"
              style={styles.cameraIcon2}
            />
            <Text style={styles.textIcon}>Add Collection</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="NAME"
          placeholderTextColor="white"
          value={name}
          onChangeText={setName}
        />

        {show ? (
          <>
            <DateTimePicker
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={(event, selectedDate) => {
                if (event.type === "set") {
                  // Ensure a valid date/time is selected
                  onChange(event, selectedDate, targetState);
                }
              }}
            />
          </>
        ) : null}

        <Text
          style={{
            // height: 50,
            fontSize: 16,
            color: "#fff",
          }}
        >
          DATE
        </Text>

        {/*Content of Single Collapsible*/}

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <TextInput
            style={styles.dimensionsInput}
            placeholder="FROM"
            placeholderTextColor="white"
            value={fromDate.toLocaleString()}
            onPressIn={() => showMode("date", "fromDate")}
          />

          <TextInput
            style={styles.dimensionsInput}
            placeholder="TO"
            placeholderTextColor="white"
            value={toDate.toLocaleString()}
            onPressIn={() => showMode("date", "toDate")}
          />
        </View>
        <Text
          style={{
            // height: 50,
            fontSize: 16,
            color: "#fff",
          }}
        >
          TIME
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <TextInput
            style={styles.dimensionsInput}
            placeholder="FROM"
            placeholderTextColor="white"
            value={fromTime.toLocaleString()}
            onPressIn={() => showMode("time", "fromTime")}
          />
          <TextInput
            style={styles.dimensionsInput}
            placeholder="TO"
            placeholderTextColor="white"
            value={toTime.toLocaleString()}
            onPressIn={() => showMode("time", "toTime")}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="ADDRESS"
          placeholderTextColor="white"
          value={address}
          onChangeText={setAddress}
        />

        {/* Contact Number Input */}
        <TextInput
          style={styles.input}
          placeholder="PHONE NUMBER"
          placeholderTextColor="white"
          value={contactNumber}
          onChangeText={setContactNumber}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="EMAIL"
          placeholderTextColor="white"
          value={email}
          onChangeText={setEmail}
        />

        {/* Desc Input */}
        <TextInput
          style={{
            width: "100%",
            height: 100,
            fontSize: 16,
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
            marginBottom: 20,
            color: "#fff",
          }}
          placeholder="DESCRIPTION"
          placeholderTextColor="white"
          value={desc}
          onChangeText={setDesc}
          multiline
        />

        {/* Save Profile Button */}
        <TouchableOpacity
          style={styles.signInButton}
          onPress={handleSaveProfile}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SetupProfileScreen;
