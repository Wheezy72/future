import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../hooks/useTheme";
import { useHaptics } from "../hooks/useHaptics";
import { Caption } from "./Typography";

/**
 * Premium glassmorphic bottom tab bar for Expo Router Tabs.
 */
export default function GlassTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const { impact } = useHaptics();

  return (
    <View style={[styles.wrapper, { paddingBottom: insets.bottom + 8 }]}>
      <View style={[styles.bar, { backgroundColor: theme.colors.glass, borderColor: theme.colors.border }]}>
        {state.routes.map((route, idx) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === idx;

          const onPress = () => {
            impact(isFocused ? "Light" : "Medium");
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({ type: "tabLongPress", target: route.key });
          };

          return (
            <TouchableOpacity
              accessibilityRole="tab"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              key={route.key}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.item}
            >
              {options.tabBarIcon ? options.tabBarIcon({ focused: isFocused, color: isFocused ? theme.colors.primary : theme.colors.muted, size: 22 }) : null}
              <Caption style={[styles.label, { color: isFocused ? theme.colors.primary : theme.colors.muted }]} numberOfLines={1}>
                {label}
              </Caption>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { position: "absolute", left: 0, right: 0, bottom: 0 },
  bar: {
    marginHorizontal: 16,
    borderRadius: 24,
    borderWidth: 1,
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 10,
    // Simulated glass via transparency and shadow
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8
  },
  item: { flex: 1, alignItems: "center", justifyContent: "center", gap: 4 },
  label: { fontSize: 12, fontWeight: "700", letterSpacing: 0.2 }
});