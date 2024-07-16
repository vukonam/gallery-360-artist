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
import Icon from "react-native-vector-icons/FontAwesome5";
import AddSocialMedia from "./AddSocialMedia";
import { useImageFunctions } from "../../hooks/useImageFunctions";
import useInput from "../../hooks/useDateTimePicker";
import DateTimePicker from "@react-native-community/datetimepicker";

const SetupProfileScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [bio, setBio] = useState("");
  // const [imageUrl, setImageUrl] = useState(null);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  // const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState({});
  console.log('profile');
  const validateForm = () => {
    console.log("validateForm is hit");
    let errors = {};
    // Ensures at least first and last name
    if (fullName.trim() === "") {
      errors.fullName = "Fullname is required";
    } else if (!/^[a-zA-Z]+ [a-zA-Z]+$/.test(fullName)) {
      errors.fullName = "Please enter a valid full name (e.g., John Doe)";
    }

    // Matches only digits
    if (!contactNumber) {
      errors.contactNumber = "Contact numbers are required";
    } else if (contactNumber.length < 10) {
    } else if (!/^\d+$/.test(contactNumber)) {
      errors.contactNumber =
        "Please enter a valid contact number (digits only)";
    }
    // Checking for website format
    if (!website) {
      errors.website = null;
    } else if (!/^(http|https):\/\/[^\s]+/.test(website)) {
      errors.website =
        "Please enter a valid website URL (starting with http or https)";
    }

    if (!image) {
      errors.image = "Profile image is required";
    }

    if (!input.date) {
      errors.dateOfBirth = "Please select your date of birth";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const input = useInput();

  const handleOpenModal = () => {
    setModalIsVisible(true);
  };

  const handleCloseModal = () => {
    setModalIsVisible(false);
  };
  // Function to take a photo or select
  const {
    pickOneImage,
    image,
    imageUrl,
    video,
    videoUrl,
    progress,
    pickVideo,
  } = useImageFunctions();

  const handleSaveProfile = () => {
    if (validateForm()) {
      const userData = {
        fullname: fullName,
        contactnumber: contactNumber,
        websiteurl: website,
        dateofbirth: input.date.toLocaleDateString(),
        biography: bio,
        imageUrl: imageUrl,
        facebook: facebook,
        instagram: instagram,
        videoUrl: videoUrl,
      };
      navigation.navigate("Artwork", { userData });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ marginBottom: 90 }}>
          <Text style={styles.header}>Setup Profile</Text>
          <Text style={styles.smallerText}>
            Once your profile is complete, you can start uploading your artwork.
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
            <TouchableOpacity onPress={pickOneImage}>
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
            <View
              style={{
                height: 130,
                marginTop: 30,
                //backgroundColor: "red",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {progress ? (
                progress != 100 ? (
                  <Text style={styles.smallerText}>
                    Uploading...{progress}%
                  </Text>
                ) : (
                  <Text style={styles.successSmallerText}>Image Uploaded</Text>
                )
              ) : null}
              {errors.image && !progress ? (
                <Text style={styles.errorMessage}>{errors.image}</Text>
              ) : null}
              <Text style={styles.smallerText}>
                Please record a (5mb) video introducing yourself
              </Text>
              <Text
                style={{
                  color: "gray", // Set this to your desired button text color
                  fontSize: 14,
                }}
              >
                {video === null ? null : video.split("Picker/")[1]}
              </Text>
              <TouchableOpacity style={styles.button} onPress={pickVideo}>
                <Icon
                  name="play"
                  style={{ marginHorizontal: 12 }}
                  size={20}
                  color="white"
                />
                <Text style={styles.smallerButtonText}>UPLOAD VIDEO</Text>
              </TouchableOpacity>
            </View>
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
        <View style={{ marginTop: 120 }}>
          <TextInput
            style={styles.input}
            placeholder="FULL NAME"
            placeholderTextColor="white"
            value={fullName}
            onChangeText={(text) => {
              setErrors({});
              setFullName(text);
            }}
          />
          {errors.fullName ? (
            <Text style={styles.errorMessage}>{errors.fullName}</Text>
          ) : null}
          {/* Contact Number Input */}
          <TextInput
            style={styles.input}
            placeholder="CONTACT NUMBER"
            placeholderTextColor="white"
            value={contactNumber}
            onChangeText={(text) => {
              setErrors({});
              setContactNumber(text);
            }}
            maxLength={10}
            keyboardType="numeric"
          />
          {errors.contactNumber ? (
            <Text style={styles.errorMessage}>{errors.contactNumber}</Text>
          ) : null}
          {/* Website Input */}
          <TextInput
            style={styles.input}
            placeholder="WEBSITE"
            placeholderTextColor="white"
            value={website}
            onChangeText={(text) => {
              setErrors({});
              setWebsite(text);
            }}
          />
          {errors.website ? (
            <Text style={styles.errorMessage}>{errors.website}</Text>
          ) : null}
          {/* Date of Birth Input */}

          {input.toggleInput ? (
            <TextInput
              style={styles.input}
              placeholder="DATE OF BIRTH"
              placeholderTextColor="white"
              value={input?.date.toLocaleDateString()}
              onPressIn={input.showDatepicker}
            />
          ) : (
            <TextInput
              style={styles.input}
              placeholder="DATE OF BIRTH"
              placeholderTextColor="white"
              value={
                input.date !== null ? "" : input?.date.toLocaleDateString()
              }
              onPressIn={input.showDatepicker}
            />
          )}
          {input.show && (
            <DateTimePicker
              testID="dateTimePicker2"
              value={input.date}
              mode={input.mode}
              is24Hour={true}
              display="default"
              onChange={input.onChange}
            />
          )}
          {errors.dateOfBirth ? (
            <Text style={styles.errorMessage}>{errors.dateOfBirth}</Text>
          ) : null}
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
            placeholder="BIO"
            placeholderTextColor="white"
            value={bio}
            onChangeText={(text) => {
              setErrors({});
              setBio(text);
            }}
            multiline
          />
        </View>
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
    paddingHorizontal: 12,
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
  successSmallerText: {
    color: "#5cb85c", // Set this to your desired button text color
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
  errorMessage: {
    width: "80%",
    color: "red",
    marginBottom: 10,
    textAlign: "left",
  },
});

export default SetupProfileScreen;
