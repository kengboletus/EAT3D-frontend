// src/api/authFetch.ts

import { getSecureItem } from "../utils/secureStore";
import { decodeJwt } from "../utils/tokenUtils"; // your JWT decode + expiry helpers
import { apiClient } from "./apiClient";

interface AuthFetchParams {
  user: { accessToken: string } | null;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
}

export function createAuthFetch({ user, refresh, logout }: AuthFetchParams) {
  // Prevent concurrent refresh calls
  let isRefreshing = false;
  let refreshPromise: Promise<void> | null = null;

  // Validate and refresh token if expired
  async function getValidAccessToken(): Promise<string | null> {
    let accessToken = user?.accessToken ?? (await getSecureItem("accessToken"));

    if (!accessToken) return null;

    const decoded = decodeJwt(accessToken);
    const now = Math.floor(Date.now() / 1000);

    if (!decoded?.exp || decoded.exp < now) {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = refresh()
          .catch(async (err) => {
            await logout(); // logout on refresh failure
            throw err;
          })
          .finally(() => {
            isRefreshing = false;
            refreshPromise = null;
          });
      }
      await refreshPromise;

      // Fetch the updated token from secure storage after refresh
      accessToken = await getSecureItem("accessToken");
    }

    return accessToken!;
  }

  /**
   * Wrapper function around apiClient to perform token-aware requests
   *
   * @param endpoint - relative or absolute URL to API resource
   * @param config - optional fetch config (method, body, headers, etc.)
   */
  return async function authFetch<T = any>(
    endpoint: string,
    config: RequestInit = {}
  ): Promise<T> {
    const accessToken = await getValidAccessToken();

    if (!accessToken) {
      await logout();
      throw new Error("No valid access token available");
    }

    // Inject the access token as authToken for apiClient to attach Authorization header
    return apiClient<T>(endpoint, {
      ...config,
      authToken: accessToken,
    });
  };
}
