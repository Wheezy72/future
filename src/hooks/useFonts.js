import * as Font from "expo-font";
import { useEffect, useState } from "react";

/**
 * Load cyberpunk theme fonts from assets/fonts.
 * Recommended set:
 * - Orbitron.ttf (display/headline)
 * - Rajdhani.ttf (body text)
 * - ShareTechMono.ttf (mono/accent)
 */
export function useFonts() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await Font.loadAsync({
          Orbitron: require("../../assets/fonts/Orbitron.ttf"),
          Rajdhani: require("../../assets/fonts/Rajdhani.ttf"),
          ShareTechMono: require("../../assets/fonts/ShareTechMono.ttf")
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