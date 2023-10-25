import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5"; // Replace "FontAwesome5" with the icon library of your choice.

/*
import { useMemo, useRef, useState } from "react"

function App() {
  const [items, setItems] = useState([])
  const [query, setQuery] = useState("")
  const inputRef = useRef()

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      return item.toLowerCase().includes(query.toLowerCase())
    })
  }, [items, query])

  function onSubmit(e) {
    e.preventDefault()

    const value = inputRef.current.value
    if (value === "") return
    setItems(prev => {
      return [...prev, value]
    })

    inputRef.current.value = ""
  }

  return (
    <>
      Search:
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        type="search"
      />
      <br />
      <br />
      <form onSubmit={onSubmit}>
        New Item: <input ref={inputRef} type="text" />
        <button type="submit">Add</button>
      </form>
      <h3>Items:</h3>
      {filteredItems.map(item => (
        <div>{item}</div>
      ))}
    </>
  )
}

export default App

*/

const MyPage = ({ route, navigation }) => {
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
  // const {       fullName,
  //        contactNumber,
  //        website,
  //        dateOfBirth,
  //        bio,
  //        imageUrl,
  //        facebook,
  //        instagram,
  //       userid} = route.params.userData
  const { userData } = route.params;

  console.log(userData);
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
        onPress={() => navigation.navigate("Signature", { userData })}
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
