import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useCart } from "../context/CartContext";

const { width: screenWidth } = Dimensions.get("window");

export default function ProductCarousel({ products }) {
  const flatListRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { addToCart } = useCart();

  const handleAddToCart = (item) => {
    addToCart({ ...item, quantity: 1 });
    Alert.alert("success", `${item.title} added to cart`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={{ uri: item.image }} style={styles.carouselImage} />
      <Text style={styles.carouselTitle}>{item.title}</Text>
      <Text style={styles.carouselPrice}>${item.price}</Text>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => handleAddToCart(item)}
      >
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  const handleScroll = (event) => {
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.round(offset / screenWidth);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.carouselContent}
        snapToInterval={screenWidth}
        snapToAlignment="center"
        decelerationRate="normal"
        getItemLayout={(data, index) => ({
          length: screenWidth,
          offset: screenWidth * index,
          index,
        })}
      />
      <View style={styles.pagination}>
        {products.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  carouselContent: {
    alignItems: "center",
  },
  carouselItem: {
    width: screenWidth,
    height: 600,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 32,
  },
  carouselImage: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    marginBottom: 16,
  },
  carouselTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6A704C",
    marginBottom: 8,
  },
  carouselPrice: {
    fontSize: 18,
    color: "#888",
    marginBottom: 16,
  },
  addToCartButton: {
    backgroundColor: "#6A704C",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  addToCartButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: "#6A704C",
  },
});
