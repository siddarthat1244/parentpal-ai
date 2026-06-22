import { Router } from "express";
import { generateStoryController } from "../controllers/storyController";

const router = Router();

router.post("/generate", generateStoryController);

export default router;