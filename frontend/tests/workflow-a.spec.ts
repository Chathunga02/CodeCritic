import { test, expect } from "@playwright/test";

test("Workflow A: sign in, post a submission, see it on the feed", async ({ page }) => {
  // Go to home page
  await page.goto("http://localhost:3000");
  await expect(page).toHaveTitle(/CodeCritic/);

  // Sign in
  await page.click("text=Sign in");
  await page.fill('input[name="identifier"]', "testauthor@codecritic.dev");
  await page.click("text=Continue");
  await page.fill('input[name="password"]', "TestAuthor@codecritic1");
  await page.click("text=Continue");
  await page.waitForURL("http://localhost:3000");

  // Click Submit in navbar
  await page.click("text=Submit");
  await expect(page).toHaveURL(/submissions\/new/);

  // Fill the form
  await page.fill('input[placeholder*="Title"]', "E2E Test Submission");
  await page.fill('textarea[placeholder*="description"]', "This submission was created by Playwright to verify Workflow A end to end.");
  await page.fill('input[placeholder*="github.com"]', "https://github.com/Chathunga02/CodeCritic");

  // Add a technology
  await page.fill('input[placeholder*="technology"]', "react");
  await page.keyboard.press("Enter");

  // Fill criterion
  await page.fill('input[placeholder*="Criterion 1"]', "Code quality");

  // Submit
  await page.click("text=Post request");

  // Should redirect to detail page
  await page.waitForURL(/submissions\/\d+/);
  await expect(page.locator("h1")).toContainText("E2E Test Submission");
  await expect(page.locator("text=Pending")).toBeVisible();
});
