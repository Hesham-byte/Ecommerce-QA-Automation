import { Page, Locator, expect } from '@playwright/test';

export interface AccountDetails {
  name: string;
  email: string;
  password: string;
  title?: 'Mr' | 'Mrs';
  first_name?: string;
  last_name?: string;
  company?: string;
  address1?: string;
  address2?: string;
  country?: string;
  state?: string;
  city?: string;
  zipcode?: string;
  mobile_number?: string;
}

export class SignupPage {
  readonly page: Page;
  readonly enterAccountInfoHeading: Locator;
  readonly titleMr: Locator;
  readonly titleMrs: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly daySelect: Locator;
  readonly monthSelect: Locator;
  readonly yearSelect: Locator;
  readonly newsletterCheckbox: Locator;
  readonly optinCheckbox: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly address1Input: Locator;
  readonly address2Input: Locator;
  readonly countrySelect: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileNumberInput: Locator;
  readonly createAccountButton: Locator;
  readonly accountCreatedHeading: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.enterAccountInfoHeading = page.getByRole('heading', { name: 'Enter Account Information' });
    this.titleMr = page.locator('#id_gender1');
    this.titleMrs = page.locator('#id_gender2');
    this.nameInput = page.locator('[data-qa="name"]');
    this.emailInput = page.locator('[data-qa="email"]');
    this.passwordInput = page.locator('[data-qa="password"]');
    this.daySelect = page.locator('[data-qa="days"]');
    this.monthSelect = page.locator('[data-qa="months"]');
    this.yearSelect = page.locator('[data-qa="years"]');
    this.newsletterCheckbox = page.locator('#newsletter');
    this.optinCheckbox = page.locator('#optin');
    this.firstNameInput = page.locator('[data-qa="first_name"]');
    this.lastNameInput = page.locator('[data-qa="last_name"]');
    this.companyInput = page.locator('[data-qa="company"]');
    this.address1Input = page.locator('[data-qa="address"]');
    this.address2Input = page.locator('[data-qa="address2"]');
    this.countrySelect = page.locator('[data-qa="country"]');
    this.stateInput = page.locator('[data-qa="state"]');
    this.cityInput = page.locator('[data-qa="city"]');
    this.zipcodeInput = page.locator('[data-qa="zipcode"]');
    this.mobileNumberInput = page.locator('[data-qa="mobile_number"]');
    this.createAccountButton = page.locator('[data-qa="create-account"]');
    this.accountCreatedHeading = page.locator('[data-qa="account-created"]');
    this.continueButton = page.locator('[data-qa="continue-button"]');
  }

  async verifyAccountInfoFormVisible(): Promise<void> {
    await expect(this.enterAccountInfoHeading).toBeVisible();
  }

  async fillAccountDetails(details: AccountDetails): Promise<void> {
    if (details.title === 'Mr') {
      await this.titleMr.check();
    } else {
      await this.titleMrs.check();
    }
    await this.nameInput.fill(details.name);
    await this.passwordInput.fill(details.password);
    await this.daySelect.selectOption('10');
    await this.monthSelect.selectOption('June');
    await this.yearSelect.selectOption('1995');
    await this.newsletterCheckbox.check();
    await this.optinCheckbox.check();
    await this.firstNameInput.fill(details.first_name ?? details.name);
    await this.lastNameInput.fill(details.last_name ?? 'Test');
    await this.companyInput.fill(details.company ?? 'Test Company');
    await this.address1Input.fill(details.address1 ?? '123 Automation Street');
    await this.address2Input.fill(details.address2 ?? 'Suite 1');
    await this.countrySelect.selectOption(details.country ?? 'United States');
    await this.stateInput.fill(details.state ?? 'California');
    await this.cityInput.fill(details.city ?? 'San Francisco');
    await this.zipcodeInput.fill(details.zipcode ?? '94105');
    await this.mobileNumberInput.fill(details.mobile_number ?? '1234567890');
  }

  async createAccount(details: AccountDetails): Promise<void> {
    await this.fillAccountDetails(details);
    await this.createAccountButton.click();
    await this.expectAccountCreated();
  }

  async expectAccountCreated(): Promise<void> {
    await expect(this.accountCreatedHeading).toBeVisible();
    await expect(this.accountCreatedHeading).toContainText('Account Created!');
  }

  async continue(): Promise<void> {
    await this.continueButton.click();
  }
}