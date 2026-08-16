import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly shoppingCartHeading: Locator;
  readonly emptyCartMessage: Locator;
  readonly cartTable: Locator;
  readonly proceedToCheckoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartHeading = page.getByText('Shopping Cart');
    this.emptyCartMessage = page.locator('#empty_cart');
    this.cartTable = page.locator('#cart_info_table');
    this.proceedToCheckoutButton = page.locator('.check_out').first();
  }

  async goto(): Promise<void> {
    await this.page.goto('/view_cart');
  }

  async verifyCartVisible(): Promise<void> {
    await expect(this.shoppingCartHeading).toBeVisible();
  }

  async getProductRow(name: string): Promise<Locator> {
    return this.cartTable.locator('tr', { has: this.page.getByText(name, { exact: true }) }).first();
  }

  async verifyProductInCart(name: string, quantity?: number): Promise<void> {
    const row = await this.getProductRow(name);
    await expect(row).toBeVisible();
    if (quantity !== undefined) {
      await expect(row.locator('td.cart_quantity button')).toHaveText(String(quantity));
    }
  }

  async getProductTotalPrice(name: string): Promise<string> {
    const row = await this.getProductRow(name);
    return (await row.locator('p.cart_total_price').innerText()).trim();
  }

  async getProductUnitPrice(name: string): Promise<string> {
    const row = await this.getProductRow(name);
    return (await row.locator('td.cart_price p').innerText()).trim();
  }

  async removeProduct(name: string): Promise<void> {
    const row = await this.getProductRow(name);
    await row.locator('a.cart_quantity_delete').click();
  }

  async isCartEmpty(): Promise<boolean> {
    return (await this.emptyCartMessage.count()) > 0 && (await this.emptyCartMessage.isVisible());
  }

  async verifyCartEmpty(): Promise<void> {
    await expect(this.emptyCartMessage).toContainText('Cart is empty!');
  }

  async proceedToCheckout(): Promise<void> {
    await this.proceedToCheckoutButton.click();
  }
}