import { Audio } from "expo-av";

/**
 * Simple sound service for achievements.
 * Uses a remote audio URL to avoid bundling binaries.
 * Replace URL with your own hosted asset for custom sound.
 */

const ACHIEVEMENT_URL = "https://cdn.pixabay.com/download/audio/2022/03/15/audio_8f0e8f7c87.mp3?filename=success-1-6297.mp3";

export async function playAchievement() {
  try {
    const { sound } = await Audio.Sound.createAsync(
      { uri: ACHIEVEMENT_URL },
      { shouldPlay: true, volume: 0.8 }
    );
    // auto unload after play
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        sound.unloadAsync().catch(() => {});
      }
    });
  } catch (_e) {
    // ignore sound failure
  }
}