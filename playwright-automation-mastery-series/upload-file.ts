import { test, expect } from '@playwright/test';

test('should upload a single file', async ({ page }) => {

  await page.goto('https://practice.expandtesting.com/upload');

  // 1. Attach the file (using the input element's locator)
  await page.setInputFiles('[data-testid="file-input"]', 'src/assets/myFile.txt');

  // 2. Click the Upload button to SUBMIT the file (This is the required action)
  await page.click('button[type="submit"]');

  // 3. Assert the upload actually succeeded. Without this the test passes even
  // when the server rejects the file.
  await expect(page.getByText(/file uploaded/i)).toBeVisible();
  await expect(page.getByText('myFile.txt')).toBeVisible();
});
