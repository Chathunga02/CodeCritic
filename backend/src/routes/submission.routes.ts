import { Router } from "express";
import requireAuth from "../middlewares/requireAuth.js";
import { writeLimiter } from "../middlewares/rateLimiter.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createSubmissionSchema, getSubmissionSchema } from "../models/submission.model.js";
import submissionController from "../controller/submission.controller.js";

const router = Router();

router.post("/", requireAuth, writeLimiter, validate(createSubmissionSchema), submissionController.create);

router.get("/:id", validate(getSubmissionSchema), submissionController.getById);

export default router;
