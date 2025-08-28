// (searchFilter)/_layout
//
// Stack for search-related screens. Currently hosts `search` (header hidden)
// and can be extended with filter or results screens. Uses a short fade
// transition to match the app's animation cadence.
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
