# Ecommerce QA Automation

A [Playwright](https://playwright.dev/) end-to-end test suite for the demo e-commerce site [automationexercise.com](https://www.automationexercise.com). It covers the classic UI flows a QA engineer would automate: browsing products, searching, cart management, user registration/login, checkout with payment, and the contact form.

## Stack

- **Playwright Test** `^1.62` with TypeScript
- Page Object Model for clean, reusable selectors
- Cross-browser: Chromium, Firefox, WebKit

## Project Structure

```
.
├── pages/            # Page objects (one per page/flow)
│   ├── HomePage.ts
│   ├── ProductsPage.ts
│   ├── ProductDetailsPage.ts
│   ├── CartPage.ts
│   ├── LoginPage.ts
│   ├── SignupPage.ts
│   ├── CheckoutPage.ts
│   └── ContactPage.ts
├── tests/            # Spec files (23 tests)
│   ├── home.spec.ts
│   ├── products.spec.ts
│   ├── product-details.spec.ts
│   ├── cart.spec.ts
│   ├── login.spec.ts
│   ├── register.spec.ts
│   ├── checkout.spec.ts
│   └── contact.spec.ts
├── fixtures/         # Reusable test fixtures
│   ├── base.ts       # Global ad-blocking + page fixture
│   └── test.ts       # Auto-registers & cleans up a user per test
├── data/             # Test data helpers (unique emails, card details)
│   └── test-data.ts
├── utils/            # Utilities
│   └── ads.ts        # Blocks ad/tracker requests
└── playwright.config.ts
```

## Setup

```bash
npm install
npm run install:browsers   # once: downloads Chromium, Firefox, WebKit
```

## Running Tests

```bash
npm test                  # all browsers
npm run test:chromium     # Chromium only
npm run test:firefox      # Firefox only
npm run test:webkit       # WebKit only
npm run test:headed       # run with a visible browser
npm run test:ui           # interactive Playwright UI mode
npm run test:debug        # run with the inspector
npm run test:report       # open the HTML report
```

All commands run against `https://www.automationexercise.com` (set as `baseURL` in `playwright.config.ts`).

## Test Coverage

| Flow | What is verified |
| --- | --- |
| Home | Page loads, navigation links, email subscription, recommended-items add-to-cart |
| Products | All products render, search results, opening product details |
| Product details | Name/price/category/availability, quantity + add to cart, review submission |
| Cart | Add multiple products, quantity & totals, remove items, empty-cart message |
| Login / Logout | Valid login, invalid-credentials error, logout |
| Registration | New-user signup, duplicate-email error |
| Checkout | Delivery/billing addresses, place order, payment, "Order Placed!" confirmation |
| Contact Us | Form submission with success message, navigation from home |

## Configuration Notes

- `timeout: 60_000` — registration + checkout flows are slow on the practice site.
- `retries: 2` — absorbs transient throttling from the public site.
- `workers: 2` (local) / `1` (CI) — limits parallel load against the site.
- **Ad blocking** — `fixtures/base.ts` aborts requests to ad/tracker domains so Google ad overlays cannot intercept test clicks.
- **User fixture** — tests that need an account use the `account` fixture (`fixtures/test.ts`), which registers a fresh user with a unique email and deletes the account afterwards. No shared credentials required.

## Troubleshooting

- **`browserType.launch: Executable doesn't exist`** — run `npm run install:browsers`.
- **Flaky failures on checkout/payment** — the public site throttles under load; retries are enabled by default, or re-run with `--workers=1`.
- **Intercepted clicks / unexpected `#google_vignette` URL** — caused by Google ads; ad requests are blocked by default via the `base` fixture.