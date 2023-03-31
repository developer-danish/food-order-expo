import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInputBase,
  TextInput,
  Button,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "react-native-elements";

import { deleteToken, getToken } from "../helpers/cookies";
import { isAuthenticated, logout, setAuthentication } from "../helpers/auth";
import {
  deleteLocalStorage,
  deleteLocalStorageUser,
  getLocalStorage,
} from "../helpers/localStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Profile = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(false);
  const loadData = async () => {
    let data = await isAuthenticated();
    setIsLogin(!!data);
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <View style={styles.container}>
      <Text>{"fdf"}</Text>
      <View style={styles.button}>
        <TouchableOpacity
          onPress={() => {
            deleteToken();
            deleteLocalStorage("user");
            // navigation.navigate("Orders");
          }}
          style={styles.signIn}
        >
          <Text style={styles.textSign}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // paddingTop: 50,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "90%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#ffc739",
    borderColor: "#000",
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  label: {},
});
