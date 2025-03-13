import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <View style={styles.cartItem}>
      <Text style={styles.itemName}>{item.title}</Text>
      <Text style={styles.itemPrice}>
        ${item.price} x {item.quantity}
      </Text>
      <View style={styles.actionsContainer}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={onDecrease}>
            <Text style={styles.actionText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onIncrease}>
            <Text style={styles.actionText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onRemove}>
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 8,
  },
  itemName: {
    fontSize: 16,
    color: "#6A704C",
    width: "60%",
  },
  itemPrice: {
    fontSize: 14,
    color: "#888",
  },
  actionsContainer: {
    alignItems: "center",
    gap: 6,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 6,
  },
  actionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6A704C",
  },
  removeText: {
    color: "#ff0000",
    textDecorationLine: "underline",
  },
});
