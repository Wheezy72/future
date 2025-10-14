import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from "react-native";
import AnimatedBackground from "../../src/components/AnimatedBackground";
import { useTheme } from "../../src/hooks/useTheme";
import { addExpense, analytics, listBudgets, listExpenses, listSavings, upsertBudget, upsertSaving } from "../../src/services/finance";
import { ExpenseCategories } from "../../src/constants/Categories";
import { formatCurrency } from "../../src/utils/format";

/**
 * Finance tab: Expenses, Budgets, Savings, M-Pesa, Analytics
 */
export default function Finance() {
  const { theme } = useTheme();
  const [page, setPage] = useState("expenses");
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [savings, setSavings] = useState([]);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("food");

  async function refresh() {
    setExpenses(await listExpenses());
    setBudgets(await listBudgets());
    setSavings(await listSavings());
  }
  useEffect(() => { refresh(); }, []);

  async function onAddExpense() {
    try {
      const e = await addExpense({ amount: Number(amount), category, note });
      setAmount(""); setNote("");
      await refresh();
      Alert.alert("Added", `Expense ${formatCurrency(e.amount)} in ${e.category}`);
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  }

  async function onUpsertBudget() {
    try {
      await upsertBudget({ category, limit: Number(amount), period: "monthly" });
      await refresh();
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  }

  async function onUpsertSaving() {
    try {
      await upsertSaving({ title: note || "Goal", target: Number(amount), saved: 0 });
      await refresh();
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  }

  const an = analytics(expenses);

  return (
    <AnimatedBackground>
      <View style={styles.header}>
        {["expenses", "budgets", "savings", "mpesa", "analytics"].map((p) => (
          <TouchableOpacity key={p} accessibilityRole="button" style={[styles.tab, { borderColor: theme.colors.border, backgroundColor: page === p ? theme.colors.card : "transparent" }]} onPress={() => setPage(p)}>
            <Text style={{ color: page === p ? theme.colors.text : theme.colors.muted, fontWeight: "700" }}>{capitalize(p)}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {(page === "expenses" || page === "budgets" || page === "savings") && (
          <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <TextInput placeholder="Amount" placeholderTextColor={theme.colors.muted} keyboardType="numeric" value={amount} onChangeText={setAmount} style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]} />
            <TextInput placeholder={page === "savings" ? "Saving title" : "Note"} placeholderTextColor={theme.colors.muted} value={note} onChangeText={setNote} style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 10 }}>
              {ExpenseCategories.map(c => (
                <TouchableOpacity key={c.key} accessibilityRole="button" onPress={() => setCategory(c.key)} style={[styles.cat, { borderColor: theme.colors.border, backgroundColor: category === c.key ? theme.colors.surface : "transparent" }]}>
                  <Text style={{ color: theme.colors.text }}>{c.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity accessibilityRole="button" style={[styles.btn, { backgroundColor: theme.colors.primary }]} onPress={page === "expenses" ? onAddExpense : page === "budgets" ? onUpsertBudget : onUpsertSaving}>
              <Text style={{ color: "#fff", fontWeight: "700" }}>{page === "expenses" ? "Add Expense" : page === "budgets" ? "Save Budget" : "Add Saving"}</Text>
            </TouchableOpacity>
          </View>
        )}

        {page === "mpesa" && (
          <View>
            <Text accessibilityRole="header" style={[styles.title, { color: theme.colors.text }]}>M-Pesa</Text>
            <Text style={{ color: theme.colors.muted, marginBottom: 12 }}>Track M-Pesa related expenses by using the M-Pesa category above. Integrations can be added later via APIs.</Text>
          </View>
        )}

        {page === "analytics" && (
          <View>
            <Text accessibilityRole="header" style={[styles.title, { color: theme.colors.text }]}>Analytics</Text>
            <Text style={{ color: theme.colors.muted, marginBottom: 12 }}>Total: {formatCurrency(an.total)}</Text>
            {Object.entries(an.byCategory).map(([k, v]) => (
              <View key={k} style={[styles.row, { marginBottom: 8 }]}>
                <Text style={{ color: theme.colors.text, flex: 1 }}>{k}</Text>
                <Text style={{ color: theme.colors.muted }}>{formatCurrency(v)}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </AnimatedBackground>
  );
}

function capitalize(s) { return s.slice(0, 1).toUpperCase() + s.slice(1); }

const styles = StyleSheet.create({
  header: { paddingHorizontal: 16, paddingTop: 16, flexDirection: "row", gap: 8 },
  tab: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 12, borderWidth: 1 },
  title: { fontSize: 22, fontWeight: "800", marginBottom: 12 },
  card: { borderRadius: 16, padding: 14, borderWidth: 1, marginBottom: 12 },
  input: { borderWidth: 1, borderRadius: 12, padding: 10, marginBottom: 8 },
  cat: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, borderWidth: 1, marginRight: 8 },
  btn: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12 }
});