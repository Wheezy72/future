import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AnimatedBackground from "../../src/components/AnimatedBackground";
import { useTheme } from "../../src/hooks/useTheme";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import ParallaxHeader from "../../src/components/ParallaxHeader";
import { listEntries, removeEntry, streakAnalytics, exportEntries, importEntries } from "../../src/services/diary";
import MoodTab from "../../src/screens/Wellness/MoodTab";
import MindfulnessTimer from "../../src/screens/Wellness/MindfulnessTimer";
import StreaksTab from "../../src/screens/Wellness/StreaksTab";
import DiaryCard from "../../src/components/DiaryCard";
import * as DocumentPicker from "expo-document-picker";
import { Title, Body } from "../../src/components/Typography";

/**
 * Wellness: Mood, Mindfulness Timer, Streaks, Diary
 */
export default function Wellness() {
  const { theme } = useTheme();
  const [page, setPage] = useState("mood");
  const [entries, setEntries] = useState([]);
  const [selected, setSelected] = useState(null);
  const overlay = useSharedValue(0);

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

  async function pickImport() {
    try {
      const res = await DocumentPicker.getDocumentAsync({ type: "application/json" });
      if (res?.assets?.length) {
        const asset = res.assets[0];
        const count = await importEntries(asset.uri);
        Alert.alert("Imported", `Loaded ${count} entries`);
        await refresh();
      }
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  }

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlay.value
  }));

  function openDetail(entry) {
    setSelected(entry);
    overlay.value = withTiming(1, { duration: 250 });
  }
  function closeDetail() {
    overlay.value = withTiming(0, { duration: 200 });
    setTimeout(() => setSelected(null), 200);
  }

  return (
    <AnimatedBackground>
      <View style={styles.header}>
        {["mood", "timer", "streaks", "diary"].map((p) => (
          <TouchableOpacity key={p} accessibilityRole="button" style={[styles.tab, { borderColor: theme.colors.border, backgroundColor: page === p ? theme.colors.card : "transparent" }]} onPress={() => setPage(p)}>
            <Body style={{ color: page === p ? theme.colors.text : theme.colors.muted, fontWeight: "700" }}>{capitalize(p)}</Body>
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
            <Title accessibilityRole="header" style={styles.title}>Diary</Title>
            <View style={{ flexDirection: "row", gap: 8, marginBottom: 8 }}>
              <TouchableOpacity accessibilityRole="button" style={[styles.btn, { backgroundColor: theme.colors.secondary }]} onPress={async () => {
                try {
                  const uri = await exportEntries();
                  Alert.alert("Exported", `Saved to ${uri}`);
                } catch (e) {
                  Alert.alert("Error", e.message);
                }
              }}>
                <Body style={{ color: "#fff", fontWeight: "700" }}>Export</Body>
              </TouchableOpacity>
              <TouchableOpacity accessibilityRole="button" style={[styles.btn, { backgroundColor: theme.colors.primary }]} onPress={pickImport}>
                <Body style={{ color: "#fff", fontWeight: "700" }}>Import</Body>
              </TouchableOpacity>
            </View>
            {entries.map(e => (
              <DiaryCard key={e.id} entry={e} onPress={openDetail} onDelete={onDeleteEntry} />
            ))}
          </View>
        )}
      </Animated.ScrollView>

      {selected && (
        <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "center", padding: 24 }, overlayStyle]}>
          <View style={{ backgroundColor: theme.colors.card, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: theme.colors.border }}>
            <Title accessibilityRole="header" style={{ marginBottom: 8 }}>Entry</Title>
            <Body style={{ color: theme.colors.muted, marginBottom: 8 }}>{new Date(selected.date).toLocaleString()}</Body>
            <Body>{selected.text}</Body>
            <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 12 }}>
              <TouchableOpacity accessibilityRole="button" style={[styles.btn, { backgroundColor: theme.colors.primary }]} onPress={closeDetail}>
                <Body style={{ color: "#fff" }}>Close</Body>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      )}
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