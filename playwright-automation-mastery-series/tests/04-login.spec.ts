import { test, expect } from '@playwright/test';

// ❌ BEFORE CONTEXT7 (Standard / Basic AI output)
test('login - basic AI style', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/login');
  await expect(page.getByRole('heading', { name: /login/i })).toBeVisible();

  await page.getByLabel('Username').fill('practice');
  await page.getByLabel('Password').fill('SuperSecretPassword!');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByRole('alert')).toContainText('You logged into a secure area!');
});

// ✅ AFTER CONTEXT7 (Strict locators + robust pre-assertions via live docs)
test('login - Context7 MCP enhanced style', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/login');

  const heading = page.getByRole('heading', { name: /login/i, exact: true });
  const usernameInput = page.getByRole('textbox', { name: 'Username', exact: true });
  const passwordInput = page.getByRole('textbox', { name: 'Password', exact: true });
  const loginButton = page.getByRole('button', { name: 'Login', exact: true });
  const successAlert = page.getByRole('alert');

  await expect(heading).toBeVisible();
  await expect(usernameInput).toBeVisible();
  await expect(passwordInput).toBeVisible();

  await usernameInput.fill('practice');
  await passwordInput.fill('SuperSecretPassword!');
  await loginButton.click();

  await expect(successAlert).toContainText('You logged into a secure area!');
});
