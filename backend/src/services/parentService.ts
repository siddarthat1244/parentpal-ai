import { GroqProvider } from "../ai/groqProvider";

export const generateParentAnswer = async (
  childAge: string,
  question: string
): Promise<string> => {
  const aiProvider = new GroqProvider();
  return aiProvider.generateParentAnswer(childAge, question);
};