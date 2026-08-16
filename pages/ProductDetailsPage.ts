import { Page, Locator, expect } from '@playwright/test';

export class ProductDetailsPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly productCategory: Locator;
  readonly productPrice: Locator;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;
  readonly availability: Locator;
  readonly condition: Locator;
  readonly brand: Locator;
  readonly reviewForm: Locator;
  readonly reviewName: Locator;
  readonly reviewEmail: Locator;
  readonly reviewText: Locator;
  readonly reviewSubmitButton: Locator;
  readonly reviewSuccess: Locator;
  readonly addToCartModal: Locator;
  readonly viewCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator('.product-information h2');
    this.productCategory = page.locator('.product-information p').first();
    this.productPrice = page.locator('.product-information span > span');
    this.quantityInput = page.locator('#quantity');
    this.addToCartButton = page.locator('button.cart');
    this.availability = page.locator('.product-information p').filter({ hasText: 'Availability:' });
    this.condition = page.locator('.product-information p').filter({ hasText: 'Condition:' });
    this.brand = page.locator('.product-information p').filter({ hasText: 'Brand:' });
    this.reviewForm = page.locator('#review-form');
    this.reviewName = page.locator('#name');
    this.reviewEmail = page.locator('#email');
    this.reviewText = page.locator('#review');
    this.reviewSubmitButton = page.locator('#button-review');
    this.reviewSuccess = page.locator('#review-section');
    this.addToCartModal = page.locator('#cartModal');
    this.viewCartLink = page.locator('#cartModal').getByRole('link', { name: 'View Cart' });
  }

  async goto(productId: number): Promise<void> {
    await this.page.goto(`/product_details/${productId}`);
  }

  async verifyProductDetailsVisible(productName: string): Promise<void> {
    await expect(this.productName).toHaveText(productName);
    await expect(this.productCategory).toBeVisible();
    await expect(this.productPrice).toBeVisible();
  }

  async setQuantity(quantity: number): Promise<void> {
    await this.quantityInput.fill(String(quantity));
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
    await expect(this.addToCartModal).toBeVisible();
  }

  async goToCartFromModal(): Promise<void> {
    await this.viewCartLink.click();
  }

  async submitReview(name: string, email: string, review: string): Promise<void> {
    await this.reviewName.fill(name);
    await this.reviewEmail.fill(email);
    await this.reviewText.fill(review);
    await this.reviewSubmitButton.click();
  }

  async expectReviewSubmitted(): Promise<void> {
    await expect(this.reviewSuccess).toContainText('Thank you for your review.');
  }
}