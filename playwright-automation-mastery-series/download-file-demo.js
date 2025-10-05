import { test, expect } from '@playwright/test';
import * as path from 'path';

test('Download a file from The Internet', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/download');

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click('text=some-file.txt')
  ]);

  const downloadPath = path.join(__dirname, 'downloads', await download.suggestedFilename());
  await download.saveAs(downloadPath);


  expect(await download.path()).toBeTruthy();
});
