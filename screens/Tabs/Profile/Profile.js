import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
//import Icon from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/FontAwesome5";
import { signOut } from "firebase/auth";
import auth from "../../../firebase/firebase.config.js";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB, storage } from "../../../firebase/firebase.config";
import loader2 from "../../../assets/images/loader2.gif";
import styles from "./styles.js";
// Replace "FontAwesome5" with the icon library of your choice.
const SetupProfileScreen = ({ navigation }) => {
  const profilePic = require("../../../assets/images/userImage.jpg"); // Replace with the actual path to the profile picture

  const sign = require("../../../assets/images/Jon_Kirsch's_Signature.png");
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState("John Doe");
  const [image, setImage] = useState(profilePic);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [bio, setBio] = useState("John Doe");
  const [signature, setSignature] = useState(sign);

  const Imageloader = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Image source={loader2}></Image>
      </View>
    );
  };

  useEffect(() => {
    const user = auth.currentUser;
    console.log(user.uid);
    getDoc(doc(FIRESTORE_DB, "galleryUsers", user.uid), {})
      .then((docData) => {
        // Success callback
        console.log("data ", docData.data());
        if (docData.exists()) {
          let data = docData.data();
          setUserData(data);
          setName(data.fullname);
          setImage({ uri: data.imageUrl });
          setDateOfBirth(data.dateofbirth);
          setBio(data.biography);
          setSignature({ uri: data.signature });
        } else console.log("NO SUCH DATA");
      })
      .catch((error) => {
        if (error.code === "unavailable") {
          // Firestore is offline, add retry logic here
          console.log("firestore error : ", error.message);
          alert("Your database is offline at the moment!");
        } else {
          // Handle other errors
          alert("Error getting data:");
          console.error("Error getting document:", error);
        }
      });
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.replace("Login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveProfile = () => {
    // Here you can save the profile data to your backend or perform any necessary actions
    // For simplicity, we'll just log the data for now.
    console.log("Profile Data:");
    console.log("Image:", image);
    console.log("Full Name:", fullName);
    console.log("Contact Number:", contactNumber);
    console.log("Website:", website);
    console.log("Date of Birth:", dateOfBirth);
    console.log("Bio:", bio);
  };

  return userData === null ? (
    <View style={styles.container}>
      <Imageloader />
    </View>
  ) : (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Profile</Text>
          <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
            <Icon name="edit" size={25} style={{ padding: 10 }} color="gray" />
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.imageContainer}>
            <Image
              style={{
                width: 150,
                height: 150,
                alignSelf: "center",
                borderRadius: 75,
              }}
              source={image}
            />
            <Text
              style={{
                color: "white",
                fontSize: 22,
                fontWeight: "bold",
                padding: 5,
              }}
            >
              {name}
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 14,
                fontWeight: "bold",
                padding: 5,
              }}
            >
              {dateOfBirth}
            </Text>

            <View style={styles.iconContainer}>
              <Icon
                name="facebook"
                size={25}
                style={{ padding: 10 }}
                color="gray"
              />

              <Icon
                name="instagram"
                size={25}
                style={{ padding: 10 }}
                color="gray"
              />
            </View>
          </View>
          <Text
            style={{
              color: "white",
              fontSize: 14,
              marginBottom: 10,
            }}
          >
            {bio}
          </Text>
        </View>

        <Image
          source={signature}
          style={{ width: 300, height: 150, alignSelf: "center" }}
        />
        <View>
          <Text style={styles.profileHeader}>Account</Text>
          <View style={styles.subHeadersContainer}>
            <Text style={styles.subHeaders}>Card Details</Text>
            <Text style={styles.subHeaders}>*** *** **66</Text>
          </View>
          <Text style={styles.profileHeader}>Help & Info</Text>
          <Text style={styles.subHeaders}>Terms & conditions</Text>
          <View style={styles.subHeadersContainer}>
            <Text style={styles.subHeaders}>Return Policy</Text>
            <Text style={styles.subHeaders}>Gallery360 Default</Text>
          </View>
        </View>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={[styles.modalButton, styles.signOutButton]}
            onPress={() => {
              handleSignOut();
            }}
          >
            <Text style={styles.modalButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
        {/* Save Profile Button */}
      </ScrollView>
    </View>
  );
};

export default SetupProfileScreen;
