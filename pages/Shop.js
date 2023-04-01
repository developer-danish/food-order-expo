import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { apiObject } from "./../api/auth";
import { ProductCard, Products } from "./../components/product/Products";

export const Shop = () => {
  const [text, setText] = useState("");
  const [products, setProducts] = useState([]);
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

  const handleSearch = (val) => {
    setText(val);
    apiObject
      .post("api/filter/search", { type: "text", query: val })
      .then(async (response) => {
        // const resData = response.json()
        setProducts(response.data.products);
        console.log(response.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <ScrollView>
      <View style={styles.upperContainer}>
        <TextInput
          value={text}
          onChangeText={(val) => handleSearch(val)}
          style={styles.text}
          placeholder="Search food here"
        />
      </View>
      {/* <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard key={item} product={item} />}
        //Setting the number of column
        numColumns={1}
        keyExtractor={(item, index) => index}
      /> */}
      <Products propProducts={products} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  upperContainer: {
    backgroundColor: "#ffc739",
  },
  text: {
    padding: 8,
    paddingHorizontal: 10,
    backgroundColor: "white",
    width: "80%",
    marginLeft: 20,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 15,
  },
  lowerContainer: {},
});
