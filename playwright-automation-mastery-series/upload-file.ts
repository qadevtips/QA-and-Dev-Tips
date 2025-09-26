import { test, expect } from '@playwright/test';

test('should upload a single file', async ({ page }) => {

  await page.goto('https://practice.expandtesting.com/upload');

  // 1. Attach the file (using the input element's locator)
  await page.setInputFiles('[data-testid="file-input"]', 'src/assets/myFile.txt');

  // 2. Click the Upload button to SUBMIT the file (This is the required action)
  await page.click('button[type="submit"]');

});
