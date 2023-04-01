import React from "react";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
// import type { Node } from 'react';
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useEffect } from "react";
import { apiObject } from "./../api/auth";
import { getLocalStorage } from "../helpers/localStorage";
import { BaseImageUrl } from "../helpers/Constants";
import { useIsFocused } from "@react-navigation/native";

const styles = StyleSheet.create({
  ordersRow: {
    flexDirection: "row",
  },
  headerRowItem: {
    flex: 0.25,
    padding: 8,
  },
  headerTitle: {
    fontWeight: "700",
    color: "#000",
  },
  orderImage: {
    height: 50,
    width: 80,
    borderRadius: 4,
  },
});

const OrderRow = ({ order }) => {
  return (
    <View style={styles.ordersRow}>
      <View style={styles.headerRowItem}>
        {order && (
          <Image
            style={styles.orderImage}
            source={{ uri: BaseImageUrl + order.orderdProducts[0].fileName }}
          />
        )}
      </View>
      <View style={styles.headerRowItem}>
        <Text>
          {order.orderdProducts.map(
            (product) =>
              product.productName + "(" + product.productQuantity + ")\n"
          )}
        </Text>
      </View>
      <View style={styles.headerRowItem}>
        <Text>
          ${" "}
          {order.orderdProducts
            .map((product) => product.productQuantity * product.productPrice)
            .reduce((sum, item) => sum + item)}
        </Text>
      </View>
      <View style={styles.headerRowItem}>
        <Text>{order.orderStatus}</Text>
      </View>
    </View>
  );
};
// const orders = [
//   {
//     title: "Product name 1",
//     image: require("../assets/foodnew.jpeg"),
//     status: "Pending",
//     price: "3",
//   },
//   {
//     title: "Product name 2",
//     image: require("../assets/foodnew.jpeg"),
//     status: "Pending",
//     price: "3",
//   },
// ];

export const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    const user = await getLocalStorage("user");
    apiObject
      .post("api/order/userspecificorders", user)
      .then(async (response) => {
        // setOrders(response.data.orders);

        let orders = response.data.orders.map((order) => {
          let products = JSON.parse(order.orderdProducts);
          let shipping = JSON.parse(order.shippingDetails);
          return {
            ...order,
            orderdProducts: products,
            shippingDetails: shipping,
          };
        });

        console.log(orders[0].orderdProducts);
        setOrders(orders);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    loadOrders();
  }, [isFocused]);
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={backgroundStyle}
    >
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
      {orders.map((order, index) => (
        <OrderRow key={index} order={order} />
      ))}
    </ScrollView>
  );
};
