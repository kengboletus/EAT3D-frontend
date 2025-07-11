import { dummyProducts } from "@/assets/dummies/product";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const products = dummyProducts;
const Router = router;
const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>();

  return (
    <View className="flex-1 bg-white p-8">
      <FlatList
        showsVerticalScrollIndicator={false}
        data={products}
        contentContainerStyle={{
          justifyContent: "center",
          padding: 8,
        }}
        renderItem={({ item }) => <ProductCard {...item} />}
        keyExtractor={(item) => item.productID.toString()}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 15,
          marginBottom: 15,
        }}
        ListHeaderComponent={
          <>
            <View className="flex-row min-w-full justify-center h-10">
              <TouchableOpacity
                className="justify-center"
                onPress={Router.back}
              >
                <Ionicons name="arrow-back" color="#585858" size={22} />
              </TouchableOpacity>
              <SearchBar
                placeholder="Search products"
                onChangeText={(text: string) => setSearchQuery}
                value={searchQuery}
              />
            </View>
          </>
        }
        ListHeaderComponentStyle={{
          flex: 1,
          marginHorizontal: -8,
          marginTop: "10%",
          marginBottom: "10%",
        }}
      />
    </View>
  );
};

export default Search;
