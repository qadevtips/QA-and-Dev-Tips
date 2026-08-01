import { test, expect } from '@playwright/test';

test('Wait for dynamic list items to load from API', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/dynamic-loading/2');

  // Click start trigger
  await page.getByRole('button', { name: 'Start' }).click();

  // Playwright automatically retries this check until dynamic content renders
  await expect(page.getByRole('heading', { name: 'Hello World!' })).toBeVisible({ timeout: 10000 });
});
