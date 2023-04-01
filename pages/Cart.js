import React, { useEffect, useLayoutEffect } from "react";
import { useState } from "react";
import {
  Button,
  Dimensions,
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
import { BaseImageUrl } from "../helpers/Constants";
import { getToken } from "../helpers/cookies";

const ProductRow = ({ product, onChangeQuantity, removeProduct }) => {
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
        <TouchableOpacity
          onPress={() => {
            onChangeQuantity(-1);
          }}
          style={styles.plusMinusBtn}
        >
          <Text style={styles.plusMinusBtnText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.count}>{product.productQuantity}</Text>
        <TouchableOpacity
          onPress={() => {
            onChangeQuantity(1);
          }}
          style={styles.plusMinusBtn}
        >
          <Text style={styles.plusMinusBtnText}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.headerRowItem}>
        <TouchableOpacity
          onPress={() => {
            removeProduct(product);
          }}
          style={styles.removeBtn}
        >
          <Text style={styles.removeBtnText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    height: Dimensions.get("window").height * 0.8,
  },
  ordersRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 4,
  },
  headerRowItem: {
    padding: 8,
  },
  headerTitle: {
    fontWeight: "700",
    color: "#000",
    textAlign: "left",
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
    minHeight: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#ffc739",
    borderColor: "#000",
    marginTop: 30,
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
  centerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height,
  },
  largeBtn: {
    paddingHorizontal: 70,
    paddingVertical: 20,
  },
  summaryContainer: {
    padding: 30,
  },
});

export const CartPage = ({ navigation }) => {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    padding: 16,
  };
  const [cart, setCart] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const isFocused = useIsFocused();

  const loadCartData = async () => {
    let data = await getLocalStorage("cart");
    let token = await getToken("token");
    setIsLogin(!!token);
    console.log(!!token);
    // data && setCart(data);
    if (data && data.length > 0) {
      setCart(data);
    } else {
      setCart([]);
    }
  };

  useEffect(() => {
    if (isFocused) {
      loadCartData();
    }
  }, [isFocused]);

  const proceedToCheckout = () => {
    if (cart.length > 0) {
      navigation.navigate("Shipping");
    }
  };
  const updateCart = (product) => {
    const updatedCartItems = cart.map((item) =>
      product._id === item._id ? product : item
    );
    setCart(updatedCartItems);
    setLocalStorage("cart", updatedCartItems);
  };
  const onChangeQuantity = (product, count) => {
    if (count < 0) {
      if (product.productQuantity > 1) {
        updateCart({
          ...product,
          productQuantity: product.productQuantity - 1,
        });
      }
    } else {
      updateCart({ ...product, productQuantity: product.productQuantity + 1 });
    }
  };

  const removeProduct = (product) => {
    const updatedCartItems = cart.filter((item) => item._id !== product._id);
    setCart(updatedCartItems);
    setLocalStorage("cart", updatedCartItems);
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={backgroundStyle}
    >
      {cart.length > 0 ? (
        <View style={styles.container}>
          <View>
            {cart.map((product, index) => {
              return (
                <ProductRow
                  key={index}
                  product={product}
                  onChangeQuantity={(count) => {
                    onChangeQuantity(product, count);
                  }}
                  removeProduct={removeProduct}
                />
              );
            })}
          </View>

          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>Cart Summary</Text>
            <Text>({cart.length}) items</Text>
            <View style={styles.totalRow}>
              <Text>Total: </Text>
              <Text>
                $
                {cart.length > 0
                  ? cart
                      .map((item) => item.productPrice * item.productQuantity)
                      .reduce((sum, item) => sum + item)
                  : 0}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                isLogin ? proceedToCheckout() : navigation.navigate("Login")
              }
              style={styles.checkoutBtn}
            >
              <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.centerView}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={{ ...styles.checkoutBtn, ...styles.largeBtn }}
          >
            <Text style={{ ...styles.checkoutBtnText, fontSize: 20 }}>
              Explore products
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};
