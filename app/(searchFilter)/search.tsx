import { dummyProducts, dummySearches } from "@/assets/dummies/product";
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

/**
 * Search functionality still needs to be implemented.
 */

// Data needed
const products = dummyProducts;
let recentsBuff = dummySearches;
const popular = dummySearches;

const Router = router;
const Search = () => {
  const [recentsList, setRecentsList] = useState<string[]>(recentsBuff);
  const [searchQuery, setSearchQuery] = useState<string>();
  return (
    <SafeAreaView className="flex-grow bg-white">
      <View className="flex-row justify-center h-10 min-w-fit mx-8 mt-4 mb-1 ">
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
        <ScrollView className="flex-1 bg-white px-8 pt-2">
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
            data={recentsList}
            renderItem={({ item }) => {
              return (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      setSearchQuery(item);
                    }}
                  >
                    <View className="flex-row mb-3">
                      <FontAwesome6
                        name="clock-rotate-left"
                        size={20}
                        color="#888888"
                      />
                      <Text className="flex-grow self-center text-base ml-4">
                        {item}
                      </Text>
                      <TouchableOpacity
                        className="self-end"
                        onPress={() => {
                          /**
                           * Functionality of x button for recent search history.
                           * - Should also remove deleted query from db.
                           *
                           * How below works:
                           * - `prev` is current value of recentsList
                           * - `.filter((recent) => recent !== item)` recent is
                           *   each element in the array, and if the return value is true
                           *   it is kept, whilst when it is false it is not kept.
                           */
                          setRecentsList((prev) =>
                            prev.filter((recent) => recent !== item)
                          );
                        }}
                      >
                        <Ionicons
                          name="close-outline"
                          size={20}
                          color="#888888"
                        />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
            ListHeaderComponent={
              <Text className="text-2xl">Recent Searches</Text>
            }
            ListHeaderComponentStyle={{
              flex: 1,
              marginTop: "5%",
              marginBottom: "4%",
            }}
          />
          {/** List of popular search results rendered here. */}
          <FlatList
            data={popular}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setSearchQuery(item);
                  }}
                >
                  <View className="flex-1 px-4 py-2 rounded-full border border-dark-300">
                    <Text className="self-center text-base text-dark-300">
                      {item}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            numColumns={3}
            columnWrapperStyle={{
              gap: 13,
              marginBottom: 13,
            }}
            ListHeaderComponent={
              <Text className="text-2xl">Popular Searches</Text>
            }
            ListHeaderComponentStyle={{
              flex: 1,
              marginTop: "5%",
              marginBottom: "4%",
            }}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Search;
