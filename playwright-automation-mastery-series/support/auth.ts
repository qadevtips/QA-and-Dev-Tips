import { Page, expect } from '@playwright/test';

// Location of the persisted Playwright storage state (authenticated session).
export const AUTH_FILE = 'tests/.auth/user.json';

// SauceDemo login page and standard demo credentials.
export const SAUCEDEMO_URL = 'https://www.saucedemo.com/';

export const SAUCEDEMO_CREDENTIALS = {
  username: 'standard_user',
  password: 'secret_sauce',
};

// Performs the SauceDemo login flow and verifies the inventory is shown.
export async function loginToSauceDemo(page: Page): Promise<void> {
  await page.goto(SAUCEDEMO_URL);
  await page.fill('#user-name', SAUCEDEMO_CREDENTIALS.username);
  await page.fill('#password', SAUCEDEMO_CREDENTIALS.password);
  await page.click('#login-button');
  await expect(page.locator('.inventory_list')).toBeVisible();
}
