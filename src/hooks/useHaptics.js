import * as Haptics from "expo-haptics";

/**
 * Micro-interactions via haptics.
 */
export function useHaptics() {
  function impact(style = "Medium") {
    const map = {
      Light: Haptics.ImpactFeedbackStyle.Light,
      Medium: Haptics.ImpactFeedbackStyle.Medium,
      Heavy: Haptics.ImpactFeedbackStyle.Heavy
    };
    Haptics.impactAsync(map[style] || Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
  }
  function success() {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
  }
  function warning() {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
  }
  function error() {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
  }
  return { impact, success, warning, error };
}