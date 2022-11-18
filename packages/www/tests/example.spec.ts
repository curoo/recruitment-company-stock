import { test, expect } from "@playwright/test";

test("index should show company stocks", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Company Stock/);
  expect(await page.innerText("h1")).toBe("Company Stock");
  expect(await page.innerText(".card:nth-child(1) div.card-header")).toBe("Apple");
  expect(await page.innerText(".card:nth-child(1) div.card-title")).toBe("AAPL");
  expect(await page.innerText(".card:nth-child(2) div.card-header")).toBe("Google");
  expect(await page.innerText(".card:nth-child(2) div.card-title")).toBe("GOOG");
});
