import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInputBase,
  TextInput,
  Button,
} from "react-native";
import React, { useState } from "react";
import RadioGroup from "react-native-radio-buttons-group";
import { apiObject } from "./../api/auth";

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

  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
  }

  const paymentSubmit = () => {
    const data = {
      shippingAddress: {
        address: "danish.........",
        address2: "lalpora",
        city: "Srinagar",
        state: "Jammu and Kashmir",
        phone: "06005203360",
      },
      cart: [
        {
          _id: "639eb8bc1d458ead0bdf9f2a",
          fileName: "1671346364977.jpg",
          productName: "Burger",
          productDesc: "Delicious Food",
          productCategory: "62ff2c5c0e681cda4b03c524",
          productQuantity: 12,
          productPrice: 2,
          createdAt: "2022-12-18T06:52:45.009Z",
          updatedAt: "2022-12-18T06:52:45.009Z",
          __v: 0,
          count: 10,
        },
      ],
      paymentMethod: "POD",
      user: { _id: "63333e15df7678d1e1224fad" },
    };
    apiObject
      .post("api/order", data)
      .then(async (response) => {
        navigation.navigate("Orders");
      })
      .catch((err) => {
        console.log(err);
      });
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
