import { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";

export default function Cart() {
  const {
    cartItems,
    total,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  const handleConfirmPayment = () => {
    clearCart();
    Alert.alert("Success", "Payment confirmed!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      {cartItems.length <= 0 && (
        <Text style={styles.noItemText}>You don't have items on the cart</Text>
      )}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onIncrease={() => increaseQuantity(item.id)}
            onDecrease={() => decreaseQuantity(item.id)}
            onRemove={() => removeFromCart(item.id)}
          />
        )}
      />
      <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
      <TouchableOpacity
        style={[
          styles.confirmButton,
          cartItems.length <= 0 && { backgroundColor: "gray" },
        ]}
        onPress={handleConfirmPayment}
        disabled={cartItems.length <= 0}
      >
        <Text style={styles.confirmButtonText}>Confirm Payment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDE1D1",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6A704C",
    marginBottom: 16,
    fontFamily: "Crimson-Pro",
  },
  noItemText: {
    fontSize: 16,
    color: "#6A704C",
    width: "60%",
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6A704C",
    marginTop: 16,
    textAlign: "center",
  },
  confirmButton: {
    backgroundColor: "#6A704C",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
