import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly header: Locator;
  readonly homeLink: Locator;
  readonly productsLink: Locator;
  readonly cartLink: Locator;
  readonly loginLink: Locator;
  readonly signupLoginLink: Locator;
  readonly contactUsLink: Locator;
  readonly loggedInUser: Locator;
  readonly logoutLink: Locator;
  readonly deleteAccountLink: Locator;
  readonly subscriptionEmail: Locator;
  readonly subscribeButton: Locator;
  readonly subscriptionSuccess: Locator;
  readonly recommendedItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('#header');
    this.homeLink = page.getByRole('link', { name: 'Home' });
    this.productsLink = page.getByRole('link', { name: 'Products' });
    this.cartLink = page.getByRole('link', { name: 'Cart' });
    this.loginLink = page.getByRole('link', { name: 'Signup / Login' });
    this.signupLoginLink = page.getByRole('link', { name: 'Signup / Login' });
    this.contactUsLink = page.getByRole('link', { name: 'Contact us' });
    this.loggedInUser = page.locator('.shop-menu a', { hasText: 'Logged in as' });
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
    this.deleteAccountLink = page.getByRole('link', { name: 'Delete Account' });
    this.subscriptionEmail = page.locator('#susbscribe_email');
    this.subscribeButton = page.locator('#subscribe');
    this.subscriptionSuccess = page.locator('#success-subscribe');
    this.recommendedItems = page.locator('#recommended-item-carousel');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async verifyHomePageVisible(): Promise<void> {
    await expect(this.homeLink).toBeVisible();
    await expect(this.page.locator('.features_items h2.title')).toContainText('Features Items');
    await expect(this.page.locator('#slider')).toBeVisible();
  }

  async goToProducts(): Promise<void> {
    await this.productsLink.click();
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }

  async goToSignupLogin(): Promise<void> {
    await this.signupLoginLink.click();
  }

  async goToContactUs(): Promise<void> {
    await this.contactUsLink.click();
  }

  async subscribeWithEmail(email: string): Promise<void> {
    await this.subscriptionEmail.fill(email);
    await this.subscribeButton.click();
  }

  async expectSubscriptionSuccess(): Promise<void> {
    await expect(this.subscriptionSuccess).toContainText('You have been successfully subscribed!');
  }

  async isLoggedIn(): Promise<boolean> {
    return (await this.loggedInUser.count()) > 0;
  }

  async logout(): Promise<void> {
    await this.logoutLink.click();
  }
}