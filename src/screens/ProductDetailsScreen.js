import {
  StyleSheet,
  View,
  Image,
  FlatList,
  useWindowDimensions,
  Text,
  ScrollView,
  Pressable,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { cartSlice } from "../store/cartSlice";
import { useEffect, useState } from "react";

const ProductDetailsScreen = ({ route }) => {
  const id = route.params.id;
  const products = useSelector((state) => state.products.products);
  const [product, setProduct] = useState({});

  useEffect(() => {
    const product = products.find((item) => item.id === id);
    setProduct(product);
  }, [id]);

  const dispatch = useDispatch();

  const { width } = useWindowDimensions();

  const addToCart = () => {
    dispatch(cartSlice.actions.addCartItem({ product }));
  };

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        {/* Image Carousel */}
        <FlatList
          data={product?.images}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={{ width, aspectRatio: 1 }} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />
        <View style={{ padding: 20 }}>
          {/* Title */}
          <Text style={styles.title}>{product?.name}</Text>

          {/* Price */}
          <Text style={styles.price}>${product?.price}</Text>

          {/* Description */}
          <Text style={styles.description}>{product?.description}</Text>
        </View>
      </ScrollView>

      {/* Add to cart button */}
      <Pressable onPress={addToCart} style={styles.button}>
        <Text style={styles.buttonText}>Add to cart</Text>
      </Pressable>

      {/* Navigation icon */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    marginVertical: 10,
  },
  price: {
    fontWeight: "500",
    fontSize: 16,
    letterSpacing: 1.5,
  },
  description: {
    marginVertical: 10,
    fontSize: 14,
    lineHeight: 26,
    fontWeight: "300",
  },

  button: {
    position: "absolute",
    backgroundColor: "black",
    bottom: 30,
    width: "90%",
    alignSelf: "center",
    padding: 20,
    borderRadius: 100,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
});

export default ProductDetailsScreen;
