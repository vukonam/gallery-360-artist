import React, { useState } from "react";
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

// Replace "FontAwesome5" with the icon library of your choice.
const SetupProfileScreen = () => {
  const [image, setImage] = useState("");
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [bio, setBio] = useState("");

  const [modalIsVisible, setModalIsVisible] = useState(false);

  const handleOpenModal = () => {
    setModalIsVisible(true);
  };

  const handleCloseModal = () => {
    setModalIsVisible(false);
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

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.header}>Profile</Text>
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
              source={require("../../assets/images/userImage.jpg")}
            />
            <Text
              style={{
                color: "white",
                fontSize: 22,
                fontWeight: "bold",
                padding: 5,
              }}
            >
              John Doe
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 14,
                fontWeight: "bold",
                padding: 5,
              }}
            >
              27 jul, 199x
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
            Sibusiso Joe is a respected curator and art historian with over 15
            years of experience in the art world. He has curated exhibitions in
            major museums and galleries and has published numerous articles and
            books on contemporary art.
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
        {/* Save Profile Button */}
      </ScrollView>
      {/* <View style={styles.navigationMenu}>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="home" size={20} color="white" style={styles.menuIcon} />
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon
            name="facebook"
            size={20}
            color="white"
            style={styles.menuIcon}
          />
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
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
});

export default SetupProfileScreen;
