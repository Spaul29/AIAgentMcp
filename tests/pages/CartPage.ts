import { BasePage } from './BasePage';

/**
 * Cart item interface
 */
interface CartItem {
  name: string;
  price: string;
  quantity: string;
}

/**
 * Cart Page Object Model
 * Contains all selectors and methods for the shopping cart page
 */
export class CartPage extends BasePage {
  // Selectors
  private readonly cartContainer = '.cart_list';
  private readonly cartItem = '.cart_item';
  private readonly cartItemName = '.inventory_item_name';
  private readonly cartItemPrice = '.inventory_item_price';
  private readonly cartItemQuantity = '.cart_quantity';
  private readonly checkoutButton = 'button[data-test="checkout"]';
  private readonly cartBadge = '.shopping_cart_badge';

  /**
   * Wait for cart page to load
   */
  async waitForPageLoad(): Promise<void> {
    await this.waitForElement(this.cartContainer);
  }

  /**
   * Get all items in cart
   */
  async getAllCartItems(): Promise<CartItem[]> {
    const items = await this.getElements(this.cartItem);
    const count = await items.count();
    const cartItems: CartItem[] = [];

    for (let i = 0; i < count; i++) {
      const item = items.nth(i);
      const name = await item.locator(this.cartItemName).textContent() || '';
      const price = await item.locator(this.cartItemPrice).textContent() || '';
      const quantity = await item.locator(this.cartItemQuantity).textContent() || '';

      cartItems.push({
        name: name.trim(),
        price: price.trim(),
        quantity: quantity.trim(),
      });
    }

    return cartItems;
  }

  /**
   * Verify product exists in cart
   */
  async verifyProductInCart(productName: string): Promise<boolean> {
    const items = await this.getAllCartItems();
    return items.some(item => item.name === productName);
  }

  /**
   * Get product from cart by name
   */
  async getProductFromCart(productName: string): Promise<CartItem | undefined> {
    const items = await this.getAllCartItems();
    return items.find(item => item.name === productName);
  }

  /**
   * Get cart item count badge
   */
  async getCartItemCount(): Promise<number> {
    const badge = this.page.locator(this.cartBadge);
    if (await badge.isVisible()) {
      const count = await badge.textContent();
      return parseInt(count || '0', 10);
    }
    return 0;
  }

  /**
   * Verify checkout button is visible
   */
  async isCheckoutButtonVisible(): Promise<boolean> {
    return await this.isElementVisible(this.checkoutButton);
  }

  /**
   * Click checkout button
   */
  async clickCheckoutButton(): Promise<void> {
    await this.click(this.checkoutButton);
  }
}
