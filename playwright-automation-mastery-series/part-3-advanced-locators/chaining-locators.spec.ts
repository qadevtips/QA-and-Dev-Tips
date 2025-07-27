import { test, expect } from '@playwright/test';

// Define the base URL for your demo HTML file
// IMPORTANT: Replace this with your actual GitHub Pages URL or local server URL
const DEMO_PAGE_URL = 'http://localhost:8080/playwright-automation-mastery-series/demo.html';

test.describe('Part 3: Chaining Locators', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(DEMO_PAGE_URL);
  });

  test('should locate a specific link within the main navigation using chaining', async ({ page }) => {
    // First, locate the main navigation menu using its data-testid
    const mainNav = page.getByTestId('main-navigation');
    await expect(mainNav).toBeVisible();
    console.log('Located main navigation by getByTestId.');

    // Then, chain to find the "Contact" link within that navigation using getByRole
    const contactLink = mainNav.getByRole('link', { name: 'Contact' });
    await expect(contactLink).toBeVisible();
    await contactLink.click();
    console.log('Clicked "Contact" link using chaining.');
    // Assert that the URL changed or an element appeared as expected
    await expect(page).toHaveURL(/#contact/); // Assuming it's an anchor link
  });

  test('should locate a specific element within a nested structure using chaining', async ({ page }) => {
    // Locate the top-level nested container by ID
    const level1Container = page.locator('#nested-level-1');
    await expect(level1Container).toBeVisible();
    console.log('Located level 1 container by ID.');

    // Chain to find the special link deep inside the nested structure
    const deepLink = level1Container.locator('.level-2').locator('.level-3').locator('a.special-link');
    await expect(deepLink).toBeVisible();
    await expect(deepLink).toHaveText('View Details (Deep Link)');
    console.log('Located deep link using multiple chaining steps.');
    await deepLink.click();
    // Assuming it opens in a new tab, you might assert new page count or specific URL
    // const newPagePromise = page.context().waitForEvent('page');
    // await deepLink.click();
    // const newPage = await newPagePromise;
    // await expect(newPage).toHaveURL(/deep-nested-page/);
  });

});
