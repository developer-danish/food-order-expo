import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInputBase,
  TextInput,
  Button,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import RadioGroup from "react-native-radio-buttons-group";
import { apiObject } from "./../api/auth";
import { useIsFocused } from "@react-navigation/native";
import { getLocalStorage, setLocalStorage } from "../helpers/localStorage";

export const Payment = ({ navigation }) => {
  const [radioButtons, setRadioButtons] = useState([
    {
      id: "1", // acts as primary key, should be unique and non-empty string
      label: "Debit Card",
      value: "DC",
      disabled: true,
      containerStyle: {
        display: "flex",
        justifyContent: "space-around",
        width: "100%",
        paddingLeft: 20,
        marginBottom: 20,
      },
    },
    {
      id: "2",
      label: "Pay on Delivery",
      value: "POD",
      selected: true,
      containerStyle: {
        display: "flex",
        justifyContent: "space-around",
        width: "100%",
        paddingLeft: 25,
        marginBottom: 20,
      },
    },
  ]);
  const [paymentData, setPaymentData] = useState({ paymentMethod: "POD" });

  useEffect(() => {
    loadPaymentData();
  }, []);

  const loadPaymentData = async () => {
    let payment = {};
    let address = await getLocalStorage("address");
    let cart = await getLocalStorage("cart");
    let user = await getLocalStorage("user");
    if (address) {
      payment = { ...payment, shippingAddress: address };
    }
    if (cart) {
      cart = [].concat(
        cart.map((item) => {
          return { ...item, count: item.productQuantity };
        })
      );
      payment = { ...payment, cart: cart };
    }
    if (user) {
      payment = { ...payment, user: user };
    }
    setPaymentData({ ...paymentData, ...payment });
  };

  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
  }

  const paymentSubmit = () => {
    let payData = { ...paymentData };
    delete payData.shippingAddress.errorMsg;
    apiObject
      .post("api/order", payData)
      .then(async (response) => {
        setLocalStorage("cart", []);
        navigation.navigate("Orders");
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(payData);
  };
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <RadioGroup radioButtons={radioButtons} onPress={onPressRadioButton} />

        <TouchableOpacity onPress={() => paymentSubmit()} style={styles.signIn}>
          <Text style={styles.textSign}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
    justifyContent: "space-between",
    height: Dimensions.get("window").height * 0.7,
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
