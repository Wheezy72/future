import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from "react-native-reanimated";
import { Title, Subtitle, Caption } from "../../components/Typography";

export default function StreaksTab({ streak }) {
  const { theme } = useTheme();
  const days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d;
  });
  const activeSet = new Set(); // Not passed in; streak only shows count. For demo: fill last N
  for (let i = 0; i < Math.min(streak.streak, 7); i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    activeSet.add(d.toDateString());
  }

  return (
    <View>
      <Title accessibilityRole="header" style={styles.title}>Streaks</Title>
      <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
        <Subtitle style={{ marginBottom: 6 }}>Diary Streak</Subtitle>
        <Caption style={{ marginBottom: 10 }}>{streak.streak} days</Caption>
        <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 6 }}>
          {days.map((d, idx) => <DayBar key={idx} active={activeSet.has(d.toDateString())} />)}
        </View>
      </View>
    </View>
  );
}

function DayBar({ active }) {
  const { theme } = useTheme();
  const h = useSharedValue(0);
  useEffect(() => {
    h.value = withTiming(active ? 28 : 8, { duration: 500 });
  }, [active]);
  const style = useAnimatedStyle(() => ({ height: h.value }));
  return (
    <View style={{ width: 12, alignItems: "center", justifyContent: "flex-end" }}>
      <Animated.View style={[{ width: 12, borderRadius: 6, backgroundColor: active ? theme.colors.secondary : theme.colors.surface }, style]} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: { marginBottom: 12 },
  card: { borderRadius: 16, padding: 14, borderWidth: 1, marginBottom: 12 }
});