import React from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import {
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Card from "../UI/Card";

const ProductItem = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <Card style={styles.product}>
      <TouchableCmp onPress={props.onSelect} useForeground>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: props.image }} />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.price}>${props.price.toFixed(2)}</Text>
        </View>
      </TouchableCmp>
      <View style={styles.actions}>{props.children}</View>
    </Card>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: "70%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  details: {
    alignItems: "center",
    height: "15%",
    padding: 10,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    marginVertical: 4,
  },
  price: {
    fontFamily: "open-sans",
    fontSize: 14,
    color: "#888",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "10%",
    paddingHorizontal: 20,
  },
});
