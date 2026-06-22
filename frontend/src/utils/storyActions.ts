import jsPDF from "jspdf";

const FAVORITE_STORIES_KEY = "parentpal_favorite_stories";

export interface SavedStory {
  id: string;
  title: string;
  story: string;
  childName?: string;
  createdAt: string;
}

export function printStory() {
  window.print();
}

export function downloadStoryAsPdf(story: SavedStory) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(story.title, 15, 20);

  doc.setFontSize(11);
  if (story.childName) {
    doc.text(`For: ${story.childName}`, 15, 30);
  }

  const lines = doc.splitTextToSize(story.story, 180);
  doc.text(lines, 15, 45);

  doc.save(`${story.title.replaceAll(" ", "-")}.pdf`);
}

export function saveFavoriteStory(story: SavedStory) {
  const saved = localStorage.getItem(FAVORITE_STORIES_KEY);
  const stories: SavedStory[] = saved ? JSON.parse(saved) : [];

  const exists = stories.some(
    (item) => item.story === story.story && item.childName === story.childName
  );

  if (exists) {
    return false;
  }

  localStorage.setItem(
    FAVORITE_STORIES_KEY,
    JSON.stringify([story, ...stories])
  );

  return true;
}

export function getFavoriteStories(): SavedStory[] {
  const saved = localStorage.getItem(FAVORITE_STORIES_KEY);
  return saved ? JSON.parse(saved) : [];
}
export function deleteFavoriteStory(id: string) {
  const stories = getFavoriteStories();

  const updated = stories.filter((story) => story.id !== id);

  localStorage.setItem(
    FAVORITE_STORIES_KEY,
    JSON.stringify(updated)
  );

  return updated;
}

export function deleteAllFavoriteStories() {
  localStorage.removeItem(FAVORITE_STORIES_KEY);
}