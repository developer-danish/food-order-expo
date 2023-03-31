import React, { useEffect, useLayoutEffect } from "react";
import { useState } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { getLocalStorage, setLocalStorage } from "../helpers/localStorage";
import { useIsFocused } from "@react-navigation/native";

const ProductRow = ({ product }) => {
  return (
    <View style={styles.ordersRow}>
      <View style={styles.headerRowItem}>
        <Image
          style={styles.orderImage}
          source={{ uri: BaseImageUrl + product.fileName }}
        />
      </View>
      <View style={styles.headerRowItem}>
        <Text>{product.productName}</Text>
      </View>
      <View style={styles.headerRowItem}>
        <Text>$ {product.productPrice}</Text>
      </View>
      <View style={styles.plusMinusRow}>
        <TouchableOpacity style={styles.plusMinusBtn}>
          <Text style={styles.plusMinusBtnText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.count}>{product.count}</Text>
        <TouchableOpacity style={styles.plusMinusBtn}>
          <Text style={styles.plusMinusBtnText}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.headerRowItem}>
        <TouchableOpacity style={styles.removeBtn}>
          <Text style={styles.removeBtnText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ordersRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  headerRowItem: {
    padding: 8,
  },
  headerTitle: {
    fontWeight: "700",
    color: "#000",
  },
  orderImage: {
    height: 30,
    width: 50,
    borderRadius: 4,
  },
  plusMinusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  removeBtn: {
    backgroundColor: "#dc3545",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  plusMinusBtn: {
    backgroundColor: "black",
    width: 24,
    height: 24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
    borderRadius: 4,
  },
  plusMinusBtnText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#fff",
  },
  removeBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 10,
  },
  count: {
    fontWeight: "700",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  checkoutBtn: {
    backgroundColor: "#000",
    borderRadius: 4,
    marginVertical: 16,
  },
  checkoutBtnText: {
    color: "#fff",
    textAlign: "center",
    padding: 8,
  },
  summaryTitle: {
    fontWeight: "700",
    color: "#000",
    marginVertical: 10,
  },
});
const products = [
  {
    title: "Product name 1",
    image: require("../assets/foodnew.jpeg"),
    status: "Pending",
    price: "3",
    count: 1,
  },
  {
    title: "Product name 2",
    image: require("../assets/foodnew.jpeg"),
    status: "Pending",
    price: "2",
    count: 3,
  },
];
export const CartPage = ({ navigation }) => {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    padding: 16,
  };
  const [cart, setCart] = useState([]);
  const isFocused = useIsFocused();

  const loadCartData = async () => {
    let data = await getLocalStorage("cart");
    console.log(data);
    setCart(data);
  };

  useEffect(() => {
    if (isFocused) {
      loadCartData();
    }
    // setLocalStorage("cart", [
    //   {
    //     __v: 0,
    //     _id: "62ff2c1a0e681cda4b03c519",
    //     createdAt: "2022-08-19T06:22:18.691Z",
    //     fileName: "1660890138681.jpg",
    //     productCategory: {
    //       _id: "62ff2a810e681cda4b03c514",
    //       category: "Palav",
    //     },
    //     productDesc: "Good for health",
    //     productName: "Mixed Food",
    //     productPrice: 5,
    //     productQuantity: 0,
    //     updatedAt: "2022-10-26T17:30:02.127Z",
    //   },
    //   {
    //     __v: 0,
    //     _id: "639eb8bc1d458ead0bdf9f2a",
    //     createdAt: "2022-12-18T06:52:45.009Z",
    //     fileName: "1671346364977.jpg",
    //     productCategory: {
    //       _id: "62ff2c5c0e681cda4b03c524",
    //       category: "Burger",
    //     },
    //     productDesc: "Delicious Food",
    //     productName: "Burger",
    //     productPrice: 2,
    //     productQuantity: 12,
    //     updatedAt: "2022-12-18T06:52:45.009Z",
    //   },
    // ]);
  }, [isFocused]);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={backgroundStyle}
    >
      {cart.map((product, index) => {
        return <ProductRow key={index} product={product} />;
      })}
      <Text style={styles.summaryTitle}>Cart Summary</Text>
      <Text>({cart.length}) items</Text>
      <View style={styles.totalRow}>
        <Text>Total: </Text>
        <Text>$5.0</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Shipping")}
        style={styles.checkoutBtn}
      >
        <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
