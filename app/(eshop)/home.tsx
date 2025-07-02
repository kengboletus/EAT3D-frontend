import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const home = () => {
  return (
    <SafeAreaView className="bg-dark-300" edges={["top", "left", "right"]}>
      {/** Stationary top bar */}
      <View className="flex-col self-start h-44 bg-dark-300 justify-between items-center p-6">
        {/** horizontal navigation bar */}
        <View className="flex-row h-10 min-w-full bg-dark-300 ">
          <MaterialCommunityIcons
            className="self-start mt-0.5 mr-1.5"
            name="account-circle-outline"
            color="white"
            size={32}
          />
          <Text className="text-xl text-white align-middle mt-1.5">
            Hello, {"User"}!
          </Text>
          <View className="flex-row justify-between items-center ml-auto w-48 h-full bg-dark-300 ">
            <TouchableOpacity className="h-full aspect-square bg-white rounded-full justify-center items-center">
              <Entypo name="magnifying-glass" size={16} color="#585858" />
            </TouchableOpacity>
            <TouchableOpacity className="h-full aspect-square bg-white rounded-full justify-center items-center">
              <MaterialIcons
                name="notifications-none"
                size={20}
                color="#585858"
              />
            </TouchableOpacity>
            <TouchableOpacity className="h-full aspect-square bg-white rounded-full justify-center items-center">
              <MaterialCommunityIcons
                name="line-scan"
                size={20}
                color="#585858"
              />
            </TouchableOpacity>
            <TouchableOpacity className="h-full aspect-square bg-white rounded-full justify-center items-center">
              <MaterialCommunityIcons
                name="heart-outline"
                size={20}
                color="#585858"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-row h-14 min-w-full justify-center items-center rounded-full mt-auto bg-white">
          <Text className="text-xl text-dark-300 mr-2">Points</Text>
          <Text className="text-3xl font-bold text-dark-300">{"1,000"}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default home;
