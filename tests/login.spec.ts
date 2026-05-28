import { test, expect } from '../fixtures/testFixtures';

test('valid login test', async ({ page, loginPage }) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/inventory/);
});


test('invalid login test', async ({ loginPage, page }) => {
  await loginPage.goto();
  await loginPage.login('invalid_user', 'wrong_password');

  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible();
});