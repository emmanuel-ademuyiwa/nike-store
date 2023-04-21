import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Image, FlatList, Pressable, View } from "react-native";
import { useSelector } from "react-redux";

const ProductsScreen = () => {
  const navigation = useNavigation();
  const products = useSelector((state) => state.products.products);

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={products}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <Pressable
          onPress={() =>
            navigation.navigate("Product Details", { id: item.id })
          }
          style={styles.itemContainer}
        >
          <Image source={{ uri: item.image }} style={styles.image} />
        </Pressable>
      )}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 50,
  },
  itemContainer: {
    width: "50%",
    padding: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});

export default ProductsScreen;
