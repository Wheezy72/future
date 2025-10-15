import React, { useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { formatDate } from "../utils/format";

/**
 * Diary entry card.
 */
export default function DiaryCard({ entry, onPress, onDelete }) {
  const { theme } = useTheme();
  const scale = useRef(new Animated.Value(1)).current;
  function pressIn() { Animated.spring(scale, { toValue: 0.98, useNativeDriver: true }).start(); }
  function pressOut() { Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start(); }

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity accessibilityRole="button" onPress={() => onPress?.(entry)} onPressIn={pressIn} onPressOut={pressOut} style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
        <View style={styles.row}>
          <Text style={[styles.date, { color: theme.colors.muted }]}>{formatDate(entry.date)}</Text>
          <Text style={{ fontSize: 18 }}>{entry.mood === "happy" ? "😊" : entry.mood === "calm" ? "😌" : "📝"}</Text>
        </View>
        <Text style={{ color: theme.colors.text }} numberOfLines={3}>{entry.text}</Text>
        <View style={styles.actions}>
          <TouchableOpacity accessibilityRole="button" style={[styles.btn, { borderColor: theme.colors.border }]} onPress={() => onPress?.(entry)}>
            <Text style={{ color: theme.colors.primary, fontWeight: "700" }}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity accessibilityRole="button" style={[styles.btn, { borderColor: theme.colors.border }]} onPress={() => onDelete?.(entry)}>
            <Text style={{ color: theme.colors.danger, fontWeight: "700" }}>Delete</Text>
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
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3
  },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
  date: { fontWeight: "700" },
  actions: { flexDirection: "row", gap: 8, marginTop: 8 },
  btn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 10, borderWidth: 1 }
});