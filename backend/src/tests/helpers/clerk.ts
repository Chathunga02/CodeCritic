// Clerk helper for integration tests.
// Creates real Clerk test-mode users and returns bearer JWTs.
// requireAuth is never mocked — real tokens flow through the real middleware (V-21).

const CLERK_API = "https://api.clerk.com/v1";

function authHeader() {
  return {
    Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
    "Content-Type": "application/json",
  };
}

export interface TestClerkUser {
  clerkId: string;
  jwt: string;
}

export async function createTestClerkUser(
  emailPrefix: string,
): Promise<TestClerkUser> {
  const email = `${emailPrefix}-${Date.now()}@codecritic-test.dev`;

  const userRes = await fetch(`${CLERK_API}/users`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      email_address: [email],
      password: "TestPassword123456!",
    }),
  });

  if (!userRes.ok) {
    const err = await userRes.text();
    throw new Error(`Clerk createUser failed: ${err}`);
  }

  const { id: clerkId } = (await userRes.json()) as { id: string };

  const sessionRes = await fetch(`${CLERK_API}/sessions`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ user_id: clerkId }),
  });

  if (!sessionRes.ok) {
    const err = await sessionRes.text();
    throw new Error(`Clerk createSession failed: ${err}`);
  }

  const { id: sessionId } = (await sessionRes.json()) as { id: string };

  const tokenRes = await fetch(`${CLERK_API}/sessions/${sessionId}/tokens`, {
    method: "POST",
    headers: authHeader(),
  });

  if (!tokenRes.ok) {
    const err = await tokenRes.text();
    throw new Error(`Clerk getToken failed: ${err}`);
  }

  const { jwt } = (await tokenRes.json()) as { jwt: string };

  return { clerkId, jwt };
}

export async function deleteTestClerkUser(clerkId: string): Promise<void> {
  await fetch(`${CLERK_API}/users/${clerkId}`, {
    method: "DELETE",
    headers: authHeader(),
  });
}
