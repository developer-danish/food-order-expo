import React, { useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import { apiObject } from '../api/auth';
import { showLoading } from './../helpers/loading';
import { showErrorMsg } from './../helpers/message';
import { useEffect } from 'react';
import { isAuthenticated } from '../helpers/auth';
import { setAuthentication } from './../helpers/auth';
import { getToken } from '../helpers/cookies';
import { getLocalStorage } from '../helpers/localStorage';

export const LoginPage = ({ navigation }) => {
  // const isDarkMode = useColorScheme() === 'dark';

  const [data, setData] = useState({
    email: '',
    password: '',
    errorMsg: false,
    loading: false,
    check_textInputChange: false,
    secureTextEntry: true
  });
  const { email, password, errorMsg, loading } = data;

  useEffect(() => {
    if (isAuthenticated()) {
      navigation.navigate('Home');
    }
  }, []);

  // const changeText = (name, val) => {
  //   if (val.length !== 0) {
  //     setData({
  //       ...data,
  //       [name]: val,
  //       check_textInputChange: true
  //     })
  //   } else {
  //     setData({
  //       ...data,
  //       [name]: val,
  //       check_textInputChange: false
  //     })
  //   }
  // }

  const textInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        email: val,
        errorMsg: "",
        loading: false,
        check_textInputChange: true
      })
    } else {
      setData({
        ...data,
        email: val,
        errorMsg: "",
        loading: false,
        check_textInputChange: false
      })
    }
  }

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
      errorMsg: "",
      loading: false
    })
  }

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    })
  }

  const submitData = (e) => {
    if (!isEmail(email) || isEmpty(password)) {
      // alert("Please Insert Correct Data");
      setData({ ...data, errorMsg: "Please Insert Correct Data" });
    }
    else {
      const formData = { email, password };
      setData({ ...data, loading: true });
      apiObject.signin(formData)
        .then(async (response) => {
          // const resData = response.json()
          setData({
            email: "",
            password: "",
            errorMsg: "",
            loading: false
          })
          console.log(response.data.token);
          console.log(response.data.user);
          // set cookies here
          setAuthentication(response.data.token, response.data.user);
          const tokn = await getToken()
          console.log("token -------> ", tokn);
        })
        .catch((err) => {
          setData({
            ...data,
            errorMsg: err.response.data.errorMessage,
            loading: false
          })

        })
    }
    console.log(data);
  }

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? '#009387' : Colors.lighter,
  };
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={backgroundStyle}>
      <View style={styles.container}>
        <View style={styles.header}>
          {loading && showLoading()}
          {errorMsg && showErrorMsg(errorMsg)}
        </View>
        <Animatable.View animation='fadeInUpBig' style={styles.footer}>
          <Text style={styles.text_footer}>Email</Text>
          <View style={styles.action}>
            <FontAwesome name='user-o' color='#05375a' size={20} />
            {/* <TextInput value={data.email} name="email" placeholder='Your Email' onChangeText={(val) => changeText("email", val)} style={styles.textInput} autoCapitalize='none' /> */}
            <TextInput placeholder='Your Email' value={email} onChangeText={(val) => textInputChange(val)} style={styles.textInput} autoCapitalize='none' />
            {
              data.check_textInputChange ? (
                <Feather name='check-circle' color='green' size={20} />
              ) : null
            }
          </View>

          <Text style={[styles.text_footer, { marginTop: 35 }]}>Password</Text>
          <View style={styles.action}>
            <FontAwesome name='lock' color='#05375a' size={20} />
            {/* <TextInput value={data.password} name="password" placeholder='Your Password' onChangeText={(val) => changeText("password", val)} secureTextEntry={data.secureTextEntry} style={styles.textInput} autoCapitalize='none' /> */}
            <TextInput placeholder='Your Password' value={password} onChangeText={(val) => handlePasswordChange(val)} secureTextEntry={data.secureTextEntry} style={styles.textInput} autoCapitalize='none' />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {
                data.secureTextEntry ? (
                  <Feather name='eye-off' color='gray' size={20} />
                ) : (
                  <Feather name='eye' color='gray' size={20} />
                )
              }
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={submitData} style={styles.signIn}>
              <Text style={styles.textSign}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Register")} style={[styles.signIn, { marginTop: 15, backgroundColor: '#fff', borderColor: '#009387' }]}>
              <Text style={[styles.textSign, { color: '#009387' }]}>Sign Up</Text>
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
    backgroundColor: '#009387'
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingBottom: 100,
    paddingTop: 10
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -10,
    paddingLeft: 10,
    color: '#05375a'
  },
  button: {
    alignItems: 'center',
    marginTop: 50
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#009387'
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  }
})