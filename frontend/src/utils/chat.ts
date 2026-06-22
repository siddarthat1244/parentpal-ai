export function generateConversationTitle(
  question: string
) {
  const clean = question.trim();

  if (clean.length <= 40) {
    return clean;
  }

  return clean.substring(0, 40) + "...";
}