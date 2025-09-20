import { test, expect } from '@playwright/test';

test('should handle a link that opens a new tab', async ({ page, context }) => {

  // Step 1: Navigate to the demo site
  await page.goto('https://the-internet.herokuapp.com/windows');

  // Step 2: Use Promise.all to handle the new tab
  // This is the most reliable method. It starts listening for the new page event
  // at the same time as the action that triggers it.
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.getByRole('link', { name: 'Click Here' }).click()
  ]);

  // Step 3: Wait for the new page to load
  await newPage.waitForLoadState();

  // Step 4: Verify the new page content
  // We'll check for a heading that confirms we are on the new page.
  await expect(newPage.getByRole('heading', { name: 'New Window' })).toBeVisible();

});
