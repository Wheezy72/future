import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from "react-native";
import AnimatedBackground from "../../src/components/AnimatedBackground";
import { useTheme } from "../../src/hooks/useTheme";
import { MoodCategories } from "../../src/constants/Categories";
import { removeEntry, listEntries, upsertEntry, streakAnalytics, exportEntries, importEntries } from "../../src/services/diary";
import DiaryCard from "../../src/components/DiaryCard";

/**
 * Wellness: Mood, Mindfulness Timer, Streaks, Diary
 */
export default function Wellness() {
  const { theme } = useTheme();
  const [page, setPage] = useState("mood");
  const [entries, setEntries] = useState([]);
  const [mood, setMood] = useState("calm");
  const [text, setText] = useState("");
  const [xp, setXp] = useState("5");

  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  async function refresh() {
    setEntries(await listEntries());
  }
  useEffect(() => { refresh(); }, []);

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

  async function onSaveEntry() {
    try {
      await upsertEntry({ mood, text, xp: Number(xp) });
      setText("");
      await refresh();
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  }

  async function onDeleteEntry(entry) {
    await removeEntry(entry.id);
    await refresh();
  }

  const streak = streakAnalytics(entries);

  return (
    <AnimatedBackground>
      <View style={styles.header}>
        {["mood", "timer", "streaks", "diary"].map((p) => (
          <TouchableOpacity key={p} accessibilityRole="button" style={[styles.tab, { borderColor: theme.colors.border, backgroundColor: page === p ? theme.colors.card : "transparent" }]} onPress={() => setPage(p)}>
            <Text style={{ color: page === p ? theme.colors.text : theme.colors.muted, fontWeight: "700" }}>{capitalize(p)}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {page === "mood" && (
          <View>
            <Text accessibilityRole="header" style={[styles.title, { color: theme.colors.text }]}>Log Mood</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 10 }}>
              {MoodCategories.map(c => (
                <TouchableOpacity key={c.key} accessibilityRole="button" onPress={() => setMood(c.key)} style={[styles.cat, { borderColor: theme.colors.border, backgroundColor: mood === c.key ? theme.colors.surface : "transparent" }]}>
                  <Text style={{ color: theme.colors.text }}>{c.emoji} {c.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TextInput placeholder="What's on your mind?" placeholderTextColor={theme.colors.muted} value={text} onChangeText={setText} multiline style={[styles.input, { minHeight: 120, borderColor: theme.colors.border, color: theme.colors.text }]} />
            <TextInput placeholder="XP" placeholderTextColor={theme.colors.muted} keyboardType="numeric" value={xp} onChangeText={setXp} style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]} />
            <TouchableOpacity accessibilityRole="button" style={[styles.btn, { backgroundColor: theme.colors.primary }]} onPress={onSaveEntry}>
              <Text style={{ color: "#fff", fontWeight: "700" }}>Save Entry</Text>
            </TouchableOpacity>
          </View>
        )}

        {page === "timer" && (
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
        )}

        {page === "streaks" && (
          <View>
            <Text accessibilityRole="header" style={[styles.title, { color: theme.colors.text }]}>Streaks</Text>
            <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
              <Text style={{ color: theme.colors.text, fontWeight: "700" }}>Diary Streak</Text>
              <Text style={{ color: theme.colors.muted }}>{streak.streak} days</Text>
            </View>
          </View>
        )}

        {page === "diary" && (
          <View>
            <Text accessibilityRole="header" style={[styles.title, { color: theme.colors.text }]}>Diary</Text>
            <View style={{ flexDirection: "row", gap: 8, marginBottom: 8 }}>
              <TouchableOpacity accessibilityRole="button" style={[styles.btn, { backgroundColor: theme.colors.secondary }]} onPress={async () => {
                try {
                  const uri = await exportEntries();
                  Alert.alert("Exported", `Saved to ${uri}`);
                } catch (e) {
                  Alert.alert("Error", e.message);
                }
              }}>
                <Text style={{ color: "#fff", fontWeight: "700" }}>Export</Text>
              </TouchableOpacity>
              {/* For import, a simple example from the same path */}
              <TouchableOpacity accessibilityRole="button" style={[styles.btn, { backgroundColor: theme.colors.primary }]} onPress={async () => {
                try {
                  const uri = "file:///data/user/0/host.exp.exponent/files/ExperienceData/%2540anonymous%252Ffuture/future_diary_backup.json";
                  const count = await importEntries(uri);
                  Alert.alert("Imported", `Loaded ${count} entries`);
                  await refresh();
                } catch (e) {
                  Alert.alert("Error", e.message);
                }
              }}>
                <Text style={{ color: "#fff", fontWeight: "700" }}>Import</Text>
              </TouchableOpacity>
            </View>
            {entries.map(e => (
              <DiaryCard key={e.id} entry={e} onPress={() => {
                setPage("mood");
                setMood(e.mood);
                setText(e.text);
                setXp(String(e.xp));
              }} onDelete={onDeleteEntry} />
            ))}
          </View>
        )}
      </ScrollView>
    </AnimatedBackground>
  );
}

function capitalize(s) { return s.slice(0, 1).toUpperCase() + s.slice(1); }
function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 16, paddingTop: 16, flexDirection: "row", gap: 8 },
  tab: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 12, borderWidth: 1 },
  title: { fontSize: 22, fontWeight: "800", marginBottom: 12 },
  card: { borderRadius: 16, padding: 14, borderWidth: 1, marginBottom: 12 },
  input: { borderWidth: 1, borderRadius: 12, padding: 10, marginBottom: 8 },
  cat: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, borderWidth: 1, marginRight: 8 },
  btn: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12 }
});