import { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useCart } from "./context/CartContext";

export default function ProductDetails() {
  const { product } = useLocalSearchParams();
  const parsedProduct = JSON.parse(product);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, total } = useCart();

  const handleAddToCart = () => {
    addToCart({ ...parsedProduct, quantity });
    Alert.alert("Success", `${parsedProduct.title} added to cart`);
  };

  const handleBackButon = () => {
    router.replace("/home");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={handleBackButon}>
        <Text style={styles.title}>{`<`}</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image source={{ uri: parsedProduct.image }} style={styles.image} />
      </View>
      <Text style={styles.title}>{parsedProduct.title}</Text>
      <Text style={styles.price}>${parsedProduct.price}</Text>
      <Text style={styles.description}>{parsedProduct.description}</Text>
      <Text style={styles.category}>Category: {parsedProduct.category}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => setQuantity(quantity + 1)}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.totalText}>
        Total for this item: ${(parsedProduct.price * quantity).toFixed(2)}
      </Text>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={handleAddToCart}
      >
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#EDE1D1",
    padding: 16,
  },
  backBtn: {
    alignSelf: "flex-end",
  },
  imageContainer: {
    width: "100%",
    borderRadius: 8,
    backgroundColor: "#FFF",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6A704C",
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: "#6A704C",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  category: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#6A704C",
    marginBottom: 16,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  quantityButton: {
    backgroundColor: "#6A704C",
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 8,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  quantityText: {
    fontSize: 18,
    color: "#6A704C",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6A704C",
    marginBottom: 16,
    textAlign: "center",
  },
  addToCartButton: {
    backgroundColor: "#6A704C",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
  },
  addToCartButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
