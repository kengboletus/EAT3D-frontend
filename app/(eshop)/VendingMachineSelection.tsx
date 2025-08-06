import SplashScreenLoading from "@/components/SplashScreenLoading";
import VMCard from "@/components/VMCard";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text } from "react-native";
import { useAuthFetch } from "../../hooks/useAuthFetch";

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
    <SafeAreaView className="bg-white" style={styles.container}>
      <Text style={styles.title}>Vending Machine</Text>
      {errorMsg && (
        <Text style={{ color: "red", textAlign: "center", marginBottom: 8 }}>
          {errorMsg}
        </Text>
      )}
      <FlatList
        data={machines}
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
              router.push({
                pathname: "../product/ProductSelection",
                params: { machineId: item.id },
              })
            }
          />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No listed components</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: {
    fontSize: 24,
    color: "#585858",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default VendingMachineSelectionScreen;
