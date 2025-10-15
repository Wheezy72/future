import React, { useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { Subtitle, Body } from "./Typography";

/**
 * Reusable goal card with progress bar and actions.
 */
export default function GoalCard({ goal, onAddProgress, onPause, onResume, onComplete, onPress }) {
  const { theme } = useTheme();
  const pct = Math.min(100, Math.round((goal.progress / Math.max(1, goal.target)) * 100));
  const statusColor = goal.status === "complete" ? theme.colors.success : goal.status === "paused" ? theme.colors.warning : theme.colors.primary;

  const scale = useRef(new Animated.Value(1)).current;
  function pressIn() { Animated.spring(scale, { toValue: 0.98, useNativeDriver: true }).start(); }
  function pressOut() { Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start(); }

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        accessibilityRole="button"
        onPress={() => onPress?.(goal)}
        onPressIn={pressIn}
        onPressOut={pressOut}
        style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
      >
        <View style={styles.header}>
          <Subtitle style={[styles.title, { color: theme.colors.text }]} numberOfLines={1}>{goal.title}</Subtitle>
          <View style={[styles.status, { backgroundColor: statusColor }]} />
        </View>
        <Body style={{ color: theme.colors.muted, marginBottom: 8 }}>{goal.type === "habit" ? "Habit Goal" : "Spending Goal"}</Body>
        <View style={[styles.progressTrack, { backgroundColor: theme.colors.surface }]}>
          <View style={[styles.progressFill, { width: `${pct}%`, backgroundColor: statusColor }]} />
        </View>
        <View style={styles.row}>
          <Body style={{ color: theme.colors.text, fontWeight: "700" }}>{pct}%</Body>
          <Body style={{ color: theme.colors.muted }}>{goal.progress} / {goal.target}</Body>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity accessibilityRole="button" accessibilityLabel="Add progress" style={[styles.btn, { borderColor: theme.colors.border }]} onPress={() => onAddProgress?.(goal)}>
            <Body style={{ color: theme.colors.primary, fontWeight: "700" }}>+ Progress</Body>
          </TouchableOpacity>
          {goal.status === "paused" ? (
            <TouchableOpacity accessibilityRole="button" style={[styles.btn, { borderColor: theme.colors.border }]} onPress={() => onResume?.(goal)}>
              <Body style={{ color: theme.colors.secondary, fontWeight: "700" }}>Resume</Body>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity accessibilityRole="button" style={[styles.btn, { borderColor: theme.colors.border }]} onPress={() => onPause?.(goal)}>
              <Body style={{ color: theme.colors.warning, fontWeight: "700" }}>Pause</Body>
            </TouchableOpacity>
          )}
          <TouchableOpacity accessibilityRole="button" style={[styles.btn, { borderColor: theme.colors.border }]} onPress={() => onComplete?.(goal)}>
            <Body style={{ color: theme.colors.success, fontWeight: "700" }}>Complete</Body>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4
  },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  title: { fontSize: 16, fontWeight: "700", flex: 1, marginRight: 8 },
  status: { width: 8, height: 8, borderRadius: 8 },
  progressTrack: { height: 10, borderRadius: 10, overflow: "hidden", marginBottom: 8 },
  progressFill: { height: 10, borderRadius: 10 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
  actions: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  btn: { paddingVertical: 8, paddingHorizontal: 10, borderRadius: 10, borderWidth: 1 }
});