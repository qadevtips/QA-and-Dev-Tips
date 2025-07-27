import { test, expect } from '@playwright/test';

// Define the base URL for your demo HTML file
// IMPORTANT: Replace this with your actual GitHub Pages URL or local server URL
const DEMO_PAGE_URL = 'http://localhost:8080/playwright-automation-mastery-series/demo.html';

test.describe('Part 2: getByTestId & CSS Selectors', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(DEMO_PAGE_URL);
  });

  test('should locate elements using getByTestId', async ({ page }) => {
    // Locate the username input using its data-testid attribute
    const usernameInput = page.getByTestId('username-input');
    await expect(usernameInput).toBeVisible();
    await usernameInput.fill('test.id.user');
    await expect(usernameInput).toHaveValue('test.id.user');
    console.log('Filled username input using getByTestId.');

    // Locate the login button using its data-testid attribute
    const loginButton = page.getByTestId('login-button');
    await expect(loginButton).toBeVisible();
    await loginButton.click();
    console.log('Clicked login button using getByTestId.');
  });

  test('should locate elements using CSS Selectors (ID and Class)', async ({ page }) => {
    // Locate the login form by its ID
    const loginForm = page.locator('#loginForm');
    await expect(loginForm).toBeVisible();
    console.log('Located login form by ID.');

    // Locate the "Sign In" button by its class name
    const signInButtonByClass = page.locator('.section-container button[type="submit"]');
    await expect(signInButtonByClass).toBeVisible();
    console.log('Located Sign In button by class.');
  });

  test('should locate elements using more advanced CSS Selectors (Attribute, Descendant, Nth-child)', async ({ page }) => {
    // Locate the email input field by its name attribute
    const emailInputByName = page.locator('input[name="newsletterEmail"]');
    await expect(emailInputByName).toBeVisible();
    await emailInputByName.fill('advanced.css@example.com');
    console.log('Filled email input by name attribute CSS.');

    // Locate the "Awesome Widget" product card using a descendant selector
    const awesomeWidgetPrice = page.locator('.product-card:has-text("Awesome Widget") p.product-status');
    await expect(awesomeWidgetPrice).toHaveText('In Stock');
    console.log('Located Awesome Widget status using descendant selector.');

    // Locate the second product card (Super Gadget) using nth-child
    const secondProductCard = page.locator('.product-showcase .product-card:nth-child(2)');
    await expect(secondProductCard).toHaveText(/Super Gadget/);
    await expect(secondProductCard).toHaveClass(/out-of-stock/);
    console.log('Located second product card using nth-child.');
  });

});
