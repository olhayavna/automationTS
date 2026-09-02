# QA Automation — Playwright + TypeScript

A personal test automation project built while learning Playwright and TypeScript, targeting the public practice site [automationexercise.com](https://automationexercise.com).

## Stack

- **Playwright** (TypeScript) — end-to-end test runner
- **TypeScript** — strict mode, no implicit `any`
- Page Object Model architecture
- GitHub Actions CI (runs on every push/PR)

## What's covered

**UI** — 10 of the site's official test cases (registration, login, logout, contact form with file upload and native dialog handling, product search, subscription), across **Chromium, Firefox, and WebKit**.

| Area | Highlights |
|---|---|
| Auth | Registration (full multi-step signup + account deletion), login (positive + parameterized negative cases), logout |
| Forms | Contact Us form: text fields, file upload, native `confirm()` dialog handling |
| Product catalog | Product detail verification, search with dynamic result-list assertions |
| Newsletter | Subscription flow with scroll-to-footer |

**API** — all 14 of the site's documented endpoints, no browser involved.

| Area | Highlights |
|---|---|
| Products & brands | GET/POST/PUT across `productsList` and `brandsList`, including unsupported-method checks (405) |
| Search | Positive and negative (missing-parameter) search requests |
| Login verification | Valid credentials, missing parameter, invalid credentials |
| Account CRUD | Full Create → Delete → Update → Get cycle, each test creating its own data rather than depending on another test's side effects |

## Structure

```
pages/      Page Object classes — one per page, locators + actions
tests/      Test specs — one file for UI (grouped by official test-case number), one for API
utils/      Test-data generators (unique emails, etc.)
test-data/  Static fixtures (e.g. upload file)
```

## Running locally

```bash
npm install
npx playwright install
npx playwright test
```

Type-check without running the browser:

```bash
npm run typecheck
```

## Notes

- Locators are verified against the live DOM, not guessed — `data-qa` attributes where available, scoped CSS/role selectors elsewhere.
- The Contact Us test carries a deliberate, commented workaround for a site quirk (the form is missing `enctype="multipart/form-data"`, so uploaded files never really reach the server) — see [`ContactUsPage.ts`](pages/ContactUsPage.ts).
- Occasional failures unrelated to the code under test (a third-party ad interstitial intercepting a click, the target site's own rate limiting) are handled via a configured retry rather than chased indefinitely — a deliberate tradeoff for a test target outside my control.
- The API always responds with HTTP 200, even for unsupported methods or bad requests — the real result lives in a `responseCode` field inside the JSON body. Tests assert on that field, not on the HTTP status.
- `updateAccount` silently requires the account's real password and returns a generic "Account not found!" (not a permissions error) when it doesn't match — discovered by testing, not documented by the API.
- CI config: [`.github/workflows/playwright.yml`](.github/workflows/playwright.yml)
