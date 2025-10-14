import { getItem, setItem } from "./storage";

/**
 * Goal model: {id, type:'habit'|'spending', title, target:number, progress:number, status:'active'|'paused'|'complete', history:[{date,value}], createdAt, updatedAt}
 */

const KEY = "goals";

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export async function listGoals() {
  return (await getItem(KEY, [])) || [];
}

export async function createGoal(data) {
  const now = Date.now();
  const goal = {
    id: uid(),
    type: data.type,
    title: String(data.title || "").trim(),
    target: Number(data.target || 0),
    progress: Number(data.progress || 0),
    status: "active",
    history: [],
    createdAt: now,
    updatedAt: now
  };
  if (!goal.title) throw new Error("Title required");
  const goals = await listGoals();
  goals.push(goal);
  await setItem(KEY, goals);
  return goal;
}

export async function updateGoal(id, patch) {
  const goals = await listGoals();
  const idx = goals.findIndex(g => g.id === id);
  if (idx < 0) throw new Error("Goal not found");
  goals[idx] = { ...goals[idx], ...patch, updatedAt: Date.now() };
  await setItem(KEY, goals);
  return goals[idx];
}

export async function addProgress(id, value) {
  const goals = await listGoals();
  const idx = goals.findIndex(g => g.id === id);
  if (idx < 0) throw new Error("Goal not found");
  const g = goals[idx];
  const v = Number(value || 0);
  const progress = Math.max(0, g.progress + v);
  const status = progress >= g.target ? "complete" : g.status;
  const history = [{ date: Date.now(), value: v }, ...g.history];
  goals[idx] = { ...g, progress, status, history, updatedAt: Date.now() };
  await setItem(KEY, goals);
  return goals[idx];
}

export async function setStatus(id, status) {
  if (!["active", "paused", "complete"].includes(status)) throw new Error("Invalid status");
  return updateGoal(id, { status });
}

export async function removeGoal(id) {
  const goals = await listGoals();
  const next = goals.filter(g => g.id !== id);
  await setItem(KEY, next);
  return true;
}

export function getStats(goals) {
  const total = goals.length;
  const active = goals.filter(g => g.status === "active").length;
  const paused = goals.filter(g => g.status === "paused").length;
  const complete = goals.filter(g => g.status === "complete").length;
  return { total, active, paused, complete };
}