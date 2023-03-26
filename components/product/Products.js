import React from 'react';
import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
// import type { Node } from 'react';
import { Button } from 'react-native-elements';

const productStyle = StyleSheet.create({
  productContainer: {
    borderWidth: 2,
    borderRadius: 4,
    margin: 16,
    borderColor: "#DCDCDC"
  },
  productImage: {
    height: 100
  },
  productName: {
    padding: 8,
    color: "black",
    fontWeight: "700"
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingHorizontal: 8
  },
  prodDesc: {
    padding: 8
  },
  btnContainer: {
    flexDirection: 'row',
    // justifyContent: "space-around",
  },
  btnWrapper: {
    padding: 8,
    flex: 1
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
  }
});
const products = [
  {
    image: require('../../assets/foodnew.jpeg'),
    name: "Red Tomato", price: "3",
    desc: "Prod desc"
  },
  {
    image: require('../../assets/banner7.jpg'),
    name: "Red Tomato", price: "3",
    desc: "Prod desc"
  },
  {
    image: require('../../assets/banner5.jpg'),
    name: "Red Tomato", price: "3",
    desc: "Prod desc"
  },
];

const ProductCard = ({ product }) => {
  return (
    <View style={productStyle.productContainer} >
      <ImageBackground source={product.image} style={productStyle.productImage} />
      <Text style={productStyle.productName}>{product.name}</Text>
      <View style={productStyle.priceRow} >
        <Text>$ {product.price}</Text>
        <Text>In Stock</Text>
      </View>
      <Text style={productStyle.prodDesc}>{product.desc}</Text>
      <View style={productStyle.btnContainer}>
        <View style={productStyle.btnWrapper}>
          <Button style={productStyle.btn} title={"View Product"} />
        </View>
        <View style={productStyle.btnWrapper}>
          <Button style={productStyle.btn} title={"Add to Cart"} />
        </View>
      </View>
    </View>);
}

export const Products = ({ children, title }) => {
  const isDarkMode = useColorScheme() === 'dark';

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
    <View style={{
      flex: 1,
      backgroundColor: 'white',
    }}>

      <FlatList
        scrollEnabled={false}
        data={products}
        renderItem={({ item }) => (
          <ProductCard key={item} product={item} />
        )}
        //Setting the number of column
        numColumns={1}
        keyExtractor={(item, index) => index}
      />
    </View>

    // <ProductCard />
  );
};