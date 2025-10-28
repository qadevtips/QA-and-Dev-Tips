// auth.setup.ts (Updated for SauceDemo)

import { test as setup, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

const authFile = 'tests/.auth/user.json';

setup('save authenticated state', async ({ page }) => {
  // Navigate to the Sauce Demo login page
  await page.goto('https://www.saucedemo.com/');

  // Fill in the demo credentials
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Verify successful login by checking presence of inventory container
  await expect(page.locator('.inventory_list')).toBeVisible();

  // Ensure directory exists
  const authDir = path.dirname(authFile);
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  // Save storage state
  await page.context().storageState({ path: authFile });
});
