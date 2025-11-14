import { BasePage } from './BasePage';

/**
 * Confirmation Page Object Model
 * Contains all selectors and methods for the order confirmation page
 */
export class ConfirmationPage extends BasePage {
  // Selectors
  private readonly confirmationContainer = '.checkout_complete_container';
  private readonly confirmationMessage = '.complete-header';
  private readonly confirmationText = '.complete-text';
  private readonly backHomeButton = 'button[data-test="back-to-products"]';

  /**
   * Wait for confirmation page to load
   */
  async waitForPageLoad(): Promise<void> {
    await this.waitForElement(this.confirmationContainer);
  }

  /**
   * Get confirmation message
   */
  async getConfirmationMessage(): Promise<string> {
    return await this.getText(this.confirmationMessage);
  }

  /**
   * Get confirmation text
   */
  async getConfirmationText(): Promise<string> {
    return await this.getText(this.confirmationText);
  }

  /**
   * Verify confirmation page is displayed
   */
  async isConfirmationPageDisplayed(): Promise<boolean> {
    return await this.isElementVisible(this.confirmationContainer);
  }

  /**
   * Verify back to home button is visible
   */
  async isBackHomeButtonVisible(): Promise<boolean> {
    return await this.isElementVisible(this.backHomeButton);
  }

  /**
   * Click back to home button
   */
  async clickBackHomeButton(): Promise<void> {
    await this.click(this.backHomeButton);
  }
}
