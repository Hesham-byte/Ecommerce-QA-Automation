import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import type { AccountDetails } from '../pages/SignupPage';
import { uniqueEmail } from '../data/test-data';

export const test = base.extend<{ account: AccountDetails }>({
  account: async ({ page }, use) => {
    const account: AccountDetails = {
      name: 'QA User',
      email: uniqueEmail(),
      password: 'TestPass123',
      title: 'Mr',
    };

    const home = new HomePage(page);
    await home.goto();
    await home.goToSignupLogin();

    const login = new LoginPage(page);
    await login.signup(account.name, account.email);

    const signup = new SignupPage(page);
    await signup.verifyAccountInfoFormVisible();
    await signup.createAccount(account);
    await signup.continue();

    await expect(page).toHaveURL(/\/$/);
    await expect(home.loggedInUser).toContainText('Logged in as');

    await use(account);

    const isLoggedIn = await home.isLoggedIn();
    if (isLoggedIn) {
      await home.logout();
    }
    await page.goto('/delete_account');
    await expect(page.locator('[data-qa="account-deleted"]')).toBeVisible();
  },
});

export { expect };