import { Router } from "express";
import { askParentAssistant } from "../controllers/parentController";

const router = Router();

router.post("/ask", askParentAssistant);

export default router;