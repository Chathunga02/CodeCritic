import type { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import submissionService from "../service/submission.service.js";
import type { CreateSubmissionBody } from "../models/submission.model.js";

class SubmissionController {
  create = catchAsync(async (req: Request, res: Response) => {
    const body = req.body as CreateSubmissionBody;
    const submission = await submissionService.create(req.user!.id, body);

    res.status(201).json({
      success: true,
      data: submission,
    });
  });
}

export default new SubmissionController();
