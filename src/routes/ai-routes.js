import { Router } from "express";
import { getResponseFromHercaAI } from "../controllers/ai-controller.js";
import isAuthenticatedAI from "../middleware/isAuthenticated.js";

const router = Router();

router.post("/", isAuthenticatedAI, getResponseFromHercaAI);

export default router;
