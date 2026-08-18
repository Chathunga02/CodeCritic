import { clerkClient } from "@clerk/express";

// This Clerk instance requires org membership before a session goes
// "active" (sessions for org-less users stay stuck "pending" and getAuth
// returns a null userId). Both test users were added as members of the
// existing org via the Backend API when they were created.
async function mintToken(clerkUserId: string) {
  const session = await clerkClient.sessions.createSession({ userId: clerkUserId });
  const { jwt } = await clerkClient.sessions.getToken(session.id);
  return jwt;
}

// Two dedicated permanent Clerk accounts (created once via the Backend API),
// reused by every run instead of throwaway accounts piling up in Clerk.
// Real tokens through the real requireAuth guard, never mocked (V-21).
export function getAuthorToken() {
  return mintToken(process.env.TEST_AUTHOR_CLERK_ID!);
}

export function getReviewerToken() {
  return mintToken(process.env.TEST_REVIEWER_CLERK_ID!);
}
