import React, { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert, Animated } from "react-native";
import AnimatedBackground from "../../src/components/AnimatedBackground";
import { useTheme } from "../../src/hooks/useTheme";
import GoalCard from "../../src/components/GoalCard";
import { addProgress, createGoal, listGoals, removeGoal, setStatus } from "../../src/services/goals";
import DiaryCard from "../../src/components/DiaryCard";
import { listEntries, upsertEntry } from "../../src/services/diary";
import { playAchievement } from "../../src/services/sound";
import { Title, Body } from "../../src/components/Typography";
import AnimatedRe, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

/**
 * Goals & Journal: Goals (habit/spending), Diary
 */
export default function GoalsJournal() {
  const { theme } = useTheme();
  const [page, setPage] = useState("goals");
  const [goals, setGoals] = useState([]);
  const [entries, setEntries] = useState([]);
  const [selected, setSelected] = useState(null);
  const overlay = useSharedValue(0);

  // goal form
  const [title, setTitle] = useState("");
  const [type, setType] = useState("habit");
  const [target, setTarget] = useState("10");

  // diary form
  const [text, setText] = useState("");
  const [xp, setXp] = useState("5");
  const [mood, setMood] = useState("focused");

  const celebration = useRef(new Animated.Value(0)).current;

  async function refresh() {
    setGoals(await listGoals());
    setEntries(await listEntries());
  }
  useEffect(() => { refresh(); }, []);

  async function onCreateGoal() {
    try {
      await createGoal({ title, type, target: Number(target) });
      setTitle(""); setTarget("10");
      await refresh();
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  }

  async function onAddProgress(goal) {
    const updated = await addProgress(goal.id, 1);
    await refresh();
    if (updated.status === "complete") {
      Animated.sequence([
        Animated.timing(celebration, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(celebration, { toValue: 0, duration: 300, useNativeDriver: true })
      ]).start();
      playAchievement();
      Alert.alert("Goal Complete", "Great job!");
    }
  }
  async function onPause(goal) { await setStatus(goal.id, "paused"); await refresh(); }
  async function onResume(goal) { await setStatus(goal.id, "active"); await refresh(); }
  async function onComplete(goal) { await setStatus(goal.id, "complete"); await refresh(); }
  async function onRemove(goal) { await removeGoal(goal.id); await refresh(); }

  const sortedGoals = [...goals].sort((a, b) => {
    const order = { active: 0, paused: 1, complete: 2 };
    return order[a.status] - order[b.status];
  });

  async function onAddEntry() {
    try {
      await upsertEntry({ text, xp: Number(xp), mood });
      setText("");
      await refresh();
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  }

  function openDetail(goal) {
    setSelected(goal);
    overlay.value = withTiming(1, { duration: 250 });
  }
  function closeDetail() {
    overlay.value = withTiming(0, { duration: 200 });
    setTimeout(() => setSelected(null), 200);
  }
  const overlayStyle = useAnimatedStyle(() => ({ opacity: overlay.value }));

  return (
    <AnimatedBackground>
      <View style={styles.header}>
        {["goals", "diary"].map((p) => (
          <TouchableOpacity key={p} accessibilityRole="button" style={[styles.tab, { borderColor: theme.colors.border, backgroundColor: page === p ? theme.colors.card : "transparent" }]} onPress={() => setPage(p)}>
            <Body style={{ color: page === p ? theme.colors.text : theme.colors.muted, fontWeight: "700" }}>{capitalize(p)}</Body>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {page === "goals" && (
          <View>
            <Animated.View style={{ transform: [{ scale: celebration.interpolate({ inputRange: [0, 1], outputRange: [1, 1.08] }) }] }}>
              <Title accessibilityRole="header">Goals</Title>
            </Animated.View>
            <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
              <TextInput placeholder="Goal title" placeholderTextColor={theme.colors.muted} value={title} onChangeText={setTitle} style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]} />
              <View style={{ flexDirection: "row", gap: 8 }}>
                {["habit", "spending"].map(t => (
                  <TouchableOpacity key={t} accessibilityRole="button" onPress={() => setType(t)} style={[styles.cat, { borderColor: theme.colors.border, backgroundColor: type === t ? theme.colors.surface : "transparent" }]}>
                    <Body style={{ color: theme.colors.text }}>{capitalize(t)}</Body>
                  </TouchableOpacity>
                ))}
              </View>
              <TextInput placeholder="Target" placeholderTextColor={theme.colors.muted} keyboardType="numeric" value={target} onChangeText={setTarget} style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]} />
              <TouchableOpacity accessibilityRole="button" style={[styles.btn, { backgroundColor: theme.colors.primary }]} onPress={onCreateGoal}>
                <Body style={{ color: "#fff", fontWeight: "700" }}>Create Goal</Body>
              </TouchableOpacity>
            </View>
            {sortedGoals.map(g => (
              <GoalCard
                key={g.id}
                goal={g}
                onAddProgress={onAddProgress}
                onPause={onPause}
                onResume={onResume}
                onComplete={onComplete}
                onPress={openDetail}
              />
            ))}
          </View>
        )}

        {page === "diary" && (
          <View>
            <Title accessibilityRole="header">Journal</Title>
            <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
              <TextInput placeholder="Write your thoughts..." placeholderTextColor={theme.colors.muted} value={text} onChangeText={setText} multiline style={[styles.input, { minHeight: 120, borderColor: theme.colors.border, color: theme.colors.text }]} />
              <View style={{ flexDirection: "row", gap: 8 }}>
                {["happy", "focused", "calm"].map(m => (
                  <TouchableOpacity key={m} accessibilityRole="button" onPress={() => setMood(m)} style={[styles.cat, { borderColor: theme.colors.border, backgroundColor: mood === m ? theme.colors.surface : "transparent" }]}>
                    <Body style={{ color: theme.colors.text }}>{capitalize(m)}</Body>
                  </TouchableOpacity>
                ))}
              </View>
              <TextInput placeholder="XP" placeholderTextColor={theme.colors.muted} keyboardType="numeric" value={xp} onChangeText={setXp} style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]} />
              <TouchableOpacity accessibilityRole="button" style={[styles.btn, { backgroundColor: theme.colors.secondary }]} onPress={onAddEntry}>
                <Body style={{ color: "#fff", fontWeight: "700" }}>Add Entry</Body>
              </TouchableOpacity>
            </View>
            {entries.map(e => <DiaryCard key={e.id} entry={e} onPress={() => {}} onDelete={() => {}} />)}
          </View>
        )}
      </ScrollView>

      {selected && (
        <AnimatedRe.View style={[StyleSheet.absoluteFill, { backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "center", padding: 24 }, overlayStyle]}>
          <View style={{ backgroundColor: theme.colors.card, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: theme.colors.border }}>
            <Title accessibilityRole="header" style={{ marginBottom: 8 }}>{selected.title}</Title>
            <Body style={{ color: theme.colors.muted, marginBottom: 8 }}>{selected.type === "habit" ? "Habit" : "Spending"} — Target {selected.target}</Body>
            <Body>Progress {selected.progress}</Body>
            <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 12 }}>
              <TouchableOpacity accessibilityRole="button" style={[styles.btn, { backgroundColor: theme.colors.primary }]} onPress={closeDetail}>
                <Body style={{ color: "#fff" }}>Close</Body>
              </TouchableOpacity>
            </View>
          </View>
        </AnimatedRe.View>
      )}
    </AnimatedBackground>
  );
}

function capitalize(s) { return s.slice(0, 1).toUpperCase() + s.slice(1); }

const styles = StyleSheet.create({
  header: { paddingHorizontal: 16, paddingTop: 16, flexDirection: "row", gap: 8 },
  tab: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 12, borderWidth: 1 },
  title: { fontSize: 22, fontWeight: "800", marginBottom: 12 },
  card: { borderRadius: 16, padding: 14, borderWidth: 1, marginBottom: 12 },
  input: { borderWidth: 1, borderRadius: 12, padding: 10, marginBottom: 8 },
  cat: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, borderWidth: 1, marginRight: 8 },
  btn: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12 }
});