import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../utils/api";
import {
  deleteSecureItem,
  getSecureItem,
  setSecureItem,
} from "../utils/secureStore";

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
      const accessToken = await getSecureItem("accessToken");
      const refreshToken = await getSecureItem("refreshToken");
      //debug
      console.log(
        `Loading tokens...\naccess: ${accessToken}\nrefresh: ${refreshToken}`
      );
      //end debug
      if (accessToken && refreshToken) {
        setUser({ accessToken });
      }
      setIsLoading(false);
    })();
  }, []);

  // Save both tokens
  const login = async (accessToken: string, refreshToken: string) => {
    await setSecureItem("accessToken", accessToken);
    await setSecureItem("refreshToken", refreshToken);
    // debug
    console.log(`Logging in...`);
    setUser({ accessToken });
  };

  // Clear both tokens
  const logout = async () => {
    try {
      console.log("Revoking tokens...");
      const refreshToken = await getSecureItem("refreshToken");
      if (refreshToken) {
        await fetch(api + "/api/v1/tokens/revoke", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        });
      }
    } catch (error) {
      console.error("Error revoking token on logout:", error);
    } finally {
      await deleteSecureItem("accessToken");
      await deleteSecureItem("refreshToken");
      setUser(null);
    }
  };

  // Try to refresh access token using the refresh token
  const refresh = async () => {
    try {
      console.log("Refreshing token...");
      const refreshToken = await getSecureItem("refreshToken");
      if (!refreshToken) {
        await logout();
        return;
      }

      const response = await fetch(api + "/api/v1/tokens/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        await logout();
        return;
      }

      const { accessToken } = await response.json();
      await setSecureItem("accessToken", accessToken);
      setUser((prev) => (prev ? { ...prev, accessToken } : null));
    } catch (error) {
      console.error("Failed to refresh token:", error);
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
