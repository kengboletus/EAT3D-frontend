import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";

interface VMProductProps {
  name: string;
  image: string;
  available: boolean;
  price: number;
  quantity: number; // selected quantity on selection screen
  onIncrease: () => void;
  onDecrease: () => void;
  onPress?: () => void; // optional: tap card action
  maxQuantity?: number; // available stock
  disableAllIncrease?: boolean; // disable + due to VM max limit
}

const VMProducts: React.FC<VMProductProps> = ({
  name,
  image,
  available,
  price,
  quantity,
  onIncrease,
  onDecrease,
  onPress,
  maxQuantity,
  disableAllIncrease,
}) => (
  <TouchableOpacity
    style={styles.card}
    onPress={onPress}
    activeOpacity={0.9}
    disabled={!available}
  >
    <Image source={{ uri: image }} style={styles.image} />
    {!available && <View style={styles.soldOutOverlay}><Text style={styles.soldOutText}>Sold Out</Text></View>}
    <Text style={styles.name} numberOfLines={1}>{name}</Text>
    <Text style={styles.price}>${price.toFixed(2)}</Text>

    <View style={styles.qtyRow}>
      <TouchableOpacity
        style={[styles.qtyBtn, quantity === 0 || !available ? styles.qtyBtnDisabled : null]}
        onPress={onDecrease}
        disabled={quantity === 0 || !available}
      >
        <Entypo name="minus" size={16} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.qtyText}>{String(quantity).padStart(2, "0")}</Text>
      <TouchableOpacity
        style={[
          styles.qtyBtn, 
          styles.qtyBtnPlus, 
          !available || disableAllIncrease || (typeof maxQuantity === "number" && quantity >= maxQuantity)
           ? styles.qtyBtnDisabled : null
        ]}
        onPress={onIncrease}
        disabled={!available || disableAllIncrease || (typeof maxQuantity === "number" && quantity >= maxQuantity)}
      >
        <Entypo name="plus" size={16} color="#fff" />
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    width: "31%",
    marginVertical: 8,
    marginHorizontal: "1%",
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    opacity: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 6,
    backgroundColor: "#f0f0f0",
  },
  name: { fontSize: 14, fontWeight: "bold", color: "#222", marginBottom: 2 },
  price: { fontSize: 13, color: "#444", marginBottom: 2 },
  qtyRow: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  qtyBtn: {
    backgroundColor: "#78BE21",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  qtyBtnPlus: {
    backgroundColor: "#78BE21",
  },
  qtyBtnDisabled: {
    backgroundColor: "#9CA3AF",
  },
  qtyText: { width: 28, textAlign: "center", fontWeight: "700", color: "#333" },
  soldOutOverlay: {
    position: "absolute",
    top: 8,
    left: 8,
    right: 8,
    bottom: 42,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  soldOutText: { fontWeight: "800", color: "#ef4444" },
});

export default VMProducts;