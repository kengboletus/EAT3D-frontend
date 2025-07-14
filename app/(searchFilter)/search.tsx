import { dummySearches } from "@/assets/dummies/product";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ScrollView } from "react-native-virtualized-view";

// Data needed
const products = [];
const recents = dummySearches;
const popular = dummySearches;

const Router = router;
const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>();
  return (
    <SafeAreaView className="flex-grow bg-white">
      <View className="flex-row justify-center h-10 mx-8 mt-4 mb-1">
        <TouchableOpacity className="justify-center" onPress={Router.back}>
          <Ionicons name="arrow-back" color="#585858" size={22} />
        </TouchableOpacity>
        <SearchBar
          placeholder="Search products"
          onChangeText={(text: string) => setSearchQuery(text)}
          value={searchQuery}
          onPressFilter={() => {
            Router.navigate("/(searchFilter)/filter");
          }}
        />
      </View>
      <TouchableWithoutFeedback>
        <ScrollView className="flex-1 bg-white px-8 pt-6">
          {/** Search Results rendered in this flatlist */}
          <FlatList
            showsVerticalScrollIndicator={false}
            data={products}
            contentContainerStyle={{
              justifyContent: "center",
              padding: 8,
              borderWidth: 2,
              borderColor: "black",
            }}
            renderItem={({ item }) => {
              return <ProductCard {...item} />;
            }}
            keyExtractor={(item) => item.productID.toString()}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "center",
              gap: 15,
              marginBottom: 15,
            }}
          />
          {/** List of recent searches rendered here. */}
          <FlatList
            data={recents}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity>
                  <View className="flex-row">
                    <FontAwesome6
                      name="clock-rotate-left"
                      size={22}
                      color="#888888"
                    />
                    <Text>{item}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            ListHeaderComponent={
              <Text className="text-2xl border-2">Recent Searches</Text>
            }
            ListHeaderComponentStyle={{
              flex: 1,
              marginHorizontal: -8,
              marginTop: "5%",
              marginBottom: "5%",
            }}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Search;
