import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { formatCurrency } from "../../utils/format";
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from "react-native-reanimated";
import { Title, Body, Caption } from "../../components/Typography";

export default function AnalyticsTab({ analytics }) {
  const { theme } = useTheme();
  const max = Math.max(1, ...Object.values(analytics.byCategory));

  return (
    <View>
      <Title accessibilityRole="header" style={styles.title}>Analytics</Title>
      <Body style={{ color: theme.colors.muted, marginBottom: 12 }}>Total: {formatCurrency(analytics.total)}</Body>
      {Object.entries(analytics.byCategory).map(([k, v]) => (
        <BarRow key={k} label={k} value={v} max={max} />
      ))}
    </View>
  );
}

function BarRow({ label, value, max }) {
  const { theme } = useTheme();
  const progress = useSharedValue(0);
  const style = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`
  }));
  React.useEffect(() => {
    progress.value = withTiming(value / max, { duration: 600 });
  }, [value, max]);

  return (
    <View style={{ marginBottom: 10 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
        <Caption style={{ color: theme.colors.muted, fontFamily: theme.typography.monoFamily }}>{label}</Caption>
        <Caption style={{ color: theme.colors.muted, fontFamily: theme.typography.monoFamily }}>{formatCurrency(value)}</Caption>
      </View>
      <View style={{ height: 10, borderRadius: 10, overflow: "hidden", backgroundColor: theme.colors.surface }}>
        <Animated.View style={[{ height: 10, backgroundColor: theme.colors.primary }, style]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { marginBottom: 12 }
});