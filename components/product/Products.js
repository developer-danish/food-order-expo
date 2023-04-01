import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
// import type { Node } from 'react';
import { Button } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { apiObject } from "../../api/auth";
import { BaseImageUrl } from "../../helpers/Constants";
import { getLocalStorage, setLocalStorage } from "../../helpers/localStorage";

const productStyle = StyleSheet.create({
  productContainer: {
    borderWidth: 1,
    borderRadius: 4,
    margin: 16,
    borderColor: "#DCDCDC",
  },
  productImage: {
    height: 150,
  },
  productName: {
    padding: 8,
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  prodDesc: {
    padding: 8,
  },
  btnContainer: {
    flexDirection: "row",
  },
  btnWrapper: {
    padding: 8,
    flex: 1,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffc739",
    padding: 12,
    borderRadius: 4,
  },
  btnText: {
    fontWeight: "700",
    color: "#fff",
  },
});

export const ProductCard = ({
  product,
  addToCart,
  removeFromCart,
  cartItemIdArray,
}) => {
  return (
    <View style={productStyle.productContainer}>
      <ImageBackground
        source={{ uri: BaseImageUrl + product.fileName }}
        style={productStyle.productImage}
      />
      <Text style={productStyle.productName}>{product.productName}</Text>
      <View style={productStyle.priceRow}>
        <Text>$ {product.productPrice}</Text>
        <Text>In Stock</Text>
      </View>
      <Text style={productStyle.prodDesc}>{product.productDesc}</Text>
      <View style={productStyle.btnContainer}>
        {/* <View style={productStyle.btnWrapper}>
          <TouchableOpacity style={productStyle.btn}>
            <Text style={productStyle.btnText}>View Product</Text>
          </TouchableOpacity>
        </View> */}
        <View style={productStyle.btnWrapper}>
          <TouchableOpacity
            onPress={() => {
              cartItemIdArray && cartItemIdArray.includes(product._id)
                ? removeFromCart(product)
                : addToCart(product);
            }}
            disabled={!product.productQuantity}
            style={productStyle.btn}
          >
            <Text style={productStyle.btnText}>
              {product.productQuantity
                ? cartItemIdArray && cartItemIdArray.includes(product._id)
                  ? "Remove from Cart"
                  : "Add to Cart"
                : "Out of Stock"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export const Products = ({ children, title, propProducts }) => {
  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState([]);
  const [cartItemIdArray, setCartItemIdArray] = useState([]);
  const isFocused = useIsFocused();

  const loadCartData = async () => {
    let data = await getLocalStorage("cart");
    console.log(data);
    if (data && data.length > 0) {
      setCart(data);
    } else {
      setCart([]);
    }
  };

  useEffect(() => {
    setProducts(propProducts);
  }, [propProducts]);

  useEffect(() => {
    cart && setCartItemIdArray(cart.map((item) => item._id));
    setLocalStorage("cart", cart);
  }, [cart, setCartItemIdArray]);

  useEffect(() => {
    if (isFocused) {
      loadCartData();
      getProducts();
      console.log(234);
    }
  }, [isFocused]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const getProducts = () => {
    apiObject
      .get("api/food")
      .then(async (response) => {
        setProducts(response.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addToCart = (product) => {
    setCart(
      cart
        ? cart.concat({ ...product, productQuantity: 1 })
        : [{ ...product, productQuantity: 1 }]
    );
  };
  const removeFromCart = (product) => {
    setCart(cart.filter((item) => item._id !== product._id));
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <FlatList
        scrollEnabled={false}
        data={products}
        renderItem={({ item }) => (
          <ProductCard
            key={item}
            product={item}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            cartItemIdArray={cartItemIdArray}
          />
        )}
        numColumns={1}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};
