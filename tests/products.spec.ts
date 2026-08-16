import { test, expect } from '../fixtures/base';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Products', () => {
  test('should display all products', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.goto();

    await productsPage.verifyAllProductsVisible();
    expect(await productsPage.productCards.count()).toBeGreaterThan(20);
  });

  test('should search for a product and show results', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.goto();

    await productsPage.searchProduct('Blue Top');
    await productsPage.verifySearchResultsVisible();

    await expect(productsPage.page.getByText('Blue Top', { exact: true }).first()).toBeVisible();
  });

  test('should view product details from the products list', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.goto();

    await productsPage.viewProductByName('Blue Top');

    await expect(page).toHaveURL(/product_details\/1/);
    await expect(page.locator('.product-information h2')).toHaveText('Blue Top');
  });
});