// auth.setup.ts (Updated for SauceDemo)

import { test as setup } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';
import { AUTH_FILE, loginToSauceDemo } from '../support/auth';

const authFile = AUTH_FILE;

setup('save authenticated state', async ({ page }) => {
  // Log in to SauceDemo and verify the inventory is shown
  await loginToSauceDemo(page);

  // Ensure directory exists
  const authDir = path.dirname(authFile);
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  // Save storage state
  await page.context().storageState({ path: authFile });
});
