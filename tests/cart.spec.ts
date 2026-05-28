//import { test, expect } from '@playwright/test';
//import { LoginPage } from '../pages/loginPage';
//import { CartPage } from '../pages/cartPage';
import { test, expect } from '../fixtures/testFixtures';


test('add to cart test', async ({ loginPage, cartPage }) => {
  //const loginPage = new LoginPage(page);
  //const cartPage = new CartPage(page);

  // Login
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  // Cart actions
 // await cartPage.addBackpackToCart();
  await cartPage.addItemByName('Sauce Labs Backpack');
  await cartPage.addItemByName('Sauce Labs Bike Light');
  await cartPage.openCart();

  // Assertion
 // await expect(cartPage.cartItems).toHaveText('Sauce Labs Backpack');
  await expect(cartPage.cartItems).toContainText([
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
  ]);
});