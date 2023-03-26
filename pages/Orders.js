import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
// import type { Node } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  ordersRow: {
    flexDirection: "row",
  },
  headerRowItem: {
    flex: .25,
    padding: 8
  },
  headerTitle: {
    fontWeight: "700",
    color: "#000"
  },
  orderImage: {
    height: 50,
    width: 80,
    borderRadius: 4
  }
});

const OrderRow = ({ order }) => {
  return (
    <View style={styles.ordersRow}>
      <View style={styles.headerRowItem}>
        <Image style={styles.orderImage} source={order.image} />
      </View>
      <View style={styles.headerRowItem}>
        <Text >{order.title}</Text>
      </View>
      <View style={styles.headerRowItem}>
        <Text >$ {order.price}</Text>
      </View>
      <View style={styles.headerRowItem}>
        <Text >{order.status}</Text>
      </View>
    </View>
  );
}
const orders = [
  {
    title: "Product name 1",
    image: require("../assets/foodnew.jpeg"),
    status: "Pending",
    price: "3"
  },
  {
    title: "Product name 2",
    image: require("../assets/foodnew.jpeg"),
    status: "Pending",
    price: "3"
  }
]

export const OrdersPage = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={backgroundStyle}>
      <View style={styles.ordersRow}>
        <View style={styles.headerRowItem}>
          <Text style={styles.headerTitle}>Image</Text>
        </View>
        <View style={styles.headerRowItem}>
          <Text style={styles.headerTitle}>Product</Text>
        </View>
        <View style={styles.headerRowItem}>
          <Text style={styles.headerTitle}>Price</Text>
        </View>
        <View style={styles.headerRowItem}>
          <Text style={styles.headerTitle}>Status</Text>
        </View>
      </View>
      {orders.map((order, index) => <OrderRow key={index} order={order} />)}
    </ScrollView>
  );
};