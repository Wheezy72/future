import * as Font from "expo-font";
import { useEffect, useState } from "react";

/**
 * Load custom fonts from assets/fonts with graceful fallback.
 * Place your .ttf/.otf files under assets/fonts and map them here.
 */
export function useFonts() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await Font.loadAsync({
          // Example mappings; add files to assets/fonts
          "Future-Display": require("../../assets/fonts/Future-Display.ttf"),
          "Future-Text": require("../../assets/fonts/Future-Text.ttf")
        });
      } catch (_e) {
        // Fallback to system fonts
      } finally {
        setReady(true);
      }
    })();
  }, []);

  return ready;
}