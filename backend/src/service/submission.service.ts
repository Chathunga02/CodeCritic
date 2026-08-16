import submissionRepository from "../repository/submission.repository.js";
import type { CreateSubmissionBody } from "../models/submission.model.js";
import { NotFoundError } from "../errors/NotFoundError.js";

class SubmissionService {
  create(authorId: number, input: CreateSubmissionBody) {
    const technologies = [...new Set(input.technologies)];

    return submissionRepository.createWithCriteria({
      authorId,
      title: input.title,
      description: input.description,
      githubUrl: input.githubUrl,
      technologies,
      criteria: input.criteria,
    });
  }

  async getById(id: number) {
    const submission = await submissionRepository.findById(id);

    if (!submission) {
      throw new NotFoundError("Submission not found");
    }

    const { _count, ...rest } = submission;

    return {
      ...rest,
      status: _count.reviews === 0 ? "PENDING" : "REVIEWED",
    };
  }
}

export default new SubmissionService();
