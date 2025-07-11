import { Stack, router } from "expo-router";
import React from "react";

const SearchStackLayout = () => {
  const Router = router;
  return (
    <Stack
      screenOptions={{
        animation: "fade",
        animationDuration: 150,
      }}
    >
      <Stack.Screen
        name="search"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default SearchStackLayout;
