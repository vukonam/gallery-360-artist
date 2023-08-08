import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Replace "FontAwesome" with the icon library of your choice.
//import Carousel from "react-native-snap-carousel"; // Import the library for the carousel.
//import BottomNavigationMenu from "./screens/Tabs/components/BottomNavigationMenu";

const ExhibitionScreen = ({ navigation }) => {
  const [name, setName] = useState("John Doe");
  const [rating, setRating] = useState(0);

  const profilePic = require("../../assets/images/userImage.jpg"); // Replace with the path to your profile picture
  const coverImage = require("../../assets/images/art3.png"); // Replace with the path to your cover image

  const description = `Sunset Over the Mountains" is a beautiful oil painting that captures the serene beauty of a mountain range at dusk. The painting is rendered in soft, warm hues, with the rich reds and oranges of the sunset blending seamlessly into the deep blues of the mountains in the distance.`;

  // Step 2: Function to set the rating
  const handleRatingSubmit = (newRating) => {
    setRating(newRating);
  };
  return (
    <View style={styles.container}>
      {/* Button and Exhibition Text */}
      <View style={styles.topContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.pop()}
          >
            <Icon name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.exhibitionText}>Artwork</Text>
        </View>
        <Image source={profilePic} style={styles.profilePic} />
      </View>

      {/* Profile Pic */}

      {/* Address and Dates */}

      {/* Cover Image */}
      <ScrollView>
        <View style={styles.coverImageContainer}>
          <Image source={coverImage} style={styles.coverImage} />
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Starry Night</Text>
          <Text style={styles.titleMoney}>R2,800.00</Text>
        </View>

        <Text style={styles.description}>{description}</Text>
        <Text style={styles.title}>Reviews</Text>
        {/* The Reviews component of rating from 1 - 5 goes here */}
        {/* Step 3: Display the rating component */}
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>Rate this artwork:</Text>
          {[1, 2, 3, 4, 5].map((num) => (
            <TouchableOpacity
              key={num}
              onPress={() => handleRatingSubmit(num)}
              style={[
                styles.ratingButton,
                num === rating ? styles.selectedRating : null,
              ]}
            >
              <Text style={styles.ratingButtonText}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <Icon
              name="comment"
              size={30}
              color="white"
              style={styles.menuIcon}
            />
            <View style={styles.profileText}>
              <Text style={styles.profileName}>{name}</Text>
              <Text style={styles.profileInfoText}>
                Be the first to comment
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => console.log("comment added!!!")}
          >
            <Text style={styles.addButtonText}>Add Comment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black", // Set this to your desired background color for the whole screen
    paddingBottom: 80,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    padding: 10,
  },
  exhibitionText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    marginTop: 25,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  detailsContainer: {
    marginBottom: 10,
    marginLeft: 20,
  },
  address: {
    fontSize: 10,
    color: "white",
    textTransform: "uppercase",
  },
  addressHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  datesContainer: {
    flexDirection: "row",
  },
  dates: {
    marginTop: 10,
    fontSize: 14,
    color: "white",
    marginRight: 50,
  },

  coverImage: {
    width: "100%",
    height: 200, // Adjust this value to control the image height
    resizeMode: "cover",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginLeft: 20,
    marginTop: 20,
  },
  titleMoney: {
    fontSize: 24,
    //fontWeight: "bold",
    color: "#CEB89E",
    marginRight: 20,
    marginTop: 20,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: 10,

    padding: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  carouselImage: {
    width: 150,
    height: 150, // Adjust this value to control the image height
    borderRadius: 15,
    alignSelf: "center",
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: "white",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  viewsContainer: {
    flexDirection: "row",
    marginLeft: 20,
    marginTop: 10,
  },
  views: {
    color: "white",
    padding: 10,
    backgroundColor: "#313041",
    marginRight: 15,
    borderRadius: 25,
    marginBottom: 10,
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
  coverImageContainer: {
    paddingHorizontal: 10,
    marginBottom: 1,
  },
  coverImage: {
    width: "100%",
    height: 500, // Adjust this value to control the image height
    resizeMode: "cover",
    borderRadius: 10,
  },
  profileInfo: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  headerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  name: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 200,
  },
  profileCard: {
    marginTop: 10,
    backgroundColor: "transparent",
    borderRadius: 8,
    borderWidth: 0.2,
    borderColor: "#CEB89E",
    padding: 10,
    alignSelf: "center",
  },

  profileText: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: 320,
  },
  profileName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  profileInfoText: {
    fontSize: 14,
    color: "white",
  },
  addButton: {
    marginTop: 10,
    backgroundColor: "transparent",
    borderRadius: 10,
    borderColor: "#CEB89E",
    borderWidth: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    textTransform: "uppercase",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  ratingText: {
    fontSize: 16,
    color: "white",
    marginRight: 10,
  },
  ratingButton: {
    backgroundColor: "transparent",
    borderRadius: 20,
    borderColor: "#CEB89E",
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  selectedRating: {
    backgroundColor: "#CEB89E",
  },
  ratingButtonText: {
    color: "white",
    fontSize: 16,
  },
  commentInput: {
    marginTop: 10,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#CEB89E",
    color: "white",
    padding: 10,
    borderRadius: 8,
    height: 100,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ExhibitionScreen;
