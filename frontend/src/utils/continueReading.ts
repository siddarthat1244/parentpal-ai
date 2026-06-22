import type { SavedStory } from "./storyActions";

const CONTINUE_READING_KEY = "parentpal_continue_reading";

export function saveContinueReading(story: SavedStory) {
  localStorage.setItem(
    CONTINUE_READING_KEY,
    JSON.stringify(story)
  );
}

export function getContinueReading(): SavedStory | null {
  const story = localStorage.getItem(CONTINUE_READING_KEY);

  return story ? JSON.parse(story) : null;
}

export function clearContinueReading() {
  localStorage.removeItem(CONTINUE_READING_KEY);
}