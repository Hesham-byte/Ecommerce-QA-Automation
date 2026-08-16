import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly addressDelivery: Locator;
  readonly addressInvoice: Locator;
  readonly orderComment: Locator;
  readonly placeOrderLink: Locator;
  readonly nameOnCardInput: Locator;
  readonly cardNumberInput: Locator;
  readonly cvcInput: Locator;
  readonly expiryMonthInput: Locator;
  readonly expiryYearInput: Locator;
  readonly payButton: Locator;
  readonly orderPlacedHeading: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addressDelivery = page.locator('#address_delivery');
    this.addressInvoice = page.locator('#address_invoice');
    this.orderComment = page.locator('textarea[name="message"]');
    this.placeOrderLink = page.locator('a.check_out');
    this.nameOnCardInput = page.locator('[data-qa="name-on-card"]');
    this.cardNumberInput = page.locator('[data-qa="card-number"]');
    this.cvcInput = page.locator('[data-qa="cvc"]');
    this.expiryMonthInput = page.locator('[data-qa="expiry-month"]');
    this.expiryYearInput = page.locator('[data-qa="expiry-year"]');
    this.payButton = page.locator('[data-qa="pay-button"]');
    this.orderPlacedHeading = page.getByRole('heading', { name: 'Order Placed!' });
    this.continueButton = page.getByRole('link', { name: 'Continue' });
  }

  async verifyDeliveryAddressVisible(): Promise<void> {
    await expect(this.addressDelivery).toBeVisible();
  }

  async expectAddressInBothBlocks(firstName: string, lastName: string): Promise<void> {
    await expect(this.addressDelivery).toContainText(`${firstName} ${lastName}`);
    await expect(this.addressInvoice).toContainText(`${firstName} ${lastName}`);
  }

  async enterOrderComment(comment: string): Promise<void> {
    await this.orderComment.fill(comment);
  }

  async placeOrder(): Promise<void> {
    await this.placeOrderLink.click();
  }

  async fillPaymentDetails(card: {
    nameOnCard: string;
    cardNumber: string;
    cvc: string;
    expiryMonth: string;
    expiryYear: string;
  }): Promise<void> {
    await this.nameOnCardInput.fill(card.nameOnCard);
    await this.cardNumberInput.fill(card.cardNumber);
    await this.cvcInput.fill(card.cvc);
    await this.expiryMonthInput.fill(card.expiryMonth);
    await this.expiryYearInput.fill(card.expiryYear);
  }

  async payAndConfirmOrder(): Promise<void> {
    await this.payButton.click();
  }

  async expectOrderPlaced(): Promise<void> {
    await expect(this.page).toHaveURL(/\/payment_done\//);
    await expect(this.orderPlacedHeading).toBeVisible();
  }
}