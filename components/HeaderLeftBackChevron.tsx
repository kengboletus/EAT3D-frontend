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
          size={iconSize ?? 22}
          color={chevronColor ?? "text-dark-200"}
        />
      </TouchableOpacity>
      <Text className=" text-dark-200 text-lg font-bold">{text}</Text>
    </View>
  );
};

export default HeaderLeftBackChevron;
