import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5"; // Replace "FontAwesome5" with the icon library of your choice.

const PaymentScreen = () => {
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handleContinue = () => {
    // You can perform any action here, such as processing the payment details
    // For simplicity, we'll just log the data for now.
    console.log("Payment Details:");
    console.log("Card Holder:", cardHolder);
    console.log("Card Number:", cardNumber);
    console.log("Expiry:", expiry);
    console.log("CVV:", cvv);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={{
            width: 300,
            height: 220,
            alignSelf: "center",
            borderRadius: 50,
          }}
          source={require("./assets/images/visa.png")}
        />
      </View>
      <Text style={styles.header}>Payment Cards</Text>
      <Text style={styles.paragraph}>
        Payment account that will be used to receive payments
      </Text>
      {/* Card Holder Input */}
      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#CEB89E" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Card Holder"
          placeholderTextColor="#CEB89E"
          value={cardHolder}
          onChangeText={setCardHolder}
        />
      </View>

      {/* Card Number Input */}
      <View style={styles.inputContainer}>
        <Icon
          name="credit-card"
          size={20}
          color="#CEB89E"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Card Number"
          placeholderTextColor="#CEB89E"
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType="numeric"
        />
      </View>

      {/* Expiry Input */}
      <View style={styles.inputContainer}>
        <Icon
          name="calendar-alt"
          size={20}
          color="#CEB89E"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Expiry (MM/YY)"
          placeholderTextColor="#CEB89E"
          value={expiry}
          onChangeText={setExpiry}
          keyboardType="numeric"
        />
      </View>

      {/* CVV Input */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#CEB89E" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="CVV"
          placeholderTextColor="#CEB89E"
          value={cvv}
          onChangeText={setCvv}
          keyboardType="numeric"
        />
      </View>

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log("might do, might not, might maybe")}
      >
        <Text style={styles.smallerButtonText}>I'll do it later</Text>
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",

    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#CEB89E",
  },
  continueButton: {
    backgroundColor: "#CEB89E",
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#CEB89E",
    borderRadius: 40,

    height: 280,
  },
  paragraph: {
    fontSize: 16,
    color: "white",
    marginBottom: 20,
  },
  header: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  button: {
    marginTop: 10,
    backgroundColor: "transparent", // Set this to your desired button color
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  smallerButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default PaymentScreen;
