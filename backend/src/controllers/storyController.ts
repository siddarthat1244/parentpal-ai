import { Request, Response } from "express";
import { generateStory } from "../services/storyService";

export async function generateStoryController(
  req: Request,
  res: Response
) {
  try {
    const {
      theme,
      length,
      moral,
      storyType,
      childProfile,
    } = req.body;

    const story = await generateStory({
      theme,
      length,
      moral,
      storyType,
      childProfile,
    });

    res.json({
      story,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to generate story.",
    });
  }
}