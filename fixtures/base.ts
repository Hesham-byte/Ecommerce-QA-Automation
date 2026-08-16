import { test as base, expect } from '@playwright/test';
import { blockAds } from '../utils/ads';

export const test = base.extend({
  page: async ({ page }, use) => {
    await blockAds(page);
    await use(page);
  },
});

export { expect };