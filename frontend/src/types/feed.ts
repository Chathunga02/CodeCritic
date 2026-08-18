import { ReviewAuthor, Technology } from "./submission";

export interface FeedSubmission {
  id: number;
  title: string;
  description: string;
  githubUrl: string;
  createdAt: string;
  author: ReviewAuthor;
  technologies: Technology[];
  _count: {
    reviews: number;
  };
  matchedTechnologies?: string[];
  _score?: number;
}
