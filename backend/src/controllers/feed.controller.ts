import { Request, Response } from "express";
import prisma from "../config/prisma.js";
import { tagScore, recencyScore, finalScore } from "../utils/feedScoring.js";
import { FEED_WINDOW } from "../config/constants.js";

// Add clerk auth types to Request (if not already typed)
declare global {
  namespace Express {
    interface Request {
      auth?: { userId: string };
    }
  }
}

export async function getPersonalizedFeed(req: Request, res: Response) {
  // Demo Override or real Clerk Auth
  let clerkId = req.headers["x-mock-clerk-id"] as string;
  if (!clerkId && req.auth?.userId) {
    clerkId = req.auth.userId;
  }

  if (!clerkId) {
    // If no user is authenticated, we might want to return pure chronological feed.
    // But for this milestone, we expect a user.
    return res.status(401).json({ success: false, error: { code: "UNAUTHORIZED", message: "User not authenticated" } });
  }

  const user = await prisma.user.findUnique({
    where: { clerkId },
    include: { technologies: true },
  });

  if (!user) {
    return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "User not found" } });
  }

  const userTags = user.technologies.map((t) => t.name);

  const submissions = await prisma.submission.findMany({
    take: FEED_WINDOW,
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: { username: true, id: true, clerkId: true },
      },
      technologies: true,
    },
  });

  const now = new Date();

  const rankedFeed = submissions.map((sub) => {
    const postTags = sub.technologies.map((t) => t.name);
    
    // Age in hours
    const ageInHours = (now.getTime() - sub.createdAt.getTime()) / (1000 * 60 * 60);
    
    const tScore = tagScore(userTags, postTags);
    const rScore = recencyScore(ageInHours);
    const fScore = finalScore(tScore, rScore);
    
    const matchedTechnologies = postTags.filter((tag) => userTags.includes(tag));

    return {
      id: sub.id,
      title: sub.title,
      description: sub.description,
      githubUrl: sub.githubUrl,
      createdAt: sub.createdAt,
      author: sub.author,
      technologies: postTags,
      matchedTechnologies,
      score: fScore, // For debugging and transparency in demo
    };
  });

  // Sort descending by score
  rankedFeed.sort((a, b) => b.score - a.score);

  res.json({
    success: true,
    data: rankedFeed,
  });
}
