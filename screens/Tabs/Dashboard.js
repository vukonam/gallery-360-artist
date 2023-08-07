import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import Icon from "react-native-vector-icons/FontAwesome5"; // Replace "FontAwesome5" with the icon library of your choice.

const DashboardScreen = () => {
  // Sample data for the line chart
  const [name, setName] = useState("John Doe");
  const profilePic = require("../../assets/images/userImage.jpg"); // Replace with the actual path to the profile picture

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(206, 184, 158, ${opacity})`, // Set the color of the line chart
      },
    ],
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
        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <Image source={profilePic} style={styles.profilePic} />
            <View style={styles.profileText}>
              <Text style={styles.profileName}>{name}</Text>
              <Text style={styles.profileInfoText}>
                make your first sale by adding artwork collections
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Artworks</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (selectedOption === "Painting") {
      const salesData = [
        {
          name: "Painting 1",
          sold: "Yes",
          date: "2023-07-19",
          price: "$100",
        },
        {
          name: "Painting 2",
          sold: "Yes",
          date: "2023-07-18",
          price: "$150",
        },
        // Add more sales data as needed
      ];
      return (
        <View style={styles.salesList}>
          {salesData.map((sale, index) => (
            <View key={index} style={styles.saleItem}>
              <Text>{sale.name}</Text>
              <Text>Sold: {sale.sold}</Text>
              <Text>Date: {sale.date}</Text>
              <Text>Price: {sale.price}</Text>
            </View>
          ))}
        </View>
      );
    } else if (selectedOption === "Printmaking") {
      const salesData = [
        {
          name: "Printmaking 1",
          sold: "Yes",
          date: "2023-07-19",
          price: "$100",
        },
        {
          name: "Printmaking 2",
          sold: "Yes",
          date: "2023-07-18",
          price: "$150",
        },
        // Add more sales data as needed
      ];
      return (
        <View style={styles.salesList}>
          {salesData.map((sale, index) => (
            <View key={index + 40} style={styles.saleItem}>
              <Text>{sale.name}</Text>
              <Text>Sold: {sale.sold}</Text>
              <Text>Date: {sale.date}</Text>
              <Text>Price: {sale.price}</Text>
            </View>
          ))}
        </View>
      );
    } else if (selectedOption === "Textile Art") {
      const salesData = [
        {
          name: "Textile Art 1",
          sold: "Yes",
          date: "2023-07-19",
          price: "$100",
        },
        {
          name: "Textile Art 2",
          sold: "Yes",
          date: "2023-07-18",
          price: "$150",
        },
      ];
      return (
        <View style={styles.salesList}>
          {salesData.map((sale, index) => (
            <View key={index + 50} style={styles.saleItem}>
              <Text>{sale.name}</Text>
              <Text>Sold: {sale.sold}</Text>
              <Text>Date: {sale.date}</Text>
              <Text>Price: {sale.price}</Text>
            </View>
          ))}
        </View>
      );
    }
    // Add other cases for other navigation options if needed
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Text style={styles.name}>Hi {name}</Text>
          <Image source={profilePic} style={styles.profilePic} />
        </View>
      </View>

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
        {/* Add more menu items as needed */}
      </View>

      {/* Profile Card */}
      <ScrollView style={{ marginBottom: 30 }}>{renderContent()}</ScrollView>

      {/* <View style={styles.navigationMenu}>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="home" size={20} color="white" style={styles.menuIcon} />
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon
            name="facebook"
            size={20}
            color="white"
            style={styles.menuIcon}
          />
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
    paddingTop: 20,
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
    width: 330,
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
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
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
});

export default DashboardScreen;
