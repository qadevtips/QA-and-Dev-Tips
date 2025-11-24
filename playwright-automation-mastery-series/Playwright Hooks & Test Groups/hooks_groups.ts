import { test, expect } from '@playwright/test';

// ---- Global Hooks (apply to all suites in this file) ----
test.beforeAll(async () => {
  console.log('🌍 Global beforeAll: setting up test data or environment...');
});

test.afterAll(async () => {
  console.log('🧹 Global afterAll: cleaning up global stuff after all suites are done.');
});

test.beforeEach(async ({ page }) => {
  console.log('🔄 Global beforeEach: runs before every test across all suites');
});

test.afterEach(async ({ page }) => {
  console.log('✅ Global afterEach: runs after every test across all suites');
});

// ---- Suite 1: Login & Secure Area ----
test.describe('@smoke Login & Secure Area Suite', () => {
  test.beforeAll(async () => {
    console.log('👉 Login suite setup — maybe launch a mock server or prepare login data');
  });

  test.afterAll(async () => {
    console.log('👈 Login suite teardown — cleanup login stuff');
  });

  test.beforeEach(async ({ page }) => {
    console.log('➡️ Navigating to login page');
    await page.goto('https://the-internet.herokuapp.com/login');
  });

  test.afterEach(async ({ page }) => {
    console.log('↩️ Checking if logout button exists...');
    if (await page.isVisible('a.button')) {
      await page.click('a.button');
      console.log('🚪 Logged out successfully');
    }
  });

  test('Successful login shows secure area', async ({ page }) => {
    await page.fill('input#username', 'tomsmith');
    await page.fill('input#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');
    await expect(page.locator('h2')).toHaveText('Secure Area');
  });

  test('Invalid login shows error message', async ({ page }) => {
    await page.fill('input#username', 'tomsmith');
    await page.fill('input#password', 'wrongpassword');
    await page.click('button[type="submit"]');
    await expect(page.locator('#flash')).toContainText('Your password is invalid!');
  });
});

// ---- Suite 2: Account Management ----
test.describe('@RegressionTest Account Management Suite', () => {
  test.beforeEach(async ({ page }) => {
    console.log('➡️ Going to account page (assuming already logged in)');
    await page.goto('https://the-internet.herokuapp.com/secure');
  });

  test('Change user name (mock demo)', async ({ page }) => {
    console.log('✏️ Changing username (demo element)');
    // just a pretend action, since this demo site doesn’t have account editing
    await expect(page.locator('h2')).toHaveText('Secure Area');
  });

  test('Verify secure area content', async ({ page }) => {
    console.log('🔍 Verifying secure page content');
    await expect(page.locator('.example')).toContainText('Welcome to the Secure Area');
  });
});
