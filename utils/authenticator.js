import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

export const authenticator = async (username, password) => {
  const storedUsers = await SecureStore.getItemAsync("users");

  if (storedUsers) {
    const users = JSON.parse(storedUsers);
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
      router.replace("/home");
    } else {
      Alert.alert("Error", "Invalid username or password");
    }
  } else {
    Alert.alert("Error", "No registered users found");
  }
};
