import { test, expect } from '../fixtures/base';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { uniqueEmail } from '../data/test-data';

test.describe('Registration', () => {
  test('should register a new user successfully', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const signupPage = new SignupPage(page);

    const name = 'QA Tester';
    const email = uniqueEmail('reg');

    await homePage.goto();
    await homePage.goToSignupLogin();

    await loginPage.signup(name, email);
    await signupPage.verifyAccountInfoFormVisible();

    await signupPage.createAccount({
      name,
      email,
      password: 'TestPass123',
      title: 'Mrs',
    });
    await signupPage.expectAccountCreated();
    await signupPage.continue();

    await expect(page).toHaveURL(/\/$/);
    await expect(homePage.loggedInUser).toContainText('Logged in as');
  });

  test('should show error when registering with an existing email', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const signupPage = new SignupPage(page);

    const name = 'QA Tester';
    const email = uniqueEmail('dup');

    await homePage.goto();
    await homePage.goToSignupLogin();
    await loginPage.signup(name, email);
    await signupPage.createAccount({ name, email, password: 'TestPass123' });
    await signupPage.expectAccountCreated();
    await signupPage.continue();

    await homePage.logout();

    await loginPage.goto();
    await loginPage.signup(name, email);
    await loginPage.expectSignupErrorVisible();
  });
});