import React, { useRef, useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { Title, Body } from "../../components/Typography";

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
      <Title accessibilityRole="header" style={styles.title}>Mindfulness Timer</Title>
      <Body style={{ color: theme.colors.muted, marginBottom: 12, fontSize: 24, textAlign: "center" }}>{formatTime(seconds)}</Body>
      <View style={{ flexDirection: "row", gap: 8, justifyContent: "center" }}>
        <TouchableOpacity accessibilityRole="button" style={[styles.btn, { backgroundColor: theme.colors.secondary }]} onPress={startTimer}>
          <Body style={{ color: "#fff", fontWeight: "700" }}>Start</Body>
        </TouchableOpacity>
        <TouchableOpacity accessibilityRole="button" style={[styles.btn, { backgroundColor: theme.colors.warning }]} onPress={stopTimer}>
          <Body style={{ color: "#fff", fontWeight: "700" }}>Pause</Body>
        </TouchableOpacity>
        <TouchableOpacity accessibilityRole="button" style={[styles.btn, { backgroundColor: theme.colors.primary }]} onPress={resetTimer}>
          <Body style={{ color: "#fff", fontWeight: "700" }}>Reset</Body>
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