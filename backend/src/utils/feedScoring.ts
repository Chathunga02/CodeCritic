import { 
  FEED_TAG_WEIGHT, 
  FEED_RECENCY_WEIGHT, 
  FEED_HALF_LIFE_HOURS 
} from '../config/constants.js';

/**
 * Calculates the tag overlap score.
 * Returns 1.0 for a full match, 0.0 for no matches, and a proportional score for partial matches.
 */
export function tagScore(userTags: string[], postTags: string[]): number {
  if (!postTags || postTags.length === 0) return 0.0;
  if (!userTags || userTags.length === 0) return 0.0;

  const matches = postTags.filter((tag) => userTags.includes(tag));
  return matches.length / postTags.length;
}

/**
 * Calculates the recency score using exponential decay.
 * Score decays by half every FEED_HALF_LIFE_HOURS.
 */
export function recencyScore(ageInHours: number): number {
  if (ageInHours <= 0) return 1.0;
  return Math.pow(0.5, ageInHours / FEED_HALF_LIFE_HOURS);
}

/**
 * Calculates the final blended score for feed ranking.
 */
export function finalScore(calculatedTagScore: number, calculatedRecencyScore: number): number {
  return (calculatedTagScore * FEED_TAG_WEIGHT) + (calculatedRecencyScore * FEED_RECENCY_WEIGHT);
}
