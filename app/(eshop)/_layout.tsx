import CustomTabBar from "@/components/CustomTabBar";
import { Redirect, Tabs } from "expo-router";
import React from "react";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import SplashScreen from "../../components/SplashScreen";
import { useAuth } from "../../context/authContext";

/**
 * Fade animation only applies to the screen behind the tab bar and not the
 * tab bar itself. There is no support for tab bar animation in standard
 * react native, so look for library and fix this later.
 */
const TabsLayout = () => {
  const { user, isLoading } = useAuth();

  // Show splash while loading auth
  if (isLoading) return <SplashScreen />;

  // If user is NOT authenticated, redirect to login
  if (!user)
    return <Redirect href="../../(auth)/logIn" relativeToDirectory={true} />;

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        animation: "fade",
        transitionSpec: {
          animation: "timing",
          config: {
            duration: 150,
          },
        },
        tabBarActiveTintColor: "#8D8D8D",
        tabBarInactiveTintColor: "#D9D9D9",
        tabBarStyle: {
          height: 90,
          borderTopWidth: 1,
          borderTopColor: "#CCCDCD",
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
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
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="text-document"
              color={focused ? "#8D8D8D" : "#D9D9D9"}
              size={24}
            />
          ),
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
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="cart"
              color={focused ? "#8D8D8D" : "#D9D9D9"}
              size={26}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person-sharp"
              color={focused ? "#8D8D8D" : "#D9D9D9"}
              size={22}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
