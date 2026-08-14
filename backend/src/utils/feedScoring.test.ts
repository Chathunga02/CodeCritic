import { describe, it, expect } from 'vitest';
import { tagScore, recencyScore, finalScore } from './feedScoring.js';
import { FEED_TAG_WEIGHT, FEED_RECENCY_WEIGHT, FEED_HALF_LIFE_HOURS } from '../config/constants.js';

describe('feedScoring', () => {
  describe('tagScore', () => {
    it('returns 1.0 for a full match', () => {
      expect(tagScore(['react', 'nodejs'], ['react', 'nodejs'])).toBe(1.0);
    });

    it('returns proportional score for partial match', () => {
      // User has react, post has react, docker, python. Score should be 1/3.
      expect(tagScore(['react', 'nextjs'], ['react', 'docker', 'python'])).toBeCloseTo(0.333, 3);
    });

    it('returns 0.0 for no matches', () => {
      expect(tagScore(['nodejs'], ['python', 'docker'])).toBe(0.0);
    });

    it('returns 0.0 if user has no tags', () => {
      expect(tagScore([], ['react'])).toBe(0.0);
    });

    it('returns 0.0 if post has no tags', () => {
      expect(tagScore(['react'], [])).toBe(0.0);
    });
  });

  describe('recencyScore', () => {
    it('returns 1.0 for age 0', () => {
      expect(recencyScore(0)).toBe(1.0);
    });

    it(`returns 0.5 for age equal to half-life (${FEED_HALF_LIFE_HOURS}h)`, () => {
      expect(recencyScore(FEED_HALF_LIFE_HOURS)).toBe(0.5);
    });

    it(`returns 0.25 for age equal to 2x half-life (${FEED_HALF_LIFE_HOURS * 2}h)`, () => {
      expect(recencyScore(FEED_HALF_LIFE_HOURS * 2)).toBe(0.25);
    });

    it('handles negative age gracefully', () => {
      expect(recencyScore(-10)).toBe(1.0);
    });
  });

  describe('finalScore', () => {
    it('calculates correct blended score for full match at 0h', () => {
      const ts = 1.0;
      const rs = 1.0;
      const expected = (1.0 * FEED_TAG_WEIGHT) + (1.0 * FEED_RECENCY_WEIGHT);
      expect(finalScore(ts, rs)).toBeCloseTo(expected, 5);
      // If weights are 0.7 and 0.3, this is 1.0
      expect(finalScore(ts, rs)).toBeCloseTo(1.0, 5);
    });

    it('calculates correct blended score for partial match at half-life', () => {
      const ts = 1/3;
      const rs = 0.5;
      const expected = (ts * FEED_TAG_WEIGHT) + (rs * FEED_RECENCY_WEIGHT);
      expect(finalScore(ts, rs)).toBeCloseTo(expected, 5);
    });

    it('calculates fallback score for no tags (Bob scenario)', () => {
      const ts = 0.0;
      const rs = 0.8; // some arbitrary recency score
      const expected = 0.0 + (rs * FEED_RECENCY_WEIGHT);
      expect(finalScore(ts, rs)).toBeCloseTo(expected, 5);
    });
  });
});
