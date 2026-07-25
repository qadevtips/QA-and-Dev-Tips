import { Page } from '@playwright/test';

// Base URL for the shared demo HTML file used across the mastery-series specs.
// IMPORTANT: Replace with your actual GitHub Pages URL or local server URL.
export const DEMO_PAGE_URL =
  'http://localhost:8080/playwright-automation-mastery-series/demo.html';

// Navigates a page to the demo page. Handy inside a `test.beforeEach`.
export async function gotoDemoPage(page: Page): Promise<void> {
  await page.goto(DEMO_PAGE_URL);
}
