import { Request, Response } from "express";
import { generateParentAnswer } from "../services/parentService";

export const askParentAssistant = (req: Request, res: Response) => {
  const { childAge, question } = req.body;

  if (!childAge || !question) {
    return res.status(400).json({
      message: "Child age and question are required.",
    });
  }

  const answer = generateParentAnswer(childAge, question);

  return res.json({ answer });
};