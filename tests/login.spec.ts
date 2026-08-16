import { test, expect } from './../fixtures/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login / Logout', () => {
  test('should log in with correct credentials', async ({ page, account }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.goto();
    await homePage.logout();
    await loginPage.goto();

    await loginPage.login(account.email, account.password);

    await expect(page).toHaveURL(/\/$/);
    await expect(homePage.loggedInUser).toContainText(`Logged in as ${account.name}`);
    await expect(homePage.logoutLink).toBeVisible();
  });

  test('should log in with correct credentials and verify the account', async ({ page, account }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.goto();
    await homePage.logout();
    await loginPage.goto();

    await loginPage.login(account.email, account.password);

    await expect(page).toHaveURL(/\/$/);
    await expect(homePage.loggedInUser).toContainText(account.name);
  });

  test('should log out successfully', async ({ page, account }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.goto();
    await homePage.logout();
    await loginPage.goto();

    await loginPage.login(account.email, account.password);

    await expect(homePage.loggedInUser).toContainText(account.name);
    await homePage.logout();

    await expect(page).toHaveURL(/\/login/);
    await expect(homePage.signupLoginLink).toBeVisible();
  });

  test('should show error when logging in with incorrect credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.login('wronguser@test.com', 'WrongPass123');
    await loginPage.expectLoginErrorVisible();
  });
});