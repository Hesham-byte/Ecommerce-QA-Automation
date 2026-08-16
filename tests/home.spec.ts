import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { uniqueEmail } from '../data/test-data';

test.describe('Home Page', () => {
  test('should load the homepage successfully', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await homePage.verifyHomePageVisible();
    await expect(page).toHaveTitle('Automation Exercise');
  });

  test('should verify all navigation links are visible', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await expect(homePage.homeLink).toBeVisible();
    await expect(homePage.productsLink).toBeVisible();
    await expect(homePage.cartLink).toBeVisible();
    await expect(homePage.signupLoginLink).toBeVisible();
    await expect(homePage.contactUsLink).toBeVisible();
  });

  test('should subscribe with an email address', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await homePage.subscribeWithEmail(uniqueEmail('sub'));
    await homePage.expectSubscriptionSuccess();
  });

  test('should add a recommended item to the cart', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await expect(homePage.recommendedItems).toBeVisible();
    await expect(page.getByRole('heading', { name: 'recommended items' })).toBeVisible();

    const firstAddToCart = homePage.recommendedItems.locator('.add-to-cart').first();
    await firstAddToCart.click();

    const modal = page.locator('#cartModal');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('Your product has been added to cart.');
  });
});