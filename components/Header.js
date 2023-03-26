import React, { useLayoutEffect } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: "#ffc739", flex: 0.5, justifyContent: "center", alignItems: "flex-start", padding: 8,
  },
  title: {
    fontWeight: "700",
    color: "#000",
    textTransform: 'capitalize'
  },
  logoContainer: {
    backgroundColor: "#ffc739", flex: 0.5, justifyContent: "center", alignItems: "flex-end", padding: 8
  },
  logo: {
    width: 50,
    height: 50
  }
});

export const Header = ({ title }) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
      style={{
        flexDirection: "row",
        height: 60,
        padding: 0
      }}
    >
      <View style={styles.titleContainer} >
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
      </View>
    </View>
  );
};