import { z } from "zod";

const criterionRatingInput = z
  .object({
    criterionId: z.number().int().positive(),
    rating: z.number().int().min(1, "Rating must be between 1 and 5").max(5, "Rating must be between 1 and 5"),
  })
  .strict();

// POST /api/submissions/:id/reviews - one rating per criterion id
// No top-level .strict(): validate.middleware always passes body/query/params
// together, and this route only cares about body and params.
export const createReviewSchema = z.object({
  params: z
    .object({
      id: z.coerce.number().int().positive(),
    })
    .strict(),
  body: z
    .object({
      feedback: z.string().trim().min(10, "Feedback must be at least 10 characters").max(2000, "Feedback must be at most 2000 characters"),
      ratings: z
        .array(criterionRatingInput)
        .min(1, "At least 1 rating is required")
        .max(5, "At most 5 ratings")
        .refine(
          (ratings) => new Set(ratings.map((r) => r.criterionId)).size === ratings.length,
          "Each criterion can only be rated once",
        ),
    })
    .strict(),
});

export type CreateReviewBody = z.infer<typeof createReviewSchema>["body"];
