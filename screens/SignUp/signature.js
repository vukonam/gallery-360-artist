import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const MyPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Signature</Text>
      <Text style={styles.paragraph}>
        This signature will be used as proof of authenticity for your artwork.
      </Text>

      <View style={styles.imageContainer}>
        <Image
          style={{ width: 320, height: 450, alignSelf: "center" }}
          source={require("../../assets/images/sign.png")}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log("upload the image")}
      >
        <Text style={styles.smallerButtonText}>UPLOAD SIGNATURE</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.navigate("Payment")}
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
    paddingTop: 40,
    padding: 20,
  },
  paragraph: {
    fontSize: 16,
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
  smallerButtonText: {
    color: "white",
    fontSize: 16,
  },
  artWorks: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    marginTop: 10,
    backgroundColor: "transparent", // Set this to your desired button color
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#CEB89E",
    height: 450,
  },
  header: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
});

export default MyPage;
