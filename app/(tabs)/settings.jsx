import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert, Switch } from "react-native";
import AnimatedBackground from "../../src/components/AnimatedBackground";
import { useTheme } from "../../src/hooks/useTheme";
import { getSecurityPrefs, setSecurityPrefs, setPin } from "../../src/services/auth";

/**
 * Settings: Theme, Security, Backup/Restore, Notifications
 */
export default function Settings() {
  const { theme, mode, setMode } = useTheme();
  const [prefs, setPrefs] = useState({ biometrics: true, lockTimeout: 300000 });
  const [pin, setPinInput] = useState("");

  useEffect(() => {
    (async () => setPrefs(await getSecurityPrefs()))();
  }, []);

  async function onSavePrefs() {
    try {
      const saved = await setSecurityPrefs(prefs);
      setPrefs(saved);
      Alert.alert("Saved", "Preferences updated");
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  }

  async function onSavePin() {
    try {
      await setPin(pin);
      setPinInput("");
      Alert.alert("Saved", "PIN updated");
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  }

  return (
    <AnimatedBackground>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text accessibilityRole="header" style={[styles.title, { color: theme.colors.text }]}>Preferences</Text>
        <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <Text style={{ color: theme.colors.text, fontWeight: "700", marginBottom: 8 }}>Theme</Text>
          <View style={{ flexDirection: "row", gap: 8 }}>
            {["light", "dark"].map(m => (
              <TouchableOpacity key={m} accessibilityRole="button" onPress={() => setMode(m)} style={[styles.cat, { borderColor: theme.colors.border, backgroundColor: mode === m ? theme.colors.surface : "transparent" }]}>
                <Text style={{ color: theme.colors.text }}>{m.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <Text style={{ color: theme.colors.text, fontWeight: "700", marginBottom: 8 }}>Security</Text>
          <View style={styles.row}>
            <Text style={{ color: theme.colors.text, flex: 1 }}>Biometric Login</Text>
            <Switch value={prefs.biometrics} onValueChange={(v) => setPrefs(p => ({ ...p, biometrics: v }))} />
          </View>
          <View style={styles.row}>
            <Text style={{ color: theme.colors.text, flex: 1 }}>Lock Timeout (ms)</Text>
            <TextInput keyboardType="numeric" value={String(prefs.lockTimeout)} onChangeText={(v) => setPrefs(p => ({ ...p, lockTimeout: Number(v) }))} style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text, flex: 1 }]} />
          </View>
          <View style={styles.row}>
            <Text style={{ color: theme.colors.text, flex: 1 }}>Set PIN</Text>
            <TextInput secureTextEntry keyboardType="numeric" maxLength={6} value={pin} onChangeText={setPinInput} style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text, flex: 1 }]} />
          </View>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <TouchableOpacity accessibilityRole="button" style={[styles.btn, { backgroundColor: theme.colors.secondary }]} onPress={onSavePrefs}>
              <Text style={{ color: "#fff", fontWeight: "700" }}>Save Preferences</Text>
            </TouchableOpacity>
            <TouchableOpacity accessibilityRole="button" style={[styles.btn, { backgroundColor: theme.colors.primary }]} onPress={onSavePin}>
              <Text style={{ color: "#fff", fontWeight: "700" }}>Save PIN</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <Text style={{ color: theme.colors.text, fontWeight: "700", marginBottom: 8 }}>Backup & Restore</Text>
          <Text style={{ color: theme.colors.muted }}>Use export/import within Wellness → Diary.</Text>
        </View>

        <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <Text style={{ color: theme.colors.text, fontWeight: "700", marginBottom: 8 }}>Notifications</Text>
          <Text style={{ color: theme.colors.muted }}>Local notifications can be added as an enhancement.</Text>
        </View>
      </ScrollView>
    </AnimatedBackground>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: "800", marginBottom: 12 },
  card: { borderRadius: 16, padding: 14, borderWidth: 1, marginBottom: 12 },
  input: { borderWidth: 1, borderRadius: 12, padding: 10 },
  cat: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, borderWidth: 1, marginRight: 8 },
  btn: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12 },
  row: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 }
});