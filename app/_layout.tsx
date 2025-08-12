import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "../context/authContext";
import { CartProvider } from "../context/cartContext";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <CartProvider>
          <Slot />
        </CartProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
