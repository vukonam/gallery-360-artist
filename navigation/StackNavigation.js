import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//import SplashScreen from "./SplashScreen";
import Onboarding from "./screens/OnBording/completeScreen";
import LoginComponent from "./screens/SignIn/SignIn";
import SignUp from "./screens/SignUp/signUp";
import Profile from "./screens/SignUp/Profile";
import Signature from "./screens/SignUp/signature";
import Artwork from "./screens/SignUp/ArtWork";
import Payment from "./screens/SignUp/Payment";

const Stack = createStackNavigator();

const SigningIn = () => {
  // const [showOnboarding, setShowOnboarding] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Onboarding"
      >
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Login" component={LoginComponent} />
        <Stack.Screen name="Signup" component={SignUp} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Artwork" component={Artwork} />
        <Stack.Screen name="Signature" component={Signature} />
        <Stack.Screen name="Payment" component={Payment} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

//export default App;

//const Stack = createNativeStackNavigator();
// const MainStack = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{ headerShown: false }}
//       initialRouteName="StartUp"
//     >
//       <Stack.Screen name="StartUp" component={StartUpScreen} />
//       <Stack.Screen name="Tabs" component={TabsNavigation} />
//     </Stack.Navigator>
//   );
// };

// const ProductStack = () => {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Home" component={HomeScreen} />
//       <Stack.Screen name="Details" component={ProductDetailsScreen} />
//       <Stack.Screen name="CheckoutProduct" component={CheckoutScreen} />
//       <Stack.Screen name="PaymentProduct" component={PaymentScreen} />
//     </Stack.Navigator>
//   );
// };

// const CartStack = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Cart" component={CartScreen} />
//       <Stack.Screen name="CheckoutCart" component={CheckoutScreen} />
//       <Stack.Screen name="PaymentCart" component={PaymentScreen} />
//     </Stack.Navigator>
//   );
// };

// export { SigningIn, ProductStack, CartStack };
