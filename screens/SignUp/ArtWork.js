import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5"; // Replace "FontAwesome5" with the icon library of your choice.

const MyPage = ({ navigation }) => {
  const artworks = [
    "Painting",
    "Drawing",
    "Sculpture",
    "Photography",
    "Printmaking",
    "Collage",
    "Installation",
    "Performance",
    "Digital Art",
    "Mixed Media",
    "Ceramics",
    "Textile Art",
    "Graffiti",
    "Engraving",
    "Pottery",
    "Calligraphy",
    "Assemblage",
    "Mosaic",
    "Fresco",
    "Watercolor",
    "Ink Wash Painting",
    "Oil Pastel",
    "Woodcut",
    "Lithography",
  ];

  return (
    <View style={styles.container}>
      {/* Paragraph */}
      <Text style={styles.paragraph}>
        There are many types of artworks created by artists across different
        mediums and styles.
      </Text>

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
      <View style={styles.artWorks}>
        {artworks.map((art, index) => {
          return (
            <Text
              key={index}
              style={{
                color: "white",
                margin: 5,
                textTransform: "uppercase",
                padding: 5,
                backgroundColor: "gray",
                borderRadius: 10,
              }}
            >
              {art}
            </Text>
          );
        })}
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.navigate("Signature")}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
  },
  paragraph: {
    marginTop: 40,
    fontSize: 20,
    color: "white",
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
  continueButton: {
    position: "absolute",
    backgroundColor: "#CEB89E",
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
    bottom: 40,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  artWorks: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default MyPage;
