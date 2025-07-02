import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

// Need to create big button in the middle.
export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View className="flex-row h-24 bg-white border-t border-[#CCCDCD] items-center justify-between px-2.5">
      {state.routes.map((route, index) => {
        // Central button (e.g., index === 2 for the third tab)
        if (index === 2) {
          return (
            <View
              key={route.key}
              className="flex-2 items-center justify-center relative -top-6"
            >
              <TouchableOpacity
                onPress={() => navigation.navigate(route.name)}
                className="w-[90px] h-[90px] rounded-full bg-light-400 items-center justify-center"
                activeOpacity={1}
                style={{
                  shadowOpacity: 0,
                }}
              >
                {/** Place logo here. */}
                <Image />
              </TouchableOpacity>
            </View>
          );
        }

        // Regular tab buttons
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            className="flex-1 items-center justify-center h-full"
            activeOpacity={1}
          >
            {options.tabBarIcon &&
              options.tabBarIcon({
                focused: isFocused,
                color: isFocused ? "#8D8D8D" : "#D9D9D9",
                size: 24,
              })}
            <Text
              className={`text-xs ${
                isFocused ? "text-[#8D8D8D]" : "text-[#D9D9D9]"
              }`}
            >
              {options.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
