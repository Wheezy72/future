import React from "react";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, interpolate, Extrapolate } from "react-native-reanimated";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";

/**
 * Parallax header using Reanimated.
 * Pass scrollY from onScroll with useSharedValue.
 */
export default function ParallaxHeader({ title, scrollY }) {
  const { theme } = useTheme();

  const style = useAnimatedStyle(() => {
    const translateY = interpolate(scrollY.value, [0, 200], [0, -40], Extrapolate.CLAMP);
    const scale = interpolate(scrollY.value, [0, 200], [1, 0.92], Extrapolate.CLAMP);
    return { transform: [{ translateY }, { scale }] };
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
  wrap: { paddingHorizontal: 16, paddingTop: 16 },
  inner: { padding: 12, borderRadius: 16, borderWidth: 1 },
  title: { fontSize: 22, fontWeight: "800" }
});