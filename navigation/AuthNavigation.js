import { View, Text, Image } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { RegisterPage } from './../pages/RegisterPage';
import { LoginPage } from './../pages/Login';
import { Shipping } from '../pages/Shipping';

const Stack = createStackNavigator();

export const AuthNavigation = () => {
    return (
        <Stack.Navigator
            // initialRouteName='Login'
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#ffc739',
                },
                headerRight: () => (
                    <Image style={{ width: 50, height: 50 }} source={require("../assets/logo.png")} />
                )
            }}
        >
            <Stack.Screen name="LoginPage" component={LoginPage} />
            <Stack.Screen name="Register" component={RegisterPage} />
            <Stack.Screen name="Shipping" component={Shipping} />
        </Stack.Navigator>
    )
}
