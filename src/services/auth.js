import * as SecureStore from "expo-secure-store";
import { getItem, setItem } from "./storage";

/**
 * PIN and security preferences.
 */

const PIN_KEY = "pin_code";
const PREFS_KEY = "security_prefs";

/**
 * Save PIN securely.
 * @param {string} pin 4-6 digits
 */
export async function setPin(pin) {
  if (!/^\d{4,6}$/.test(pin)) throw new Error("PIN must be 4-6 digits");
  await SecureStore.setItemAsync(PIN_KEY, pin, { keychainService: "future_pin" });
}

/**
 * Verify provided PIN.
 * @param {string} pin
 * @returns {Promise<boolean>}
 */
export async function verifyPin(pin) {
  try {
    const saved = await SecureStore.getItemAsync(PIN_KEY, { keychainService: "future_pin" });
    return !!saved && saved === pin;
  } catch (_e) {
    return false;
  }
}

/**
 * Security preferences: biometrics enabled, lockTimeout
 */
export async function getSecurityPrefs() {
  return (await getItem(PREFS_KEY, { biometrics: true, lockTimeout: 300000 })) || { biometrics: true, lockTimeout: 300000 };
}

export async function setSecurityPrefs(prefs) {
  const safe = {
    biometrics: !!prefs.biometrics,
    lockTimeout: Math.max(0, Number(prefs.lockTimeout || 0))
  };
  await setItem(PREFS_KEY, safe);
  return safe;
}