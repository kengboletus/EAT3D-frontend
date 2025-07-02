import { Tabs } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
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
