// src/api/authFetch.ts
//
// Factory that returns a token-aware fetch wrapper built on top of `apiClient`.
// It transparently ensures an up-to-date access token:
// - Reads token from the current user or SecureStore
// - Decodes and checks expiry with `decodeJwt`
// - Triggers a refresh (debounced to a single concurrent call) when expired
// - Logs out and errors if refresh fails or token is missing

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
    // Get the access token from the accepted user object OR from secureStorage.
    let accessToken = user?.accessToken ?? (await getSecureItem("accessToken"));

    if (!accessToken) return null;

    // If the access token exists, check it's expiration (Or if it even has exp field.)
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
