import { GroqProvider } from "../ai/groqProvider";
import { buildStoryPrompt } from "../prompts/storyPrompt";

interface GenerateStoryInput {
  theme: string;
  length: string;
  moral: string;
  storyType?: string;
  childProfile?: unknown;
}

export async function generateStory({
  theme,
  length,
  moral,
  childProfile,
}: GenerateStoryInput): Promise<string> {
  const aiProvider = new GroqProvider();

  const prompt = buildStoryPrompt({
    theme,
    length,
    moral,
    childProfile,
  });

  return aiProvider.generateGenericResponse(prompt);
}