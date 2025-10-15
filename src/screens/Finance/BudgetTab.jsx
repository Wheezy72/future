import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { upsertBudget } from "../../services/finance";

export default function BudgetTab({ onSaved }) {
  const { theme } = useTheme();
  const [category, setCategory] = useState("food");
  const [limit, setLimit] = useState("100");
  const [period, setPeriod] = useState("monthly");

  async function onSave() {
    try {
      await upsertBudget({ category, limit: Number(limit), period });
      onSaved?.();
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  }

  return (
    <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
      <TextInput placeholder="Category" placeholderTextColor={theme.colors.muted} value={category} onChangeText={setCategory} style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]} />
      <TextInput placeholder="Limit" placeholderTextColor={theme.colors.muted} keyboardType="numeric" value={limit} onChangeText={setLimit} style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]} />
      <TextInput placeholder="Period (weekly/monthly)" placeholderTextColor={theme.colors.muted} value={period} onChangeText={setPeriod} style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]} />
      <TouchableOpacity accessibilityRole="button" style={[styles.btn, { backgroundColor: theme.colors.primary }]} onPress={onSave}>
        <Text style={{ color: "#fff", fontWeight: "700" }}>Save Budget</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 16, padding: 14, borderWidth: 1, marginBottom: 12 },
  input: { borderWidth: 1, borderRadius: 12, padding: 10, marginBottom: 8 },
  btn: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12 }
});