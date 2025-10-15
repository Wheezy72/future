import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { formatCurrency } from "../../utils/format";

export default function AnalyticsTab({ analytics }) {
  const { theme } = useTheme();
  return (
    <View>
      <Text accessibilityRole="header" style={[styles.title, { color: theme.colors.text, fontFamily: theme.typography.displayFamily }]}>Analytics</Text>
      <Text style={{ color: theme.colors.muted, marginBottom: 12, fontFamily: theme.typography.textFamily }}>Total: {formatCurrency(analytics.total)}</Text>
      {Object.entries(analytics.byCategory).map(([k, v]) => (
        <View key={k} style={[styles.row, { marginBottom: 8 }]}>
          <Text style={{ color: theme.colors.text, flex: 1, fontFamily: theme.typography.textFamily }}>{k}</Text>
          <Text style={{ color: theme.colors.muted, fontFamily: theme.typography.textFamily }}>{formatCurrency(v)}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: "800", marginBottom: 12 },
  row: { flexDirection: "row" }
});