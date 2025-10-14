import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { lerpColor } from "../constants/Themes";

/**
 * Animated gradient-like background using two color stops.
 */
export default function AnimatedBackground({ children }) {
  const { theme, mode } = useTheme();
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: 8000, useNativeDriver: false }),
        Animated.timing(anim, { toValue: 0, duration: 8000, useNativeDriver: false })
      ])
    ).start();
  }, [anim, mode]);

  const bg = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      theme.colors.background,
      lerpColor(0.15, theme.colors.background, theme.colors.accent)
    ]
  });

  return <Animated.View accessibilityRole="summary" style={[styles.container, { backgroundColor: bg }]}>{children}</Animated.View>;
}

const styles = StyleSheet.create({
  container: { flex: 1 }
});