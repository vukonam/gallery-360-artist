import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Replace "FontAwesome" with the icon library of your choice.
import Carousel from "react-native-snap-carousel"; // Import the library for the carousel.
//import BottomNavigationMenu from "./screens/Tabs/components/BottomNavigationMenu";

const ExhibitionScreen = () => {
  const profilePic = require("../../../assets/images/userImage.jpg"); // Replace with the path to your profile picture
  const coverImage = require("../../../assets/images/art1.png"); // Replace with the path to your cover image

  const address = "123 Main Street, City";
  const fromDate = "19 July 2023";
  const toDate = "22 July 2023";

  const images = [
    require("../../../assets/images/art1.png"), // Replace with the paths to your carousel images
    require("../../../assets/images/art2.png"),
    require("../../../assets/images/art3.png"),
    // Add more carousel images as needed
  ];

  const description = `"Reflections on Nature" is a solo exhibition of new works by [Artist Name] that explores the intersection of nature and art. The exhibition features a diverse range of paintings, drawings, and mixed media works that showcase the artist's unique vision and creative talent.
The works on display capture the beauty and complexity of the natural world, with lush landscapes, delicate flowers, and intricate patterns that evoke a sense of wonder and awe. The artist's use of color, light, and texture is masterful, creating works that are both visually stunning and emotionally resonant.
The exhibition will be held at [Gallery Name], a premier contemporary art space located in [Gallery Address]. The show will run from [Exhibition Dates], with an opening reception on [Date and Time]. This will be an exciting opportunity for art lovers to discover the work of a talented artist and experience the beauty and power of nature through the medium of art.
Whether you are a seasoned collector or a first-time visitor to the gallery, "Reflections on Nature" is a must-see exhibition that will leave a lasting impression and inspire a deeper appreciation for the natural world.`;

  return (
    <View style={styles.container}>
      {/* Button and Exhibition Text */}
      <ScrollView>
        <View style={styles.topContainer}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.button}>
              <Icon name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.exhibitionText}>Exhibition</Text>
          </View>
          <Image source={profilePic} style={styles.profilePic} />
        </View>

        {/* Profile Pic */}

        {/* Address and Dates */}

        {/* Cover Image */}
        <Image source={coverImage} style={styles.coverImage} />

        {/* Title */}
        <Text style={styles.title}>Reflections in Color</Text>

        {/* Profile Image and Name */}
        <View style={styles.profileInfo}>
          <Image source={profilePic} style={styles.profileImage} />
          <Text style={styles.profileName}>John Doe</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.addressHeader}>Open Plan Warehouse</Text>
          <Text style={styles.address}>
            183 San Salvador St, Klipspruit West, Soweto, 1811
          </Text>
          <View style={styles.datesContainer}>
            <Text style={styles.dates}>
              From{"\n"}
              {fromDate}
            </Text>
            <Text style={styles.dates}>
              {" "}
              To {"\n"}
              {toDate}
            </Text>
          </View>
        </View>
        {/* Carousel of Images */}
        <Carousel
          data={images}
          renderItem={({ item }) => (
            <Image source={item} style={styles.carouselImage} />
          )}
          sliderWidth={300}
          itemWidth={160}
        />

        {/* Full Description */}
        <View style={styles.viewsContainer}>
          <Text style={styles.views}>5k views</Text>
          <Text style={styles.views}>244 views</Text>
        </View>
        <Text style={styles.description}>{description}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: 20,
    backgroundColor: "black", // Set this to your desired background color for the whole screen
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
    paddingBottom: 80,
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
});

export default ExhibitionScreen;
