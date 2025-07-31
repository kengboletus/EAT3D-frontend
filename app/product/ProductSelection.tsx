import type { Product } from "@/assets/dummies/product";
import { vendingMachineProducts } from "@/assets/dummies/product";
import VMProducts from "@/components/VMProducts";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";


const ProductSelectionScreen = ({ }) => {
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalVisible, setModalVisible] = useState(false);


  const { machineId } = useLocalSearchParams();
  const products : Product[] = vendingMachineProducts[machineId as string] || [];
   
    useEffect(() => {
    if (!machineId) {
      console.warn('Machine ID is missing');
    }
  }, [machineId]);

  const handleProductPress = (Product: Product) => {
    setSelectedProduct(Product);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Select Product</Text>
        <TouchableOpacity style={styles.cancelBtn} onPress={() => router.replace("/")}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        numColumns={3}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <VMProducts
            name={item.name}
            image={item.image}
            available={item.available}
            price={item.price}
            onPress={() => handleProductPress(item)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        ListEmptyComponent={<Text>Machine ID: {machineId}</Text>}
      />

      {/* Modal for product details */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedProduct && (
              <>
                <Image source={{ uri: selectedProduct.image }} style={styles.modalImage} />
                <Text style={styles.modalName}>{selectedProduct.name}</Text>
                <Text style={styles.modalPrice}>${selectedProduct.price.toFixed(2)}</Text>
                <Text style={[styles.modalAvailability, { color: selectedProduct.available ? "#22c55e" : "#ef4444" }]}>
                  {selectedProduct.available ? "Available" : "Sold Out"}
                </Text>
                <TouchableOpacity
                  style={styles.pickupBtn}
                  disabled={!selectedProduct.available}
                  onPress={() => {
                    // TODO: Implement pick up code generation logic
                    alert("Pick up code generated!");
                  }}
                >
                  <Text style={styles.pickupBtnText}>Generate Pick Up Code</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.closeBtn} onPress={handleCloseModal}>
                  <Text style={styles.closeBtnText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: {
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },
  title: {
    fontSize: 24,
    color: "#585858",
    fontWeight: "bold",
    textAlign: "center",
    position: "absolute",
    left: 0,
    right: 0,
    top: 10,
    bottom: 0,
    textAlignVertical: "center",
  },
  cancelBtn: {
    position: "absolute",
    right: 15,
    top: 8,
    backgroundColor: "#78BE21",
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8,
    zIndex: 1,
  },
  cancelText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  modalImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: "#f0f0f0",
  },
  modalName: { fontSize: 20, fontWeight: "bold", marginBottom: 8, color: "#222" },
  modalPrice: { fontSize: 18, color: "#444", marginBottom: 8 },
  modalAvailability: { fontSize: 15, fontWeight: "bold", marginBottom: 16 },
  pickupBtn: {
    backgroundColor: "#78BE21",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
    opacity: 1,
  },
  pickupBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  closeBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  closeBtnText: {
    color: "#444",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default ProductSelectionScreen;