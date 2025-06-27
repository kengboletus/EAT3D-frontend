import HeaderLeftBackChevron from "@/components/HeaderLeftBackChevron";
import { Stack, router } from "expo-router";
import "./globals.css";

const Router = router;

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="onboarding"
        options={{
          headerLeft: () => (
            <HeaderLeftBackChevron onPress={Router.back} text="Log in" />
          ),
          headerStyle: { backgroundColor: "#585858" },
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />
    </Stack>
  );
}
