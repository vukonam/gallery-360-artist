import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  Switch,
} from "react-native";
import Carousel from "react-native-snap-carousel"; // Import the library for the carousel.
import Icon from "react-native-vector-icons/FontAwesome5";
import { FIRESTORE_DB, storage } from "../../../firebase/firebase.config";
import auth from "../../../firebase/firebase.config.js";
// import * as ImagePicker from "expo-image-picker";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import {
  SelectList,
  MultipleSelectList,
} from "react-native-dropdown-select-list";
import { artworkData, conditionData } from "./utils/data";
import styles from "./styles.jsx";
import { useCollection } from "../../../hooks/useCollection";
import NewCollectionModal from "../../../components/Modals/NewCollection";
import { useImageFunctions } from "../../../hooks/useImageFunctions";

/**
 * NewArtworks - adds artist artwork on the app
 *
 * functions:
 *
 * getDocs - Fetch collection data from Firestore
 *
 * @param {*} param0
 * @returns
 */

const NewArtwork = ({ navigation }) => {
  const { collectionData, firebaseCollection } = useCollection();

  const [title, setTitle] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [artworkType, setArtworkType] = useState([]);
  const [medium, setMedium] = useState("");
  const [price, setPrice] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [breadth, setBreadth] = useState(0);
  const [length, setLength] = useState(0);
  const [year, setYear] = useState("");
  const [condition, setCondition] = useState("");

  const [statement, setStatement] = useState("");
  //const [progress, setProgress] = useState("");
  // Ddefault active selector

  const { pickImage, image, imagesUrls, images } = useImageFunctions();
  const [collectedData, setCollectedData] = useState("");
  const [newCollection, setNewCollection] = useState(null);
  const [selectedTermsAndCondtions, setSelectedTermsAndCondtions] = useState(
    []
  );
  const user = auth.currentUser;
  const colRef = collection(FIRESTORE_DB, "Market");

  const [isModalVisible, setModalVisible] = useState(true);

  const toggleCollection = () => {
    setModalVisible(!isModalVisible);
  };
  // const toggleCollection = {};
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
        title: title,
        dimensions: {
          width: width,
          height: height,
          length: length,
          breadth: breadth,
        },
        year: year,
        condition: condition,
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
    console.log("ImagesUrls : ", imagesUrls);
    handleAddDoc(niceCol);
  };

  const [selectedArtworks, setSelectedArtworks] = useState([]);
  const [selected, setSelected] = useState("");

  console.log(selected);
  const availability = ["Stand alone", "Limited Edition"];
  const artworks = ["I agree to Gallery360's Terms & Conditions"];
  function handleArtworkSelection(artwork) {
    setSelectedArtworks((prevSelected) =>
      prevSelected.includes(artwork)
        ? prevSelected.filter((item) => item !== artwork)
        : [...prevSelected, artwork]
    );
  }
  function handleTandCsSelection(artwork) {
    setSelectedTermsAndCondtions((prevSelected) =>
      prevSelected.includes(artwork)
        ? prevSelected.filter((item) => item !== artwork)
        : [...prevSelected, artwork]
    );
  }

  //const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsAvailable((previousState) => !previousState);

  // Function to handle saving the profile
  const handleSaveProfile = () => {
    writeUserData();
    navigation.popToTop();
  };

  const [collectionModalVisible, setCollectionModalVisible] = useState(false);

  const handleOpenCollectionModal = () => {
    setCollectionModalVisible(true);
  };

  const handleCloseCollectionModal = () => {
    setCollectionModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.header}>New Artwork</Text>
        </View>
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
            <Carousel
              data={images}
              renderItem={({ item }) => (
                <Image source={item} style={styles.carouselImage} />
              )}
              sliderWidth={300}
              itemWidth={160}
            />
            <TouchableOpacity
              style={styles.imageContainer2}
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
            <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
              <Icon
                name="camera"
                size={20}
                color="gray"
                style={styles.cameraIcon}
              />
              <Text style={{ color: "#fff", fontSize: 14 }}>
                Upload Artwork
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Image Input */}
        {/* Full Name Input */}
        <TextInput
          style={styles.input}
          placeholder="TITLE"
          placeholderTextColor="white"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={styles.input}
          placeholder="MEDIUM"
          placeholderTextColor="white"
          value={medium}
          onChangeText={setMedium}
        />
        <View>
          <Text
            style={{
              // height: 50,
              fontSize: 16,
              color: "#fff",
              paddingHorizontal: 12,
            }}
          >
            DIMENSIONS
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
              placeholder="WIDTH"
              placeholderTextColor="white"
              keyboardType="numeric"
              value={width}
              onChangeText={setWidth}
            />

            <TextInput
              style={styles.dimensionsInput}
              placeholder="HEIGHT"
              placeholderTextColor="white"
              keyboardType="numeric"
              value={height}
              onChangeText={setHeight}
            />
            <TextInput
              style={styles.dimensionsInput}
              placeholder="LENGTH"
              placeholderTextColor="white"
              keyboardType="numeric"
              value={length}
              onChangeText={setLength}
            />
            <TextInput
              style={styles.dimensionsInput}
              placeholder="BREADTH"
              placeholderTextColor="white"
              keyboardType="numeric"
              value={breadth}
              onChangeText={setBreadth}
            />
          </View>
        </View>
        <TextInput
          style={styles.input}
          placeholder="YEAR"
          placeholderTextColor="white"
          value={year}
          keyboardType="numeric"
          onChangeText={setYear}
        />
        <TextInput
          style={styles.input}
          placeholder="PRICE"
          placeholderTextColor="white"
          value={price}
          keyboardType="numeric"
          onChangeText={setPrice}
        />

        <SelectList
          data={conditionData}
          setSelected={setCondition}
          boxStyles={{
            backgroundColor: "black",
            width: "100%",
            color: "white",
            paddingVertical: 12,
            paddingHorizontal: 12,
            borderColor: "black",
            borderBottomWidth: 5,
            //marginTop: 8,
            //marginBottom: 20,
          }}
          inputStyles={{ color: "white" }}
          dropdownStyles={{
            backgroundColor: "black",
            height: 100,
          }}
          search={false}
          maxHeight={100}
          save="value"
          placeholder="CONDITION"
          placeholderTextColor="white"
          //style={{ color: "white" }}
          dropdownTextStyles={{ color: "white" }}
        />
        <View
          style={{ borderTopWidth: 1, borderColor: "#ccc", marginBottom: 20 }}
        ></View>
        {isModalVisible ? (
          <View
            style={{
              height: 60,
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.header2}>New Collection</Text>
            <TouchableOpacity
              style={styles.NewTypeButton}
              onPress={() => handleOpenCollectionModal()}
            >
              <Text style={styles.newButtonText}>NEW COLLECTION</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {
          <TouchableWithoutFeedback onPress={handleCloseCollectionModal}>
            <NewCollectionModal
              Modalvisible={collectionModalVisible}
              animationType="slide"
              closeModal={handleCloseCollectionModal}
            />
          </TouchableWithoutFeedback>
        }
        <TouchableOpacity onPress={toggleCollection}>
          <SelectList
            data={collectionData}
            setSelected={setCollectedData}
            boxStyles={{
              backgroundColor: "black",
              width: "100%",
              color: "white",
              paddingVertical: 12,
              paddingHorizontal: 12,
              borderColor: "black",
              borderBottomWidth: 5,
            }}
            inputStyles={{ color: "white" }}
            dropdownStyles={{
              backgroundColor: "black",
              height: 100,
            }}
            search={false}
            maxHeight={100}
            save="value"
            placeholder="COLLECTION"
            placeholderTextColor="white"
            dropdownTextStyles={{ color: "white" }}
          />
        </TouchableOpacity>
        <View
          style={{ borderTopWidth: 1, borderColor: "#ccc", marginBottom: 20 }}
        ></View>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={{
              width: "88%",
              height: 50,
              fontSize: 16,
              borderBottomWidth: 1,
              paddingHorizontal: 12,
              borderBottomColor: "#ccc",
              marginBottom: 20,
              color: "#fff",
            }}
            placeholder="AVAILABILITY"
            placeholderTextColor="white"
            editable={false}
            //value={isAvailable}
            //onChangeText={setIsAvailable}
          />
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isAvailable ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isAvailable}
          />
        </View>
        <View
          style={[styles.availability, styles.availabilityCheckboxContainer]}
        >
          {availability.map((artwork, index) => (
            <View
              style={{
                flexDirection: "row",
                marginBottom: 20,
              }}
            >
              <TouchableOpacity
                key={index}
                style={[
                  selectedArtworks.includes(artwork) && styles.selectedCheckbox,
                ]}
                onPress={() => handleArtworkSelection(artwork)}
              >
                <View style={styles.availabilityCheckbox}>
                  {selectedArtworks.includes(artwork) && (
                    <Icon name="check" size={18} color="white" />
                  )}
                </View>
              </TouchableOpacity>
              <Text
                //  key={index}
                style={[
                  styles.availabilityCheckboxText,
                  selectedArtworks.includes(artwork) && styles.selectedText,
                ]}
              >
                {artwork}
              </Text>
            </View>
          ))}
        </View>
        <MultipleSelectList
          data={artworkData}
          setSelected={setArtworkType}
          boxStyles={{
            backgroundColor: "black",
            width: "100%",
            color: "white",

            paddingVertical: 12,
            paddingHorizontal: 12,
            borderColor: "black",
            borderBottomWidth: 5,
          }}
          // inputStyles={{
          //   backgroundColor: "black",
          //   width: "100%",
          //   color: "white",
          // }}
          save="value"
          dropdownStyles={{
            backgroundColor: "black",
            // height: 300,
          }}
          inputStyles={{ color: "white" }}
          search={true}
          searchicon={true}
          arrowicon={true}
          closeicon={true}
          //maxHeight={300}
          placeholder="ARTWORK TYPE"
          searchPlaceholder="search"
          placeholderTextColor="white"
          style={{ color: "white" }}
          dropdownTextStyles={{ color: "white" }}
        />
        <View
          style={{ borderTopWidth: 1, borderColor: "#ccc", marginBottom: 20 }}
        ></View>
        {/* Bio Input */}
        <TextInput
          style={{
            width: "100%",
            height: 100,
            fontSize: 16,
            borderBottomWidth: 1,
            paddingHorizontal: 12,
            borderBottomColor: "#ccc",
            marginBottom: 20,
            color: "#fff",
          }}
          placeholder="STATEMENT"
          placeholderTextColor="white"
          value={statement}
          onChangeText={setStatement}
          multiline
        />
        <View style={styles.returnPolicytextContainer}>
          <Text style={styles.returnPolicytext}>Return Policy </Text>
          <Text style={styles.returnPolicytext2}>GALLERY360</Text>
        </View>
        {/* Save Profile Button */}

        <View style={[styles.artWorks, styles.checkboxContainer]}>
          {artworks.map((artwork, index) => (
            <>
              <TouchableOpacity
                key={index}
                style={[
                  selectedTermsAndCondtions.includes(artwork) &&
                    styles.selectedCheckbox,
                ]}
                onPress={() => handleTandCsSelection(artwork)}
              >
                <View style={styles.checkbox}>
                  {selectedTermsAndCondtions.includes(artwork) && (
                    <Icon name="check" size={18} color="white" />
                  )}
                </View>
              </TouchableOpacity>
              <Text
                //  key={index}
                style={[
                  styles.checkboxText,
                  selectedTermsAndCondtions.includes(artwork) &&
                    styles.selectedText,
                ]}
              >
                {artwork}
              </Text>
            </>
          ))}
        </View>
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

export default NewArtwork;
