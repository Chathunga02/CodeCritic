// In test mode, requireAuth checks for the x-test-clerk-user-id header
// and bypasses Clerk JWT verification entirely (see requireAuth.ts).
export function getAuthorToken(): string {
  return process.env.TEST_AUTHOR_CLERK_ID!;
}

export function getReviewerToken(): string {
  return process.env.TEST_REVIEWER_CLERK_ID!;
}
