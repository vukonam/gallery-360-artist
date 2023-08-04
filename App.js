import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//import SplashScreen from "./SplashScreen";
import Onboarding from "./screens/OnBording/completeScreen";
import LoginComponent from "./screens/SignIn/SignIn";

const Stack = createStackNavigator();

const App = () => {
  // const [showOnboarding, setShowOnboarding] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Onboarding"
      >
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Login" component={LoginComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
