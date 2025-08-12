/**
 * CartItemRow
 *
 * Renders a single product row inside the cart list with:
 * - product thumbnail, name and unit price
 * - quantity controls (+ / −)
 * - swipe-to-delete gesture (right actions)
 *
 * Parent component owns item state; this component only calls the
 * provided callbacks so the cart context can update quantities or remove.
 */
import type { UnifiedInventoryItem } from "@/assets/dummies/product";
import React from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";

type Props = {
  item: UnifiedInventoryItem;
  onRemove: () => void;
  onDecrease: () => void;
  onIncrease: () => void;
};

const CartItemRow: React.FC<Props> = ({
  item,
  onRemove,
  onDecrease,
  onIncrease,
}) => {
  // Right action used by react-native-gesture-handler's Swipeable.
  // Translates/scales in based on drag progress and exposes a trash icon.
  const renderRightActions = (_: any, dragX: Animated.AnimatedInterpolation<number>) => {
    const translateX = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 100],
      extrapolate: "clamp",
    });
    const scale = dragX.interpolate({
      inputRange: [-100, -20, 0],
      outputRange: [1, 0.2, 0],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={[
          styles.deleteAction,
          { transform: [{ translateX }, { scale }] },
        ]}
      >
        <TouchableOpacity onPress={onRemove}>
          <Ionicons name="trash-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions} overshootRight={false}>
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />

        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity style={styles.qtyBtn} onPress={onDecrease}>
            <Entypo name="minus" size={16} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.qty}>
            {String(item.numOrdered).padStart(2, "0")}
          </Text>

          <TouchableOpacity style={styles.qtyBtn} onPress={onIncrease}>
            <Entypo name="plus" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </Swipeable>
  );
};

export default CartItemRow;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    borderRadius: 14,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
  },
  image: { width: 64, height: 64, borderRadius: 8, backgroundColor: "#E5E5E5" },
  info: { flex: 1, marginLeft: 12, justifyContent: "center" },
  name: { fontSize: 16, fontWeight: "600", color: "#222" },
  price: { marginTop: 4, color: "#78BE21", fontWeight: "bold" },

  controls: { alignItems: "center", flexDirection: "row" },
  qtyBtn: {
    backgroundColor: "#78BE21",
    padding: 4,
    borderRadius: 4,
  },
  qty: {
    width: 28,
    textAlign: "center",
    fontWeight: "700",
    color: "#444",
  },

  deleteAction: {
    justifyContent: "center",
    alignItems: "center",
    width: 72,
    marginVertical: 8,
    marginRight: 16,
    borderRadius: 14,
    backgroundColor: "#ef4444",
  },
});
