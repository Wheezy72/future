import React, { createContext, useContext, useMemo, useEffect, useState } from "react";
import { Appearance } from "react-native";
import { DarkTheme, LightTheme } from "../constants/Themes";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Theme provider and hook for dual theme with animated awareness.
 */

const ThemeContext = createContext({
  theme: LightTheme,
  mode: "light",
  setMode: (_m) => {},
});

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem("@future_theme_mode");
        if (saved) setMode(saved);
        else setMode(Appearance.getColorScheme() === "dark" ? "dark" : "light");
      } catch (e) {
        // fall back gracefully
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("@future_theme_mode", mode).catch(() => {});
  }, [mode]);

  const theme = useMemo(() => (mode === "dark" ? DarkTheme : LightTheme), [mode]);

  const value = useMemo(() => ({ theme, mode, setMode }), [theme, mode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * @returns {{theme: import('../constants/Themes').LightTheme | import('../constants/Themes').DarkTheme, mode: 'light'|'dark', setMode: (m:string)=>void}}
 */
export function useTheme() {
  return useContext(ThemeContext);
}