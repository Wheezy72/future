import React from "react";
import Animated, { useAnimatedStyle, useSharedValue, interpolate, Extrapolate } from "react-native-reanimated";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";

/**
 * Parallax header using Reanimated with premium styling.
 * Pass scrollY from onScroll with useSharedValue.
 */
export default function ParallaxHeader({ title, scrollY }) {
  const { theme } = useTheme();

  const style = useAnimatedStyle(() => {
    const translateY = interpolate(scrollY.value, [0, 200], [0, -40], Extrapolate.CLAMP);
    const scale = interpolate(scrollY.value, [0, 200], [1, 0.94], Extrapolate.CLAMP);
    const opacity = interpolate(scrollY.value, [0, 120], [1, 0.6], Extrapolate.CLAMP);
    return { transform: [{ translateY }, { scale }], opacity };
  });

  return (
    <Animated.View style={[styles.wrap, style]}>
      <View style={[styles.inner, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
        <Text accessibilityRole="header" style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
      </View>
    </Animated.View>
  );
}

export function useParallax() {
  const y = useSharedValue(0);
  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: (v) => (y.value = v) } } }],
    { useNativeDriver: true }
  );
  return { scrollY: y, onScroll };
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 16, paddingTop: 12 },
  inner: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 18,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3
  },
  title: { fontSize: 22, fontWeight: "800", letterSpacing: 0.2 }
});