import { test, expect } from "@playwright/test";

const URL = "https://poran-dip.github.io/gradient/";

test("page loads and code is copyable", async ({ page }) => {
  await page.goto(URL);
  const code = page.locator("pre code");
  await expect(code).toBeVisible();

  const codeText = await code.textContent();

  await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);

  const button = page.locator("button");
  await button.click();

  const clipboardText = await page.evaluate(async () => {
    return await navigator.clipboard.readText();
  });

  const normalize = (str) =>
    str.replace(/\s+/g, " ").trim();

  expect(normalize(clipboardText)).toBe(normalize(codeText));
});
