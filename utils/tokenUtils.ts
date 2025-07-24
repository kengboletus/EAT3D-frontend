import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
  exp?: number; // Expiration time (in Unix timestamp seconds)
  iat?: number; // Issued At timestamp
  [key: string]: any; // Other claims (including userId, roles, etc)
}

export function decodeJwt(token: string | null | undefined): JwtPayload | null {
  if (!token) return null;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded;
  } catch (error) {
    console.warn("Failed to decode JWT token:", error);
    return null;
  }
}

/**
 * Checks if the JWT token is expired.
 * Returns `true` if expired or no expiration claim found.
 * Returns `false` if token is valid.
 */
export function isTokenExpired(token: string | null | undefined): boolean {
  if (!token) return true;

  const decoded = decodeJwt(token);
  if (!decoded || !decoded.exp) {
    // Treat tokens without exp as expired for safety
    return true;
  }

  const currentTimeSec = Math.floor(Date.now() / 1000);

  return decoded.exp < currentTimeSec;
}

/**
 * Returns the remaining time until token expiration in seconds.
 * Returns 0 if token is expired or invalid, or expiration is not present.
 */
export function getTokenRemainingTime(
  token: string | null | undefined
): number {
  if (!token) return 0;

  const decoded = decodeJwt(token);
  if (!decoded || !decoded.exp) return 0;

  const currentTimeSec = Math.floor(Date.now() / 1000);
  const remaining = decoded.exp - currentTimeSec;

  return remaining > 0 ? remaining : 0;
}

/**
 * Example: Extract a specific claim from token.
 *
 * @param token JWT string
 * @param claimKey The key of claim to retrieve
 * @returns The claim value or undefined if not found
 */
export function getClaimFromToken<T = any>(
  token: string | null | undefined,
  claimKey: string
): T | undefined {
  if (!token) return undefined;

  const decoded = decodeJwt(token);
  if (!decoded) return undefined;

  return decoded[claimKey] as T | undefined;
}
