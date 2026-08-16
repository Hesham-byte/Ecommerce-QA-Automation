import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly allProductsHeading: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchedProductsHeading: Locator;
  readonly productCards: Locator;
  readonly addToCartModal: Locator;
  readonly continueShoppingButton: Locator;
  readonly viewCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.allProductsHeading = page.getByRole('heading', { name: 'All Products' });
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.searchedProductsHeading = page.getByRole('heading', { name: 'Searched Products' });
    this.productCards = page.locator('.product-image-wrapper');
    this.addToCartModal = page.locator('#cartModal');
    this.continueShoppingButton = page.locator('.close-modal');
    this.viewCartLink = page.locator('#cartModal').getByRole('link', { name: 'View Cart' });
  }

  async goto(): Promise<void> {
    await this.page.goto('/products');
  }

  async verifyAllProductsVisible(): Promise<void> {
    await expect(this.allProductsHeading).toBeVisible();
  }

  getProductCardByName(name: string): Locator {
    return this.page.locator('.product-image-wrapper', { has: this.page.getByText(name, { exact: true }) });
  }

  async viewProductByName(name: string): Promise<void> {
    await this.getProductCardByName(name).getByRole('link', { name: 'View Product' }).click();
  }

  async searchProduct(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchButton.click();
  }

  async verifySearchResultsVisible(): Promise<void> {
    await expect(this.searchedProductsHeading).toBeVisible();
  }

  async addToCartByName(name: string): Promise<void> {
    const card = this.getProductCardByName(name);
    await card.locator('.add-to-cart').first().click();
  }

  async verifyProductAddedModal(): Promise<void> {
    await expect(this.addToCartModal).toBeVisible();
    await expect(this.addToCartModal).toContainText('Your product has been added to cart.');
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
    await expect(this.addToCartModal).toBeHidden();
  }

  async goToCartFromModal(): Promise<void> {
    await this.viewCartLink.click();
  }
}