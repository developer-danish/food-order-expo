import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInputBase,
  TextInput,
  Button,
} from "react-native";
import React from "react";

export const Payment = () => {
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <TouchableOpacity disabled style={styles.signIn}>
          <Text style={styles.textSign}>Debit Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.signIn,
            {
              marginTop: 15,
              backgroundColor: "#ffc739",
              borderColor: "#ffc739",
            },
          ]}
        >
          <Text style={[styles.textSign, { color: "#fff" }]}>
            Pay on Delivery
          </Text>
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
    width: "95%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderColor: "#ffc739",
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffc739",
  },
});
