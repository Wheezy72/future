import React from "react";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import { ThemeProvider, useTheme } from "../src/hooks/useTheme";
import { useFonts } from "../src/hooks/useFonts";
import GlassTabBar from "../src/components/GlassTabBar";

function TabIcon({ label, focused }) {
  // Minimal custom icon using text glyphs for JS-only
  return <Text accessibilityElementsHidden style={{ fontSize: 18 }}>{label}</Text>;
}

function LayoutInner() {
  const { theme } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "transparent" }
      }}
      tabBar={(props) => <GlassTabBar {...props} />}
    >
      <Tabs.Screen
        name="(tabs)/home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => <TabIcon label="🏠" focused={focused} />,
          tabBarLabel: "Home"
        }}
      />
      <Tabs.Screen
        name="(tabs)/finance"
        options={{
          title: "Finance",
          tabBarIcon: ({ focused }) => <TabIcon label="💰" focused={focused} />,
          tabBarLabel: "Finance"
        }}
      />
      <Tabs.Screen
        name="(tabs)/wellness"
        options={{
          title: "Wellness",
          tabBarIcon: ({ focused }) => <TabIcon label="🌿" focused={focused} />,
          tabBarLabel: "Wellness"
        }}
      />
      <Tabs.Screen
        name="(tabs)/goals-journal"
        options={{
          title: "Goals & Journal",
          tabBarIcon: ({ focused }) => <TabIcon label="🎯" focused={focused} />,
          tabBarLabel: "Goals"
        }}
      />
      <Tabs.Screen
        name="(tabs)/settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => <TabIcon label="⚙️" focused={focused} />,
          tabBarLabel: "Settings"
        }}
      />
    </Tabs>
  );
}

export default function RootLayout() {
  const fontsReady = useFonts();
  if (!fontsReady) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Loading…</Text>
      </View>
    );
  }
  return (
    <ThemeProvider>
      <LayoutInner />
    </ThemeProvider>
  );
}