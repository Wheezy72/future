import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AnimatedBackground from "../../src/components/AnimatedBackground";
import { useTheme } from "../../src/hooks/useTheme";
import Animated, { useSharedValue } from "react-native-reanimated";
import ParallaxHeader from "../../src/components/ParallaxHeader";
import { listEntries, removeEntry, streakAnalytics, exportEntries, importEntries } from "../../src/services/diary";
import MoodTab from "../../src/screens/Wellness/MoodTab";
import MindfulnessTimer from "../../src/screens/Wellness/MindfulnessTimer";
import StreaksTab from "../../src/screens/Wellness/StreaksTab";
import DiaryCard from "../../src/components/DiaryCard";

/**
 * Wellness: Mood, Mindfulness Timer, Streaks, Diary
 */
export default function Wellness() {
  const { theme } = useTheme();
  const [page, setPage] = useState("mood");
  const [entries, setEntries] = useState([]);

  async function refresh() {
    setEntries(await listEntries());
  }
  useEffect(() => { refresh(); }, []);

  const streak = streakAnalytics(entries);
  const scrollY = useSharedValue(0);

  async function onDeleteEntry(entry) {
    await removeEntry(entry.id);
    await refresh();
  }

  return (
    <AnimatedBackground>
      <View style={styles.header}>
        {["mood", "timer", "streaks", "diary"].map((p) => (
          <TouchableOpacity key={p} accessibilityRole="button" style={[styles.tab, { borderColor: theme.colors.border, backgroundColor: page === p ? theme.colors.card : "transparent" }]} onPress={() => setPage(p)}>
            <Text style={{ color: page === p ? theme.colors.text : theme.colors.muted, fontWeight: "700" }}>{capitalize(p)}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ParallaxHeader title={capitalize(page)} scrollY={scrollY} />
      <Animated.ScrollView
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: (v) => (scrollY.value = v) } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
        contentContainerStyle={{ padding: 16 }}
      >
        {page === "mood" && <MoodTab onSaved={refresh} />}
        {page === "timer" && <MindfulnessTimer />}
        {page === "streaks" && <StreaksTab streak={streak} />}
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
              }} onDelete={onDeleteEntry} />
            ))}
          </View>
        )}
      </Animated.ScrollView>
    </AnimatedBackground>
  );
}

function capitalize(s) { return s.slice(0, 1).toUpperCase() + s.slice(1); }

const styles = StyleSheet.create({
  header: { paddingHorizontal: 16, paddingTop: 16, flexDirection: "row", gap: 8 },
  tab: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 12, borderWidth: 1 },
  title: { fontSize: 22, fontWeight: "800", marginBottom: 12 },
  btn: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12 }
});