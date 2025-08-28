// Root Index Route
//
// Acts as an auth gate and traffic director:
// - While auth state is loading, shows the branded splash screen
// - If authenticated, redirects to the e-shop home
// - If not authenticated, redirects to the login screen
import { Redirect } from "expo-router";
import SplashScreen from "../components/SplashScreen";
import { useAuth } from "../context/authContext";

export default function Index() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    // Show your custom splash or loading component here
    return <SplashScreen />;
  }
  // Redirect based on user presence
  return user ? (
    <Redirect href="/(eshop)/home" relativeToDirectory={true} />
  ) : (
    <Redirect href="/(auth)/logIn" relativeToDirectory={true} />
  );
}
