import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { lerpColor } from "../constants/Themes";

/**
 * Animated premium background with subtle accent blob.
 */
export default function AnimatedBackground({ children }) {
  const { theme, mode } = useTheme();
  const anim = useRef(new Animated.Value(0)).current;
  const blob = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: 8000, useNativeDriver: false }),
        Animated.timing(anim, { toValue: 0, duration: 8000, useNativeDriver: false })
      ])
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(blob, { toValue: 1, duration: 6000, useNativeDriver: false }),
        Animated.timing(blob, { toValue: 0, duration: 6000, useNativeDriver: false })
      ])
    ).start();
  }, [anim, blob, mode]);

  const bg = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      theme.colors.background,
      lerpColor(0.08, theme.colors.background, theme.colors.accent)
    ]
  });

  const blobSize = blob.interpolate({ inputRange: [0, 1], outputRange: [220, 260] });
  const blobOpacity = blob.interpolate({ inputRange: [0, 1], outputRange: [0.08, 0.14] });

  return (
    <Animated.View accessibilityRole="summary" style={[styles.container, { backgroundColor: bg }]}>
      <Animated.View style={[styles.blob, { width: blobSize, height: blobSize, opacity: blobOpacity, backgroundColor: theme.colors.accent }]} />
      <View style={styles.content}>{children}</View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  blob: { position: "absolute", right: -60, top: -40, borderRadius: 9999 },
  content: { flex: 1 }
});