import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import * as SecureStore from "expo-secure-store";

/**
 * Initial redirect: if PIN exists and not unlocked, go to pin-entry.
 * We mark session unlock with a volatile flag in memory; on app restart user must unlock again.
 */

let unlocked = false;

export default function Index() {
  const [hasPin, setHasPin] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const pin = await SecureStore.getItemAsync("pin_code", { keychainService: "future_pin" });
        setHasPin(!!pin);
      } catch (_e) {
        setHasPin(false);
      }
    })();
  }, []);
  if (hasPin && !unlocked) return <Redirect href="/pin-entry" />;
  return <Redirect href="/(tabs)/home" />;
}

export function markUnlocked() {
  unlocked = true;
}