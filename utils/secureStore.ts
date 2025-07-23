import * as SecureStore from "expo-secure-store";

export async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function getValueFor(key: string): Promise<string | null> {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    console.log("🔐 Here's your value 🔐 \n" + result);
  } else {
    console.log("No values stored under that key.");
  }
  return result;
}
