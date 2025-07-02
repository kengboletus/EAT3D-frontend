import { Tabs } from "expo-router";
import React from "react";
import Entypo from "react-native-vector-icons/Entypo";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#8D8D8D",
        tabBarInactiveTintColor: "#D9D9D9",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="home"
              color={focused ? "#8D8D8D" : "#D9D9D9"}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: "Order",
        }}
      />
      <Tabs.Screen
        name="qr"
        options={{
          title: "QR",
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
        }}
      />
    </Tabs>
  );
};

export default _layout;
