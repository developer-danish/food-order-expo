import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  ScrollView,
  useColorScheme,
} from 'react-native';
import { Carousal } from '../components/Carousal';
import { Products } from '../components/product/Products';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useNavigation } from '@react-navigation/native';
import { LoginPage } from './Login';

const Tab = createBottomTabNavigator();

export const Homepage = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Carousal />
        <Products />
      </ScrollView>
    </>
  );
};