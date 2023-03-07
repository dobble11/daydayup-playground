import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173');
});

test.describe('App', () => {
  test('单击按钮+1', async ({ page }) => {
    const element = page.locator('.card > button');
    await element.click();
    expect(await element.textContent()).toBe('count is 1');
  });
});
