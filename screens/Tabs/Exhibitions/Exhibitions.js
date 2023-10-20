import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
//import Icon from "react-native-vector-icons/FontAwesome5"; // Replace "FontAwesome5" with the icon library of your choice.
import auth from "../../../firebase/firebase.config.js";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB, storage } from "../../../firebase/firebase.config";
import loader2 from "../../../assets/images/loader2.gif";
import { useSelector } from "react-redux";
import { setLoading } from "../../../features/loginDetails.js";
import { useDispatch } from "react-redux";
import ProfilePic from "../../../components/ProfilePic.js";

import styles from "./styles.js";

export default function ExhibitionScreen({ navigation }) {
  const [selectedOption, setSelectedOption] = useState("All");
  const profilePic = require("../../../assets/images/userImage.jpg"); // Replace with the actual path to the profile picture
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState("John Doe");

  const [image, setImage] = useState(profilePic);
  useEffect(() => {
    const user = auth.currentUser;
    console.log(user.uid);
    getDoc(doc(FIRESTORE_DB, "galleryUsers", user.uid), {})
      .then((docData) => {
        // Success callback
        console.log("data ", docData.data());
        if (docData.exists()) {
          let data = docData.data();
          setUserData(data);
          setName(data.fullname);
          setImage({ uri: data.imageUrl });
        } else console.log("NO SUCH DATA");
      })
      .catch((error) => {
        // Error callback
        alert(error);
        console.log("error ", error);
      });
  }, []);
  // const selectData = useSelector((state) => state.loginDetails.data);
  const handleAddArtwork = () => {
    navigation.navigate("NewExhibition");
  };

  const Imageloader = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Image source={loader2}></Image>
      </View>
    );
  };
  const renderContent = () => {
    if (selectedOption === "All") {
      // Render the profile card for "All" option
      return (
        <View style={styles.cardContainer}>
          <View style={styles.profileCard}>
            <View style={styles.profileInfo}>
              <Image source={image} style={styles.profilePic} />
              <View style={styles.profileText}>
                <Text style={styles.profileName}>{name}</Text>
                <Text style={styles.profileInfoText}>
                  Your Exhibitions will be listed here.{" "}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>LIST EXHIBITION</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (selectedOption === "UPCOMING") {
      const cardsData = [
        {
          id: "1",
          image: require("../../../assets/images/art3.png"), // Replace with the path to your image
          title: "Reflections in Color",
          date: "July 19, 2023",
          address: "Gallery XYZ, 123 Main Street, Anytown USA",
          description: `Reflections in Color" is a vibrant and dynamic exhibition featuring the artwork of emerging and established artists who explore the interplay of color and form in their work.`,
        },
        {
          id: "2",
          image: require("../../../assets/images/art4.png"), // Replace with the path to your image
          title: "Reflections in Color",
          date: "July 19, 2023",
          address: "Gallery XYZ, 123 Main Street, Anytown USA",
          description: `Reflections in Color" is a vibrant and dynamic exhibition featuring the artwork of emerging and established artists who explore the interplay of color and form in their work.`,
        },
        // Add more cards data as needed
      ];

      const renderItem = ({ item }) => (
        <View style={styles.card}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ExhibitionShow2")}
          >
            <Image source={item.image} style={styles.cardImage} />
            <View style={styles.cardInfoContainer}>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDate}>{item.date}</Text>
              </View>
              <Text style={styles.cardAddress}>{item.address}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );

      return (
        <View style={styles.flatlistContainer}>
          <FlatList
            data={cardsData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={1}
          />
        </View>
      );
    } else if (selectedOption === "PAST") {
      const cardsData = [
        {
          id: "1",
          image: require("../../../assets/images/art2.png"), // Replace with the path to your image
          title: "Reflections in Color",
          date: "July 19, 2023",
          address: "Gallery XYZ, 123 Main Street, Anytown USA",
          description: `Reflections in Color" is a vibrant and dynamic exhibition featuring the artwork of emerging and established artists who explore the interplay of color and form in their work.`,
        },
        {
          id: "2",
          image: require("../../../assets/images/art3.png"), // Replace with the path to your image
          title: "Reflections in Color",
          date: "July 19, 2023",
          address: "Gallery XYZ, 123 Main Street, Anytown USA",
          description: `Reflections in Color" is a vibrant and dynamic exhibition featuring the artwork of emerging and established artists who explore the interplay of color and form in their work.`,
        },
        // Add more cards data as needed
      ];

      const renderItem = ({ item }) => (
        <View style={styles.card}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ExhibitionShow2")}
          >
            <Image source={item.image} style={styles.cardImage} />
            <View style={styles.cardInfoContainer}>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDate}>{item.date}</Text>
              </View>
              <Text style={styles.cardAddress}>{item.address}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );

      return (
        <View style={styles.flatlistContainer}>
          <FlatList
            data={cardsData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={1}
          />
        </View>
      );
    } else if (selectedOption === "DRAFTS") {
      const cardsData = [
        {
          id: "1",
          image: require("../../../assets/images/art1.png"), // Replace with the path to your image
          title: "Reflections in Color",
          date: "July 19, 2023",
          address: "Gallery XYZ, 123 Main Street, Anytown USA",
          description: `Reflections in Color" is a vibrant and dynamic exhibition featuring the artwork of emerging and established artists who explore the interplay of color and form in their work.`,
        },
        {
          id: "2",
          image: require("../../../assets/images/art3.png"), // Replace with the path to your image
          title: "Reflections in Color",
          date: "July 19, 2023",
          address: "Gallery XYZ, 123 Main Street, Anytown USA",
          description: `Reflections in Color" is a vibrant and dynamic exhibition featuring the artwork of emerging and established artists who explore the interplay of color and form in their work.`,
        },
        // Add more cards data as needed
      ];

      const renderItem = ({ item }) => (
        <View style={styles.card}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ExhibitionShow2")}
          >
            <Image source={item.image} style={styles.cardImage} />
            <View style={styles.cardInfoContainer}>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDate}>{item.date}</Text>
              </View>
              <Text style={styles.cardAddress}>{item.address}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
      return (
        <View style={styles.flatlistContainer}>
          <FlatList
            data={cardsData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={1}
          />
        </View>
      );
    }
  };

  return userData === null ? (
    <View style={styles.container}>
      <Imageloader />
    </View>
  ) : (
    <View style={styles.container}>
      <View>
        <ProfilePic data={{ name, image, navigation }} />
      </View>
      <View style={styles.newArtworkContainer}>
        <Text style={styles.welcomeHeader}>Exhibition</Text>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => handleAddArtwork()}
        >
          <Text style={styles.buttonText}>NEW EXHIBITION</Text>
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
              selectedOption === "UPCOMING" && styles.activeMenuItem,
            ]}
            onPress={() => setSelectedOption("UPCOMING")}
          >
            <Text
              style={[
                styles.menuText,
                selectedOption === "UPCOMING" && styles.activeMenuText,
              ]}
            >
              UPCOMING
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.menuItem,
              selectedOption === "PAST" && styles.activeMenuItem,
            ]}
            onPress={() => setSelectedOption("PAST")}
          >
            <Text
              style={[
                styles.menuText,
                selectedOption === "PAST" && styles.activeMenuText,
              ]}
            >
              PAST
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.menuItem,
              selectedOption === "DRAFTS" && styles.activeMenuItem,
            ]}
            onPress={() => setSelectedOption("DRAFTS")}
          >
            <Text
              style={[
                styles.menuText,
                selectedOption === "DRAFTS" && styles.activeMenuText,
              ]}
            >
              DRAFTS
            </Text>
          </TouchableOpacity>
          {/* Add more menu items as needed */}
        </ScrollView>
      </View>
      {renderContent()}
    </View>
  );
}
