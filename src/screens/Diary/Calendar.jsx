import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { formatDate } from "../../utils/format";
import { Subtitle, Caption, Body } from "../../components/Typography";

/**
 * Calendar week view for diary entries.
 * Props: entries: Array
 */
export default function Calendar({ entries = [] }) {
  const { theme } = useTheme();
  const map = entries.reduce((acc, e) => {
    const k = new Date(e.date).toDateString();
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});
  const days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d;
  });

  return (
    <View style={styles.wrap}>
      {days.map(d => {
        const key = d.toDateString();
        const has = map[key] || 0;
        return (
          <View key={key} style={[styles.cell, { backgroundColor: has ? theme.colors.secondary : theme.colors.surface, borderColor: theme.colors.border }]}>
            <Subtitle style={{ color: theme.colors.text }}>{d.toLocaleDateString(undefined, { weekday: "short" })}</Subtitle>
            <Caption>{formatDate(d)}</Caption>
            <Body style={{ color: theme.colors.text }}>{has} entries</Body>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", gap: 8 },
  cell: { width: "48%", borderRadius: 12, borderWidth: 1, padding: 10 }
});