import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default SpashScreen = () => {
  return (
    <View style={styles.safeArea}>
      <Image
        style={{ width: 200, height: 200, alignSelf: "center" }}
        source={require("./assets/images/gallery.png")}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Gallery 360</Text>
        <Text style={styles.smallerText}>Africa</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 250,
    backgroundColor: "#CEB89E",
    justifyContent: "space-between",
  },
  textContainer: {
    color: "white",
    alignSelf: "center",
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  brownBackground: {
    width: "80%",
    height: 200,
    backgroundColor: "brown",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  smallerText: {
    color: "white",
    fontSize: 20,

    textAlign: "center",
  },
});
