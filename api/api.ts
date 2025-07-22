import Constants from "expo-constants";

const getApiBaseUrl = () => {
  const isDev = __DEV__;
  const devOrigin = Constants.expoConfig?.hostUri;

  if (isDev && devOrigin) {
    const [host] = devOrigin.split(":");
    return `http://${host}:5500`; // 🔥 Use HTTP not HTTPS
  }

  return "https://api.example.com"; // your production base url
};

export const api = getApiBaseUrl();
