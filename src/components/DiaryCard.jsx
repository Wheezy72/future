import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { formatDate } from "../utils/format";

/**
 * Diary entry card.
 */
export default function DiaryCard({ entry, onPress, onDelete }) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity accessibilityRole="button" onPress={() => onPress?.(entry)} style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
      <View style={styles.row}>
        <Text style={[styles.date, { color: theme.colors.muted }]}>{formatDate(entry.date)}</Text>
        <Text style={{ fontSize: 18 }}>{entry.mood === "happy" ? "😊" : entry.mood === "calm" ? "😌" : "📝"}</Text>
      </View>
      <Text style={{ color: theme.colors.text }} numberOfLines={3}>{entry.text}</Text>
      <View style={styles.actions}>
        <TouchableOpacity accessibilityRole="button" style={[styles.btn, { borderColor: theme.colors.border }]} onPress={() => onPress?.(entry)}>
          <Text style={{ color: theme.colors.primary }}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity accessibilityRole="button" style={[styles.btn, { borderColor: theme.colors.border }]} onPress={() => onDelete?.(entry)}>
          <Text style={{ color: theme.colors.danger }}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 16, padding: 14, borderWidth: 1, marginBottom: 12 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
  date: { fontWeight: "600" },
  actions: { flexDirection: "row", gap: 8, marginTop: 8 },
  btn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 10, borderWidth: 1 }
});