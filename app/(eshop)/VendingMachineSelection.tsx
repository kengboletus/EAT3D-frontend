import SplashScreenLoading from "@/components/SplashScreenLoading";
import VMCard from "@/components/VMCard";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useCart } from "../../context/cartContext";
import { useAuthFetch } from "../../hooks/useAuthFetch";

import { dummyMachines } from "@/assets/dummies/vendingmachine";
import { ensureSingleVmSelection } from "@/utils/vmSelectionGuard";

type VendingMachine = {
  id: string;
  // name: string;
  brand: string;
  vm_location: string;
  img?: string; // Optional image property
  max_products: number;
  // status: "online" | "offline";
};

const VendingMachineSelectionScreen = () => {
  const [machines, setMachines] = useState<VendingMachine[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Memoized authFetch instance, uses current auth state & methods
  const authFetch = useAuthFetch();
  
  const { cart, clear, setVmLimit } = useCart();

  useEffect(() => {
    // define a fetch function because effect functions can't be async
    const fetchVMs = async () => {
      setLoading(true);
      setErrorMsg(null);
      try {
        const response = await authFetch(`/api/v1/vms/`, {
          method: "GET",
        });
        const { message, data } = response;
        if (!data) {
          setErrorMsg(message || "VMs not found");
          setMachines([]);
        } else {
          setMachines(data);
        }
      } catch (error: any) {
        setErrorMsg(
          error.message || "An unexpected error occurred. Please try again."
        );
        setMachines([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVMs();
  }, [authFetch]); // dependency array

  if (loading) {
    return <SplashScreenLoading />;
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Text style={styles.title}>Vending Machine</Text>
      </SafeAreaView>
      {errorMsg && (
        <Text style={{ color: "red", textAlign: "center", marginBottom: 8 }}>
          {errorMsg}
        </Text>
      )}
      <FlatList
        // Change to machines when backend is ready
        //data={machines}
         data={dummyMachines}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        key={2}
        renderItem={({ item }) => (
          <VMCard
            location={item.vm_location}
            image={item.img}
            onPress={() =>
              ensureSingleVmSelection({
                cart,
                vmId: item.id,
                vmMaxProducts: item.max_products,
                setVmLimit,
                clear,
                navigateToProductSelection: () =>
                  router.push({
                    pathname: "../product/ProductSelection",
                    params: { machineId: item.id, max_products: item.max_products },
                  }),
              })
            }
          />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No listed components</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    position: "relative",
    backgroundColor: "#78BE21",
    borderRadius: 4,
  },
  title: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
    position: "absolute",
    left: 0,
    right: 0,
    top: 50,
    bottom: 0,
    textAlignVertical: "center",
  },
});

export default VendingMachineSelectionScreen;
