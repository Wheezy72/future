import React from "react";
import { Text, Platform } from "react-native";
import { useTheme } from "../hooks/useTheme";

/**
 * Typography components that apply theme font families with system font fallbacks.
 */

// Font fallback helper
function getFontFamily(preferredFamily) {
  const systemFallbacks = {
    ios: {
      Orbitron: 'Helvetica Neue',
      Rajdhani: 'Helvetica Neue', 
      ShareTechMono: 'Courier New'
    },
    android: {
      Orbitron: 'sans-serif',
      Rajdhani: 'sans-serif',
      ShareTechMono: 'monospace'
    }
  };
  
  // Try preferred font first, fallback to system font
  try {
    return preferredFamily;
  } catch {
    return systemFallbacks[Platform.OS]?.[preferredFamily] || 'System';
  }
}

export function Title({ children, style, ...props }) {
  const { theme } = useTheme();
  return (
    <Text 
      {...props} 
      style={[
        { 
          fontSize: theme.typography.h2, 
          fontWeight: "800", 
          fontFamily: getFontFamily(theme.typography.displayFamily)
        }, 
        style
      ]}
    >
      {children}
    </Text>
  );
}

export function Subtitle({ children, style, ...props }) {
  const { theme } = useTheme();
  return (
    <Text 
      {...props} 
      style={[
        { 
          fontSize: theme.typography.h3, 
          fontWeight: "700", 
          fontFamily: getFontFamily(theme.typography.textFamily)
        }, 
        style
      ]}
    >
      {children}
    </Text>
  );
}

export function Body({ children, style, ...props }) {
  const { theme } = useTheme();
  return (
    <Text 
      {...props} 
      style={[
        { 
          fontSize: theme.typography.body, 
          fontFamily: getFontFamily(theme.typography.textFamily)
        }, 
        style
      ]}
    >
      {children}
    </Text>
  );
}

export function Caption({ children, style, ...props }) {
  const { theme } = useTheme();
  return (
    <Text 
      {...props} 
      style={[
        { 
          fontSize: theme.typography.small, 
          color: theme.colors.muted, 
          fontFamily: getFontFamily(theme.typography.textFamily)
        }, 
        style
      ]}
    >
      {children}
    </Text>
  );
}