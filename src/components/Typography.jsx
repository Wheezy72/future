import React from "react";
import { Text } from "react-native";
import { useTheme } from "../hooks/useTheme";

/**
 * Typography components that apply theme font families.
 */
export function Title({ children, style, ...props }) {
  const { theme } = useTheme();
  return <Text {...props} style={[{ fontSize: theme.typography.h2, fontWeight: "800", fontFamily: theme.typography.displayFamily }, style]}>{children}</Text>;
}
export function Subtitle({ children, style, ...props }) {
  const { theme } = useTheme();
  return <Text {...props} style={[{ fontSize: theme.typography.h3, fontWeight: "700", fontFamily: theme.typography.textFamily }, style]}>{children}</Text>;
}
export function Body({ children, style, ...props }) {
  const { theme } = useTheme();
  return <Text {...props} style={[{ fontSize: theme.typography.body, fontFamily: theme.typography.textFamily }, style]}>{children}</Text>;
}
export function Caption({ children, style, ...props }) {
  const { theme } = useTheme();
  return <Text {...props} style={[{ fontSize: theme.typography.small, color: theme.colors.muted, fontFamily: theme.typography.textFamily }, style]}>{children}</Text>;
}