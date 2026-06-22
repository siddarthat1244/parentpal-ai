export interface StoryItem {
  id: string;
  title: string;
  emoji: string;
  description: string;
}

export interface StoryCollection {
  id: string;
  title: string;
  emoji: string;
  stories: StoryItem[];
}

export const STORY_COLLECTIONS: StoryCollection[] = [
  {
    id: "imagination",
    title: "AI Imagination",
    emoji: "✨",
    stories: [
      { id: "space", title: "Space Adventure", emoji: "🚀", description: "Explore the galaxy" },
      { id: "unicorn", title: "Unicorn", emoji: "🦄", description: "Magical friendship" },
      { id: "dinosaurs", title: "Dinosaurs", emoji: "🦖", description: "Prehistoric fun" },
      { id: "jungle", title: "Jungle", emoji: "🦁", description: "Animal adventure" },
      { id: "custom", title: "Custom", emoji: "➕", description: "Create your own theme" },
    ],
  },
  {
    id: "indian",
    title: "Indian Stories",
    emoji: "🕉️",
    stories: [
      { id: "ganesha", title: "Lord Ganesha", emoji: "🐘", description: "Wisdom and kindness" },
      { id: "krishna", title: "Lord Krishna", emoji: "🦚", description: "Love and devotion" },
      { id: "rama", title: "Lord Rama", emoji: "🏹", description: "Truth and courage" },
      { id: "hanuman", title: "Lord Hanuman", emoji: "🐒", description: "Strength and devotion" },
      { id: "diwali", title: "Diwali", emoji: "🪔", description: "Festival of lights" },
      { id: "holi", title: "Holi", emoji: "🎨", description: "Festival of colors" },
      { id: "custom", title: "Custom", emoji: "➕", description: "Your own Indian story" },
    ],
  },
  {
    id: "moral",
    title: "Moral Stories",
    emoji: "❤️",
    stories: [
      { id: "kindness", title: "Kindness", emoji: "❤️", description: "Helping others" },
      { id: "sharing", title: "Sharing", emoji: "🤝", description: "Being generous" },
      { id: "honesty", title: "Honesty", emoji: "😊", description: "Tell the truth" },
      { id: "courage", title: "Courage", emoji: "💪", description: "Face your fears" },
      { id: "custom", title: "Custom", emoji: "➕", description: "Your own lesson" },
    ],
  },
];