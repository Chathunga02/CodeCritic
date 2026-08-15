import prisma from "../config/prisma.js";

const submissionSelect = {
  id: true,
  title: true,
  description: true,
  githubUrl: true,
  authorId: true,
  createdAt: true,
  technologies: { select: { id: true, name: true } },
  criteria: { select: { id: true, label: true } },
} as const;

interface CreateWithCriteriaInput {
  authorId: number;
  title: string;
  description: string;
  githubUrl: string;
  technologies: string[];
  criteria: { label: string }[];
}

class SubmissionRepository {
  createWithCriteria(input: CreateWithCriteriaInput) {
    return prisma.submission.create({
      data: {
        title: input.title,
        description: input.description,
        githubUrl: input.githubUrl,
        author: { connect: { id: input.authorId } },
        technologies: {
          connectOrCreate: input.technologies.map((name) => ({
            where: { name },
            create: { name },
          })),
        },
        criteria: {
          create: input.criteria.map((criterion) => ({ label: criterion.label })),
        },
      },
      select: submissionSelect,
    });
  }
}

export default new SubmissionRepository();
