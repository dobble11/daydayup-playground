jest.setTimeout(5 * 60 * 1000);

describe('App', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5173');
  });

  it('单击按钮+1', async () => {
    const element = await page.waitForSelector('.card > button');

    await element.click();
    expect(element.evaluate((el) => el.textContent)).resolves.toBe('count is 1');
  });
});
