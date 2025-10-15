import * as Notifications from "expo-notifications";

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
    repeats: true
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