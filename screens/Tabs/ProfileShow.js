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
import AddSocialMedia from "../SignUp/AddSocialMedia";

// Replace "FontAwesome5" with the icon library of your choice.
const SetupProfileScreen = ({ navigation }) => {
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
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.popToTop()}
          >
            <Icon name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.exhibitionText}> Edit Profile</Text>
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
            <Icon
              name="camera"
              size={20}
              color="gray"
              style={{
                padding: 10,
                backgroundColor: "white",
                borderRadius: 20,
                position: "absolute",
                bottom: 120,
              }}
            />
            <View style={styles.iconContainer}>
              <Icon
                name="facebook"
                size={25}
                style={{ padding: 15 }}
                color="gray"
              />

              <Icon
                name="instagram"
                size={25}
                style={{ padding: 15 }}
                color="gray"
              />
            </View>
            <View>
              <TouchableOpacity style={styles.button} onPress={handleOpenModal}>
                <Icon
                  name="plus"
                  style={{ marginRight: 10 }}
                  size={20}
                  color="white"
                />
                <Text style={styles.smallerButtonText}>ADD SOCIAL MEDIA</Text>
              </TouchableOpacity>
            </View>
            {
              <AddSocialMedia
                visible={modalIsVisible}
                closeModal={handleCloseModal}
              />
            }
          </View>
        </View>
        {/* Image Input */}
        {/* Full Name Input */}
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="white"
          value={fullName}
          onChangeText={setFullName}
        />

        {/* Contact Number Input */}
        <TextInput
          style={styles.input}
          placeholder="Contact Number"
          placeholderTextColor="white"
          value={contactNumber}
          onChangeText={setContactNumber}
          keyboardType="numeric"
        />

        {/* Website Input */}
        <TextInput
          style={styles.input}
          placeholder="Website"
          placeholderTextColor="white"
          value={website}
          onChangeText={setWebsite}
        />

        {/* Date of Birth Input */}
        <TextInput
          style={styles.input}
          placeholder="Date of Birth"
          placeholderTextColor="white"
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
          keyboardType="numeric"
        />

        {/* Bio Input */}
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
          placeholder="Bio"
          placeholderTextColor="white"
          value={bio}
          onChangeText={setBio}
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
  smallerText: {
    color: "#fff", // Set this to your desired button text color
    fontSize: 14,
  },
  imageContainer: {
    marginTop: 40,
    marginBottom: 30,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    height: 250,
  },
  button: {
    marginTop: 15,
    backgroundColor: "transparent", // Set this to your desired button color
    padding: 12,
    borderRadius: 5,
    marginBottom: 30,
    borderRadius: 50,
    flexDirection: "row",
    backgroundColor: "gray",
  },
  smallerButtonText: {
    color: "#fff", // Set this to your desired button text color
    fontSize: 14,
  },
  iconContainer: {
    marginTop: 30,
    flexDirection: "row",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerButton: {
    padding: 10,
  },
  exhibitionText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
});

export default SetupProfileScreen;
