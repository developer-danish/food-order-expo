import React, { useEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import * as Animatable from "react-native-animatable";
import { apiObject } from "./../api/auth";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import equals from "validator/lib/equals";
import { showErrorMsg, showSuccessMsg } from "./../helpers/message";
import { showLoading } from "./../helpers/loading";
import { isAuthenticated } from "../helpers/auth";

export const RegisterPage = ({ navigation }) => {
  // const isDarkMode = useColorScheme() === 'dark';

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    successMsg: false,
    errorMsg: false,
    loading: false,
    check_textInputChange: false,
    check_textNameChange: false,
    secureTextEntry: true,
    confirmSecureTextEntry: true,
  });
  const {
    username,
    email,
    password,
    confirm_password,
    successMsg,
    errorMsg,
    loading,
  } = data;

  useEffect(() => {
    if (isAuthenticated()) {
      //For admin
      navigation.navigate("Shop", { screen: "Shop" });
    }
  }, []);

  const textInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
        errorMsg: "",
        successMsg: "",
        loading: false,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
        errorMsg: "",
        successMsg: "",
        loading: false,
      });
    }
  };

  const textNameChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        username: val,
        check_textNameChange: true,
        errorMsg: "",
        successMsg: "",
        loading: false,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textNameChange: false,
        errorMsg: "",
        successMsg: "",
        loading: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
      errorMsg: "",
      successMsg: "",
      loading: false,
    });
  };

  const handleConfirmPasswordChange = (val) => {
    setData({
      ...data,
      confirm_password: val,
      errorMsg: "",
      successMsg: "",
      loading: false,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirmSecureTextEntry: !data.confirmSecureTextEntry,
    });
  };

  const submitData = () => {
    if (
      isEmpty(username) ||
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(confirm_password)
    ) {
      setData({ ...data, errorMsg: "All fields are required" });
    } else if (!isEmail(email)) {
      setData({ ...data, errorMsg: "Please enter a valid email" });
    } else if (!equals(password, confirm_password)) {
      setData({ ...data, errorMsg: "Passwords does not match" });
    } else {
      // const { username, email, password } = data;
      const formData = { username, email, password };
      setData({ ...data, loading: true });
      //sending data to server
      apiObject
        .signup(formData)
        .then((response) => {
          setData({
            username: "",
            email: "",
            password: "",
            confirm_password: "",
            loading: false,
            successMsg: response.data.successMessage,
          });
        })
        .catch((err) => {
          console.log("signup error", err);
          setData({
            ...data,
            loading: false,
            errorMsg: err.response.data.errorMessage,
          });
        });
    }
  };

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? '#009387' : Colors.lighter,
  };
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={backgroundStyle}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          {errorMsg && showErrorMsg(errorMsg)}
          {successMsg && showSuccessMsg(successMsg)}
          {loading && showLoading()}
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <Text style={styles.text_footer}>Name</Text>
          <View style={styles.action}>
            <FontAwesome name="user" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Name"
              value={username}
              onChangeText={(val) => textNameChange(val)}
              style={styles.textInput}
              autoCapitalize="none"
            />
            {data.check_textNameChange ? (
              <Feather name="check-circle" color="green" size={20} />
            ) : null}
          </View>

          <Text style={[styles.text_footer, { marginTop: 20 }]}>Email</Text>
          <View style={styles.action}>
            <FontAwesome name="envelope" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Email"
              value={email}
              onChangeText={(val) => textInputChange(val)}
              style={styles.textInput}
              autoCapitalize="none"
            />
            {data.check_textInputChange ? (
              <Feather name="check-circle" color="green" size={20} />
            ) : null}
          </View>

          <Text style={[styles.text_footer, { marginTop: 20 }]}>Password</Text>
          <View style={styles.action}>
            <FontAwesome name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Password"
              value={password}
              onChangeText={(val) => handlePasswordChange(val)}
              secureTextEntry={data.secureTextEntry}
              style={styles.textInput}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="gray" size={20} />
              ) : (
                <Feather name="eye" color="gray" size={20} />
              )}
            </TouchableOpacity>
          </View>

          <Text style={[styles.text_footer, { marginTop: 20 }]}>
            Confirm Password
          </Text>
          <View style={styles.action}>
            <FontAwesome name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Password"
              value={confirm_password}
              onChangeText={(val) => handleConfirmPasswordChange(val)}
              secureTextEntry={data.confirmSecureTextEntry}
              style={styles.textInput}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
              {data.confirmSecureTextEntry ? (
                <Feather name="eye-off" color="gray" size={20} />
              ) : (
                <Feather name="eye" color="gray" size={20} />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.button}>
            <TouchableOpacity onPress={submitData} style={styles.signIn}>
              <Text style={styles.textSign}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[
                styles.signIn,
                {
                  marginTop: 15,
                  backgroundColor: "#fff",
                  borderColor: "#ffc739",
                },
              ]}
            >
              <Text style={[styles.textSign, { color: "#ffc739" }]}>
                Sign In
              </Text>
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
    paddingBottom: 40,
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
