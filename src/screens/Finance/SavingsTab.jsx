import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { upsertSaving } from "../../services/finance";

export default function SavingsTab({ onSaved }) {
  const { theme } = useTheme();
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("500");
  const [saved, setSaved] = useState("0");

  async function onSave() {
    try {
      await upsertSaving({ title, target: Number(target), saved: Number(saved) });
      onSaved?.();
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  }

  return (
    <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
      <TextInput placeholder="Saving title" placeholderTextColor={theme.colors.muted} value={title} onChangeText={setTitle} style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]} />
      <TextInput placeholder="Target" placeholderTextColor={theme.colors.muted} keyboardType="numeric" value={target} onChangeText={setTarget} style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]} />
      <TextInput placeholder="Saved" placeholderTextColor={theme.colors.muted} keyboardType="numeric" value={saved} onChangeText={setSaved} style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]} />
      <TouchableOpacity accessibilityRole="button" style={[styles.btn, { backgroundColor: theme.colors.primary }]} onPress={onSave}>
        <Text style={{ color: "#fff", fontWeight: "700" }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 16, padding: 14, borderWidth: 1, marginBottom: 12 },
  input: { borderWidth: 1, borderRadius: 12, padding: 10, marginBottom: 8 },
  btn: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12 }
});