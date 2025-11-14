import { BasePage } from './BasePage';
import { Locator } from '@playwright/test';

/**
 * Product details interface
 */
interface Product {
  name: string;
  description: string;
  price: string;
}

/**
 * Products Page Object Model
 * Contains all selectors and methods for the products page
 */
export class ProductsPage extends BasePage {
  // Selectors
  private readonly productContainer = '.inventory_container';
  private readonly productItem = '.inventory_item';
  private readonly productName = '.inventory_item_name';
  private readonly productDescription = '.inventory_item_desc';
  private readonly productPrice = '.inventory_item_price';
  private readonly addToCartButton = 'button[data-test*="add-to-cart"]';
  private readonly shoppingCartIcon = '.shopping_cart_container';
  private readonly cartBadge = '.shopping_cart_badge';

  /**
   * Wait for products page to load
   */
  async waitForPageLoad(): Promise<void> {
    await this.waitForElement(this.productContainer);
  }

  /**
   * Get all products displayed on the page
   */
  async getAllProducts(): Promise<Product[]> {
    const productElements = await this.getElements(this.productItem);
    const count = await productElements.count();
    const products: Product[] = [];

    for (let i = 0; i < count; i++) {
      const product = productElements.nth(i);
      const name = await product.locator(this.productName).textContent() || '';
      const description = await product.locator(this.productDescription).textContent() || '';
      const price = await product.locator(this.productPrice).textContent() || '';

      products.push({
        name: name.trim(),
        description: description.trim(),
        price: price.trim(),
      });
    }

    return products;
  }

  /**
   * Get product by name
   */
  async getProductByName(productName: string): Promise<Locator> {
    return this.page.locator(this.productItem).filter({ has: this.page.locator(this.productName, { hasText: productName }) });
  }

  /**
   * Verify product exists in the list
   */
  async verifyProductExists(productName: string): Promise<boolean> {
    const product = await this.getProductByName(productName);
    return await product.isVisible();
  }

  /**
   * Get product name by index
   */
  async getProductNameByIndex(index: number): Promise<string> {
    const product = this.page.locator(this.productItem).nth(index);
    return await product.locator(this.productName).textContent() || '';
  }

  /**
   * Get product description by index
   */
  async getProductDescriptionByIndex(index: number): Promise<string> {
    const product = this.page.locator(this.productItem).nth(index);
    return await product.locator(this.productDescription).textContent() || '';
  }

  /**
   * Get product price by index
   */
  async getProductPriceByIndex(index: number): Promise<string> {
    const product = this.page.locator(this.productItem).nth(index);
    return await product.locator(this.productPrice).textContent() || '';
  }

  /**
   * Add product to cart by product name
   */
  async addProductToCartByName(productName: string): Promise<void> {
    const product = await this.getProductByName(productName);
    await product.locator(this.addToCartButton).click();
  }

  /**
   * Add product to cart by index
   */
  async addProductToCartByIndex(index: number): Promise<void> {
    const product = this.page.locator(this.productItem).nth(index);
    await product.locator(this.addToCartButton).click();
  }

  /**
   * Click on shopping cart icon
   */
  async clickShoppingCart(): Promise<void> {
    await this.click(this.shoppingCartIcon);
  }

  /**
   * Get cart item count
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
   * Verify add to cart button is visible
   */
  async isAddToCartButtonVisible(index: number): Promise<boolean> {
    const product = this.page.locator(this.productItem).nth(index);
    return await product.locator(this.addToCartButton).isVisible();
  }
}
