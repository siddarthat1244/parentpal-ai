interface StoryPromptInput {
  theme: string;
  length: string;
  moral: string;
  childProfile?: unknown;
}

export function buildStoryPrompt({
  theme,
  length,
  moral,
  childProfile,
}: StoryPromptInput): string {
  return `
Create a personalized bedtime story for a child.

Child Profile:
${childProfile ? JSON.stringify(childProfile, null, 2) : "No child profile provided"}

Story Requirements:
- Theme: ${theme}
- Length: ${length}
- Moral lesson: ${moral || "Include a positive lesson"}
- Use warm, gentle bedtime language.
- Make it age-appropriate.
- Make the child feel included in the story.
- End with a calming bedtime tone.
`;
}