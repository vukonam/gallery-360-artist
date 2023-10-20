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
import styles from "./styles";
import ProfilePic from "../../components/ProfilePic";
import { useSelector } from "react-redux";
import { setLoading } from "../../features/loginDetails.js";
import { useDispatch } from "react-redux";
import auth from "../../firebase/firebase.config.js";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB, storage } from "../../firebase/firebase.config";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import Carousel from "react-native-snap-carousel"; // Import the library for the carousel.
//import Icon from "react-native-vector-icons/FontAwesome5";

import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// Replace "FontAwesome5" with the icon library of your choice.
const SetupProfileScreen = ({ navigation }) => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [desc, setDesc] = useState("");
  const [images, setImages] = useState([]);
  const [imagesUrls, setImagesUrls] = useState([]);
  const [statement, setStatement] = useState("");
  const [progress, setProgress] = useState("");
  // Ddefault active selector

  const [collectedData, setCollectedData] = useState("");
  const [newCollection, setNewCollection] = useState(null);
  const [selectedTermsAndCondtions, setSelectedTermsAndCondtions] = useState(
    []
  );
  const user = auth.currentUser;
  const colRef = collection(FIRESTORE_DB, "newArtworks");

  const [modalIsVisible, setModalIsVisible] = useState(false);

  const handleOpenModal = () => {
    setModalIsVisible(true);
  };

  const handleCloseModal = () => {
    setModalIsVisible(false);
  };

  const writeUserData = () => {
    let niceCol = "";
    const handleCollection = () => {
      for (const item of firebaseCollection) {
        if (item.name === collectedData) {
          const updatedCollection = {
            name: collectedData,
            description: item.description,
            uid: item.key,
          };
          setNewCollection(updatedCollection);
          niceCol = updatedCollection;
          // break; // If you want to stop searching after finding the first matching object.
        }
      }
      console.log("new collection : ", newCollection);
    };
    const handleAddDoc = (niceCol) => {
      addDoc(colRef, {
        name: name,
        address: address,
        contactNumber: contactNumber,
        isAvailable: isAvailable,
        statement: statement,
        imgUrls: imagesUrls,
        medium: medium,
        price: price,
        artworkType: artworkType,
        availability: selectedArtworks,
        collection: niceCol,
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

    handleCollection();

    //console.log("description : ", descriptionValue, keyValue);
    //console.log("collectionData : ", firebaseCollection);
    console.log("ImagesUrls : ", imagesUrls);
    handleAddDoc(niceCol);
  };

  const handleSaveProfile = () => {
    // Here you can save the profile data to your backend or perform any necessary actions
    // For simplicity, we'll just log the data for now.
    console.log("Profile Data:");
    console.log("Image:", image);
    console.log("Full Name:", name);
    console.log("Contact Number:", contactNumber);
    //console.log("Website:", website);
    console.log("Email:", email);
    console.log("Desc:", desc);
    navigation.navigate("ExhibitionShow");
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
      if (!image) {
        setImage(source);
      } else {
        const updatedImages = [...images, source];

        setImages(updatedImages);
      }

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

    const storageRef = ref(storage, "Exhibition/" + new Date().getTime());
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

          if (imagesUrls.length === 0) {
            const newImagesUrl = [
              ...imagesUrls,
              { imgUrl: downloadURL, default: true },
            ];
            setImagesUrls(newImagesUrl);
            console.log("new imagesUrls 1", imagesUrls);
          } else {
            const newImagesUrl = [
              ...imagesUrls,
              { imgUrl: downloadURL, default: false },
            ];
            setImagesUrls(newImagesUrl);
          }
          console.log("new imagesUrls 2", imagesUrls);
          await saveRecord(fileType, downloadURL, new Date().toISOString());
        });
      }
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.header}>New Exhibition</Text>
        </View>
        <View>
          {/* <TouchableOpacity style={styles.imageContainer}>
            <Icon
              name="camera"
              size={20}
              color="gray"
              style={styles.cameraIcon}
            />
            <Text style={styles.textIcon}>Exhibition Thumbnail</Text>
          </TouchableOpacity> */}
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

              {/* <TouchableOpacity
                style={styles.imageContainer}
                onPress={pickImage}
              >
                <Icon
                  name="camera"
                  size={20}
                  color="gray"
                  style={styles.cameraIcon}
                />
                <Text style={{ color: "#fff", fontSize: 14 }}>
                  Upload Artwork
                </Text>
              </TouchableOpacity> */}
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
        {/* Image Input */}
        {/* Full Name Input */}
        <TextInput
          style={styles.input}
          placeholder="NAME"
          placeholderTextColor="white"
          value={name}
          onChangeText={setName}
        />

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
