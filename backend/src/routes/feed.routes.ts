import { Router } from "express";
import { feedController } from "../controller/feed.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { feedQuerySchema } from "../models/feed.model.js";

const router = Router();

router.get("/", validate(feedQuerySchema), feedController.getPublicFeed);

export default router;
