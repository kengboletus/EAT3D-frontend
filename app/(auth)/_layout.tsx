// (auth)/_layout
//
// Defines the authentication stack (login + onboarding). While auth state
// is loading, we show the splash. If a user is already authenticated, we
// redirect them to the e-shop home. Otherwise, render the auth screens.
import HeaderLeftBackChevron from "@/components/HeaderLeftBackChevron";
import { Redirect, Stack, router } from "expo-router";
import SplashScreen from "../../components/SplashScreen";
import { useAuth } from "../../context/authContext";
import "../globals.css";

const Router = router;

export default function AuthLayout() {
  const { user, isLoading } = useAuth();

  // ✅ 1. Show splash while loading auth state
  if (isLoading) return <SplashScreen />;

  // ✅ 2. Redirect if already authenticated (from login or onboarding)
  if (user) {
    return <Redirect href="/(eshop)/home" />;
  }
  return (
    <Stack
      screenOptions={{
        animation: "fade",
        animationDuration: 150,
      }}
    >
      <Stack.Screen
        name="onboarding"
        options={{
          headerLeft: () => (
            <HeaderLeftBackChevron onPress={Router.back} text="Login" />
          ),
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="logIn"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
