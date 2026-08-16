import { Page, Locator, expect } from '@playwright/test';

export class ContactPage {
  readonly page: Page;
  readonly getInTouchHeading: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectInput: Locator;
  readonly messageInput: Locator;
  readonly uploadInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getInTouchHeading = page.getByRole('heading', { name: 'Get In Touch' });
    this.nameInput = page.locator('[data-qa="name"]');
    this.emailInput = page.locator('[data-qa="email"]');
    this.subjectInput = page.locator('[data-qa="subject"]');
    this.messageInput = page.locator('[data-qa="message"]');
    this.uploadInput = page.locator('input[name="upload_file"]');
    this.submitButton = page.locator('[data-qa="submit-button"]');
    this.successMessage = page.locator('.status.alert-success');
  }

  async goto(): Promise<void> {
    await this.page.goto('/contact_us');
  }

  async verifyGetInTouchVisible(): Promise<void> {
    await expect(this.getInTouchHeading).toBeVisible();
  }

  async fillForm(name: string, email: string, subject: string, message: string): Promise<void> {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.subjectInput.fill(subject);
    await this.messageInput.fill(message);
  }

  async uploadFile(filePath: string): Promise<void> {
    await this.uploadInput.setInputFiles(filePath);
  }

  async submit(acceptDialog = true): Promise<void> {
    if (acceptDialog) {
      this.page.once('dialog', (dialog) => dialog.accept());
    }
    await this.submitButton.click();
  }

  async expectSuccessMessage(): Promise<void> {
    await expect(this.successMessage).toContainText('Success! Your details have been submitted successfully.');
  }
}