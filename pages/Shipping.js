import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useState } from 'react';

export const Shipping = () => {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    successMsg: false,
    errorMsg: false,
    loading: false,
    check_textInputChange: false,
    check_textNameChange: false,
    secureTextEntry: true,
    confirmSecureTextEntry: true
  });
  const {username, email, password, confirm_password, successMsg, errorMsg, loading} = data;
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic">
      <View style={styles.container}>
        <View style={styles.header}>
          {/* {errorMsg && showErrorMsg(errorMsg)}
          {successMsg && showSuccessMsg(successMsg)}
          {loading && showLoading()} */}
        </View>
        <Animatable.View animation='fadeInUpBig' style={styles.footer}>
          <Text style={styles.text_footer}>Address</Text>
          <View style={styles.action}>
            <FontAwesome name='address' color='#05375a' size={20} />
            <TextInput placeholder='Your Name' value={username} onChangeText={(val) => textNameChange(val)} style={styles.textInput} autoCapitalize='none' />
            {/* {
              data.check_textNameChange ? (
                <Feather name='check-circle' color='green' size={20} />
              ) : null
            } */}
          </View>

          <Text style={[styles.text_footer, { marginTop: 20 }]}>Address 2</Text>
          <View style={styles.action}>
            <FontAwesome name='envelope' color='#05375a' size={20} />
            <TextInput placeholder='Your Email' value={email} onChangeText={(val) => textInputChange(val)} style={styles.textInput} autoCapitalize='none' />
            {/* {
              data.check_textInputChange ? (
                <Feather name='check-circle' color='green' size={20} />
              ) : null
            } */}
          </View>

          <Text style={[styles.text_footer, { marginTop: 20 }]}>City</Text>
          <View style={styles.action}>
            <FontAwesome name='lock' color='#05375a' size={20} />
            <TextInput placeholder='Your Password' value={password} onChangeText={(val) => handlePasswordChange(val)} secureTextEntry={data.secureTextEntry} style={styles.textInput} autoCapitalize='none' />
            {/* <TouchableOpacity onPress={updateSecureTextEntry}>
              {
                data.secureTextEntry ? (
                  <Feather name='eye-off' color='gray' size={20} />
                ) : (
                  <Feather name='eye' color='gray' size={20} />
                )
              }
            </TouchableOpacity> */}
          </View>

          <Text style={[styles.text_footer, { marginTop: 20 }]}>State</Text>
          <View style={styles.action}>
            <FontAwesome name='lock' color='#05375a' size={20} />
            <TextInput placeholder='Your Password' value={confirm_password} onChangeText={(val) => handleConfirmPasswordChange(val)} secureTextEntry={data.confirmSecureTextEntry} style={styles.textInput} autoCapitalize='none' />
            {/* <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
              {
                data.confirmSecureTextEntry ? (
                  <Feather name='eye-off' color='gray' size={20} />
                ) : (
                  <Feather name='eye' color='gray' size={20} />
                )
              }
            </TouchableOpacity> */}
          </View>

          <Text style={[styles.text_footer, { marginTop: 20 }]}>Phone</Text>
          <View style={styles.action}>
            <FontAwesome name='lock' color='#05375a' size={20} />
            <TextInput placeholder='Your Password' value={confirm_password} onChangeText={(val) => handleConfirmPasswordChange(val)} secureTextEntry={data.confirmSecureTextEntry} style={styles.textInput} autoCapitalize='none' />
            {/* <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
              {
                data.confirmSecureTextEntry ? (
                  <Feather name='eye-off' color='gray' size={20} />
                ) : (
                  <Feather name='eye' color='gray' size={20} />
                )
              }
            </TouchableOpacity> */}
          </View>

          <View style={styles.button}>
            {/* <TouchableOpacity onPress={submitData} style={styles.signIn}>
              <Text style={styles.textSign}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.signIn, { marginTop: 15, backgroundColor: '#fff', borderColor: '#009387' }]}>
              <Text style={[styles.textSign, { color: '#009387' }]}>Sign In</Text>
            </TouchableOpacity> */}
          </View>
        </Animatable.View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingBottom: 40,
    paddingTop: 10
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
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