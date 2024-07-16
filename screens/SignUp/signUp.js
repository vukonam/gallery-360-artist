import { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
//import ForgetPassword from "../SignIn/ForgetPassword";
import auth from "../../firebase/firebase.config.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function App({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [errors, setErrors] = useState({});
  const [artistAgreesToTerms, setArtistAgreesToTerms] = useState(false)

  const G360_TERMS = "I agree to Gallery360's Terms & Conditions";

  console.log('sign up');
  const handleTermAgreementToggle = () => {
    setArtistAgreesToTerms(artistAgreesToTerms => !artistAgreesToTerms)
  }

  const validateForm = () => {
    console.log("validateForm is hit");
    let errors = {};
    if (email.trim() === "") {
      errors.email = "Please enter a valid email";
    } else if (!/\S+@\S.\S{2,}/.test(email.replace(/ /g, ""))) {
      errors.email = "Please enter a valid email.";
    }
    if (
      password.length < 8 ||
      password.search(/[a-z]/) < 0 ||
      password.search(/[A-Z]/) < 0 ||
      password.search(/[\d]/) < 0
    ) {
      errors.password =
        "Password must be at least 8 characters long, containing at least one uppercase letter and one lowercase letter.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignUp = async () => {
    // Validate the form before submiting it
    setIsLoading(true);
    if (validateForm()) {
      console.log({ validateForm: validateForm(), email: email, password: password});
      // return
      try {
        
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = response.user;
        // console.log("Registered with:", user.email);
        setIsLoading(false);
        // navigation paused to understand app logic to avoid eternal loader.
        // navigation.navigate("Profile");
        setEmail("");
        setPassword("");
        setErrors({});
      } catch (error) {
        console.log(error);
        alert("Please Enter Your Email And Password");
      }
    } else {
      setIsLoading(false)
    }
  };

  return (
    <View style={styles.container}>
        <ScrollView>
          <View style={styles.imageContainer}>
            <Image
              style={{ width: 200, height: 200, alignSelf: "center" }}
              source={require("../../assets/images/gallery36.png")}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.header}>Sign Up</Text>
            <View style={styles.accountLoginContainer}>
              <Text style={styles.smallerText}> create your new account</Text>
              <View style={styles.iconContainer}>
                <Icon
                  name="google"
                  size={20}
                  style={{ paddingRight: 20 }}
                  color="gray"
                />
                <Icon name="facebook" size={20} color="gray" />
              </View>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="white"
              value={email}
              onChangeText={(text) => {
                setErrors({});
                setEmail(text);
              }}
              editable={!isLoading}
            />
            {errors.email ? (
              <Text style={styles.errorMessage}>{errors.email}</Text>
            ) : null}
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="white"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => {
                setErrors({});
                setPassword(text);
              }}
              editable={!isLoading}
            />
            {errors.password ? (
              <Text style={styles.errorMessage}>{errors.password}</Text>
            ) : null}

            <View style={[styles.Items, styles.checkboxContainer]}>
              <TouchableOpacity
                style={[
                  artistAgreesToTerms && styles.selectedCheckbox
                ]}
                onPress={() => handleTermAgreementToggle()}
                disabled={isLoading}
              >
                <View style={styles.checkbox}>
                  {artistAgreesToTerms && (
                    <Icon name="check" size={14} color="white" />
                  )}
                </View>
              </TouchableOpacity>
              <Text
                //  key={index}
                style={[
                  styles.checkboxText,
                  artistAgreesToTerms && styles.selectedText,
                ]}
                
              >
                {G360_TERMS}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.signInButton}
              onPress={!isLoading && handleSignUp}
              disabled={isLoading}
            >
              {
                isLoading
                  ? <ActivityIndicator color={'white'} size={'large'}/>
                  : <Text style={styles.buttonText}>Sign Up</Text>
              }
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Login")}
              disabled={isLoading}
            >
              <Text style={styles.smallerButtonText}>
                Already have an account?
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black", // Set this to your desired background color for the whole screen
  },
  imageContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#CEB89E",
    borderBottomEndRadius: 40,
    borderBottomLeftRadius: 40,
    height: 350,
  },
  accountLoginContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: '100%'
  },
  iconContainer: {
    marginLeft: 100,
    flexDirection: "row",
  },
  image: {
    width: "50%", // Adjust this value to control the image size
    height: "100%", // Adjust this value to control the image size
    resizeMode: "contain",
  },
  card: {
    flex: 1,
    backgroundColor: "#f0f0f0", // Set this to your desired card background color
    padding: 20,
  },
  smallerText: {
    color: "white",
    textAlign: "right",
  },
  header: {
    fontSize: 44,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
    textAlign: "left",
    width: '100%'
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent", // Set this to your desired background color for the whole screen
    width: '100%',
    padding: 20,
    marginTop: 10
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
    textDecorationColor: "white",
  },
  signInButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#CEB89E", // Set this to your desired button background color
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff", // Set this to your desired button text color
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "transparent", // Set this to your desired button color
    padding: 10,
    borderRadius: 5,
    marginTop: 10
  },
  smallerButtonText: {
    color: "#fff", // Set this to your desired button text color
    fontSize: 14,
  },
  smallerButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1.5,
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
    marginLeft: 10,
    // textTransform: "uppercase",
  },
  selectedCheckbox: {
    backgroundColor: "#CEB89E", // Customize the background color when the checkbox is selected
    borderRadius: 5
  },
  selectedText: {
    fontWeight: "bold", // Customize the style when the checkbox is selected
  },
  Items: {
    flexDirection: "column",
    justifyContent: "space-between",
    //flexWrap: "wrap",
  },
  errorMessage: {
    width: "100%",
    color: "rgb(220, 80, 90)",
    marginBottom: 10,
    textAlign: "left",
  },
});
