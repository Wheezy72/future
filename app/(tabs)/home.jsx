import React, { useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import AnimatedBackground from "../../src/components/AnimatedBackground";
import { useTheme } from "../../src/hooks/useTheme";
import { getLevel } from "../../src/constants/Levels";
import { listGoals } from "../../src/services/goals";
import { listEntries } from "../../src/services/diary";
import { listExpenses } from "../../src/services/finance";

/**
 * Home tab: Dashboard, Achievements, Quick Stats
 */
export default function Home() {
  const { theme } = useTheme();
  const [page, setPage] = useState("dashboard");
  const [xp, setXp] = useState(0);
  const [stats, setStats] = useState({ goals: 0, diary: 0, expenses: 0 });

  useEffect(() => {
    (async () => {
      const goals = await listGoals();
      const entries = await listEntries();
      const expenses = await listExpenses();
      setStats({ goals: goals.length, diary: entries.length, expenses: expenses.length });
      const xpTotal = entries.reduce((sum, e) => sum + (e.xp || 0), 0) + goals.reduce((s, g) => s + Math.min(g.progress, g.target), 0);
      setXp(xpTotal);
    })();
  }, []);

  const level = useMemo(() => getLevel(xp), [xp]);

  return (
    <AnimatedBackground>
      <View style={styles.header}>
        {["dashboard", "achievements", "quick"].map((p) => (
          <TouchableOpacity key={p} accessibilityRole="button" style={[styles.tab, { borderColor: theme.colors.border, backgroundColor: page === p ? theme.colors.card : "transparent" }]} onPress={() => setPage(p)}>
            <Text style={{ color: page === p ? theme.colors.text : theme.colors.muted, fontWeight: "700" }}>{p === "quick" ? "Quick Stats" : capitalize(p)}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {page === "dashboard" && (
          <View>
            <Text accessibilityRole="header" style={[styles.title, { color: theme.colors.text }]}>Welcome to Future</Text>
            <Text style={{ color: theme.colors.muted, marginBottom: 12 }}>Level {level.level} — {level.title}</Text>
            <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
              <Text style={{ color: theme.colors.text, fontWeight: "700" }}>Today</Text>
              <Text style={{ color: theme.colors.muted }}>Goals: {stats.goals} • Diary entries: {stats.diary} • Expenses: {stats.expenses}</Text>
            </View>
          </View>
        )}
        {page === "achievements" && (
          <View>
            <Text accessibilityRole="header" style={[styles.title, { color: theme.colors.text }]}>Achievements</Text>
            <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
              <Text style={{ color: theme.colors.text }}>Consistency Champion</Text>
              <Text style={{ color: theme.colors.muted }}>Maintain a 7-day diary streak</Text>
            </View>
            <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
              <Text style={{ color: theme.colors.text }}>Budget Boss</Text>
              <Text style={{ color: theme.colors.muted }}>Keep expenses under budget for a month</Text>
            </View>
          </View>
        )}
        {page === "quick" && (
          <View>
            <Text accessibilityRole="header" style={[styles.title, { color: theme.colors.text }]}>Quick Stats</Text>
            <View style={[styles.row]}>
              <Stat label="Goals" value={stats.goals} color={theme.colors.primary} />
              <Stat label="Diary" value={stats.diary} color={theme.colors.secondary} />
              <Stat label="Expenses" value={stats.expenses} color={theme.colors.accent} />
            </View>
          </View>
        )}
      </ScrollView>
    </AnimatedBackground>
  );
}

function Stat({ label, value, color }) {
  return (
    <View style={{ flex: 1, padding: 12, borderRadius: 14, borderWidth: 1, borderColor: "rgba(0,0,0,0.06)" }}>
      <Text style={{ color: "#64748B", marginBottom: 6 }}>{label}</Text>
      <Text style={{ color, fontSize: 20, fontWeight: "800" }}>{value}</Text>
    </View>
  );
}

function capitalize(s) { return s.slice(0, 1).toUpperCase() + s.slice(1); }

const styles = StyleSheet.create({
  header: { paddingHorizontal: 16, paddingTop: 16, flexDirection: "row", gap: 8 },
  tab: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 12, borderWidth: 1 },
  title: { fontSize: 22, fontWeight: "800", marginBottom: 12 },
  card: { borderRadius: 16, padding: 14, borderWidth: 1, marginBottom: 12 },
  row: { flexDirection: "row", gap: 8 }
});