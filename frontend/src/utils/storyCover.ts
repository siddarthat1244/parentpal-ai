export function getStoryEmoji(theme: string): string {
  const value = theme.toLowerCase();

  if (value.includes("space")) return "🚀";
  if (value.includes("unicorn")) return "🦄";
  if (value.includes("dinosaur")) return "🦖";
  if (value.includes("ocean")) return "🌊";
  if (value.includes("forest")) return "🌲";
  if (value.includes("princess")) return "👑";
  if (value.includes("animal")) return "🐻";
  if (value.includes("magic")) return "✨";

  return "📖";
}