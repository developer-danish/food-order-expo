import { View, Text, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import React, { useEffect } from "react";
import { Homepage } from "./../pages/Home";
import { LoginPage } from "./../pages/Login";
import { RegisterPage } from "./../pages/RegisterPage";
import { CartPage } from "./../pages/Cart";
import { OrdersPage } from "./../pages/Orders";
import { AuthNavigation } from "./AuthNavigation";

import { getToken } from "../helpers/cookies";
import { Profile } from "../pages/Profile";

const Tab = createBottomTabNavigator();

export const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#ffc739",
        },
        headerRight: () => (
          <Image
            style={{ width: 50, height: 50 }}
            source={require("../assets/logo.png")}
          />
        ),
        tabBarIconStyle: {
          display: "none",
        },
        tabBarLabelPosition: "beside-icon",
        tabBarLabelStyle: {
          fontWeight: "700",
          fontSize: 15,
        },
      }}
    >
      <Tab.Screen name="Home" component={Homepage} />
      <Tab.Screen name="Cart" component={CartPage} />
      <Tab.Screen name="Orders" component={OrdersPage} />
      <Tab.Screen
        name={getToken() ? "Profile" : "Login"}
        component={getToken() ? Profile : AuthNavigation}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};
