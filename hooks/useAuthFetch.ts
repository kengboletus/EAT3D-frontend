import { useMemo } from "react";
import { createAuthFetch } from "../api/authFetch";
import { useAuth } from "../context/authContext";

/**
 * Returns a memoized authFetch function that preserves the batching scope,
 * taking the latest user, refresh, and logout functions from AuthContext.
 * All authenticated API calls using this instance will share refresh logic.
 */
export function useAuthFetch() {
  const { user, refresh, logout } = useAuth();

  return useMemo(
    () => createAuthFetch({ user, refresh, logout }),
    [user, refresh, logout]
  );
}
