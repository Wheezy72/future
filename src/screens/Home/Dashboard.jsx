import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../hooks/useTheme";

/**
 * Dashboard screen: summary of today.
 */
export default function Dashboard({ stats, level }) {
  const { theme } = useTheme();
  return (
    <View>
      <Text accessibilityRole="header" style={[styles.title, { color: theme.colors.text, fontFamily: theme.typography.displayFamily }]}>Welcome to Future</Text>
      <Text style={{ color: theme.colors.muted, marginBottom: 12, fontFamily: theme.typography.textFamily }}>Level {level.level} — {level.title}</Text>
      <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
        <Text style={{ color: theme.colors.text, fontWeight: "700", fontFamily: theme.typography.textFamily }}>Today</Text>
        <Text style={{ color: theme.colors.muted, fontFamily: theme.typography.textFamily }}>Goals: {stats.goals} • Diary entries: {stats.diary} • Expenses: {stats.expenses}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: "800", marginBottom: 12 },
  card: { borderRadius: 16, padding: 14, borderWidth: 1, marginBottom: 12 }
});