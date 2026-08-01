import { test, expect } from '@playwright/test';

test('Target specific item in a dynamic table', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/tables');

  // Filter dynamic rows cleanly without using parent-child XPaths
  const targetRow = page.getByRole('row').filter({ hasText: 'jsmith@gmail.com' });

  // Chain and perform action inside the specific row
  await targetRow.getByRole('link', { name: 'edit' }).first().click();
  
  await expect(page).toHaveURL(/.*#edit/);
});
