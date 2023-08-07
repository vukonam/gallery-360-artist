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
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="DashboardTab"
        component={DashboardScreen}
        options={({ route }) => ({
          tabBarStyle: { display: getTabBarVisibility(route) },
          // tabBarLabel: TabArr[0].label,
          tabBarShowLabel: false,
        })}
      />
      <Tabs.Screen
        name="ArtworkTab"
        component={ArtworkStack}
        options={({ route }) => ({
          tabBarStyle: { display: getTabBarVisibility(route) },
          // tabBarLabel: TabArr[1].label,
          tabBarShowLabel: false,
        })}
      />
      <Tabs.Screen
        name="NotificationTab"
        component={NotificationStack}
        options={{
          // tabBarLabel: TabArr[2].label,
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="ExhibitionTab"
        component={ExhibitionStack}
        options={{
          // tabBarLabel: TabArr[3].label,
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{
          // tabBarLabel: TabArr[3].label,
          tabBarShowLabel: false,
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabsNavigation;
