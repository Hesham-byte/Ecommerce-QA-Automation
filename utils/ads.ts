import type { Page } from '@playwright/test';

const AD_PATTERNS = [
  /doubleclick\.net/,
  /googleadservices\.com/,
  /googlesyndication\.com/,
  /googletagmanager\.com/,
  /google-analytics\.com/,
  /adservice\.google\./,
  /fundingchoicesmessages\.google\./,
  /adtrafficquality\.google\./,
  /pagead\d*\..*/,
  /google\.com\/pagead/,
];

export async function blockAds(page: Page): Promise<void> {
  await page.route('**/*', (route) => {
    const url = route.request().url();
    if (AD_PATTERNS.some((pattern) => pattern.test(url))) {
      route.abort();
    } else {
      route.continue();
    }
  });
}