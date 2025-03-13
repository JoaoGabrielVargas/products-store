import * as SecureStore from "expo-secure-store";

export const saveCart = async (cartItems) => {
  await SecureStore.setItemAsync("cart", JSON.stringify(cartItems));
};

export const getCart = async () => {
  const cart = await SecureStore.getItemAsync("cart");
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = async (item) => {
  const cartItems = await getCart();
  const existingItem = cartItems.find((i) => i.id === item.id);

  if (existingItem) {
    const updatedCart = cartItems.map((i) =>
      i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
    );
    await saveCart(updatedCart);
  } else {
    await saveCart([...cartItems, { ...item, quantity: 1 }]);
  }
};

export const removeFromCart = async (itemId) => {
  const cartItems = await getCart();
  const updatedCart = cartItems.filter((item) => item.id !== itemId);
  await saveCart(updatedCart);
};

export const clearCart = async () => {
  await SecureStore.deleteItemAsync("cart");
};