import { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { router } from "expo-router";
import axios from "axios";
import { useCart } from "../context/CartContext";
import ProductCarousel from "../components/ProductsCarousel";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCarouselMode, setIsCarouselMode] = useState(false);

  const { total } = useCart();

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const handleProductPress = (product) => {
    router.push({
      pathname: "/product-details",
      params: { product: JSON.stringify(product) },
    });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading products...</Text>
      </View>
    );
  }

  const toggleDisplayMode = () => {
    setIsCarouselMode((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.totalText}>Total in Cart: ${total.toFixed(2)}</Text>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={toggleDisplayMode}
        >
          {isCarouselMode ? (
            <Ionicons name="grid-outline" size={24} color="#6A704C" />
          ) : (
            <MaterialCommunityIcons
              name="view-carousel-outline"
              size={24}
              color="#6A704C"
            />
          )}
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Products</Text>
      {isCarouselMode ? (
        <ProductCarousel products={products} />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleProductPress(item)}
              style={styles.productCard}
            >
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.productPrice}>${item.price}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDE1D1",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6A704C",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    color: "#6A704C",
    textAlign: "center",
    fontFamily: "CrimsonPro_400Regular",
  },
  listContainer: {
    paddingBottom: 16,
  },
  toggleButton: {},
  toggleButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  productCard: {
    flex: 1,
    margin: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    marginBottom: 8,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6A704C",
    textAlign: "center",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: "#6A704C",
    textAlign: "center",
  },
});
