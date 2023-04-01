import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { useState } from "react";
import isEmpty from "validator/lib/isEmpty";
import { showErrorMsg } from "./../helpers/message";
import { useIsFocused } from "@react-navigation/native";
import { getLocalStorage, setLocalStorage } from "../helpers/localStorage";

export const Shipping = ({ navigation }) => {
  const [data, setData] = useState({
    address: "",
    address2: "",
    city: "",
    state: "",
    phone: "",
    errorMsg: false,
  });

  const loadShippingData = async () => {
    let data = await getLocalStorage("address");
    console.log(data);
    if (data) {
      setData(data);
    } else {
      setData({
        address: "",
        address2: "",
        city: "",
        state: "",
        phone: "",
        errorMsg: "",
      });
    }
  };

  useEffect(() => {
    loadShippingData();
  }, []);

  const { address, address2, city, state, phone, errorMsg } = data;

  const textChange = (name, val) => {
    setData({
      ...data,
      errorMsg: "",
      [name]: val,
    });
  };

  const confirmOrder = () => {
    console.log(data);
    if (
      isEmpty(address) ||
      isEmpty(address2) ||
      isEmpty(city) ||
      isEmpty(state) ||
      isEmpty(phone)
    ) {
      setData({
        ...data,
        errorMsg: "All fields are required",
      });
    } else {
      setLocalStorage("address", data);
      setData({
        address: "",
        address2: "",
        city: "",
        state: "",
        phone: "",
        errorMsg: "",
      });

      navigation.navigate("Payment");
    }
  };
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={styles.container}>
        <View style={styles.header}>{errorMsg && showErrorMsg(errorMsg)}</View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <Text style={styles.text_footer}>Address</Text>
          <View style={styles.action}>
            <FontAwesome name="address-book" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Address"
              value={address}
              onChangeText={(val) => textChange("address", val)}
              style={styles.textInput}
              autoCapitalize="none"
            />
          </View>

          <Text style={[styles.text_footer, { marginTop: 20 }]}>Address 2</Text>
          <View style={styles.action}>
            <FontAwesome name="address-book" color="#05375a" size={20} />
            <TextInput
              placeholder="Apartment number etc"
              value={address2}
              onChangeText={(val) => textChange("address2", val)}
              style={styles.textInput}
              autoCapitalize="none"
            />
          </View>

          <Text style={[styles.text_footer, { marginTop: 20 }]}>City</Text>
          <View style={styles.action}>
            <FontAwesome name="home" color="#05375a" size={20} />
            <TextInput
              placeholder="Your City"
              value={city}
              onChangeText={(val) => textChange("city", val)}
              style={styles.textInput}
              autoCapitalize="none"
            />
          </View>

          <Text style={[styles.text_footer, { marginTop: 20 }]}>State</Text>
          <View style={styles.action}>
            <FontAwesome name="flag" color="#05375a" size={20} />
            <TextInput
              placeholder="Your State"
              value={state}
              onChangeText={(val) => textChange("state", val)}
              style={styles.textInput}
              autoCapitalize="none"
            />
          </View>

          <Text style={[styles.text_footer, { marginTop: 20 }]}>Phone</Text>
          <View style={styles.action}>
            <FontAwesome name="phone" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Number"
              value={phone}
              onChangeText={(val) => textChange("phone", val)}
              style={styles.textInput}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.button}>
            <TouchableOpacity onPress={confirmOrder} style={styles.signIn}>
              <Text style={styles.textSign}>Confirm Order</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffc739",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    paddingBottom: 60,
    paddingTop: 10,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -10,
    paddingLeft: 10,
    color: "#05375a",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#ffc739",
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
