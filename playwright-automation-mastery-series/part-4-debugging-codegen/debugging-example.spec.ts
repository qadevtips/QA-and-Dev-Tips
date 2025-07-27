import { test, expect } from '@playwright/test';

// Define the base URL for your demo HTML file
// IMPORTANT: Replace this with your actual GitHub Pages URL or local server URL
const DEMO_PAGE_URL = 'http://localhost:8080/playwright-automation-mastery-series/demo.html';

test.describe('Part 4: Debugging with Playwright Inspector & Codegen Example', () => {

  test('should demonstrate using page.pause() for Playwright Inspector', async ({ page }) => {
    await page.goto(DEMO_PAGE_URL);

    // --- DEMO START FOR INSPECTOR ---
    // When this line is hit, Playwright Inspector will open, pausing test execution.
    // You can then visually inspect elements, use the selector playground, and step through.
    await page.pause();
    // --- DEMO END FOR INSPECTOR ---

    // After resuming from page.pause(), the test continues
    const usernameInput = page.getByPlaceholder('Enter your username');
    await expect(usernameInput).toBeVisible();

    // --- DEMO START FOR CODING/CODGEN FLOW ---
    // You might demonstrate running Codegen (npx playwright codegen) separately
    // and then pasting the generated code here, or showing how to interact and see it generate.

    // Example of a few steps you might generate with Codegen or manually type:
    await usernameInput.fill('codegen.test');
    await page.getByPlaceholder('Secure Password').fill('codegenPass');
    await page.getByRole('button', { name: 'Sign In' }).click();

    // You would then add an assertion for the result of these actions
    // For this simple demo, we'll just assert something on the current page
    await expect(page.locator('h1')).toHaveText('Welcome to the Playwright Automation Demo Page');
    // --- DEMO END FOR CODING/CODGEN FLOW ---

    console.log('Debugging example test finished.');
  });

});
