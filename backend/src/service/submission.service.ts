import submissionRepository from "../repository/submission.repository.js";
import type { CreateSubmissionBody, UpdateSubmissionBody } from "../models/submission.model.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { ForbiddenError } from "../errors/ForbiddenError.js";

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

  async update(submissionId: number, userId: number, input: UpdateSubmissionBody) {
    const submission = await submissionRepository.findOwnership(submissionId);

    if (!submission) {
      throw new NotFoundError("Submission not found");
    }

    if (submission.authorId !== userId) {
      throw new ForbiddenError("You can only edit your own submissions");
    }

    const technologies = [...new Set(input.technologies)];

    return submissionRepository.update(submissionId, {
      title: input.title,
      description: input.description,
      githubUrl: input.githubUrl,
      technologies,
    });
  }
}

export default new SubmissionService();
