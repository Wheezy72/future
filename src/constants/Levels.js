/**
 * Gamified levels and XP thresholds.
 */

export const Levels = [
  { level: 1, xp: 0, title: "Novice" },
  { level: 2, xp: 100, title: "Explorer" },
  { level: 3, xp: 300, title: "Achiever" },
  { level: 4, xp: 600, title: "Strategist" },
  { level: 5, xp: 1000, title: "Visionary" }
];

/**
 * Compute level from XP.
 * @param {number} xp
 * @returns {{level:number,title:string,next:number}}
 */
export function getLevel(xp) {
  let current = Levels[0];
  for (const l of Levels) {
    if (xp >= l.xp) current = l;
  }
  const next = Levels.find(l => l.level === current.level + 1);
  return { level: current.level, title: current.title, next: next ? next.xp : null };
}