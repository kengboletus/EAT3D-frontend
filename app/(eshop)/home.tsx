import { dummyProducts } from "@/assets/dummies/product";
import ProductCard from "@/components/ProductCard";
import { useRouter } from "expo-router";
import * as React from "react";
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { ScrollView } from "react-native-virtualized-view";

const carouselData = [...new Array(6).keys()];
const width = Dimensions.get("window").width;
const recommended = dummyProducts;
const latest = dummyProducts;

const Home = () => {
  const router = useRouter();
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <SafeAreaView
      className="flex-1 bg-dark-300"
      edges={["top", "left", "right"]}
    >
      {/** Stationary top bar */}
      <View className="flex-col self-start h-44 bg-dark-300 justify-between items-center p-6">
        {/** User info & navigation buttons */}
        <View className="flex-row h-10 min-w-full bg-dark-300 ">
          <MaterialCommunityIcons
            className="self-start mt-0.5 mr-1.5"
            name="account-circle-outline"
            color="white"
            size={32}
          />
          <Text className="text-xl text-white align-middle mt-1.5">
            Hello, {"User"}! {/** Load username here. */}
          </Text>
          {/** Navigation buttons. */}
          <View className="flex-row justify-between items-center ml-auto w-48 h-full bg-dark-300 ">
            {/** To Search. */}
            <TouchableOpacity
              className="h-full aspect-square bg-white rounded-full justify-center items-center"
              onPress={() => {
                router.navigate("/(searchFilter)/search");
              }}
            >
              <Entypo name="magnifying-glass" size={16} color="#585858" />
            </TouchableOpacity>
            {/** To notifications. */}
            <TouchableOpacity className="h-full aspect-square bg-white rounded-full justify-center items-center">
              <MaterialIcons
                name="notifications-none"
                size={20}
                color="#585858"
              />
            </TouchableOpacity>
            {/** To QR. */}
            <TouchableOpacity className="h-full aspect-square bg-white rounded-full justify-center items-center">
              <MaterialCommunityIcons
                name="line-scan"
                size={20}
                color="#585858"
              />
            </TouchableOpacity>
            {/** To favorites. */}
            <TouchableOpacity className="h-full aspect-square bg-white rounded-full justify-center items-center">
              <MaterialCommunityIcons
                name="heart-outline"
                size={20}
                color="#585858"
              />
            </TouchableOpacity>
          </View>
        </View>
        {/** Points. */}
        <View className="flex-row h-14 min-w-full justify-center items-center rounded-full mt-auto bg-white">
          <Text className="text-xl text-dark-300 mr-2">Points</Text>
          <Text className="text-3xl font-bold text-dark-300">{"1,000"}</Text>
        </View>
      </View>
      {/** Scroll area below top bar */}
      <ScrollView className="flex-1 bg-white">
        {/** Promotional banner section */}
        <View className="border-b-2 border-light-300 p-8">
          <Text className="text-2xl text-black pb-5">Promotions</Text>
          {/** Carousel Section. */}
          <View className="flex-1 bg-dark-100 rounded-2xl">
            <Carousel
              ref={ref}
              width={width - 44}
              height={width / 2 - 44}
              data={carouselData}
              onProgressChange={progress}
              renderItem={({ index }) => (
                <View className="flex-1 justify-center">
                  <Text style={{ textAlign: "center", fontSize: 30 }}>
                    {index}
                  </Text>
                </View>
              )}
            />
            <Pagination.Basic
              progress={progress}
              data={carouselData}
              dotStyle={{
                backgroundColor: "rgba(0,0,0,0.2)",
                borderRadius: 50,
              }}
              containerStyle={{ gap: 5, marginTop: 0 }}
              onPress={onPressPagination}
            />
          </View>
        </View>
        {/** Product listing: Recommended */}
        <View className="border-b border-light-300 p-8">
          <Text className="text-2xl text-black pb-5">Recommended Products</Text>
          <FlatList
            data={recommended}
            renderItem={({ item }) => <ProductCard {...item} />}
            keyExtractor={(item) => item.productID.toString()}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "center",
              gap: 15,
              marginBottom: 15,
            }}
            scrollEnabled={false}
          />
        </View>
        <View className="border-b border-light-300 p-8">
          <Text className="text-2xl text-black pb-5">Latest Products</Text>
          <FlatList
            data={latest}
            renderItem={({ item }) => <ProductCard {...item} />}
            keyExtractor={(item) => item.productID.toString()}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "center",
              gap: 15,
              marginBottom: 15,
            }}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
