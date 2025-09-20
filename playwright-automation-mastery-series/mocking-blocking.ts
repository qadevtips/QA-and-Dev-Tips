import { test, expect } from '@playwright/test';

test('should give different login responses', async ({ page }) => {
  // We tell Playwright to stop any request to our login page.
  await page.route('**/api/login', async route => {
    // We get the information that was sent from the form.
    const postData = route.request().postDataJSON();

    // IF the username and password are correct...
    if (postData.username === 'testuser' && postData.password === 'password123') {
      // ...THEN we tell the page the login was successful.
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Login successful!' })
      });
    } else {
      // ...OTHERWISE, we tell the page the password was wrong.
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Invalid credentials.' })
      });
    }
  });

  // 1. Navigate to our local login form.
  await page.goto('http://127.0.0.1:8081/iFrame demo main.html');

  // 2. Click the login button, which sends our mock request.
  await page.getByRole('button', { name: 'Log In' }).click();

  // 3. Check for the "Login successful!" message on the page.
  await expect(page.locator('#message')).toHaveText('Login successful!');
  await expect(page.locator('#message')).toHaveCSS('color', 'rgb(0, 128, 0)');
});

test('should show an error message for an incorrect login', async ({ page }) => {
  await page.route('**/api/login', async route => {
    await route.fulfill({
      status: 401,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'Invalid credentials.' })
    });
  });

  await page.goto('http://127.0.0.1:8081/iFrame demo main.html');
  await page.locator('#username').fill('wronguser');
  await page.locator('#password').fill('wrongpassword');
  await page.getByRole('button', { name: 'Log In' }).click();

  await expect(page.locator('#message')).toHaveText('Invalid credentials.');
  await expect(page.locator('#message')).toHaveCSS('color', 'rgb(255, 0, 0)');
});


test('should show a loading message for a slow network', async ({ page }) => {
  await page.route('**/api/v1/fruits', async route => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { id: 71, name: 'Cypress' },
        { id: 72, name: 'WebdriverIO' },
      ]),
    });
  });
  
  await page.goto('https://demo.playwright.dev/api-mocking');
  
  // This is the most reliable assertion. Wait for the data to appear.
  await expect(page.getByText('Cypress')).toBeVisible();

  // Then, confirm the loading message is gone.
  await expect(page.getByText('Loading...')).toBeHidden();
});


