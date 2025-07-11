import { Link } from "expo-router";
import React from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

/** To do list:
 *  - Replace placeholder with imagePath (Should be URL received from backend.)
 *  - Add discount field to Product object interface as well as props here.
 *  - Add functionality for favoriting and adding to shopping cart (onPress
 *    functions).
 *  - Passing correct props to product detail page. ( Fetch from backend again
 *    at product details page according to productID? )
 */

const ProductCard = ({ productID, productName, price, imagePath }: Product) => {
  return (
    <View className="w-[50%] h-64 rounded-lg border border-light-300">
      <Link href={`/product/${productID}`} asChild>
        <TouchableWithoutFeedback>
          <View className="h-[52%]">
            <Image
              source={{
                uri: "https://placehold.co/400x400/1a1a1a1/4D4D4D.png",
              }}
              className="w-full h-full"
              resizeMode="cover"
            />
            <View className="absolute bottom-2 left-2 bg-dark-300 rounded-full px-3 py-1">
              <Text className="text-white text-xs">{"discounts"}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Link>
      {/* Content */}
      <View className="p-3">
        <Text className="text-gray-800 text-sm">{productName}</Text>
        <View className="flex-row items-end mb-4">
          <Text className="text-lg font-bold text-black">
            $ {price.toFixed(2)}
          </Text>
          <Text className="text-light-400 line-through text-sm">
            ${price.toFixed(2)}
          </Text>
        </View>
        <View className="flex-row justify-end gap-3">
          <TouchableOpacity
            className="bg-dark-300 p-2 rounded-full"
            onPress={() => {}}
          >
            <MaterialIcons name="shopping-cart" size={15} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-dark-300 p-2 rounded-full"
            onPress={() => {}}
          >
            <MaterialIcons name="favorite-border" size={15} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;
