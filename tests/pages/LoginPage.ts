import { BasePage } from './BasePage';
import { config } from '../config/config';

/**
 * Login Page Object Model
 * Contains all selectors and methods for the login page
 */
export class LoginPage extends BasePage {
  // Selectors
  private readonly usernameInput = 'input[data-test="username"]';
  private readonly passwordInput = 'input[data-test="password"]';
  private readonly loginButton = 'input[data-test="login-button"]';
  private readonly loginContainer = '.login-box';

  /**
   * Navigate to login page
   */
  async goto(): Promise<void> {
    await this.navigateTo(config.baseUrl);
  }

  /**
   * Wait for login page to load
   */
  async waitForPageLoad(): Promise<void> {
    await this.waitForElement(this.loginContainer);
  }

  /**
   * Enter username
   */
  async enterUsername(username: string): Promise<void> {
    await this.fillInput(this.usernameInput, username);
  }

  /**
   * Enter password
   */
  async enterPassword(password: string): Promise<void> {
    await this.fillInput(this.passwordInput, password);
  }

  /**
   * Click login button
   */
  async clickLoginButton(): Promise<void> {
    await this.click(this.loginButton);
  }

  /**
   * Perform login with credentials
   */
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }
}
