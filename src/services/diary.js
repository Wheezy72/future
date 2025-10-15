import { getItem, setItem } from "./storage";
import * as FileSystem from "expo-file-system";

/**
 * Diary entry: {id, date:number, mood:string, xp:number, text:string, createdAt, updatedAt}
 */

const KEY = "diary";

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export async function listEntries() {
  const entries = (await getItem(KEY, [])) || [];
  return entries.sort((a, b) => b.date - a.date);
}

export async function upsertEntry({ date, mood, xp, text, id }) {
  const entries = await listEntries();
  const now = Date.now();
  if (id) {
    const idx = entries.findIndex(e => e.id === id);
    if (idx < 0) throw new Error("Entry not found");
    entries[idx] = { ...entries[idx], mood, xp, text, updatedAt: now };
  } else {
    const entry = {
      id: uid(),
      date: date || new Date().setHours(0, 0, 0, 0),
      mood: mood || "calm",
      xp: Number(xp || 5),
      text: String(text || ""),
      createdAt: now,
      updatedAt: now
    };
    entries.unshift(entry);
  }
  await setItem(KEY, entries);
  return true;
}

export async function removeEntry(id) {
  const entries = await listEntries();
  const next = entries.filter(e => e.id !== id);
  await setItem(KEY, next);
  return true;
}

export function streakAnalytics(entries) {
  // Count consecutive days with entries
  const days = new Set(entries.map(e => new Date(e.date).toDateString()));
  let streak = 0;
  for (let i = 0; ; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toDateString();
    if (days.has(key)) streak++;
    else break;
  }
  const total = days.size;
  return { streak, totalDaysWithEntries: total };
}

export async function exportEntries() {
  const entries = await listEntries();
  const fileUri = FileSystem.documentDirectory + "future_diary_backup.json";
  await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(entries), { encoding: FileSystem.EncodingType.UTF8 });
  return fileUri;
}

export async function importEntries(fileUri) {
  const raw = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 });
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) throw new Error("Invalid backup file");
  await setItem(KEY, parsed);
  return parsed.length;
}