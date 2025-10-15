import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { MoodCategories } from "../../constants/Categories";
import { upsertEntry } from "../../services/diary";

export default function MoodTab({ onSaved }) {
  const { theme } = useTheme();
  const [mood, setMood] = useState("calm");
  const [text, setText] = useState("");
  const [xp, setXp] = useState("5");

  async function onSave() {
    try {
      await upsertEntry({ mood, text, xp: Number(xp) });
      setText("");
      onSaved?.();
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  }

  return (
    <View>
      <Text accessibilityRole="header" style={[styles.title, { color: theme.colors.text, fontFamily: theme.typography.displayFamily }]}>Log Mood</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 10 }}>
        {MoodCategories.map(c => (
          <TouchableOpacity key={c.key} accessibilityRole="button" onPress={() => setMood(c.key)} style={[styles.cat, { borderColor: theme.colors.border, backgroundColor: mood === c.key ? theme.colors.surface : "transparent" }]}>
            <Text style={{ color: theme.colors.text, fontFamily: theme.typography.textFamily }}>{c.emoji} {c.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TextInput placeholder="What's on your mind?" placeholderTextColor={theme.colors.muted} value={text} onChangeText={setText} multiline style={[styles.input, { minHeight: 120, borderColor: theme.colors.border, color: theme.colors.text }]} />
      <TextInput placeholder="XP" placeholderTextColor={theme.colors.muted} keyboardType="numeric" value={xp} onChangeText={setXp} style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]} />
      <TouchableOpacity accessibilityRole="button" style={[styles.btn, { backgroundColor: theme.colors.primary }]} onPress={onSave}>
        <Text style={{ color: "#fff", fontWeight: "700", fontFamily: theme.typography.textFamily }}>Save Entry</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: "800", marginBottom: 12 },
  input: { borderWidth: 1, borderRadius: 12, padding: 10, marginBottom: 8 },
  cat: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, borderWidth: 1, marginRight: 8 },
  btn: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12 }
});