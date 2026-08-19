import { test, expect } from "@playwright/test";

test("Workflow B: sign in as reviewer, leave a review, karma updates", async ({ page }) => {
  // Go to home feed
  await page.goto("http://localhost:3000");

  // Sign in as reviewer
  await page.click("text=Sign in");
  await page.fill('input[name="identifier"]', "testreviewer@codecritic.dev");
  await page.click("text=Continue");
  await page.fill('input[name="password"]', "TestReviewer@codecritic1");
  await page.click("text=Continue");
  await page.waitForURL("http://localhost:3000");

  // Check karma is 0 before review
  const karmaBefore = page.locator("text=/⚡\\s*\\d+/").first();
  await expect(karmaBefore).toContainText("0");

  // Click first submission card
  await page.locator('[data-testid="feed-card"]').first().click();
  await page.waitForURL(/submissions\/\d+/);

  // Fill review form
  await page.fill('textarea[placeholder*="Feedback"]', "Great work on this submission. The code is clean and well structured. I especially liked the component organisation.");

  // Rate each criterion — click the 4 button for each
  const ratingButtons = page.locator('button[aria-label*="Rate"]').filter({ hasText: "4" });
  for (const btn of await ratingButtons.all()) {
    await btn.click();
  }

  // Submit review
  await page.click("text=Submit review");

  // Karma badge should now show 2
  await expect(page.locator("text=/⚡\\s*2/")).toBeVisible();
});
