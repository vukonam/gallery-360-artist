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
import AddSocialMedia from "./AddSocialMedia";
import { setDoc, doc } from "firebase/firestore";
import { FIRESTORE_DB, storage } from "../../firebase/firebase.config";
import auth from "../../firebase/firebase.config.js";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

//import { db, storage } from "../firebaseConfig";
// Replace "FontAwesome5" with the icon library of your choice.
const SetupProfileScreen = ({ navigation }) => {
  const [image, setImage] = useState("");
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [bio, setBio] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [progress, setProgress] = useState(0);

  const handleOpenModal = () => {
    setModalIsVisible(true);
  };

  const handleCloseModal = () => {
    setModalIsVisible(false);
  };
  // const user = auth.currentUser;
  const writeUserData = () => {
    setDoc(doc(FIRESTORE_DB, "galleryUsers", user.uid), {
      fullname: fullName,
      contactnumber: contactNumber,
      websiteurl: website,
      dateofbirth: dateOfBirth,
      biography: bio,
      imageUrl: imageUrl,
      facebook: facebook,
      instagram: instagram,
      // userid: user.uid,
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

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      const source = { uri: result.assets[0].uri };
      setImage(source);
      // setImage(result.assets[0].uri);
      // upload the image
      await uploadImage(result.assets[0].uri, "image");
    }
  }

  async function pickVideo() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await uploadImage(result.assets[0].uri, "video");
    }
  }

  async function uploadImage(uri, fileType) {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, "ProfileImages/" + new Date().getTime());
    const uploadTask = uploadBytesResumable(storageRef, blob);

    // listen for events
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgress(progress.toFixed());
      },
      (error) => {
        // handle error
        console.log(error);
        alert("Upload Error : ", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          // save record
          setImageUrl(downloadURL);
          await saveRecord(fileType, downloadURL, new Date().toISOString());
          //setVideo("");
        });
      }
    );
  }
  const handleSaveProfile = () => {
    // Here you can save the profile data to your backend or perform any necessary actions
    // For simplicity, we'll just log the data for now.
    console.log("Profile Data:");
    console.log("Image:", image);
    console.log("ImageUrl:", imageUrl);
    console.log("Full Name:", fullName);
    console.log("Contact Number:", contactNumber);
    console.log("Website:", website);
    console.log("Date of Birth:", dateOfBirth);
    console.log("Bio:", bio);
    console.log("facebook :", facebook);
    console.log("instagram :", instagram);
    //writeUserData();
    //const user = auth.currentUser;
    const userData = {
      fullname: fullName,
      contactnumber: contactNumber,
      websiteurl: website,
      dateofbirth: dateOfBirth,
      biography: bio,
      imageUrl: imageUrl,
      facebook: facebook,
      instagram: instagram,
      //userid: user.uid,
    };
    navigation.navigate("Artwork", { userData });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.header}>Setup Profile</Text>
          <Text style={styles.smallerText}>
            once your profile is complete, you can start uploading your artwork.
          </Text>
        </View>
        <View>
          <View style={styles.imageContainer}>
            {image ? (
              <Image
                source={image}
                style={{
                  width: 150,
                  height: 150,
                  alignSelf: "center",
                  borderRadius: 75,
                }}
              />
            ) : (
              <Image
                style={{
                  width: 150,
                  height: 150,
                  alignSelf: "center",
                  borderRadius: 75,
                }}
                source={require("../../assets/images/profile_image.jpg")}
              />
            )}
            <TouchableOpacity onPress={pickImage}>
              <Icon
                name="camera"
                size={20}
                color="gray"
                style={{
                  padding: 10,
                  backgroundColor: "white",
                  borderRadius: 20,
                  position: "absolute",
                  bottom: -10,
                  alignSelf: "center",
                }}
              />
            </TouchableOpacity>

            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={handleOpenModal}>
                <Icon
                  name="facebook"
                  size={25}
                  style={{ padding: 15 }}
                  color="gray"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleOpenModal}>
                <Icon
                  name="instagram"
                  size={25}
                  style={{ padding: 15 }}
                  color="gray"
                />
              </TouchableOpacity>
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
                setLinks={{ setInstagram, setFacebook }}
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
    paddingTop: 40,
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
  smallerText: {
    color: "#fff", // Set this to your desired button text color
    fontSize: 14,
  },
  imageContainer: {
    marginTop: 40,
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
});

export default SetupProfileScreen;
