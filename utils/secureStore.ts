// secureStore
//
// Thin wrappers around Expo SecureStore to set, get, delete, and bulk-clear
// secrets like tokens. Centralizes options and keeps the rest of the app
// decoupled from the underlying storage API.
import * as SecureStore from "expo-secure-store";

/**
 * Set a value for a given key in SecureStore.
 */
export const setSecureItem = async (
  key: string,
  value: string
): Promise<void> => {
  await SecureStore.setItemAsync(key, value, {
    keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  });
};

/**
 * Get a value for a given key from SecureStore.
 */
export const getSecureItem = async (key: string): Promise<string | null> => {
  return await SecureStore.getItemAsync(key);
};

/**
 * Delete a key from SecureStore.
 */
export const deleteSecureItem = async (key: string): Promise<void> => {
  await SecureStore.deleteItemAsync(key);
};

/**
 * Bulk clear a list of known keys from SecureStore.
 */
export const clearSecureItems = async (keys: string[]): Promise<void> => {
  await Promise.all(keys.map(deleteSecureItem));
};
