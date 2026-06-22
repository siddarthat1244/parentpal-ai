interface StoryPromptInput {
  theme: string;
  length: string;
  moral: string;
  storyType?: string;
  childProfile?: unknown;
}

function getChildName(childProfile?: unknown): string {
  if (
    childProfile &&
    typeof childProfile === "object" &&
    "name" in childProfile
  ) {
    return (childProfile as { name?: string }).name || "the child";
  }

  return "the child";
}

export function buildStoryPrompt({
  theme,
  length,
  moral,
  storyType = "Imagination",
  childProfile,
}: StoryPromptInput): string {
  const childName = getChildName(childProfile);

  if (storyType === "Mythology") {
    return `
You are ParentPal AI.

Task:
Retell a traditional mythology / ancient story for a young child.

IMPORTANT:
- Do NOT create a fictional adventure.
- Do NOT make ${childName} part of the original sacred story.
- Do NOT say ${childName} met gods, changed events, traveled with gods, or joined the story.
- Retell a known traditional story related to: ${theme}.
- Keep the story respectful, simple, and child-friendly.
- Avoid scary, violent, or complex details.
- If the exact story is broad, choose a well-known traditional episode.
- End with a short moral for ${childName}.

Child Profile:
${childProfile ? JSON.stringify(childProfile, null, 2) : "No child profile provided"}

Story Topic:
${theme}

Length:
${length}

Moral:
${moral || "Include a gentle moral"}

Format:
Title:
Story:
Moral:
`;
  }

  if (storyType === "Moral Story") {
    return `
Create a simple child-friendly moral story.

Child Profile:
${childProfile ? JSON.stringify(childProfile, null, 2) : "No child profile provided"}

Theme:
${theme}

Length:
${length}

Moral:
${moral || theme}

Rules:
- Fictional story is allowed.
- Keep it simple, warm, and age-appropriate.
- End with a clear lesson.
`;
  }

  return `
Create a personalized imaginative bedtime story.

Child Profile:
${childProfile ? JSON.stringify(childProfile, null, 2) : "No child profile provided"}

Theme:
${theme}

Length:
${length}

Moral:
${moral || "Include a positive lesson"}

Rules:
- Creative fictional story is allowed.
- Make the child feel included.
- Use warm bedtime language.
`;
}