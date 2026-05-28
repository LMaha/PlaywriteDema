import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  // LOCATORS
  get username(): Locator {
    return this.page.locator('#user-name');
  }

  get password(): Locator {
    return this.page.locator('#password');
  }

  get loginBtn(): Locator {
    return this.page.locator('#login-button');
  }

  get errorMessage(): Locator {
    return this.page.locator('[data-test="error"]');
  }

  // ACTIONS
  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(user: string, pass: string) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginBtn.click();
  }

  // ASSERTION
  async expectLoginErrorVisible() {
    await expect(this.errorMessage).toBeVisible();
  }
}