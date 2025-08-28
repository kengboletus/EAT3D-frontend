// api.ts
//
// Computes the base API URL based on environment. In dev, derives the
// machine host from Expo's hostUri and uses a local port (HTTP). In prod,
// falls back to a configured HTTPS endpoint.
import Constants from "expo-constants";

const getApiBaseUrl = () => {
  // __DEV__ is a React Native global variable that indicates a launch in dev mode.
  const isDev = __DEV__;
  // Retrieves development host URI.
  const devOrigin = Constants.expoConfig?.hostUri;

  if (isDev && devOrigin) {
    const [host] = devOrigin.split(":");
    return `http://${host}:5500`; // 🔥 Use HTTP not HTTPS
  }

  return "https://api.example.com"; // your production base url
};

export const api = getApiBaseUrl();
