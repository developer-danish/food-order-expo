import { View, Text, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import React, { useEffect, useState } from "react";
import { Homepage } from "./../pages/Home";
import { LoginPage } from "./../pages/Login";
import { RegisterPage } from "./../pages/RegisterPage";
import { CartPage } from "./../pages/Cart";
import { OrdersPage } from "./../pages/Orders";
import { AuthNavigation } from "./AuthNavigation";

import { getToken } from "../helpers/cookies";
import { Profile } from "../pages/Profile";
import { Shop } from "../pages/Shop";
import { getLocalStorage } from "../helpers/localStorage";

const Tab = createBottomTabNavigator();

export const BottomTabNavigation = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [cart, setCart] = useState([]);
  const loadToken = async () => {
    const token = await getToken();
    const cart = await getLocalStorage("cart");
    console.log(cart);
    setCart(cart);
    setIsLogin(!!token);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("state", () => {
      loadToken();
    });

    return unsubscribe;
  }, [navigation]);

  const checkLogin = () => {
    loadToken();
  };
  const getoptions = () => {
    return {
      title: cart.length > 0 ? "Cart(" + cart.length + ")" : "Cart",
      tabBarBadgeStyle: { color: "red" },
      tabBarBadge: 5,
    };
  };

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
      <Tab.Screen
        name="Home"
        component={Homepage}
        listeners={{
          tabPress: checkLogin,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Shop}
        listeners={{
          tabPress: checkLogin,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartPage}
        listeners={{
          tabPress: checkLogin,
        }}
        options={{
          title: cart.length > 0 ? "Cart(" + cart.length + ")" : "Cart",
          tabBarBadgeStyle: { color: "red" },
          tabBarBadge: 5,
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersPage}
        listeners={{
          tabPress: checkLogin,
        }}
      />
      <Tab.Screen
        name={isLogin ? "Profile" : "Login"}
        component={isLogin ? Profile : AuthNavigation}
        options={{ headerShown: isLogin }}
        listeners={{
          tabPress: checkLogin,
        }}
      />
    </Tab.Navigator>
  );
};
