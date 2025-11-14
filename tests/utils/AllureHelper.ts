import { test } from '@playwright/test';

/**
 * Allure helper utilities for enhanced reporting
 */
export class AllureHelper {
  /**
   * Add a feature tag to the test
   */
  static addFeature(featureName: string): void {
    test.info().annotations.push({
      type: 'feature',
      description: featureName,
    });
  }

  /**
   * Add a story tag to the test
   */
  static addStory(storyName: string): void {
    test.info().annotations.push({
      type: 'story',
      description: storyName,
    });
  }

  /**
   * Add a severity level to the test
   */
  static setSeverity(severity: 'blocker' | 'critical' | 'normal' | 'minor' | 'trivial'): void {
    test.info().annotations.push({
      type: 'severity',
      description: severity,
    });
  }

  /**
   * Add a link to the test
   */
  static addLink(url: string, name: string = 'Link'): void {
    test.info().annotations.push({
      type: 'link',
      description: `${name}: ${url}`,
    });
  }

  /**
   * Add test description
   */
  static addDescription(description: string): void {
    test.info().annotations.push({
      type: 'description',
      description: description,
    });
  }
}
