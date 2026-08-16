import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.automationexercise.com/payment_done/500');
  console.log('TITLE:', await page.title());
  console.log('H2s:', JSON.stringify(await page.locator('h2').allTextContents()));
  console.log('ORDER PLACED:', await page.getByRole('heading', { name: 'Order Placed!' }).count());
  const body = await page.locator('body').innerText();
  console.log('BODY HAS "ORDER PLACED":', body.includes('Order Placed'));
  console.log('BODY HAS "Your order has been placed successfully":', body.includes('Your order has been placed successfully'));
  console.log('Download Invoice link:', await page.getByRole('link', { name: /Download Invoice/ }).count());
  await browser.close();
})();