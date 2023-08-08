// 4 Tabs

import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import {
  ArtworkStack,
  NotificationStack,
  ExhibitionStack,
  ProfileStack,
} from "./StackNavigation";
// import Chart from "../assets/svg/index";
// import Notification from "svg";
// import Shop from "svg";
// import Profile from "svg";
// import DesignTool from "svg";

import { View, Image } from "react-native";
//import CustomTabsBtn from "../Components/CustomTabsBtn";
import DashboardScreen from "../screens/Tabs/Dashboard";

const Tabs = createBottomTabNavigator();

// Function to dynamically hide tab bars in specific screens
const getTabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  if (routeName?.includes("Checkout") || routeName?.includes("Payment")) {
    return "none";
  }
  return "flex";
};

const TabsNavigation = () => {
  return (
    <Tabs.Navigator
      activeColor="red"
      inactiveColor="white"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "black",
        },
      }}
    >
      <Tabs.Screen
        name="DashboardTab"
        component={DashboardScreen}
        options={({ route }) => ({
          //tabBarStyle: { display: getTabBarVisibility(route) },
          // tabBarLabel: TabArr[0].label,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <Image source={require("../assets/icons/chart.png")} />
              </View>
            );
          },
        })}
      />
      <Tabs.Screen
        name="ArtworkTab"
        component={ArtworkStack}
        options={({ route }) => ({
          //tabBarStyle: { },
          // tabBarLabel: TabArr[1].label,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <Image source={require("../assets/icons/designtools.png")} />
              </View>
            );
          },
        })}
      />
      <Tabs.Screen
        name="NotificationTab"
        component={NotificationStack}
        options={{
          // tabBarLabel: TabArr[2].label,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <Image
                  source={require("../assets/icons/notification-status.png")}
                />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="ExhibitionTab"
        component={ExhibitionStack}
        options={{
          // tabBarLabel: TabArr[3].label,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <Image source={require("../assets/icons/shop.png")} />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{
          // tabBarLabel: TabArr[3].label,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <Image source={require("../assets/icons/profile-circle.png")} />
              </View>
            );
          },
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabsNavigation;
