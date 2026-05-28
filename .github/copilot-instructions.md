## Repository overview

This is a small Playwright (TypeScript) test suite using the Page Object Model with custom fixtures.

- Tests: `tests/*.spec.ts` — test scenarios written with Playwright's test runner.
- Fixtures: `fixtures/testFixtures.ts` — exports a custom `test` (and `expect`) with project-specific fixtures (`loginPage`, `cartPage`).
- Page objects: `pages/*.ts` — classes encapsulating locators and actions (e.g. `LoginPage`, `CartPage`).
- Config: `playwright.config.ts` — sets `testDir` and default `use` options (headed mode + `slowMo`).

## Big picture & why

Tests use a small POM layer (classes in `pages/`) and register instances via fixtures in `fixtures/testFixtures.ts`. This means:

- Tests import `test` from `../fixtures/testFixtures` (not directly from `@playwright/test`) to get the extended fixtures.
- Page objects are created once-per-test via fixtures and passed into test callbacks, avoiding manual instantiation in most tests.

This structure keeps tests focused on flow and assertions while encapsulating selectors and actions in page classes.

## Project-specific conventions (follow these precisely)

- Always import `test` from `fixtures/testFixtures` in specs. Example: `import { test, expect } from '../fixtures/testFixtures';`
- Page classes live in `pages/` and follow the pattern:
  - constructor(private page: Page) {}
  - locator getters (use getter methods that return a `Locator`, for example select by id or data-test attributes)
  - action methods (e.g. `async login(user, pass) { ... }`)
- Use `data-test` attributes where available. Example: add-to-cart buttons are addressed with selectors like `[data-test="add-to-cart-sauce-labs-backpack"]` and `CartPage.addItemByName` slugifies names to build those selectors.
- Prefer using provided fixtures (e.g., `loginPage`, `cartPage`) instead of constructing page objects manually inside tests.

## Key files to reference when changing behavior

- `fixtures/testFixtures.ts` — how fixtures are created and exported.
- `pages/loginPage.ts` — example login flow (uses `page.goto('https://www.saucedemo.com/')`).
- `pages/cartPage.ts` — shows selector composition (`addItemByName`) and cart assertions.
- `playwright.config.ts` — default test runner options (headed, slowMo 1000). Override with CLI flags when needed.

## How to run & debug (Windows PowerShell examples)

1. Install dependencies (one-time):

```powershell
npm install
```

2. Run the whole suite:

```powershell
npx playwright test
```

3. Run a single spec file:

```powershell
npx playwright test tests\login.spec.ts
```

4. Run a single test by title (grep):

```powershell
npx playwright test -g "add to cart test"
```

5. Debug / open inspector (recommended while developing):

```powershell
npx playwright test --debug
```

6. Headed / slow mode: the repo sets headed + slowMo in `playwright.config.ts`. To override and run headless:

```powershell
npx playwright test --headless
```

7. Open HTML report after runs:

```powershell
npx playwright show-report
```

## Patterns & examples agents should follow when editing or adding tests

- When adding a new page object, mimic `pages/loginPage.ts`:
  - expose Locator getters for important elements
  - provide high-level action methods (e.g., `login`, `addItemByName`, `openCart`)
- When adding fixtures, add them to `fixtures/testFixtures.ts` and update the exported `MyFixtures` type.
- Keep selectors robust: prefer `data-test` attributes or stable classes. Avoid brittle XPath or deeply nested CSS unless necessary.
- Tests should assert using `expect` re-exported from fixtures (already done in `testFixtures.ts`). Use `toHaveURL`, `toBeVisible`, `toContainText` as in existing tests.

## Integration points & external dependencies

- The suite targets https://www.saucedemo.com/ (hard-coded in `LoginPage.goto`). Any change to the target URL must be mirrored in the login page.
- Dev dependency: `@playwright/test` declared in `package.json`. There are no npm scripts for test runs (use `npx playwright test`).

## Common pitfalls for agents

- Don't import `test` from `@playwright/test` in specs — using that will skip the project's custom fixtures. Always import from `../fixtures/testFixtures`.
- Avoid duplicating fixtures. If you need an extra page object or helper, add it to `fixtures/testFixtures.ts` and the `MyFixtures` type.
- Be mindful that `playwright.config.ts` sets `headless: false` and `slowMo: 1000`. New tests may need to run headless in CI — use `--headless` or update the config with care.

## Example snippets to reuse

- Using fixture-provided page objects:

```ts
test('example', async ({ loginPage, cartPage }) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await cartPage.addItemByName('Sauce Labs Backpack');
  await cartPage.openCart();
  await expect(cartPage.cartItems).toContainText(['Sauce Labs Backpack']);
});
```

## If you change behavior

- Update `fixtures/testFixtures.ts` if you add or rename fixtures.
- If you change the base URL, update `pages/loginPage.ts` (and search for any hard-coded URLs in tests).

---

If anything is unclear or you want additional sections (CI config, npm scripts, or a CONTRIBUTING guide), tell me which area to expand and I will iterate.
