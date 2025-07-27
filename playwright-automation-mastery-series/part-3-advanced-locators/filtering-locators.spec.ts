import { test, expect } from '@playwright/test';

// Define the base URL for your demo HTML file
// IMPORTANT: Replace this with your actual GitHub Pages URL or local server URL
const DEMO_PAGE_URL = 'http://localhost:8080/playwright-automation-mastery-series/demo.html';

test.describe('Part 3: Filtering Locators', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(DEMO_PAGE_URL);
  });

  test('should filter for the "Out of Stock" product card', async ({ page }) => {
    // Locate all product cards first
    const allProductCards = page.locator('.product-card');
    await expect(allProductCards).toHaveCount(4); // Verify we found all 4 initially
    console.log('Located all product cards.');

    // Filter the product cards to find the one with "Out of Stock" text
    const outOfStockProduct = allProductCards.filter({ hasText: 'Out of Stock' });
    await expect(outOfStockProduct).toBeVisible();
    await expect(outOfStockProduct).toHaveText(/Super Gadget/);
    await expect(outOfStockProduct).toHaveClass(/out-of-stock/);
    console.log('Filtered and found "Out of Stock" product.');

    // Further assert that its button is disabled
    const addToCartButton = outOfStockProduct.locator('button.add-to-cart-btn');
    await expect(addToCartButton).toBeDisabled();
    console.log('Confirmed "Out of Stock" product button is disabled.');
  });

  test('should filter for products that are "In Stock"', async ({ page }) => {
    // Locate all product cards
    const allProductCards = page.locator('.product-card');

    // Filter to find products that have the text "In Stock" AND are not "Out of Stock"
    // Using an inner locator for hasText for a more robust filter
    const inStockProducts = allProductCards.filter({
      has: page.locator('p.product-status:has-text("In Stock")')
    });

    await expect(inStockProducts).toHaveCount(2); // Should find Awesome Widget and Basic Tool
    await expect(inStockProducts.first()).toHaveText(/Awesome Widget/);
    await expect(inStockProducts.last()).toHaveText(/Basic Tool/);
    console.log('Filtered and found "In Stock" products.');
  });

});
