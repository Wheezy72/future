import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../../hooks/useTheme";

export default function MindfulnessTimer() {
  const { theme } = useTheme();
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  function startTimer() {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
  }
  function stopTimer() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }
  function resetTimer() { setSeconds(0); }

  return (
    <View>
      <Text accessibilityRole="header" style={[styles.title, { color: theme.colors.text }]}>Mindfulness Timer</Text>
      <Text style={{ color: theme.colors.muted, marginBottom: 12, fontSize: 24, textAlign: "center" }}>{formatTime(seconds)}</Text>
      <View style={{ flexDirection: "row", gap: 8, justifyContent: "center" }}>
        <TouchableOpacity accessibilityRole="button" style={[styles.btn, { backgroundColor: theme.colors.secondary }]} onPress={startTimer}>
          <Text style={{ color: "#fff", fontWeight: "700" }}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity accessibilityRole="button" style={[styles.btn, { backgroundColor: theme.colors.warning }]} onPress={stopTimer}>
          <Text style={{ color: "#fff", fontWeight: "700" }}>Pause</Text>
        </TouchableOpacity>
        <TouchableOpacity accessibilityRole="button" style={[styles.btn, { backgroundColor: theme.colors.primary }]} onPress={resetTimer}>
          <Text style={{ color: "#fff", fontWeight: "700" }}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: "800", marginBottom: 12 },
  btn: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12 }
});