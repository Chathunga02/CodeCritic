import reviewRepository from "../repository/review.repository.js";
import type { CreateReviewBody } from "../models/review.model.js";

class ReviewService {
  create(reviewerId: number, submissionId: number, input: CreateReviewBody) {
    return reviewRepository.createWithKarma({
      reviewerId,
      submissionId,
      feedback: input.feedback,
      ratings: input.ratings,
    });
  }
}

export default new ReviewService();
