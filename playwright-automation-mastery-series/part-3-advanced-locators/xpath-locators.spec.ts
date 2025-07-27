import { test, expect } from '@playwright/test';

// Define the base URL for your demo HTML file
// IMPORTANT: Replace this with your actual GitHub Pages URL or local server URL
const DEMO_PAGE_URL = 'http://localhost:8080/playwright-automation-mastery-series/demo.html';

test.describe('Part 3: XPath Locators', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(DEMO_PAGE_URL);
  });

  test('should locate email input by XPath using label association', async ({ page }) => {
    // XPath to find an input whose 'id' attribute matches the 'for' attribute of a label containing specific text
    const emailInputXPath = '//input[@id=//label[text()="Email Address for Newsletter:"]/@for]';

    const newsletterEmailInput = page.locator(emailInputXPath);
    await expect(newsletterEmailInput).toBeVisible();
    await newsletterEmailInput.fill('xpath.user@example.com');
    await expect(newsletterEmailInput).toHaveValue('xpath.user@example.com');
    console.log('Filled newsletter email using XPath label association.');

    // Note: page.getByLabel() is the preferred Playwright locator for this scenario.
    // This XPath demonstrates a common technique when page.getByLabel() might not be sufficient or if transitioning from Selenium.
  });

  test('should locate an element using XPath following-sibling for complex traversal', async ({ page }) => {
    // Locate the input field by finding the <label> with text "Crucial Data:"
    // and then traversing to its following sibling which is an <input> element.
    const crucialDataInputXPath = '//label[text()="Crucial Data:"]/following-sibling::input';

    const crucialDataInput = page.locator(crucialDataInputXPath);
    await expect(crucialDataInput).toBeVisible();
    await expect(crucialDataInput).toHaveValue('Some important pre-filled data');
    console.log('Located crucial data input using XPath following-sibling.');

    // Another example: Find the paragraph that comes AFTER the 'crucialData' input
    const paragraphAfterCrucialInputXPath = '//input[@id="crucialData"]/following-sibling::p';
    const paragraphAfterCrucialInput = page.locator(paragraphAfterCrucialInputXPath);
    await expect(paragraphAfterCrucialInput).toBeVisible();
    await expect(paragraphAfterCrucialInput).toHaveText('This paragraph provides additional context after the data input.');
    console.log('Located paragraph after crucial data input using XPath following-sibling.');
  });

});
