import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Alert, TextInput } from "react-native";
import AnimatedBackground from "../../src/components/AnimatedBackground";
import { useTheme } from "../../src/hooks/useTheme";
import { analytics, listBudgets, listExpenses, listSavings, addExpense } from "../../src/services/finance";
import Animated, { useSharedValue } from "react-native-reanimated";
import ParallaxHeader from "../../src/components/ParallaxHeader";
import ExpensesTab from "../../src/screens/Finance/ExpensesTab";
import BudgetTab from "../../src/screens/Finance/BudgetTab";
import SavingsTab from "../../src/screens/Finance/SavingsTab";
import AnalyticsTab from "../../src/screens/Finance/AnalyticsTab";
import { formatCurrency } from "../../src/utils/format";
import { Title, Body } from "../../src/components/Typography";

/**
 * Finance tab: Expenses, Budgets, Savings, M-Pesa, Analytics
 */
export default function Finance() {
  const { theme } = useTheme();
  const [page, setPage] = useState("expenses");
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [savings, setSavings] = useState([]);

  // M-Pesa parsing state
  const [mpesaMsg, setMpesaMsg] = useState("");
  const [mpesaAmount, setMpesaAmount] = useState("");
  const [mpesaCategory, setMpesaCategory] = useState("mpesa");

  async function refresh() {
    setExpenses(await listExpenses());
    setBudgets(await listBudgets());
    setSavings(await listSavings());
  }
  useEffect(() => { refresh(); }, []);

  const an = analytics(expenses);
  const scrollY = useSharedValue(0);

  function parseMpesa(msg) {
    // Very simple parser: extract amount and infer category keywords
    const amtMatch = msg.match(/(?:KES|Ksh)\s?([\d,]+(?:\.\d{2})?)/i);
    const amount = amtMatch ? Number(amtMatch[1].replace(/,/g, "")) : 0;
    let cat = "mpesa";
    if (/Buy Goods|Till/i.test(msg)) cat = "food";
    else if (/PayBill|Bill/i.test(msg)) cat = "bills";
    else if (/Send|Sent to|Transfer/i.test(msg)) cat = "transport";
    else if (/Airtime|Bundle/i.test(msg)) cat = "entertainment";
    return { amount, category: cat };
  }

  function onParse() {
    const { amount, category } = parseMpesa(mpesaMsg);
    setMpesaAmount(amount ? String(amount) : "");
    setMpesaCategory(category);
  }

  async function onAddFromMpesa() {
    try {
      const e = await addExpense({ amount: Number(mpesaAmount), category: mpesaCategory, note: "M-Pesa" });
      Alert.alert("Added", `Expense ${formatCurrency(e.amount)} in ${e.category}`);
      setMpesaMsg(""); setMpesaAmount(""); setMpesaCategory("mpesa");
      await refresh();
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  }

  return (
    <AnimatedBackground>
      <View style={styles.header}>
        {["expenses", "budgets", "savings", "mpesa", "analytics"].map((p) => (
          <TouchableOpacity key={p} accessibilityRole="button" style={[styles.tab, { borderColor: theme.colors.border, backgroundColor: page === p ? theme.colors.card : "transparent" }]} onPress={() => setPage(p)}>
            <Body style={{ color: page === p ? theme.colors.text : theme.colors.muted, fontWeight: "700" }}>{capitalize(p)}</Body>
          </TouchableOpacity>
        ))}
      </View>
      <ParallaxHeader title={capitalize(page)} scrollY={scrollY} />
      <Animated.ScrollView
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: (v) => (scrollY.value = v) } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
        contentContainerStyle={{ padding: 16 }}
      >
        {page === "expenses" && <ExpensesTab onAdded={refresh} />}
        {page === "budgets" && <BudgetTab onSaved={refresh} />}
        {page === "savings" && <SavingsTab onSaved={refresh} />}
        {page === "mpesa" && (
          <View>
            <Title accessibilityRole="header" style={styles.title}>M-Pesa Parser</Title>
            <TextInput
              placeholder="Paste M-Pesa message"
              placeholderTextColor={theme.colors.muted}
              value={mpesaMsg}
              onChangeText={setMpesaMsg}
              multiline
              style={{ borderWidth: 1, borderColor: theme.colors.border, borderRadius: 12, padding: 10, color: theme.colors.text, minHeight: 100, marginBottom: 8 }}
            />
            <View style={{ flexDirection: "row", gap: 8, marginBottom: 8 }}>
              <TouchableOpacity accessibilityRole="button" style={[styles.btn, { backgroundColor: theme.colors.secondary }]} onPress={onParse}>
                <Body style={{ color: "#fff", fontWeight: "700" }}>Parse</Body>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", gap: 8, marginBottom: 8 }}>
              <TextInput
                placeholder="Amount"
                placeholderTextColor={theme.colors.muted}
                value={mpesaAmount}
                onChangeText={setMpesaAmount}
                keyboardType="numeric"
                style={{ flex: 1, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 12, padding: 10, color: theme.colors.text }}
              />
              <TextInput
                placeholder="Category (e.g., food, bills, transport, entertainment, mpesa)"
                placeholderTextColor={theme.colors.muted}
                value={mpesaCategory}
                onChangeText={setMpesaCategory}
                style={{ flex: 1, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 12, padding: 10, color: theme.colors.text }}
              />
            </View>
            <TouchableOpacity accessibilityRole="button" style={[styles.btn, { backgroundColor: theme.colors.primary }]} onPress={onAddFromMpesa}>
              <Body style={{ color: "#fff", fontWeight: "700" }}>Add Expense</Body>
            </TouchableOpacity>
          </View>
        )}
        {page === "analytics" && <AnalyticsTab analytics={an} />}
      </Animated.ScrollView>
    </AnimatedBackground>
  );
}

function capitalize(s) { return s.slice(0, 1).toUpperCase() + s.slice(1); }

const styles = StyleSheet.create({
  header: { paddingHorizontal: 16, paddingTop: 16, flexDirection: "row", gap: 8 },
  tab: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 12, borderWidth: 1 },
  title: { fontSize: 22, fontWeight: "800", marginBottom: 12 },
  btn: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12 }
});