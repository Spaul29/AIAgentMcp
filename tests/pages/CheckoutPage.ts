import { BasePage } from './BasePage';

/**
 * Customer information interface
 */
interface CustomerInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}

/**
 * Checkout Page Object Model
 * Contains all selectors and methods for the checkout page
 */
export class CheckoutPage extends BasePage {
  // Selectors
  private readonly firstNameInput = 'input[data-test="firstName"]';
  private readonly lastNameInput = 'input[data-test="lastName"]';
  private readonly postalCodeInput = 'input[data-test="postalCode"]';
  private readonly continueButton = 'input[data-test="continue"]';
  private readonly checkoutForm = '.checkout_info';

  /**
   * Wait for checkout page to load
   */
  async waitForPageLoad(): Promise<void> {
    await this.waitForElement(this.checkoutForm);
  }

  /**
   * Enter first name
   */
  async enterFirstName(firstName: string): Promise<void> {
    await this.fillInput(this.firstNameInput, firstName);
  }

  /**
   * Enter last name
   */
  async enterLastName(lastName: string): Promise<void> {
    await this.fillInput(this.lastNameInput, lastName);
  }

  /**
   * Enter postal code
   */
  async enterPostalCode(postalCode: string): Promise<void> {
    await this.fillInput(this.postalCodeInput, postalCode);
  }

  /**
   * Fill customer information
   */
  async fillCustomerInfo(customerInfo: CustomerInfo): Promise<void> {
    await this.enterFirstName(customerInfo.firstName);
    await this.enterLastName(customerInfo.lastName);
    await this.enterPostalCode(customerInfo.postalCode);
  }

  /**
   * Click continue button
   */
  async clickContinueButton(): Promise<void> {
    await this.click(this.continueButton);
  }

  /**
   * Complete checkout with customer information
   */
  async completeCheckoutStep(customerInfo: CustomerInfo): Promise<void> {
    await this.fillCustomerInfo(customerInfo);
    await this.clickContinueButton();
  }
}
