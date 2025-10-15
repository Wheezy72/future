import * as LocalAuthentication from "expo-local-authentication";

/**
 * Hook exposing biometric availability and authentication.
 */
export function useBiometrics() {
  async function isAvailable() {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      return compatible && enrolled;
    } catch (_e) {
      return false;
    }
  }

  async function authenticate(prompt = "Unlock Future") {
    try {
      const res = await LocalAuthentication.authenticateAsync({
        promptMessage: prompt,
        fallbackLabel: "Use PIN",
        disableDeviceFallback: false
      });
      return res.success;
    } catch (_e) {
      return false;
    }
  }

  return { isAvailable, authenticate };
}