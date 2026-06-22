import OpenAI from "openai";
import type { AIProvider } from "./aiProvider";

export class GroqProvider implements AIProvider {
  private client: OpenAI;

  constructor() {
    const groqApiKey = process.env.GROQ_API_KEY;

    if (!groqApiKey) {
      throw new Error(
        "GROQ_API_KEY is missing. Check backend/.env and restart the server."
      );
    }

    this.client = new OpenAI({
      apiKey: groqApiKey,
      baseURL: "https://api.groq.com/openai/v1",
    });
  }

  async generateParentAnswer(
    childAge: string,
    question: string,
    childProfile?: unknown
  ): Promise<string> {
    const profileContext = childProfile
    ? `Child profile: ${JSON.stringify(childProfile)}`
    : "No child profile saved.";
    const completion = await this.client.chat.completions.create({
      model: process.env.GROQ_MODEL || "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `
You are ParentPal AI, a calm and helpful parenting assistant.

Rules:
- Give practical, simple parenting guidance.
- Do not diagnose medical conditions.
- For health or safety concerns, recommend contacting a pediatrician.
- For emergency symptoms, recommend urgent care or emergency services.
- Keep the tone supportive and not scary.
          `,
        },
        {
          role: "user",
          content: `
          ${profileContext}

          Child age entered in chat: ${childAge}
          Parent question: ${question}
          `,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return (
      completion.choices[0]?.message?.content ||
      "Sorry, I could not generate a response."
    );
  }
}