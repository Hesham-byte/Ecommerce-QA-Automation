import { test, expect } from '@playwright/test';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { CartPage } from '../pages/CartPage';
import { uniqueEmail } from '../data/test-data';

test.describe('Product Details', () => {
  test('should verify product details are displayed', async ({ page }) => {
    const detailsPage = new ProductDetailsPage(page);
    await detailsPage.goto(1);

    await detailsPage.verifyProductDetailsVisible('Blue Top');
    await expect(detailsPage.availability).toContainText('In Stock');
    await expect(detailsPage.condition).toContainText('New');
    await expect(detailsPage.brand).toContainText('Polo');
  });

  test('should increase quantity and add to cart', async ({ page }) => {
    const detailsPage = new ProductDetailsPage(page);
    const cartPage = new CartPage(page);

    await detailsPage.goto(2);
    await detailsPage.setQuantity(4);
    await detailsPage.addToCart();
    await detailsPage.goToCartFromModal();

    await cartPage.verifyCartVisible();
    await cartPage.verifyProductInCart('Men Tshirt', 4);

    const unitPrice = Number((await cartPage.getProductUnitPrice('Men Tshirt')).replace(/[^\d]/g, ''));
    const totalPrice = Number((await cartPage.getProductTotalPrice('Men Tshirt')).replace(/[^\d]/g, ''));
    expect(totalPrice).toBe(unitPrice * 4);
  });

  test('should submit a review for a product', async ({ page }) => {
    const detailsPage = new ProductDetailsPage(page);
    await detailsPage.goto(1);

    await detailsPage.submitReview(
      'QA Tester',
      uniqueEmail('review'),
      'Excellent product, highly recommended!',
    );
    await detailsPage.expectReviewSubmitted();
  });
});