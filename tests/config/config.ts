import dotenv from 'dotenv';

dotenv.config();

/**
 * Application configuration
 * Loads environment variables and provides them as constants
 * 
 * For local development: Variables are read from .env file
 * For CI/CD (GitHub Actions): Variables are injected via environment
 */
export const config = {
  baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',
  
  /**
   * GitHub PAT Token
   * Priority:
   * 1. Environment variable (set by GitHub Actions via secrets)
   * 2. .env file (for local development)
   * 3. Empty string (if not configured)
   * Note: Using GH_PAT instead of GITHUB_PAT (GitHub reserves GITHUB_* prefix)
   */
  githubPat: process.env.GH_PAT || '',
  
  /**
   * Check if running in CI/CD environment
   */
  isCIEnvironment: !!process.env.CI || !!process.env.GITHUB_ACTIONS,
};

/**
 * Validate required configuration
 */
export function validateConfig(): void {
  if (!config.baseUrl) {
    throw new Error('BASE_URL is not configured. Please set it in .env file or as an environment variable.');
  }
  
  if (config.isCIEnvironment && !config.githubPat) {
    console.warn('⚠️  GH_PAT is not configured in CI environment. Some features may not work.');
  }
  
  if (!config.isCIEnvironment && !config.githubPat) {
    console.warn('⚠️  GH_PAT is not configured for local development. Add it to .env file if needed.');
  }
}
