import { Router } from "express";
import { z } from "zod";
import requireAuth from "../middlewares/requireAuth.js";
import { validate } from "../middlewares/validate.middleware.js";
import { catchAsync } from "../utils/catchAsync.js";
import { patchMeBodySchema } from "../models/user.model.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import prisma from "../config/prisma.js";

const router = Router();

const publicUserSelect = {
  id: true,
  username: true,
  bio: true,
  githubUrl: true,
  karma: true,
  createdAt: true,
  technologies: { select: { id: true, name: true } },
} as const;

router.get(
  "/me",
  requireAuth,
  catchAsync(async (req, res) => {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: req.user!.id },
      select: publicUserSelect,
    });
    res.json({ success: true, data: user });
  }),
);

router.patch(
  "/me",
  requireAuth,
  validate(z.object({ body: patchMeBodySchema }).strict()),
  catchAsync(async (req, res) => {
    const { technologyIds, ...scalarFields } = req.body as {
      technologyIds?: number[];
      username?: string;
      bio?: string | null;
      githubUrl?: string | null;
    };

    const user = await prisma.user.update({
      where: { id: req.user!.id },
      data: {
        ...scalarFields,
        ...(technologyIds !== undefined && {
          technologies: {
            set: technologyIds.map((id) => ({ id })),
          },
        }),
      },
      select: publicUserSelect,
    });
    res.json({ success: true, data: user });
  }),
);

router.get(
  "/:username",
  catchAsync(async (req, res) => {
    const user = await prisma.user.findUnique({
      where: { username: String(req.params.username) },
      select: publicUserSelect,
    });

    if (!user) {
      throw new NotFoundError("User not found");
    }
    res.json({ success: true, data: user });
  }),
);

export default router;
