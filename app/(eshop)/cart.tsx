/**
 * Cart Screen
 *
 * Shows items currently in the cart with:
 * - header with dual arcs and a trash button to clear all (with confirmation)
 * - list of cart items (each row supports swipe delete and qty controls)
 * - sticky footer with totals and a Checkout CTA
 */
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import CartItemRow from "../../components/Cart/CartItemRow";
import DoubleArcHeader from "../../components/Cart/DoubleArcHeader";
import { useCart } from "../../context/cartContext";

const Cart = () => {
  const { cart, removeItem, updateQty, totalItems, totalPrice, clear } = useCart();
  const router = useRouter();

  // Render each cart item row and connect to context actions
  const renderItem = ({ item }: any) => (
    <CartItemRow
      item={item}
      onRemove={() => removeItem(item.vmId, item.name)}
      onDecrease={() =>
        updateQty(item.vmId, item.name, item.numOrdered - 1)
      }
      onIncrease={() =>
        updateQty(item.vmId, item.name, item.numOrdered + 1)
      }
    />
  );

  // Empty state when cart has no items
  if (cart.length === 0)
    return (
      <View style={styles.container}>
        <DoubleArcHeader
          primary="#FE8335"
          secondary="#FFE0C4"
          height={120}
        />
        <SafeAreaView style={styles.empty}>
          <Text style={styles.emptyTxt}>🛒   Your cart is empty!</Text>
        </SafeAreaView>
      </View>
    );

  return (
    <View style={styles.container}>
      <DoubleArcHeader
        primary="#FE8335"
        secondary="#FFE0C4"
        height={120}
        buttonLabel={<Ionicons name="trash" size={16} color="#FE8335" />}
        onButtonPress={() => {
          Alert.alert(
            "Clear cart",
            "Are you sure you want to remove all items from your cart?",
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "Yes, clear",
                style: "destructive",
                onPress: () => clear(),
              },
            ]
          );
        }}
      />

      <SafeAreaView style={styles.content}>
        <View style={styles.listContainer}>
          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={(_, i) => i.toString()}
            contentContainerStyle={styles.listContent}
          />
        </View>

        {/* footer */}
        <View style={styles.footer}>
          <View>
            <Text style={styles.footerItems}>Total {totalItems} item(s)</Text>
            <Text style={styles.footerPrice}>HK$ {totalPrice.toFixed(2)}</Text>
          </View>

          <TouchableOpacity
            style={styles.checkout}
            onPress={() => router.push("/(eshop)/order")} // placeholder
          >
            <Text style={styles.checkoutTxt}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9" },
  content: { flex: 1 },
  /* empty cart */
  empty: { flex: 1, alignItems: "center", justifyContent: "center" },
  emptyTxt: { fontSize: 18, color: "#888" },
  listContainer: { flex: 1 },
  listContent: { paddingBottom: 12 },
  /* footer */
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 18,
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
    backgroundColor: "#fff",
  },
  footerItems: { color: "#666", fontSize: 14 },
  footerPrice: { fontSize: 22, fontWeight: "700", color: "#FE8335" },
  checkout: {
    backgroundColor: "#FE8335",
    paddingHorizontal: 36,
    paddingVertical: 12,
    borderRadius: 30,
  },
  checkoutTxt: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

export default Cart;
