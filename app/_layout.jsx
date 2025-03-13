import * as SplashScreen from "expo-splash-screen";
import { Stack, Tabs } from "expo-router";
import { useEffect } from "react";
import {
  useFonts,
  CrimsonPro_700Bold,
  CrimsonPro_600SemiBold,
  CrimsonPro_500Medium,
  CrimsonPro_400Regular,
  CrimsonPro_300Light,
} from "@expo-google-fonts/crimson-pro";
import { CartProvider } from "./context/CartContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    CrimsonPro_700Bold,
    CrimsonPro_600SemiBold,
    CrimsonPro_500Medium,
    CrimsonPro_400Regular,
    CrimsonPro_300Light,
  });

  useEffect(() => {
    if (loaded || error) {
      console.log("Font loaded successfully!");
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <CartProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="product-details" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </CartProvider>
  );
}
