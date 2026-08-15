// Clerk helper for integration tests.
// Creates real Clerk test-mode users and returns bearer JWTs.
// requireAuth is never mocked — real tokens flow through the real middleware (V-21).

const CLERK_API = "https://api.clerk.com/v1";
const ORIGIN = "http://localhost:3000";

function authHeader() {
  return {
    Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
    "Content-Type": "application/json",
  };
}

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
  const fapiUrl = deriveFapiUrl(process.env.CLERK_PUBLISHABLE_KEY!);

  // 1. Create user via backend API.
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

  // 2. Initialize a dev browser — required by Clerk development instances
  //    before any FAPI sign-in request can proceed.
  const devBrowserRes = await fetch(`${fapiUrl}/v1/dev_browser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Origin": ORIGIN,
      "Referer": `${ORIGIN}/`,
    },
  });
  if (!devBrowserRes.ok) {
    throw new Error(`Dev browser init failed: ${await devBrowserRes.text()}`);
  }
  const { token: devBrowserJwt } = (await devBrowserRes.json()) as {
    token: string;
  };

  // 3. Create a one-time sign-in ticket via backend API.
  const signInTokenRes = await fetch(`${CLERK_API}/sign_in_tokens`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ user_id: clerkId, expires_in_seconds: 60 }),
  });
  if (!signInTokenRes.ok) {
    throw new Error(
      `Clerk createSignInToken failed: ${await signInTokenRes.text()}`,
    );
  }
  const { token: ticket } = (await signInTokenRes.json()) as { token: string };

  // 4. Exchange the ticket via FAPI, authenticated with the dev browser token.
  const exchangeRes = await fetch(
    `${fapiUrl}/v1/client/sign_ins?__dev_session=${devBrowserJwt}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Origin": ORIGIN,
        "Referer": `${ORIGIN}/`,
      },
      body: `strategy=ticket&ticket=${ticket}`,
    },
  );
  if (!exchangeRes.ok) {
    throw new Error(
      `FAPI ticket exchange failed: ${await exchangeRes.text()}`,
    );
  }

  const data = (await exchangeRes.json()) as {
    response?: { created_session_id?: string };
    client?: {
      sessions?: Array<{
        id?: string;
        last_active_token?: { jwt?: string };
      }>;
    };
  };

  // Try getting JWT directly from the response.
  let jwt = data.client?.sessions?.[0]?.last_active_token?.jwt;

  // Fall back: fetch from session tokens endpoint.
  if (!jwt) {
    const sessionId =
      data.response?.created_session_id ?? data.client?.sessions?.[0]?.id;
    if (sessionId) {
      const tokenRes = await fetch(
        `${fapiUrl}/v1/client/sessions/${sessionId}/tokens?__dev_session=${devBrowserJwt}`,
        {
          method: "POST",
          headers: { "Origin": ORIGIN, "Referer": `${ORIGIN}/` },
        },
      );
      if (tokenRes.ok) {
        const tokenData = (await tokenRes.json()) as { jwt?: string };
        jwt = tokenData.jwt;
      }
    }
  }

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
