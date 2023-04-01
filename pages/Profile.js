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
import { useIsFocused } from "@react-navigation/native";

export const Profile = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const loadData = async () => {
    let data = await isAuthenticated();
    console.log(data);
    setIsLogin(!!data);
    if (!!data) {
      setUser(data);
    }
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) loadData();
  }, [isFocused]);
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.orderImage}
            source={require("../assets/person.jpg")}
          />
        </View>

        <Text style={styles.name}>Welcome {user && user.username}</Text>
        <Text style={styles.name}>Email: {user && user.email}</Text>
      </View>
      <View style={styles.button}>
        <TouchableOpacity
          onPress={() => {
            deleteToken();
            deleteLocalStorage("user");
            navigation.navigate("Home");
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
    flex: 1,
    paddingVertical: 50,
    justifyContent: "space-between",
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: 50,
  },
  orderImage: {
    width: 100,
    height: 100,
    alignSelf: "center",
    borderRadius: 50,
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
  name: {
    fontSize: 20,
    paddingHorizontal: 50,
    paddingVertical: 4,
  },
});
