import { test, expect } from "@playwright/test";

test("index should show company stocks", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Company Stock/);
  expect(await page.innerText("h1")).toBe("Company Stock");
});
