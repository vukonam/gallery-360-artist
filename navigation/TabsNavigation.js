import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import {
  ArtworkStack,
  NotificationStack,
  ExhibitionStack,
  ProfileStack,
  DashboardStack,
} from "./StackNavigation";
import { View, Image } from "react-native";
//import DashboardScreen from "../screens/Tabs/Dashboard";

const Tabs = createBottomTabNavigator();

const TabIcon = ({ focused, selected, icon, highlightedIcon }) => {
  const iconSource = selected || focused ? highlightedIcon : icon;

  return (
    <View>
      <Image source={iconSource} />
    </View>
  );
};

export { TabIcon };

const TabsNavigation = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const tabsConfig = [
    {
      label: "DashboardTab",
      icon: require("../assets/icons/chart.png"),
      highlightedIcon: require("../assets/icons/high-lighted/chart.png"),
      component: DashboardStack,
    },
    {
      label: "ArtworkTab",
      icon: require("../assets/icons/designtools.png"),
      highlightedIcon: require("../assets/icons/high-lighted/designtools.png"),
      component: ArtworkStack,
    },
    {
      label: "NotificationTab",
      icon: require("../assets/icons/notification-status.png"),
      highlightedIcon: require("../assets/icons/high-lighted/notification-status.png"),
      component: NotificationStack,
    },
    {
      label: "ExhibitionTab",
      icon: require("../assets/icons/shop.png"),
      highlightedIcon: require("../assets/icons/high-lighted/shop.png"),
      component: ExhibitionStack,
    },
    {
      label: "ProfileTab",
      icon: require("../assets/icons/profile-circle.png"),
      highlightedIcon: require("../assets/icons/high-lighted/profile-circle.png"),
      component: ProfileStack,
    },
  ];

  const getTabBarVisibility = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName?.includes("Checkout") || routeName?.includes("Payment")) {
      return "none";
    }
    return "flex";
  };

  const isTabSelected = (tabIndex) => {
    return selectedTabIndex === tabIndex;
  };

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
      {tabsConfig.map((tab, index) => (
        <Tabs.Screen
          key={index}
          name={tab.label}
          component={tab.component}
          options={({ route }) => ({
            tabBarShowLabel: false,
            tabBarIcon: ({ focused, color, size }) => (
              <TabIcon
                focused={focused}
                selected={isTabSelected(index)}
                icon={tab.icon}
                highlightedIcon={tab.highlightedIcon}
              />
            ),
          })}
          listeners={{
            tabPress: () => {
              setSelectedTabIndex(index);
            },
          }}
        />
      ))}
    </Tabs.Navigator>
  );
};

export default TabsNavigation;
