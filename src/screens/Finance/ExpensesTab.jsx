import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { ExpenseCategories } from "../../constants/Categories";
import { addExpense } from "../../services/finance";
import { formatCurrency } from "../../utils/format";

export default function ExpensesTab({ onAdded }) {
  const { theme } = useTheme();
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("food");

  async function onAdd() {
    try {
      const e = await addExpense({ amount: Number(amount), category, note });
      setAmount(""); setNote("");
      onAdded?.(e);
      Alert.alert("Added", `Expense ${formatCurrency(e.amount)} in ${e.category}`);
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  }

  return (
    <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
      <TextInput placeholder="Amount" placeholderTextColor={theme.colors.muted} keyboardType="numeric" value={amount} onChangeText={setAmount} style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]} />
      <TextInput placeholder="Note" placeholderTextColor={theme.colors.muted} value={note} onChangeText={setNote} style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 10 }}>
        {ExpenseCategories.map(c => (
          <TouchableOpacity key={c.key} accessibilityRole="button" onPress={() => setCategory(c.key)} style={[styles.cat, { borderColor: theme.colors.border, backgroundColor: category === c.key ? theme.colors.surface : "transparent" }]}>
            <Text style={{ color: theme.colors.text }}>{c.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity accessibilityRole="button" style={[styles.btn, { backgroundColor: theme.colors.primary }]} onPress={onAdd}>
        <Text style={{ color: "#fff", fontWeight: "700" }}>Add Expense</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 16, padding: 14, borderWidth: 1, marginBottom: 12 },
  input: { borderWidth: 1, borderRadius: 12, padding: 10, marginBottom: 8 },
  cat: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, borderWidth: 1, marginRight: 8 },
  btn: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12 }
});