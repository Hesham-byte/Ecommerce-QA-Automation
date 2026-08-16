import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly loginHeading: Locator;
  readonly loginEmail: Locator;
  readonly loginPassword: Locator;
  readonly loginButton: Locator;
  readonly loginError: Locator;
  readonly signupHeading: Locator;
  readonly signupName: Locator;
  readonly signupEmail: Locator;
  readonly signupButton: Locator;
  readonly signupError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginHeading = page.getByRole('heading', { name: 'Login to your account' });
    this.loginEmail = page.locator('[data-qa="login-email"]');
    this.loginPassword = page.locator('[data-qa="login-password"]');
    this.loginButton = page.locator('[data-qa="login-button"]');
    this.loginError = page.locator('form[action="/login"] p').first();
    this.signupHeading = page.getByRole('heading', { name: 'New User Signup!' });
    this.signupName = page.locator('[data-qa="signup-name"]');
    this.signupEmail = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.locator('[data-qa="signup-button"]');
    this.signupError = page.locator('form[action="/signup"] p').first();
  }

  async goto(): Promise<void> {
    await this.page.goto('/login');
  }

  async login(email: string, password: string): Promise<void> {
    await this.loginEmail.fill(email);
    await this.loginPassword.fill(password);
    await this.loginButton.click();
  }

  async expectLoginErrorVisible(): Promise<void> {
    await expect(this.loginError).toBeVisible();
    await expect(this.loginError).toContainText('Your email or password is incorrect!');
  }

  async signup(name: string, email: string): Promise<void> {
    await this.signupName.fill(name);
    await this.signupEmail.fill(email);
    await this.signupButton.click();
  }

  async expectSignupErrorVisible(): Promise<void> {
    await expect(this.signupError).toBeVisible();
    await expect(this.signupError).toContainText('Email Address already exist!');
  }
}