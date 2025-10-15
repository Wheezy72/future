import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { Title, Body } from "../../components/Typography";

/**
 * Achievements screen: badges and goals.
 */
export default function Achievements() {
  const { theme } = useTheme();
  return (
    <View>
      <Title accessibilityRole="header" style={styles.title}>Achievements</Title>
      <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
        <Body style={{ color: theme.colors.text }}>Consistency Champion</Body>
        <Body style={{ color: theme.colors.muted }}>Maintain a 7-day diary streak</Body>
      </View>
      <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
        <Body style={{ color: theme.colors.text }}>Budget Boss</Body>
        <Body style={{ color: theme.colors.muted }}>Keep expenses under budget for a month</Body>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: "800", marginBottom: 12 },
  card: { borderRadius: 16, padding: 14, borderWidth: 1, marginBottom: 12 }
});