import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5"; // Replace "FontAwesome5" with the icon library of your choice.

const ArtworksScreen = ({ navigation }) => {
  const [selectedArtworks, setSelectedArtworks] = useState([]);
  const artworks = ["The Great Collection"];
  function handleArtworkSelection(artwork) {
    setSelectedArtworks((prevSelected) =>
      prevSelected.includes(artwork)
        ? prevSelected.filter((item) => item !== artwork)
        : [...prevSelected, artwork]
    );
  }
  // Function to render the content based on the selected option
  const renderContent = () => {
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
  };
  return (
    <View style={styles.container}>
      <View style={styles.newArtworkContainer}>
        <Text style={styles.welcomeHeader}>Exhibition Collection</Text>
      </View>
      {/* Search Input */}
      <View style={styles.searchInputContainer}>
        <Icon
          name="search"
          size={20}
          color="#CEB89E"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#CEB89E"
        />
      </View>
      <ScrollView>
        <View style={{ height: 50 }}>
          <View style={[styles.artWorks, styles.checkboxContainer]}>
            {artworks.map((artwork, index) => (
              <>
                <Text
                  style={[
                    styles.checkboxText,
                    selectedArtworks.includes(artwork) && styles.selectedText,
                  ]}
                >
                  {artwork}
                </Text>
                <TouchableOpacity
                  key={index}
                  style={[
                    selectedArtworks.includes(artwork) &&
                      styles.selectedCheckbox,
                  ]}
                  onPress={() => handleArtworkSelection(artwork)}
                >
                  <View style={styles.checkbox}>
                    {selectedArtworks.includes(artwork) && (
                      <Icon name="check" size={18} color="white" />
                    )}
                  </View>
                </TouchableOpacity>
              </>
            ))}
          </View>
        </View>
        {/* Profile Card */}
        {renderContent()}
        <View style={{ height: 50 }}>
          <View style={[styles.artWorks, styles.checkboxContainer]}>
            {artworks.map((artwork, index) => (
              <>
                <Text
                  style={[
                    styles.checkboxText,
                    selectedArtworks.includes(artwork) && styles.selectedText,
                  ]}
                >
                  {artwork}
                </Text>
                <TouchableOpacity
                  key={index}
                  style={[
                    selectedArtworks.includes(artwork) &&
                      styles.selectedCheckbox,
                  ]}
                  onPress={() => handleArtworkSelection(artwork)}
                >
                  <View style={styles.checkbox}>
                    {selectedArtworks.includes(artwork) && (
                      <Icon name="check" size={18} color="white" />
                    )}
                  </View>
                </TouchableOpacity>
              </>
            ))}
          </View>
        </View>
        {/* Profile Card */}
        {renderContent()}
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => navigation.back()}
        >
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
    paddingTop: 40,
  },
  newArtworkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  welcomeHeader: {
    color: "white",
    marginLeft: 10,
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 20,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#CEB89E",
  },
  columnWrapper: {
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
  signInButton: {
    width: "100%",
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
    fontSize: 14,
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
  artWorks: {
    flexDirection: "column",
    justifyContent: "space-between",
    //flexWrap: "wrap",
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
    margin: 5,
    padding: 10,
    backgroundColor: "transparent",
    borderRadius: 15,
  },
  checkboxText: {
    color: "white",
    textTransform: "uppercase",
  },
  selectedCheckbox: {
    backgroundColor: "#CEB89E", // Customize the background color when the checkbox is selected
  },
  selectedText: {
    fontWeight: "bold", // Customize the style when the checkbox is selected
  },
});

export default ArtworksScreen;
