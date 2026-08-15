// Clerk helper for integration tests.
// Creates real Clerk test-mode users and returns bearer JWTs via FAPI.
// requireAuth is never mocked — real tokens flow through the real middleware (V-21).

const CLERK_API = "https://api.clerk.com/v1";

function authHeader() {
  return {
    Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
    "Content-Type": "application/json",
  };
}

// Derives the Clerk FAPI URL from the publishable key.
// Format: pk_test_BASE64ENCODED  where base64 decodes to "domain$"
function deriveFapiUrl(publishableKey: string): string {
  const encoded = publishableKey.split("_")[2];
  const domain = Buffer.from(encoded, "base64")
    .toString("utf-8")
    .replace(/\$$/, "");
  return `https://${domain}`;
}

export interface TestClerkUser {
  clerkId: string;
  jwt: string;
}

export async function createTestClerkUser(
  emailPrefix: string,
): Promise<TestClerkUser> {
  const email = `${emailPrefix}-${Date.now()}@codecritic-test.dev`;

  // 1. Create the user in Clerk test mode.
  const userRes = await fetch(`${CLERK_API}/users`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      email_address: [email],
      password: "TestPassword123456!",
    }),
  });
  if (!userRes.ok) {
    throw new Error(`Clerk createUser failed: ${await userRes.text()}`);
  }
  const { id: clerkId } = (await userRes.json()) as { id: string };

  // 2. Create a one-time sign-in token (ticket).
  const signInTokenRes = await fetch(`${CLERK_API}/sign_in_tokens`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ user_id: clerkId, expires_in_seconds: 60 }),
  });
  if (!signInTokenRes.ok) {
    throw new Error(`Clerk createSignInToken failed: ${await signInTokenRes.text()}`);
  }
  const { token: ticket } = (await signInTokenRes.json()) as { token: string };

  // 3. Exchange the ticket via FAPI to get a real session JWT that
  //    @clerk/express can verify via Bearer token authentication.
  const fapiUrl = deriveFapiUrl(process.env.CLERK_PUBLISHABLE_KEY!);
  const exchangeRes = await fetch(`${fapiUrl}/v1/client/sign_ins`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Origin": process.env.ALLOWED_ORIGINS || "http://localhost:3000",
    },
    body: `strategy=ticket&ticket=${ticket}`,
  });
  if (!exchangeRes.ok) {
    throw new Error(`FAPI ticket exchange failed: ${await exchangeRes.text()}`);
  }

  const data = (await exchangeRes.json()) as {
    client?: {
      sessions?: Array<{
        last_active_token?: { jwt?: string };
      }>;
    };
  };

  const jwt = data.client?.sessions?.[0]?.last_active_token?.jwt;
  if (!jwt) {
    throw new Error(`No JWT in FAPI response: ${JSON.stringify(data)}`);
  }

  return { clerkId, jwt };
}

export async function deleteTestClerkUser(clerkId: string): Promise<void> {
  await fetch(`${CLERK_API}/users/${clerkId}`, {
    method: "DELETE",
    headers: authHeader(),
  });
}
