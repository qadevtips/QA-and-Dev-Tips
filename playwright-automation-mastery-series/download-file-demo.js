import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test('Download a file from The Internet', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/download');

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click('text=some-file.txt')
  ]);

  // A download can fail after the event fires; surface the reason instead of
  // letting a later assertion fail with an unrelated message.
  const failure = await download.failure();
  expect(failure, `Download failed: ${failure}`).toBeNull();

  const downloadPath = path.join(__dirname, 'downloads', download.suggestedFilename());
  await download.saveAs(downloadPath);

  expect(await download.path()).toBeTruthy();
  expect(fs.existsSync(downloadPath)).toBe(true);
});
