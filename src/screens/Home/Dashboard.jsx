import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { Title, Body } from "../../components/Typography";

/**
 * Dashboard screen: summary of today.
 */
export default function Dashboard({ stats, level }) {
  const { theme } = useTheme();
  return (
    <View>
      <Title accessibilityRole="header" style={styles.title}>Welcome to Future</Title>
      <Body style={{ color: theme.colors.muted, marginBottom: 12 }}>Level {level.level} — {level.title}</Body>
      <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
        <Body style={{ color: theme.colors.text, fontWeight: "700" }}>Today</Body>
        <Body style={{ color: theme.colors.muted }}>Goals: {stats.goals} • Diary entries: {stats.diary} • Expenses: {stats.expenses}</Body>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: "800", marginBottom: 12 },
  card: { borderRadius: 16, padding: 14, borderWidth: 1, marginBottom: 12 }
});