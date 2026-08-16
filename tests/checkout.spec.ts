import { test, expect } from './../fixtures/test';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { HomePage } from '../pages/HomePage';
import { validCard } from '../data/test-data';

test.describe('Checkout', () => {
  test('should place an order as a logged-in user', async ({ page, account }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const homePage = new HomePage(page);

    await homePage.goto();
    await productsPage.goto();
    await productsPage.addToCartByName('Blue Top');
    await productsPage.verifyProductAddedModal();
    await productsPage.goToCartFromModal();

    await cartPage.verifyCartVisible();
    await cartPage.verifyProductInCart('Blue Top');
    await cartPage.proceedToCheckout();

    await checkoutPage.verifyDeliveryAddressVisible();
    await expect(page).toHaveURL(/\/checkout/);

    await checkoutPage.enterOrderComment('Please deliver between 10am and 12pm.');
    await checkoutPage.placeOrder();

    await checkoutPage.fillPaymentDetails(validCard);
    await checkoutPage.payAndConfirmOrder();
    await checkoutPage.expectOrderPlaced();

    await expect(page.getByRole('heading', { name: 'Order Placed!' })).toBeVisible();
  });

  test('should verify delivery and billing addresses on checkout', async ({ page, account }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const homePage = new HomePage(page);

    await homePage.goto();
    await productsPage.goto();
    await productsPage.addToCartByName('Men Tshirt');
    await productsPage.verifyProductAddedModal();
    await productsPage.goToCartFromModal();

    await cartPage.proceedToCheckout();
    await checkoutPage.verifyDeliveryAddressVisible();
    await checkoutPage.expectAddressInBothBlocks(account.name, 'Test');
  });
});