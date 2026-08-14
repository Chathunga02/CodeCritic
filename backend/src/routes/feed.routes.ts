import { Router } from "express";
import { getPersonalizedFeed } from "../controllers/feed.controller.js";
import { catchAsync } from "../utils/catchAsync.js";

const router = Router();

router.get("/personalized", catchAsync(getPersonalizedFeed));

export default router;
