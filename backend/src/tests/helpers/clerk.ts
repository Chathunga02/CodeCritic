const CLERK_API = "https://api.clerk.com/v1";
const ORIGIN = "http://localhost:3000";
function authHeader() {
  return { Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`, "Content-Type": "application/json" };
}
function deriveFapiUrl(publishableKey: string): string {
  const encoded = publishableKey.split("_")[2];
  return `https://${Buffer.from(encoded, "base64").toString("utf-8").replace(/\$$/, "")}`;
}
export interface TestClerkUser { clerkId: string; sessionJwt: string; devBrowserJwt: string; }
export async function createTestClerkUser(emailPrefix: string): Promise<TestClerkUser> {
  const email = `${emailPrefix}-${Date.now()}@codecritic-test.dev`;
  const fapiUrl = deriveFapiUrl(process.env.CLERK_PUBLISHABLE_KEY!);
  const userRes = await fetch(`${CLERK_API}/users`, { method: "POST", headers: authHeader(),
    body: JSON.stringify({ email_address: [email], password: "TestPassword123456!" }) });
  if (!userRes.ok) throw new Error(`createUser failed: ${await userRes.text()}`);
  const { id: clerkId } = await userRes.json() as { id: string };
  const devBrowserRes = await fetch(`${fapiUrl}/v1/dev_browser`, { method: "POST",
    headers: { "Content-Type": "application/json", "Origin": ORIGIN, "Referer": `${ORIGIN}/` } });
  if (!devBrowserRes.ok) throw new Error(`dev_browser failed: ${await devBrowserRes.text()}`);
  const { token: devBrowserJwt } = await devBrowserRes.json() as { token: string };
  const siTokenRes = await fetch(`${CLERK_API}/sign_in_tokens`, { method: "POST", headers: authHeader(),
    body: JSON.stringify({ user_id: clerkId, expires_in_seconds: 60 }) });
  if (!siTokenRes.ok) throw new Error(`sign_in_tokens failed: ${await siTokenRes.text()}`);
  const { token: ticket } = await siTokenRes.json() as { token: string };
  const exchangeRes = await fetch(`${fapiUrl}/v1/client/sign_ins?__dev_session=${devBrowserJwt}`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", "Origin": ORIGIN, "Referer": `${ORIGIN}/` },
    body: `strategy=ticket&ticket=${ticket}` });
  if (!exchangeRes.ok) throw new Error(`ticket exchange failed: ${await exchangeRes.text()}`);
  const exchangeData = await exchangeRes.json() as {
    response?: { created_session_id?: string };
    client?: { sessions?: Array<{ id?: string; last_active_token?: { jwt?: string } }> } };
  const sessionJwt = exchangeData.client?.sessions?.[0]?.last_active_token?.jwt;
  if (!sessionJwt) {
    const sessionId = exchangeData.response?.created_session_id ?? exchangeData.client?.sessions?.[0]?.id;
    if (!sessionId) throw new Error(`No session ID: ${JSON.stringify(exchangeData)}`);
    const tokenRes = await fetch(`${fapiUrl}/v1/client/sessions/${sessionId}/tokens?__dev_session=${devBrowserJwt}`,
      { method: "POST", headers: { "Origin": ORIGIN, "Referer": `${ORIGIN}/` } });
    if (!tokenRes.ok) throw new Error(`FAPI session token failed: ${await tokenRes.text()}`);
    const { jwt } = await tokenRes.json() as { jwt?: string };
    if (!jwt) throw new Error(`No JWT in FAPI session tokens response`);
    return { clerkId, sessionJwt: jwt, devBrowserJwt };
  }
  return { clerkId, sessionJwt, devBrowserJwt };
}
export async function deleteTestClerkUser(clerkId: string): Promise<void> {
  await fetch(`${CLERK_API}/users/${clerkId}`, { method: "DELETE", headers: authHeader() });
}
