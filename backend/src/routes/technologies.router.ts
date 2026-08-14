import { Router } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import prisma from "../config/prisma.js";

const router = Router();

// GET /api/technologies — public, no auth required.
// Returns the full lowercase tag list (D-17). Both the submission form
// and the feed filter chips read from here.
router.get(
  "/",
  catchAsync(async (_req, res) => {
    const technologies = await prisma.technology.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });

    res.json({ success: true, data: technologies });
  }),
);

export default router;
