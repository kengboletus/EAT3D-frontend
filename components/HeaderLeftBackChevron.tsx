import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface Props {
  onPress?: () => void;
  text?: string;
}

const HeaderLeftBackChevron = ({ onPress, text }: Props) => {
  return (
    <View className="flex-row">
      <TouchableOpacity onPress={onPress}>
        <Ionicons name="chevron-back" size={28} color="white" />
      </TouchableOpacity>
      <Text className="ml-2 text-white text-lg font-bold">{text}</Text>
    </View>
  );
};

export default HeaderLeftBackChevron;
