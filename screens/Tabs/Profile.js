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
import auth from "../../firebase/firebase.config.js";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB, storage } from "../../firebase/firebase.config";
import loader2 from "../../assets/images/loader2.gif";

// Replace "FontAwesome5" with the icon library of your choice.
const SetupProfileScreen = ({ navigation }) => {
  const profilePic = require("../../assets/images/userImage.jpg"); // Replace with the actual path to the profile picture

  const [userData, setUserData] = useState(null);
  const [name, setName] = useState("John Doe");
  const [image, setImage] = useState(profilePic);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [bio, setBio] = useState("John Doe");

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
          style={{ width: 300, height: 150, alignSelf: "center" }}
          source={require("../../assets/images/Jon_Kirsch's_Signature.png")}
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

// return userData === null ? (
//   <View style={styles.container}>
//     <Imageloader />
//   </View>
// ) : (
//   <ScrollView>
//     <View style={styles.headerContainer}>
//       <Text style={styles.header}>Profile</Text>
//       <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
//         <Icon name="edit" size={25} style={{ padding: 10 }} color="gray" />
//       </TouchableOpacity>
//     </View>
//     <View>
//       <View style={styles.imageContainer}>
//         <Image
//           style={{
//             width: 150,
//             height: 150,
//             alignSelf: "center",
//             borderRadius: 75,
//           }}
//           source={image}
//         />
//         <Text
//           style={{
//             color: "white",
//             fontSize: 22,
//             fontWeight: "bold",
//             padding: 5,
//           }}
//         >
//           {name}
//         </Text>
//         <Text
//           style={{
//             color: "white",
//             fontSize: 14,
//             fontWeight: "bold",
//             padding: 5,
//           }}
//         >
//           {dateOfBirth}
//         </Text>

//         <View style={styles.iconContainer}>
//           <Icon
//             name="facebook"
//             size={25}
//             style={{ padding: 10 }}
//             color="gray"
//           />

//           <Icon
//             name="instagram"
//             size={25}
//             style={{ padding: 10 }}
//             color="gray"
//           />
//         </View>
//       </View>
//       <Text
//         style={{
//           color: "white",
//           fontSize: 14,
//           marginBottom: 10,
//         }}
//       >
//         {bio}
//       </Text>
//     </View>
//     <Image
//       style={{ width: 300, height: 150, alignSelf: "center" }}
//       source={require("../../assets/images/Jon_Kirsch's_Signature.png")}
//     />
//     <View>
//       <Text style={styles.profileHeader}>Account</Text>
//       <View style={styles.subHeadersContainer}>
//         <Text style={styles.subHeaders}>Card Details</Text>
//         <Text style={styles.subHeaders}>*** *** **66</Text>
//       </View>
//       <Text style={styles.profileHeader}>Help & Info</Text>
//       <Text style={styles.subHeaders}>Terms & conditions</Text>
//       <View style={styles.subHeadersContainer}>
//         <Text style={styles.subHeaders}>Return Policy</Text>
//         <Text style={styles.subHeaders}>Gallery360 Default</Text>
//       </View>
//     </View>
//     <View style={styles.modalContent}>
//       <TouchableOpacity
//         style={[styles.modalButton, styles.signOutButton]}
//         onPress={() => {
//           handleSignOut();
//         }}
//       >
//         <Text style={styles.modalButtonText}>Sign Out</Text>
//       </TouchableOpacity>
//     </View>
//     {/* Save Profile Button */}
//   </ScrollView>
// );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
    paddingTop: 40,
  },
  input: {
    width: "100%",
    height: 50,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 20,
    color: "#fff",
  },
  signInButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#CEB89E",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  header: {
    fontSize: 44,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
    textAlign: "left",
  },

  profileHeader: {
    fontSize: 30,

    marginBottom: 10,
    color: "white",
    textAlign: "left",
  },
  smallerText: {
    color: "#fff", // Set this to your desired button text color
    fontSize: 14,
  },
  imageContainer: {
    marginTop: 80,
    marginBottom: 20,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    height: 250,
  },
  subHeadersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subHeaders: {
    padding: 15,
    fontSize: 16,
    color: "gray",
  },
  smallerButtonText: {
    color: "#fff", // Set this to your desired button text color
    fontSize: 14,
  },
  iconContainer: {
    marginTop: 10,
    flexDirection: "row",
  },
  navigationMenu: {
    position: "absolute",
    backgroundColor: "black",
    bottom: 0,
    width: 350,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderColor: "#CEB89E",
    paddingTop: 10,
  },
  menuItem: {
    alignItems: "center",
  },
  menuIcon: {
    marginBottom: 5,
  },
  menuText: {
    color: "white",
    fontSize: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  signOutButton: {
    width: 80,
    height: 40,
    backgroundColor: "#CEB89E",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
});

export default SetupProfileScreen;
