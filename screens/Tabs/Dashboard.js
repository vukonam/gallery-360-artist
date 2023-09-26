import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
//import Icon from "react-native-vector-icons/FontAwesome5"; // Replace "FontAwesome5" with the icon library of your choice.
import auth from "../../firebase/firebase.config.js";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB, storage } from "../../firebase/firebase.config";
import ProfilePic from "../../components/ProfilePic.js";
import ProfileCard from "../../components/ProfileCard.js";
import loader2 from "../../assets/images/loader2.gif";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setData } from "../../features/loginDetails.js";
//import { useSelector } from "react-redux";

const DashboardScreen = ({ navigation }) => {
  const profilePic = require("../../assets/images/userImage.jpg"); // Replace with the actual path to the profile picture

  const [name, setName] = useState("John Doe");
  const [userData, setUserData] = useState(null);
  const [navStack, setNavStack] = useState("NewArtwork");
  const [desc, setDesc] = useState(
    " make your first sale by adding artwork collections"
  );
  const [btnText, setBtnText] = useState("Add Artworks");
  const [image, setImage] = useState(profilePic);
  const selectData = useSelector((state) => state.loginDetails.data);
  console.log("redux data : ", selectData);
  const dispatch = useDispatch();
  useEffect(() => {
    const user = auth.currentUser;
    console.log(user.uid);
    getDoc(doc(FIRESTORE_DB, "galleryUsers", user.uid), {})
      .then((docData) => {
        // Success callback
        console.log("data ", docData.data());
        if (docData.exists()) {
          let data = docData.data();
          dispatch(setData(data));
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

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(206, 184, 158, ${opacity})`, // Set the color of the line chart
      },
    ],
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

  // Chart configuration
  const chartConfig = {
    backgroundGradientFrom: "#1E1E1E",
    backgroundGradientTo: "#1E1E1E",
    color: (opacity = 1) => `rgba(206, 184, 158, ${opacity})`,
    strokeWidth: 2,
    decimalPlaces: 0,
  };

  const [selectedOption, setSelectedOption] = useState("All");

  // Function to render the content based on the selected option
  const renderContent = () => {
    if (selectedOption === "All") {
      // Render the profile card for "All" option
      return (
        <ProfileCard
          data={{ name, image, desc, btnText, navStack, navigation }}
        />
      );
    } else if (selectedOption === "Painting") {
      const salesData = [
        {
          name: "Painting 1",
          status: "SOLD",
          date: "2023-07-19",
          price: "$100",
        },
        {
          name: "Painting 2",
          status: "SOLD",
          date: "2023-07-18",
          price: "$150",
        },
        // Add more sales data as needed
      ];
      return (
        <View style={styles.salesList}>
          {salesData.map((sale, index) => (
            <View key={index} style={styles.saleItem}>
              <View>
                <Text style={styles.saleItemName}>{sale.name}</Text>
                <View style={styles.saleItemDateStatus}>
                  <Text style={styles.saleGreenText}>
                    {" "}
                    {sale.status} - {sale.date}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.salePriceText}>Price: {sale.price}</Text>
              </View>
            </View>
          ))}
        </View>
      );
    } else if (selectedOption === "Printmaking") {
      const salesData = [
        {
          name: "Printmaking 1",
          status: "SOLD",
          date: "2023-07-19",
          price: "$100",
        },
        {
          name: "Printmaking 2",
          status: "SOLD",
          date: "2023-07-18",
          price: "$150",
        },
        // Add more sales data as needed
      ];
      return (
        <View style={styles.salesList}>
          {salesData.map((sale, index) => (
            <View key={index} style={styles.saleItem}>
              <View>
                <Text style={styles.saleItemName}>{sale.name}</Text>
                <View style={styles.saleItemDateStatus}>
                  <Text style={styles.saleGreenText}>
                    {" "}
                    {sale.status} - {sale.date}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.salePriceText}>Price: {sale.price}</Text>
              </View>
            </View>
          ))}
        </View>
      );
    } else if (selectedOption === "Textile Art") {
      const salesData = [
        {
          name: "Textile Art 1",
          status: "SOLD",
          date: "2023-07-19",
          price: "$100",
        },
        {
          name: "Textile Art 2",
          status: "SOLD",
          date: "2023-07-18",
          price: "$150",
        },
      ];
      return (
        <View style={styles.salesList}>
          {salesData.map((sale, index) => (
            <View key={index} style={styles.saleItem}>
              <View>
                <Text style={styles.saleItemName}>{sale.name}</Text>
                <View style={styles.saleItemDateStatus}>
                  <Text style={styles.saleGreenText}>
                    {" "}
                    {sale.status} - {sale.date}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.salePriceText}>Price: {sale.price}</Text>
              </View>
            </View>
          ))}
        </View>
      );
    }
    // Add other cases for other navigation options if needed
  };
  return userData === null ? (
    <View style={styles.container}>
      <Imageloader />
    </View>
  ) : (
    <View style={styles.container}>
      <View>{<ProfilePic data={{ name, image, navigation }} />}</View>

      <Text style={styles.welcomeHeader}>Welcome to your Dashboard</Text>

      <LineChart
        data={data}
        width={350}
        height={200}
        chartConfig={chartConfig}
        style={styles.lineChart}
      />
      <Text style={styles.artworksHeader}>Artwork Sales</Text>

      {/* Navigation Menu */}
      <View style={styles.artworksMenu}>
        {/* Add your navigation menu items here */}
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
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.menuItem,
            selectedOption === "Painting" && styles.activeMenuItem,
          ]}
          onPress={() => setSelectedOption("Painting")}
        >
          <Text
            style={[
              styles.menuText,
              selectedOption === "Painting" && styles.activeMenuText,
            ]}
          >
            Painting
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.menuItem,
            selectedOption === "Printmaking" && styles.activeMenuItem,
          ]}
          onPress={() => setSelectedOption("Printmaking")}
        >
          <Text
            style={[
              styles.menuText,
              selectedOption === "Printmaking" && styles.activeMenuText,
            ]}
          >
            Printmaking
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.menuItem,
            selectedOption === "Textile Art" && styles.activeMenuItem,
          ]}
          onPress={() => setSelectedOption("Textile Art")}
        >
          <Text
            style={[
              styles.menuText,
              selectedOption === "Textile Art" && styles.activeMenuText,
            ]}
          >
            Textile Art
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ marginBottom: 30 }}>{renderContent()}</ScrollView>
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
    marginRight: 200,
  },
  welcomeHeader: {
    color: "white",
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 20,
  },
  artworksHeader: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 25,
    marginBottom: 10,
  },
  lineChart: {
    marginVertical: 8,
    borderRadius: 16,
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
    fontSize: 12,
  },
  artworksMenu: {
    flexDirection: "row",
    justifyContent: "space-around",

    paddingTop: 10,
    marginBottom: 20,
  },
  menuItem: {
    alignItems: "center",
  },
  menuText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  profileCard: {
    backgroundColor: "transparent",
    borderRadius: 8,
    borderWidth: 0.2,
    borderColor: "#CEB89E",
    padding: 10,
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
    borderRadius: 10,
    padding: 20,
    borderRadius: 0,
    borderWidth: 2,
    borderBottomWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 70,
    fontSize: 16,
    borderBottomColor: "#CEB89E",
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 20,
  },
  saleItemLeft: {
    padding: 10,
  },
  saleItemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  saleItemDateStatus: {
    marginBottom: 2,
  },
  saleGreenText: {
    fontSize: 14,
    color: "green",
  },
  saleItemRight: {},
  salePriceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },

  activeMenuItem: {
    borderRadius: 15,
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: "#CEB89E",
  },
  activeMenuText: {
    color: "black",
  },
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "auto",
  },
});

export default DashboardScreen;
