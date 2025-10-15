/**
 * Dual theme system with accessible contrast and animated colors.
 * Provides tokens and helpers for premium UI.
 */

export const LightTheme = {
  name: "light",
  colors: {
    background: "#0F1220", // cyberpunk dark bluish for better contrast even in light
    surface: "rgba(255,255,255,0.08)",
    primary: "#00E5FF", // neon cyan
    secondary: "#FF3D00", // neon orange
    accent: "#D500F9", // neon magenta
    text: "#E6E6E6",
    muted: "#9AA1B1",
    border: "rgba(230,230,230,0.12)",
    success: "#22C55E",
    warning: "#F59E0B",
    danger: "#EF4444",
    card: "rgba(255,255,255,0.05)",
    glass: "rgba(255,255,255,0.06)"
  },
  elevation: { sm: 2, md: 4, lg: 8 },
  spacing: 8,
  radius: { sm: 10, md: 16, lg: 24 },
  typography: {
    h1: 28,
    h2: 22,
    h3: 18,
    body: 16,
    small: 13,
    displayFamily: "Orbitron",
    textFamily: "Rajdhani",
    monoFamily: "ShareTechMono"
  }
};

export const DarkTheme = {
  name: "dark",
  colors: {
    background: "#0A0B0E",
    surface: "rgba(20,22,25,0.85)",
    primary: "#00E5FF",
    secondary: "#FF3D00",
    accent: "#D500F9",
    text: "#E5E7EB",
    muted: "#94A3B8",
    border: "rgba(231,233,238,0.08)",
    success: "#22C55E",
    warning: "#F59E0B",
    danger: "#EF4444",
    card: "rgba(24,26,29,0.7)",
    glass: "rgba(255,255,255,0.06)"
  },
  elevation: { sm: 2, md: 4, lg: 8 },
  spacing: 8,
  radius: { sm: 10, md: 16, lg: 24 },
  typography: {
    h1: 28,
    h2: 22,
    h3: 18,
    body: 16,
    small: 13,
    displayFamily: "Orbitron",
    textFamily: "Rajdhani",
    monoFamily: "ShareTechMono"
  }
};

export const Themes = { light: LightTheme, dark: DarkTheme };

/**
 * Interpolate theme color for animated backgrounds.
 * @param {number} t 0..1
 * @param {string} a hex
 * @param {string} b hex
 * @returns {string} hex
 */
export function lerpColor(t, a, b) {
  const pa = parseInt(a.slice(1), 16);
  const pb = parseInt(b.slice(1), 16);
  const ar = (pa >> 16) & 0xff, ag = (pa >> 8) & 0xff, ab = pa & 0xff;
  const br = (pb >> 16) & 0xff, bg = (pb >> 8) & 0xff, bb = pb & 0xff;
  const rr = Math.round(ar + (br - ar) * t);
  const rg = Math.round(ag + (bg - ag) * t);
  const rb = Math.round(ab + (bb - ab) * t);
  return "#" + ((1 << 24) + (rr << 16) + (rg << 8) + rb).toString(16).slice(1);
}