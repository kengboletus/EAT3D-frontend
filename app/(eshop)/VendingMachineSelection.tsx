import { dummyMachines } from '@/assets/dummies/vendingmachine';
import SplashScreenLoading from '@/components/SplashScreenLoading';
import VMCard from '@/components/VMCard';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';

type VendingMachine = {
  id: string;
  name: string;
  location: string;
  image?: string; // Optional image property
  status: "online" | "offline";
};

const VendingMachineSelectionScreen = () => {
  const [machines, setMachines] = useState<VendingMachine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setMachines(dummyMachines);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return <SplashScreenLoading />;
  }

  return (
    <SafeAreaView className="bg-white" style={styles.container}>
      <Text style={styles.title}>Vending Machine</Text>
      <FlatList
        data={machines}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        key={2}
        renderItem={({ item }) => (
          <VMCard
            name={item.name}
            location={item.location}
            status={item.status}
            image ={item.image} 
            onPress={() => router.push({ pathname: "../product/ProductSelection", params: { machineId: item.id } })}
          />
        )}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text>No listed components</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, color: "#585858", fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
});

export default VendingMachineSelectionScreen;