import { test, expect } from '@playwright/test';

// Define the base URL for your demo HTML file
// IMPORTANT: Replace this with your actual GitHub Pages URL or local server URL
const DEMO_PAGE_URL = 'http://localhost:8080/playwright-automation-mastery-series/demo.html';

test.describe('Part 1: User-Facing Locators', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(DEMO_PAGE_URL);
  });

  test('should locate elements by Role (button)', async ({ page }) => {
    // Locate the "Sign In" button by its role and name
    const signInButton = page.getByRole('button', { name: 'Sign In' });
    await expect(signInButton).toBeVisible();
    await signInButton.click();
    console.log('Clicked "Sign In" button by role and name.');
    // Add an assertion for what happens after clicking, e.g., URL change or text appearing
    // await expect(page.url()).toContain('/login-success');
  });

  test('should locate elements by Text', async ({ page }) => {
    // Locate a paragraph by its text content
    const welcomeParagraph = page.getByText('Welcome to the Playwright Automation Demo Page');
    await expect(welcomeParagraph).toBeVisible();
    console.log('Located welcome paragraph by text.');

    // Locate "Out of Stock" text within a product card
    const outOfStockText = page.getByText('Out of Stock', { exact: true });
    await expect(outOfStockText).toBeVisible();
    console.log('Located "Out of Stock" text.');
  });

  test('should locate elements by Placeholder Text', async ({ page }) => {
    // Locate the username input field by its placeholder
    const usernameInput = page.getByPlaceholder('Enter your username');
    await expect(usernameInput).toBeVisible();
    await usernameInput.fill('testuser');
    await expect(usernameInput).toHaveValue('testuser');
    console.log('Filled username input by placeholder.');

    // Locate the password input field by its placeholder
    const passwordInput = page.getByPlaceholder('Secure Password');
    await expect(passwordInput).toBeVisible();
    await passwordInput.fill('secret123');
    await expect(passwordInput).toHaveValue('secret123');
    console.log('Filled password input by placeholder.');
  });

  test('should locate elements by Label Text', async ({ page }) => {
    // Locate the email input field in the Newsletter Signup section by its associated label
    const newsletterEmailInput = page.getByLabel('Email Address for Newsletter:');
    await expect(newsletterEmailInput).toBeVisible();
    await newsletterEmailInput.fill('example@newsletter.com');
    await expect(newsletterEmailInput).toHaveValue('example@newsletter.com');
    console.log('Filled newsletter email by label.');

    // Locate the "Crucial Data" input field by its label
    const crucialDataInput = page.getByLabel('Crucial Data:');
    await expect(crucialDataInput).toBeVisible();
    await expect(crucialDataInput).toHaveValue('Some important pre-filled data');
    console.log('Located crucial data input by label.');
  });

});
