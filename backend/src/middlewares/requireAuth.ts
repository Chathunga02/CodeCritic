import { getAuth } from "@clerk/express";
import type { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma.js";
import { UnauthorizedError } from "../errors/UnauthorizedError.js";
import { catchAsync } from "../utils/catchAsync.js";
import { deriveUsername } from "../utils/deriveUsername.js";

export default catchAsync(
  async (req: Request, _res: Response, next: NextFunction) => {
    const { userId } = getAuth(req);
    if (!userId) {
      throw new UnauthorizedError("Authentication required");
    }

    const user = await prisma.user.upsert({
      where: { clerkId: userId },
      update: {},
      create: {
        clerkId: userId,
        username: await deriveUsername(userId), // lowercased, numeric suffix on collision (D-12)
      },
      select: { id: true, username: true, karma: true }, // clerkId never selected (D-08, V-07)
    });

    req.user = user;
    next();
  },
);
