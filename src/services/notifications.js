import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

/**
 * Local notifications for habits and mindfulness reminders.
 */

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
});

/**
 * Initialize Android channels for consistent behavior.
 */
export async function initNotifications() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "Default",
      importance: Notifications.AndroidImportance.DEFAULT
    }).catch(() => {});
    await Notifications.setNotificationChannelAsync("habit", {
      name: "Habit Reminders",
      importance: Notifications.AndroidImportance.DEFAULT
    }).catch(() => {});
    await Notifications.setNotificationChannelAsync("mindfulness", {
      name: "Mindfulness Reminders",
      importance: Notifications.AndroidImportance.DEFAULT
    }).catch(() => {});
  }
}

/**
 * Schedules a daily reminder at a given hour/minute.
 * @param {string} id
 * @param {{title:string, body:string, hour:number, minute:number}} opts
 */
export async function scheduleDaily(id, { title, body, hour, minute }) {
  try {
    await Notifications.cancelScheduledNotificationAsync(id).catch(() => {});
  } catch {}
  const trigger = {
    hour,
    minute,
    repeats: true,
    channelId: id.includes("habit") ? "habit" : id.includes("mindfulness") ? "mindfulness" : "default"
  };
  const res = await Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger
  });
  return res;
}

export async function cancel(id) {
  try {
    await Notifications.cancelScheduledNotificationAsync(id);
    return true;
  } catch (_e) {
    return false;
  }
}