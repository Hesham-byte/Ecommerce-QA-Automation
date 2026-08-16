import { test, expect } from '@playwright/test';
import { ContactPage } from '../pages/ContactPage';
import { uniqueEmail } from '../data/test-data';
import { HomePage } from '../pages/HomePage';

test.describe('Contact Us', () => {
  test('should submit the contact us form', async ({ page }) => {
    const contactPage = new ContactPage(page);
    await contactPage.goto();

    await contactPage.verifyGetInTouchVisible();
    await contactPage.fillForm(
      'QA Tester',
      uniqueEmail('contact'),
      'Test Subject',
      'This is a test message.',
    );
    await contactPage.submit();
    await contactPage.expectSuccessMessage();
  });

  test('should navigate to contact us from the home page', async ({ page }) => {
    const homePage = new HomePage(page);
    const contactPage = new ContactPage(page);

    await homePage.goto();
    await homePage.goToContactUs();

    await expect(page).toHaveURL(/\/contact_us/);
    await contactPage.verifyGetInTouchVisible();
  });
});