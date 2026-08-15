import submissionRepository from "../repository/submission.repository.js";
import type { CreateSubmissionBody } from "../models/submission.model.js";

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
}

export default new SubmissionService();
