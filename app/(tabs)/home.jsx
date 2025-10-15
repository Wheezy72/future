import React, { useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AnimatedBackground from "../../src/components/AnimatedBackground";
import { useTheme } from "../../src/hooks/useTheme";
import { getLevel } from "../../src/constants/Levels";
import { listGoals } from "../../src/services/goals";
import { listEntries } from "../../src/services/diary";
import { listExpenses } from "../../src/services/finance";
import Animated, { useSharedValue } from "react-native-reanimated";
import ParallaxHeader from "../../src/components/ParallaxHeader";
import Dashboard from "../../src/screens/Home/Dashboard";
import Achievements from "../../src/screens/Home/Achievements";
import QuickStats from "../../src/screens/Home/QuickStats";

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

  const scrollY = useSharedValue(0);

  return (
    <AnimatedBackground>
      <View style={styles.header}>
        {["dashboard", "achievements", "quick"].map((p) => (
          <TouchableOpacity key={p} accessibilityRole="button" style={[styles.tab, { borderColor: theme.colors.border, backgroundColor: page === p ? theme.colors.card : "transparent" }]} onPress={() => setPage(p)}>
            <Text style={{ color: page === p ? theme.colors.text : theme.colors.muted, fontWeight: "700" }}>{p === "quick" ? "Quick Stats" : capitalize(p)}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ParallaxHeader title={page === "quick" ? "Quick Stats" : capitalize(page)} scrollY={scrollY} />
      <Animated.ScrollView
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: (v) => (scrollY.value = v) } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
        contentContainerStyle={{ padding: 16 }}
      >
        {page === "dashboard" && <Dashboard stats={stats} level={level} />}
        {page === "achievements" && <Achievements />}
        {page === "quick" && <QuickStats stats={stats} />}
      </Animated.ScrollView>
    </AnimatedBackground>
  );
}

function capitalize(s) { return s.slice(0, 1).toUpperCase() + s.slice(1); }

const styles = StyleSheet.create({
  header: { paddingHorizontal: 16, paddingTop: 16, flexDirection: "row", gap: 8 },
  tab: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 12, borderWidth: 1 }
});