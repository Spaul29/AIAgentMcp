import { test, expect } from '@playwright/test';
import {
  LoginPage,
  ProductsPage,
  CartPage,
  CheckoutPage,
  CheckoutOverviewPage,
  ConfirmationPage,
} from '../pages';
import { VALID_CREDENTIALS, CUSTOMER_INFO, EXPECTED_CONFIRMATION_MESSAGE } from '../fixtures/testData';
import { AllureHelper } from '../utils/AllureHelper';
import { config, validateConfig } from '../config/config';

// Validate configuration before running tests
validateConfig();

test.describe('Swag Labs Complete Checkout Flow', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;
  let checkoutOverviewPage: CheckoutOverviewPage;
  let confirmationPage: ConfirmationPage;

  test.beforeEach(async ({ page }) => {
    // Initialize page objects
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    checkoutOverviewPage = new CheckoutOverviewPage(page);
    confirmationPage = new ConfirmationPage(page);

    // Add Allure annotations
    AllureHelper.addFeature('E-Commerce Platform');
    AllureHelper.addStory('Complete Checkout Flow');
    AllureHelper.setSeverity('critical');
    AllureHelper.addDescription('Test complete checkout flow from login to order confirmation');
  });

  test('Should complete a full checkout flow with valid credentials', async () => {
    // Given the user is on the Swag Labs login page
    await test.step('Given user is on Swag Labs login page', async () => {
      await loginPage.goto();
      await loginPage.waitForPageLoad();
    });

    // When the user enters valid credentials and clicks login button
    await test.step('When user enters valid credentials and clicks login', async () => {
      await loginPage.login(VALID_CREDENTIALS.username, VALID_CREDENTIALS.password);
    });

    // Then the user should be redirected to the products page
    await test.step('Then user is redirected to products page', async () => {
      await productsPage.waitForPageLoad();
      const pageUrl = loginPage.page.url();
      expect(pageUrl).toContain('/inventory.html');
    });

    // When the user should see a list of products
    await test.step('When user sees a list of products', async () => {
      const products = await productsPage.getAllProducts();
      expect(products.length).toBeGreaterThan(0);
    });

    // Then the user should see productName in productlist
    await test.step('Then user should see productName in productlist', async () => {
      const productName = await productsPage.getProductNameByIndex(0);
      expect(productName).toBeTruthy();
      expect(productName.length).toBeGreaterThan(0);
    });

    // Then the user should see productDesc in productlist
    await test.step('Then user should see productDesc in productlist', async () => {
      const productDesc = await productsPage.getProductDescriptionByIndex(0);
      expect(productDesc).toBeTruthy();
      expect(productDesc.length).toBeGreaterThan(0);
    });

    // Then the user should see productPrice in productlist
    await test.step('Then user should see productPrice in productlist', async () => {
      const productPrice = await productsPage.getProductPriceByIndex(0);
      expect(productPrice).toBeTruthy();
      expect(productPrice).toMatch(/\$\d+\.\d{2}/);
    });

    // Then the user is able to see Add to cart button in productlist
    await test.step('Then user is able to see Add to cart button', async () => {
      const isButtonVisible = await productsPage.isAddToCartButtonVisible(0);
      expect(isButtonVisible).toBe(true);
    });

    // Then the user is able to click on Add to cart button in productlist
    const selectedProductName = await productsPage.getProductNameByIndex(0);
    await test.step('Then user is able to click on Add to cart button', async () => {
      await productsPage.addProductToCartByIndex(0);
    });

    // Then the user is able to click on shopping cart icon in productlist
    await test.step('Then user is able to click on shopping cart icon', async () => {
      const cartCount = await productsPage.getCartItemCount();
      expect(cartCount).toBe(1);
      await productsPage.clickShoppingCart();
    });

    // When the user adds a product to the cart
    await test.step('When user adds a product to the cart', async () => {
      await cartPage.waitForPageLoad();
    });

    // Then the product should appear in the cart
    await test.step('Then the product should appear in the cart', async () => {
      const productInCart = await cartPage.verifyProductInCart(selectedProductName);
      expect(productInCart).toBe(true);
    });

    // Then user able to see checkout button
    await test.step('Then user able to see checkout button', async () => {
      const isCheckoutVisible = await cartPage.isCheckoutButtonVisible();
      expect(isCheckoutVisible).toBe(true);
    });

    // Then user click on checkout button
    await test.step('Then user click on checkout button', async () => {
      await cartPage.clickCheckoutButton();
    });

    // And the user enters valid customer information
    await test.step('And the user enters valid customer information', async () => {
      await checkoutPage.waitForPageLoad();
      await checkoutPage.completeCheckoutStep(CUSTOMER_INFO);
    });

    // And the user completes the checkout
    await test.step('And the user completes the checkout', async () => {
      await checkoutOverviewPage.waitForPageLoad();
    });

    // Then Checkout Confirmation page is displayed with product details
    await test.step('Then Checkout Overview page is displayed with product details', async () => {
      const productInOverview = await checkoutOverviewPage.verifyProductInOverview(selectedProductName);
      expect(productInOverview).toBe(true);
      const overviewItems = await checkoutOverviewPage.getAllOverviewItems();
      expect(overviewItems.length).toBeGreaterThan(0);
    });

    // Then click on Finish button in Checkout Overview page
    await test.step('Then click on Finish button in Checkout Overview page', async () => {
      const isFinishVisible = await checkoutOverviewPage.isFinishButtonVisible();
      expect(isFinishVisible).toBe(true);
      await checkoutOverviewPage.clickFinishButton();
    });

    // Then Confirmation message is displayed
    await test.step('Then Confirmation message is displayed', async () => {
      await confirmationPage.waitForPageLoad();
      const isConfirmationPageDisplayed = await confirmationPage.isConfirmationPageDisplayed();
      expect(isConfirmationPageDisplayed).toBe(true);
      const confirmationMessage = await confirmationPage.getConfirmationMessage();
      expect(confirmationMessage).toContain(EXPECTED_CONFIRMATION_MESSAGE);
    });
  });
});
