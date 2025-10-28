// tests.spec.ts
import { test, expect } from '@playwright/test';

const STORAGE_STATE_PATH = 'tests/.auth/user.json';

test.use({ storageState: STORAGE_STATE_PATH }); // Use saved session

test('User should be able to log out from the inventory page', async ({ page }) => {
  // Page starts already logged in
  await page.goto('https://www.saucedemo.com/inventory.html');

  // Open menu and click logout
  await page.click('#react-burger-menu-btn');
  await page.click('#logout_sidebar_link');

  // Verify successful logout by checking login button
  await expect(page.locator('#login-button')).toBeVisible();
});
