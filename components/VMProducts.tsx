import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

interface VMProductProps {
  name: string;
  image: string;
  available: boolean;
  price: number;
  onPress?: () => void;
}

const VMProducts: React.FC<VMProductProps> = ({ name, image, available, price, onPress }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={onPress}
    activeOpacity={0.8}
    disabled={!available}
  >
    <Image source={{ uri: image }} style={styles.image} />
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.price}>${price.toFixed(2)}</Text>
    <Text style={[styles.availability, { color: available ? "#22c55e" : "#ef4444" }]}>
      {available ? "Available" : "Sold Out"}
    </Text>
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
  availability: { fontSize: 12, fontWeight: "bold" },
});

export default VMProducts;