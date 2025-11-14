import { BasePage } from './BasePage';

/**
 * Checkout overview item interface
 */
interface OverviewItem {
  name: string;
  price: string;
  quantity: string;
}

/**
 * Checkout Overview Page Object Model
 * Contains all selectors and methods for the checkout overview page
 */
export class CheckoutOverviewPage extends BasePage {
  // Selectors
  private readonly overviewContainer = '.checkout_summary_container';
  private readonly cartItem = '.cart_item';
  private readonly cartItemName = '.inventory_item_name';
  private readonly cartItemPrice = '.inventory_item_price';
  private readonly cartItemQuantity = '.cart_quantity';
  private readonly finishButton = 'button[data-test="finish"]';
  private readonly subtotal = '.summary_subtotal_label';
  private readonly tax = '.summary_tax_label';
  private readonly total = '.summary_total_label';

  /**
   * Wait for overview page to load
   */
  async waitForPageLoad(): Promise<void> {
    await this.waitForElement(this.overviewContainer);
  }

  /**
   * Get all items in overview
   */
  async getAllOverviewItems(): Promise<OverviewItem[]> {
    const items = await this.getElements(this.cartItem);
    const count = await items.count();
    const overviewItems: OverviewItem[] = [];

    for (let i = 0; i < count; i++) {
      const item = items.nth(i);
      const name = await item.locator(this.cartItemName).textContent() || '';
      const price = await item.locator(this.cartItemPrice).textContent() || '';
      const quantity = await item.locator(this.cartItemQuantity).textContent() || '';

      overviewItems.push({
        name: name.trim(),
        price: price.trim(),
        quantity: quantity.trim(),
      });
    }

    return overviewItems;
  }

  /**
   * Verify product exists in overview
   */
  async verifyProductInOverview(productName: string): Promise<boolean> {
    const items = await this.getAllOverviewItems();
    return items.some(item => item.name === productName);
  }

  /**
   * Get subtotal amount
   */
  async getSubtotal(): Promise<string> {
    return await this.getText(this.subtotal);
  }

  /**
   * Get tax amount
   */
  async getTax(): Promise<string> {
    return await this.getText(this.tax);
  }

  /**
   * Get total amount
   */
  async getTotal(): Promise<string> {
    return await this.getText(this.total);
  }

  /**
   * Verify finish button is visible
   */
  async isFinishButtonVisible(): Promise<boolean> {
    return await this.isElementVisible(this.finishButton);
  }

  /**
   * Click finish button
   */
  async clickFinishButton(): Promise<void> {
    await this.click(this.finishButton);
  }
}
