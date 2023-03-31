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

export const Payment = ({ navigation }) => {
  const [radioButtons, setRadioButtons] = useState([
    {
      id: "1", // acts as primary key, should be unique and non-empty string
      label: "Debit Card",
      value: "0",
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
      value: "1",
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
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <RadioGroup radioButtons={radioButtons} onPress={onPressRadioButton} />

        <TouchableOpacity
          onPress={() => navigation.navigate("Orders")}
          style={styles.signIn}
        >
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
