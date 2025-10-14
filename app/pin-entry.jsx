import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useBiometrics } from "../src/hooks/useBiometrics";
import { useHaptics } from "../src/hooks/useHaptics";
import { useTheme } from "../src/hooks/useTheme";
import { setPin, verifyPin, getSecurityPrefs } from "../src/services/auth";
import AnimatedBackground from "../src/components/AnimatedBackground";
import { markUnlocked } from "./index";

/**
 * PIN entry with biometric unlock.
 */
export default function PinEntry() {
  const router = useRouter();
  const { theme } = useTheme();
  const { isAvailable, authenticate } = useBiometrics();
  const { success, error, impact } = useHaptics();

  const [pin, setPinState] = useState("");
  const [newPin, setNewPin] = useState("");
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [mode, setMode] = useState("enter"); // 'enter' or 'set'

  useEffect(() => {
    (async () => {
      const prefs = await getSecurityPrefs();
      setBiometricEnabled(!!prefs.biometrics);
      const avail = await isAvailable();
      if (prefs.biometrics && avail) {
        const ok = await authenticate("Unlock Future");
        if (ok) {
          success();
          markUnlocked();
          router.replace("/(tabs)/home");
        }
      }
    })();
  }, []);

  async function onSubmitPin() {
    try {
      const ok = await verifyPin(pin);
      if (ok) {
        success();
        markUnlocked();
        router.replace("/(tabs)/home");
      } else {
        error();
        Alert.alert("Invalid PIN", "Try again or set a new PIN.");
      }
    } catch (_e) {
      Alert.alert("Error", "Unable to verify PIN.");
    }
  }

  async function onSetPin() {
    try {
      await setPin(newPin);
      success();
      setMode("enter");
      Alert.alert("PIN Saved", "You can now unlock with your PIN.");
    } catch (e) {
      error();
      Alert.alert("Invalid PIN", e.message);
    }
  }

  return (
    <AnimatedBackground>
      <View style={[styles.container, { padding: 16 }]}>
        <Text accessibilityRole="header" style={[styles.title, { color: theme.colors.text }]}>Secure Unlock</Text>
        {mode === "enter" ? (
          <>
            <TextInput
              accessibilityLabel="Enter PIN"
              style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
              keyboardType="numeric"
              secureTextEntry
              maxLength={6}
              value={pin}
              onChangeText={(t) => setPinState(t.replace(/\D/g, ""))}
            />
            <TouchableOpacity accessibilityRole="button" style={[styles.btn, { backgroundColor: theme.colors.primary }]} onPress={onSubmitPin}>
              <Text style={{ color: "#fff", fontWeight: "700" }}>Unlock</Text>
            </TouchableOpacity>
            <TouchableOpacity accessibilityRole="button" style={styles.link} onPress={() => setMode("set")}>
              <Text style={{ color: theme.colors.accent }}>Set new PIN</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TextInput
              accessibilityLabel="Set PIN"
              style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
              keyboardType="numeric"
              secureTextEntry
              maxLength={6}
              value={newPin}
              onChangeText={(t) => setNewPin(t.replace(/\D/g, ""))}
            />
            <TouchableOpacity accessibilityRole="button" style={[styles.btn, { backgroundColor: theme.colors.secondary }]} onPress={onSetPin}>
              <Text style={{ color: "#fff", fontWeight: "700" }}>Save PIN</Text>
            </TouchableOpacity>
            <TouchableOpacity accessibilityRole="button" style={styles.link} onPress={() => setMode("enter")}>
              <Text style={{ color: theme.colors.accent }}>Back to unlock</Text>
            </TouchableOpacity>
          </>
        )}
        {biometricEnabled ? (
          <TouchableOpacity accessibilityRole="button" style={[styles.btnGhost, { borderColor: theme.colors.border }]} onPress={async () => {
            impact("Light");
            const ok = await authenticate("Unlock Future");
            if (ok) {
              success();
              markUnlocked();
              router.replace("/(tabs)/home");
            } else {
              error();
              Alert.alert("Biometric Failed", "Use your PIN.");
            }
          }}>
            <Text style={{ color: theme.colors.text }}>Unlock with Biometrics</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </AnimatedBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  title: { fontSize: 22, fontWeight: "800", marginBottom: 12 },
  input: { width: "80%", borderWidth: 1, borderRadius: 12, padding: 12 },
  btn: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12 },
  btnGhost: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 12, borderWidth: 1, marginTop: 8 },
  link: { marginTop: 8 }
});