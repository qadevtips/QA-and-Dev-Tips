import { test, expect } from '@playwright/test';

test('Click button safely using getByRole', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/login');

  // Uses user-facing locators (resilient to dynamic CSS/IDs)
  await page.getByLabel('Username').fill('practice');
  await page.getByLabel('Password').fill('SuperSecretPassword!');
  
  // Playwright automatically waits for button to be visible, enabled, and stable
  await page.getByRole('button', { name: 'Login' }).click();

  // Web assertion with auto-retry
  await expect(page.getByRole('alert')).toContainText('You logged into a secure area!');
});
