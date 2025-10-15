import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../hooks/useTheme";

/**
 * Achievements screen: badges and goals.
 */
export default function Achievements() {
  const { theme } = useTheme();
  return (
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
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: "800", marginBottom: 12 },
  card: { borderRadius: 16, padding: 14, borderWidth: 1, marginBottom: 12 }
});