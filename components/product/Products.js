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

const ProductCard = ({ product }) => {
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
        <View style={productStyle.btnWrapper}>
          <TouchableOpacity style={productStyle.btn}>
            <Text style={productStyle.btnText}>View Product</Text>
          </TouchableOpacity>
        </View>
        <View style={productStyle.btnWrapper}>
          <TouchableOpacity style={productStyle.btn}>
            <Text style={productStyle.btnText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export const Products = ({ children, title }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, [getProducts]);
  const getProducts = () => {
    apiObject
      .get("api/food")
      .then(async (response) => {
        // const resData = response.json()
        console.log(response.data.products[0]);
        setProducts(response.data.products);
      })
      .catch((err) => {
        console.log(err);
        // setData({
        //   ...data,
        //   errorMsg: err.response.data.errorMessage,
        //   loading: false,
        // });
      });
  };

  return (
    // <ScrollView>
    //   {products.map((product, imageIndex) => {
    //     return (
    //       <View
    //         style={{ height: 250 }}
    //         key={imageIndex}
    //       >
    //         <ImageBackground source={product.image} style={styles.productImage}>
    //           <View style={styleSheet.textContainer}>
    //         <Text style={styleSheet.infoText}>
    //           {"Image - " + imageIndex}
    //         </Text>
    //       </View>
    //         </ImageBackground>
    //       </View>
    //     );
    //   })}
    // </ScrollView>
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <FlatList
        scrollEnabled={false}
        data={products}
        renderItem={({ item }) => <ProductCard key={item} product={item} />}
        //Setting the number of column
        numColumns={1}
        keyExtractor={(item, index) => index}
      />
    </View>

    // <ProductCard />
  );
};
