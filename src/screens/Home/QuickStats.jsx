import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "../../hooks/useTheme";

export default function QuickStats({ stats }) {
  const { theme } = useTheme();
  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      <Stat label="Goals" value={stats.goals} color={theme.colors.primary} />
      <Stat label="Diary" value={stats.diary} color={theme.colors.secondary} />
      <Stat label="Expenses" value={stats.expenses} color={theme.colors.accent} />
    </View>
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