const STORAGE_KEY = "impostor-game-settings";

export function saveGameSettings(settings) {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error("Error saving game settings:", error);
    }
  }
}

export function loadGameSettings() {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error("Error loading game settings:", error);
    }
  }
  return null;
}
