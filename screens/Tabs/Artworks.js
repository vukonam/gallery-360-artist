import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5"; // Replace "FontAwesome5" with the icon library of your choice.

const ArtworksScreen = () => {
  const [name, setName] = useState("John Doe");
  const profilePic = require("../../assets/images/userImage.jpg"); // Replace with the actual path to the profile picture

  const [selectedOption, setSelectedOption] = useState("All");

  function handleAddArtwork() {
    console.log("One Art piece add to your collection");
  }
  // Function to render the content based on the selected option
  const renderContent = () => {
    if (selectedOption === "All") {
      // Render the profile card for "All" option
      return (
        <View style={styles.cardContainer}>
          <View style={styles.profileCard}>
            <View style={styles.profileInfo}>
              <Image source={profilePic} style={styles.profilePic} />
              <View style={styles.profileText}>
                <Text style={styles.profileName}>{name}</Text>
                <Text style={styles.profileInfoText}>
                  make your first sale by adding artwork
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>Add Artworks</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (selectedOption === "STAND ALONE") {
      const cardsData = [
        {
          id: "1",
          image: require("../../assets/images/art1.png"), // Replace with the path to your image
          title: "Card 1",
        },
        {
          id: "2",
          image: require("../../assets/images/art2.png"), // Replace with the path to your image
          title: "Card 2",
        },
        {
          id: "3",
          image: require("../../assets/images/art3.png"), // Replace with the path to your image
          title: "Card 3",
        },
        {
          id: "4",
          image: require("../../assets/images/art4.png"), // Replace with the path to your image
          title: "Card 4",
        },
        // Add more cards data as needed
      ];

      const renderItem = ({ item }) => (
        <View style={styles.card}>
          <Image source={item.image} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.title}</Text>
          </View>
        </View>
      );

      return (
        <View style={styles.container}>
          <FlatList
            data={cardsData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
          />
        </View>
      );
    } else if (selectedOption === "NATURE'S BEAUTY") {
      const cardsData = [
        {
          id: "1",
          image: require("../../assets/images/art1.png"), // Replace with the path to your image
          title: "Card 1",
        },
        {
          id: "2",
          image: require("../../assets/images/art2.png"), // Replace with the path to your image
          title: "Card 2",
        },
        {
          id: "3",
          image: require("../../assets/images/art3.png"), // Replace with the path to your image
          title: "Card 3",
        },
        {
          id: "4",
          image: require("../../assets/images/art4.png"), // Replace with the path to your image
          title: "Card 4",
        },
        // Add more cards data as needed
      ];

      const renderItem = ({ item }) => (
        <View style={styles.card}>
          <Image source={item.image} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.title}</Text>
          </View>
        </View>
      );

      return (
        <View style={styles.container}>
          <FlatList
            data={cardsData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
          />
        </View>
      );
    } else if (selectedOption === "URBAN LANDSCAPE") {
      const cardsData = [
        {
          id: "1",
          image: require("../../assets/images/art1.png"), // Replace with the path to your image
          title: "Card 1",
        },
        {
          id: "2",
          image: require("../../assets/images/art2.png"), // Replace with the path to your image
          title: "Card 2",
        },
        {
          id: "3",
          image: require("../../assets/images/art3.png"), // Replace with the path to your image
          title: "Card 3",
        },
        {
          id: "4",
          image: require("../../assets/images/art4.png"), // Replace with the path to your image
          title: "Card 4",
        },
        // Add more cards data as needed
      ];

      const renderItem = ({ item }) => (
        <View style={styles.card}>
          <Image source={item.image} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.title}</Text>
          </View>
        </View>
      );

      return (
        <View style={styles.container}>
          <FlatList
            data={cardsData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
          />
        </View>
      );
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Text style={styles.name}>Hi {name}</Text>
          <Image source={profilePic} style={styles.profilePic} />
        </View>
      </View>
      <View style={styles.newArtworkContainer}>
        <Text style={styles.welcomeHeader}>Artworks</Text>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={handleAddArtwork}
        >
          <Text style={styles.buttonText}>NEW ARTWORK</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 50 }}>
        <ScrollView
          horizontal
          contentContainerStyle={styles.artworksMenu}
          style={styles.scrollView}
        >
          <TouchableOpacity
            style={[
              styles.menuItem,
              selectedOption === "All" && styles.activeMenuItem,
            ]}
            onPress={() => setSelectedOption("All")}
          >
            <Text
              style={[
                styles.menuText,
                selectedOption === "All" && styles.activeMenuText,
              ]}
            >
              ALL
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.menuItem,
              selectedOption === "STAND ALONE" && styles.activeMenuItem,
            ]}
            onPress={() => setSelectedOption("STAND ALONE")}
          >
            <Text
              style={[
                styles.menuText,
                selectedOption === "STAND ALONE" && styles.activeMenuText,
              ]}
            >
              STAND ALONE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.menuItem,
              selectedOption === "NATURE'S BEAUTY" && styles.activeMenuItem,
            ]}
            onPress={() => setSelectedOption("NATURE'S BEAUTY")}
          >
            <Text
              style={[
                styles.menuText,
                selectedOption === "NATURE'S BEAUTY" && styles.activeMenuText,
              ]}
            >
              NATURE'S BEAUTY
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.menuItem,
              selectedOption === "URBAN LANDSCAPE" && styles.activeMenuItem,
            ]}
            onPress={() => setSelectedOption("URBAN LANDSCAPE")}
          >
            <Text
              style={[
                styles.menuText,
                selectedOption === "URBAN LANDSCAPE" && styles.activeMenuText,
              ]}
            >
              URBAN LANDSCAPE
            </Text>
          </TouchableOpacity>
          {/* Add more menu items as needed */}
        </ScrollView>
      </View>

      {/* Profile Card */}
      {renderContent()}

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
    padding: 10,
    paddingTop: 20,
  },
  header: {
    marginBottom: 20,
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
  },
  welcomeHeader: {
    color: "white",
    marginLeft: 10,
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 20,
  },
  artworksHeader: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
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
  artworksMenu: {
    width: 270,
    flexDirection: "row",
    justifyContent: "space-around",

    paddingTop: 10,
    marginBottom: 20,
  },
  menuItem: {
    alignItems: "center",
  },

  cardContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  profileCard: {
    marginTop: 120,
    backgroundColor: "transparent",
    borderRadius: 8,
    borderWidth: 0.2,
    borderColor: "#CEB89E",
    padding: 10,
    width: 330,
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
  },
  salesList: {
    marginTop: 20,
  },
  saleItem: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  activeMenuItem: {
    borderRadius: 15,
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: "#616161",
  },
  activeMenuText: {
    color: "black",
  },
  signInButton: {
    width: "40%",
    height: 50,
    backgroundColor: "#CEB89E", // Set this to your desired button background color
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff", // Set this to your desired button text color
    fontSize: 15,
  },
  newArtworkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#616161",
    borderRadius: 15,
    marginBottom: 20,
  },
  cardImage: {
    width: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: 200, // Adjust this value to control the image height
    resizeMode: "cover",
  },
  cardInfoContainer: {
    padding: 10,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  cardDate: {
    fontSize: 14,
    color: "white",
  },
  cardAddress: {
    marginBottom: 5,
    fontSize: 14,
    color: "white",
  },
  cardDescription: {
    fontSize: 14,
    color: "white",
  },
  flatlistContainer: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
    paddingTop: 20,
    marginBottom: 30,
  },
  card: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 15,
    overflow: "hidden",
    margin: 5,
  },
  cardImage: {
    width: "100%",
    height: 220, // Adjust this value to control the image height
    resizeMode: "cover",
  },
  cardContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  artworksMenu: {
    height: 25,

    flexDirection: "row",
  },

  activeMenuItem: {
    backgroundColor: "#007BFF",
  },
  menuText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  activeMenuText: {
    color: "#fff",
  },
  activeMenuItem: {
    borderRadius: 15,
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: "#616161",
  },
  activeMenuText: {
    color: "black",
  },
  menuText: {
    color: "white",
    fontSize: 14,
  },
  menuItem: {
    alignItems: "center",
    marginRight: 10,
  },
  scrollView: {
    height: 50, // Adjust the height as per your requirements
  },
});

export default ArtworksScreen;
