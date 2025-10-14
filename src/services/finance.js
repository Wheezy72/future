import { getItem, setItem } from "./storage";

/**
 * Expenses: {id, amount, category, note, date}
 * Budgets: {id, category, limit, period:'monthly'|'weekly', spent}
 * Savings: {id, title, target, saved}
 */

const EXP_KEY = "expenses";
const BUD_KEY = "budgets";
const SAV_KEY = "savings";

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export async function listExpenses() {
  return (await getItem(EXP_KEY, [])) || [];
}

export async function addExpense({ amount, category, note, date }) {
  const e = {
    id: uid(),
    amount: Number(amount || 0),
    category,
    note: String(note || ""),
    date: date || Date.now()
  };
  if (e.amount <= 0) throw new Error("Amount must be positive");
  const items = await listExpenses();
  items.unshift(e);
  await setItem(EXP_KEY, items);
  return e;
}

export async function removeExpense(id) {
  const items = await listExpenses();
  await setItem(EXP_KEY, items.filter(e => e.id !== id));
  return true;
}

export async function listBudgets() {
  return (await getItem(BUD_KEY, [])) || [];
}

export async function upsertBudget({ id, category, limit, period }) {
  const items = await listBudgets();
  const now = Date.now();
  if (id) {
    const idx = items.findIndex(b => b.id === id);
    if (idx < 0) throw new Error("Budget not found");
    items[idx] = { ...items[idx], category, limit: Number(limit), period };
  } else {
    items.push({ id: uid(), category, limit: Number(limit), period: period || "monthly", spent: 0, createdAt: now });
  }
  await setItem(BUD_KEY, items);
  return true;
}

export async function listSavings() {
  return (await getItem(SAV_KEY, [])) || [];
}

export async function upsertSaving({ id, title, target, saved }) {
  const items = await listSavings();
  if (id) {
    const idx = items.findIndex(s => s.id === id);
    if (idx < 0) throw new Error("Saving not found");
    items[idx] = { ...items[idx], title, target: Number(target), saved: Number(saved) };
  } else {
    items.push({ id: uid(), title, target: Number(target), saved: Number(saved || 0) });
  }
  await setItem(SAV_KEY, items);
  return true;
}

export function analytics(expenses) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const byCategory = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});
  const daily = expenses.reduce((acc, e) => {
    const d = new Date(e.date).toDateString();
    acc[d] = (acc[d] || 0) + e.amount;
    return acc;
  }, {});
  return { total, byCategory, daily };
}