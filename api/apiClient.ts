import { api } from "../utils/api";

/**
 * @param endpoint - The endpoint path (relative or absolute).
 * @param config - Fetch config. Optionally pass 'authToken' for Authorization.
 */
export async function apiClient<T = any>(
  endpoint: string,
  {
    authToken,
    headers,
    ...customConfig
  }: RequestInit & { authToken?: string } = {}
): Promise<T> {
  // Compose full URL: prepend base API URL unless already absolute
  const url = endpoint.startsWith("http") ? endpoint : `${api}${endpoint}`;

  // Use Headers class for TS type safety and easy setting
  const combinedHeaders = new Headers(headers);

  // Always set JSON content type
  combinedHeaders.set("Content-Type", "application/json");

  // Optionally attach Bearer token
  if (authToken) {
    combinedHeaders.set("Authorization", `Bearer ${authToken}`);
  }

  // Send request
  const response = await fetch(url, {
    ...customConfig,
    headers: combinedHeaders,
  });

  // Try parsing JSON
  let data: T | undefined;
  try {
    data = await response.json();
  } catch {
    data = undefined;
  }

  if (!response.ok) {
    // Throw error with server message or fallback message
    const errorMsg =
      (data as any)?.message || `Request failed with status ${response.status}`;
    throw new Error(errorMsg);
  }

  return data!;
}
