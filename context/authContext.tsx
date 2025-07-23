import * as SecureStore from "expo-secure-store";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../utils/api";
import { getValueFor } from "../utils/secureStore";

interface User {
  accessToken: string;
}

interface AuthContextProps {
  user: User | null;
  isLoading: boolean;
  login: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load both tokens on startup
  useEffect(() => {
    (async () => {
      const accessToken = await SecureStore.getItemAsync("accessToken");
      const refreshToken = await SecureStore.getItemAsync("refreshToken");
      //debug
      console.log("Loading tokens...");
      getValueFor("accessToken");
      getValueFor("refreshToken");
      //end debug
      if (accessToken && refreshToken) {
        setUser({ accessToken });
      }
      setIsLoading(false);
    })();
  }, []);

  // Save both tokens
  const login = async (accessToken: string, refreshToken: string) => {
    await SecureStore.setItemAsync("accessToken", accessToken);
    await SecureStore.setItemAsync("refreshToken", refreshToken);
    // debug
    console.log("Logging in...");
    getValueFor("accessToken");
    getValueFor("refreshToken");
    setUser({ accessToken });
  };

  // Clear both tokens
  const logout = async () => {
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
    console.log("Logging out...");
    getValueFor("accessToken");
    getValueFor("refreshToken");
    setUser(null);
  };

  // Try to refresh access token using the refresh token
  const refresh = async () => {
    const refreshToken = await SecureStore.getItemAsync("refresh_token");
    if (!refreshToken) return;

    const response = await fetch(api + "/api/v1/tokens/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: refreshToken }),
    });
    // Success
    if (response.ok) {
      const { accessToken } = await response.json();
      await SecureStore.setItemAsync("access_token", accessToken);
      setUser((prev) => (prev ? { ...prev, accessToken } : null));
    }
    // Failure (invalid refresh token)
    else {
      await logout();
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
