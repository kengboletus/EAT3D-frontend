import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface Props {
  onPress?: () => void;
  text?: string;
  chevronColor?: string;
  useArrow?: boolean;
  iconSize?: number;
}

const HeaderLeftBackChevron = ({
  onPress,
  text,
  chevronColor,
  useArrow,
  iconSize,
}: Props) => {
  return (
    <View className="flex-row">
      <TouchableOpacity onPress={onPress}>
        <Ionicons
          name={useArrow ? "arrow-back" : "chevron-back"}
          size={iconSize ?? 28}
          color={chevronColor ?? "white"}
        />
      </TouchableOpacity>
      <Text className="ml-2 text-white text-lg font-bold">{text}</Text>
    </View>
  );
};

export default HeaderLeftBackChevron;
