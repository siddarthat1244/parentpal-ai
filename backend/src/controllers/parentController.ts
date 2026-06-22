import { Request, Response } from "express";
import { generateParentAnswer } from "../services/parentService";

export const askParentAssistant = async (req: Request, res: Response) => {
  try {
    const { childAge, question, childProfile } = req.body;

    if (!childAge || !question) {
      return res.status(400).json({
        message: "Child age and question are required.",
      });
    }

    const answer = await generateParentAnswer(childAge, question, childProfile);

    return res.json({ answer });
  } catch (error) {
    console.error("Parent assistant error:", error);

    return res.status(500).json({
      message: "Unable to generate response right now.",
    });
  }
};