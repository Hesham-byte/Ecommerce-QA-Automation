import { test, expect } from '../fixtures/base';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

test.describe('Cart', () => {
  test('should add two products to cart and verify them', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.goto();
    await productsPage.verifyAllProductsVisible();

    await productsPage.addToCartByName('Blue Top');
    await productsPage.verifyProductAddedModal();
    await productsPage.continueShopping();

    await productsPage.addToCartByName('Men Tshirt');
    await productsPage.verifyProductAddedModal();
    await productsPage.goToCartFromModal();

    await cartPage.verifyCartVisible();
    await cartPage.verifyProductInCart('Blue Top');
    await cartPage.verifyProductInCart('Men Tshirt');
  });

  test('should remove a product from cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.goto();
    await productsPage.addToCartByName('Blue Top');
    await productsPage.verifyProductAddedModal();
    await productsPage.continueShopping();
    await productsPage.addToCartByName('Men Tshirt');
    await productsPage.verifyProductAddedModal();
    await productsPage.goToCartFromModal();

    await cartPage.verifyCartVisible();
    await cartPage.verifyProductInCart('Blue Top');
    await cartPage.verifyProductInCart('Men Tshirt');

    await cartPage.removeProduct('Blue Top');
    await expect(cartPage.cartTable.getByText('Blue Top', { exact: true })).toHaveCount(0);
    await cartPage.verifyProductInCart('Men Tshirt');
  });

  test('should show empty cart message when cart has no items', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.goto();

    await cartPage.verifyCartVisible();
    await cartPage.verifyCartEmpty();
  });
});