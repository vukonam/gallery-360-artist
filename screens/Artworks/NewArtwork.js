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
const SetupProfileScreen = ({ navigation }) => {
  const [image, setImage] = useState("");
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [bio, setBio] = useState("");

  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [selectedArtworks, setSelectedArtworks] = useState([]);

  const availability = ["Stand alone", "Limited Edition"];
  const artworks = ["I agree to Gallery360's Terms & Conditions"];
  function handleArtworkSelection(artwork) {
    setSelectedArtworks((prevSelected) =>
      prevSelected.includes(artwork)
        ? prevSelected.filter((item) => item !== artwork)
        : [...prevSelected, artwork]
    );
  }
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
    //console.log("Website:", website);
    console.log("Date of Birth:", dateOfBirth);
    console.log("Bio:", bio);

    navigation.navigate("AddArtwork");
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.header}>New Artwork</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.imageContainer}>
            <Icon
              name="camera"
              size={20}
              color="gray"
              style={styles.cameraIcon}
            />
            <Text style={{ color: "#fff", fontSize: 14 }}>Upload Artwork</Text>
          </TouchableOpacity>
        </View>
        {/* Image Input */}
        {/* Full Name Input */}
        <TextInput
          style={styles.input}
          placeholder="TITLE"
          placeholderTextColor="white"
          value={fullName}
          onChangeText={setFullName}
        />

        <TextInput
          style={styles.input}
          placeholder="MEDIUM"
          placeholderTextColor="white"
          value={address}
          onChangeText={setAddress}
        />

        <TextInput
          style={styles.input}
          placeholder="DIMENSIONS"
          placeholderTextColor="white"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="YEAR"
          placeholderTextColor="white"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="PRICE"
          placeholderTextColor="white"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="CONDITION"
          placeholderTextColor="white"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="AVAILABILITY"
          placeholderTextColor="white"
          value={address}
          onChangeText={setAddress}
        />
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
        <TextInput
          style={styles.input}
          placeholder="ARTWORK TYPE"
          placeholderTextColor="white"
          value={address}
          onChangeText={setAddress}
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
          placeholder="STATEMENT"
          placeholderTextColor="white"
          value={bio}
          onChangeText={setBio}
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
                  selectedArtworks.includes(artwork) && styles.selectedCheckbox,
                ]}
                onPress={() => handleArtworkSelection(artwork)}
              >
                <View style={styles.checkbox}>
                  {selectedArtworks.includes(artwork) && (
                    <Icon name="check" size={18} color="white" />
                  )}
                </View>
              </TouchableOpacity>
              <Text
                //  key={index}
                style={[
                  styles.checkboxText,
                  selectedArtworks.includes(artwork) && styles.selectedText,
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
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
    textAlign: "left",
  },
  smallerText: {
    color: "#fff", // Set this to your desired button text color
    fontSize: 14,
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
  imageContainer: {
    marginTop: 40,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 250,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    borderStyle: "dashed", // Add dashed border style
    width: "100%",
    height: 500, // Adjust this value to control the image height
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 20,
  },
  cameraIcon: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 20,
    marginBottom: 5,
    // Move the camera icon a bit lower to center it
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    //marginRight: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    margin: 5,
    padding: 10,
    backgroundColor: "transparent",
    borderRadius: 15,
  },
  checkboxText: {
    color: "white",
    // textTransform: "uppercase",
  },
  selectedCheckbox: {
    backgroundColor: "#CEB89E", // Customize the background color when the checkbox is selected
  },
  selectedText: {
    fontWeight: "bold", // Customize the style when the checkbox is selected
  },
  artWorks: {
    flexDirection: "column",
    justifyContent: "space-between",
    //flexWrap: "wrap",
  },
  availabilityCheckboxContainer: {
    flexDirection: "column",
    //alignItems: "center",
    justifyContent: "space-around",
    margin: 5,
    padding: 10,
    backgroundColor: "transparent",
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 20,
  },
  availability: {
    flexDirection: "column",
    // justifyContent: "space-between",
    //flexWrap: "wrap",
  },
  availabilityCheckboxText: {
    color: "white",
    marginLeft: 10,
  },
  availabilityCheckbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  returnPolicytextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  returnPolicytext: {
    color: "#fff",
    fontSize: 16,
  },
  returnPolicytext2: {
    color: "gray",
    fontSize: 14,
  },
});

export default SetupProfileScreen;
