interface StoryPromptInput {
  theme: string;
  length: string;
  moral: string;
  storyType?: string;
  childProfile?: unknown;
}

export function buildStoryPrompt({
  theme,
  length,
  moral,
  storyType = "Imagination",
  childProfile,
}: StoryPromptInput): string {
  const mythologyInstructions =
    storyType === "Mythology"
      ? `
Important Story Type:
- This should be a respectful traditional mythology / ancient story retelling.
- Do NOT invent new events involving gods or sacred figures.
- Use well-known traditional story elements only.
- Keep it simple and child-friendly.
- Avoid scary, violent, or complex scenes.
- Explain the moral gently.
`
      : `
Important Story Type:
- This can be an imaginative fictional bedtime story.
- You may create new characters and events.
`;

  return `
Create a personalized children's story.

Child Profile:
${childProfile ? JSON.stringify(childProfile, null, 2) : "No child profile provided"}

Story Type:
${storyType}

${mythologyInstructions}

Story Requirements:
- Theme: ${theme}
- Length: ${length}
- Moral lesson: ${moral || "Include a positive lesson"}
- Use warm, gentle bedtime language.
- Make it age-appropriate.
- Make the child feel included only as a listener or learner if this is a mythology story.
- End with a calming bedtime tone.

If this is a mythology story:
- Do not say the child changed the original sacred story.
- Do not make the child a god or part of the sacred event.
- Instead say: "As ${extractChildName(childProfile)} listened to this story..."
`;
}

function extractChildName(childProfile?: unknown): string {
  if (
    childProfile &&
    typeof childProfile === "object" &&
    "name" in childProfile
  ) {
    const name = (childProfile as { name?: string }).name;
    return name || "the child";
  }

  return "the child";
}