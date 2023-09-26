import { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  TextInput,
  Modal,
} from "react-native";
//import SpashScreen from "./screens/OnBording/SpashScreen.js";
export default function App(props) {
  const [name, setName] = useState("");
  // const [password, setPassword] = useState("");

  const handleSignIn = () => {
    console.log("signed in!!!");
    props.closeModal();
  };
  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View style={styles.buttonContainer}>
            <Text style={styles.header}>New Artwork Type</Text>
            <TouchableOpacity
              style={styles.NewTypeButton}
              onPress={() => console.log(" a new collection modal")}
            >
              <Text style={styles.buttonText}>NEW TYPE</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="NAME"
            placeholderTextColor="white"
            value={name}
            onChangeText={setName}
          />
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
            placeholder="Bio"
            placeholderTextColor="white"
            value={bio}
            onChangeText={setBio}
            multiline
          />

          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
            <Text style={styles.buttonText}>ADD</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  smallerText: {
    color: "white",
    marginRight: 135,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
    padding: 10,
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent", // Set this to your desired background color for the whole screen
  },
  input: {
    width: "80%",
    height: 50,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingHorizontal: 12,
    marginBottom: 20,
    color: "#fff",
    textDecorationColor: "white",
  },
  signInButton: {
    width: "80%",
    height: 50,
    backgroundColor: "#CEB89E", // Set this to your desired button background color
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff", // Set this to your desired button text color
    fontSize: 16,
  },

  button: {
    backgroundColor: "transparent", // Set this to your desired button color
    width: "80%",
    height: 50,
    // Set this to your desired button background color
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  NewTypeButton: {
    width: "25%",
    height: 45,
    backgroundColor: "gray",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // justifyContent: "space-between",
  },
});
