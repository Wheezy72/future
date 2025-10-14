import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Storage service with JSON safety and namespacing.
 */

const NS = "@future_";

export async function getItem(key, fallback = null) {
  try {
    const raw = await AsyncStorage.getItem(NS + key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (_e) {
    return fallback;
  }
}

export async function setItem(key, value) {
  try {
    await AsyncStorage.setItem(NS + key, JSON.stringify(value));
    return true;
  } catch (_e) {
    return false;
  }
}

export async function removeItem(key) {
  try {
    await AsyncStorage.removeItem(NS + key);
    return true;
  } catch (_e) {
    return false;
  }
}