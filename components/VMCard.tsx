import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import images from "@/assets/images"; // Adjust the import path as necessary

export  interface VMCardProps {
  name: string;
  location: string;
  status: "online" | "offline";
  image?: string; // Add image prop
  onPress: () => void;
}

const VMCard: React.FC<VMCardProps> = ({ name, location, status, image, onPress }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={onPress}
    activeOpacity={0.85}
  >
    <Image source={{ uri: image }} style={styles.image} />
    <View style={{ marginTop: 8 }}>

      <Text style={styles.name}>{name}</Text>
      <Text style={styles.location}>{location}</Text>
      <Text style={styles.status}>
        {status === "online" ? "🟢 Online" : "🔴 Offline"}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    width: '48%', // Ensures two cards per row with spacing
    margin: '1%',
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    alignItems: "center",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  name: { fontSize: 16, fontWeight: "bold", color: "#222" },
  location: { color: "#666", marginTop: 2 },
  status: { color: "#888", marginTop: 4 },
});

export default VMCard;