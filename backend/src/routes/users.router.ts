import { Router } from "express";
import { z } from "zod";
import requireAuth from "../middlewares/requireAuth.js";
import { validate } from "../middlewares/validate.middleware.js";
import { patchMeBodySchema } from "../models/user.model.js";
import userController from "../controller/user.controller.js";

const router = Router();

const paginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

router.get("/me", requireAuth, userController.getMe);
router.patch("/me", requireAuth, validate(z.object({ body: patchMeBodySchema })), userController.updateMe);
router.get("/me/submissions", requireAuth, validate(z.object({ query: paginationQuerySchema })), userController.getMySubmissions);
router.get("/me/reviews", requireAuth, validate(z.object({ query: paginationQuerySchema })), userController.getMyReviews);
router.get("/me/reviews-received", requireAuth, validate(z.object({ query: paginationQuerySchema })), userController.getMyReviewsReceived);

// Public — no auth. Must be last.
router.get("/:username", userController.getByUsername);

export default router;
