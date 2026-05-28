import { Page, Locator } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}


  get addBackpackButton(): Locator {
    return this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  }

  get cartIcon(): Locator {
    return this.page.locator('.shopping_cart_link');
  }

  get cartItems(): Locator {
    return this.page.locator('.inventory_item_name');
  }

  async addBackpackToCart() {
    await this.addBackpackButton.click();
  }

  async addItemByName(itemName: string) {
    await this.page.click(
      `[data-test="add-to-cart-${itemName.toLowerCase().replace(/ /g, '-')}"]`
    );
  }

  async openCart() {
    await this.cartIcon.click();
  }
}