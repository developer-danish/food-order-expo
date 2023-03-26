import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  footerItem: {
    backgroundColor: "white",
    flex: 0.25,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  menuitem: {
    fontWeight: "500",
    color: "grey",
  },
  menuitemSelected: {
    fontWeight: "700",
    color: "#000",
  }
});

export const Footer = ({ selectedMenu, onMenuChange }) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
      style={{
        flexDirection: "row",
        height: 60,
        padding: 0
      }}
    >
      <View style={styles.footerItem}  >
        <TouchableHighlight onPress={() => { onMenuChange("home") }} >
          <Text style={selectedMenu == "home" ? styles.menuitemSelected : styles.menuitem}>Home</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.footerItem} >
        <TouchableHighlight onPress={() => { onMenuChange("orders") }} >
          <Text style={selectedMenu == "orders" ? styles.menuitemSelected : styles.menuitem}>Orders</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.footerItem} >
        <TouchableHighlight onPress={() => { onMenuChange("cart") }} >
          <Text style={selectedMenu == "cart" ? styles.menuitemSelected : styles.menuitem}>Cart</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.footerItem}>
        <TouchableHighlight onPress={() => { onMenuChange("login") }} >
          <Text style={selectedMenu == "login" ? styles.menuitemSelected : styles.menuitem}>Login</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};