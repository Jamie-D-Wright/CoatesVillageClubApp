import { test as base } from '@playwright/test';
import { injectAxe, checkA11y, getViolations } from 'axe-playwright';

/**
 * Extended Playwright test with accessibility utilities
 */
export const test = base.extend({
  page: async ({ page }, use) => {
    // Inject axe-core into every page for accessibility testing
    await page.goto('/');
    await injectAxe(page);
    await use(page);
  },
});

export { expect } from '@playwright/test';

/**
 * Helper to check accessibility violations
 */
export async function checkAccessibility(page: any, context?: string) {
  try {
    await checkA11y(page, undefined, {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    });
  } catch (error) {
    const violations = await getViolations(page);
    console.error(`Accessibility violations found${context ? ` in ${context}` : ''}:`, violations);
    throw error;
  }
}

/**
 * Helper to wait for component to be ready
 */
export async function waitForComponent(page: any, selector: string) {
  await page.waitForSelector(selector, { state: 'attached' });
  await page.waitForLoadState('networkidle');
}

/**
 * Helper to check loading state
 */
export async function expectLoadingState(page: any, selector: string) {
  const element = await page.locator(selector);
  await expect(element).toHaveAttribute('aria-busy', 'true');
}

/**
 * Helper to check error state
 */
export async function expectErrorState(page: any, selector: string, errorMessage?: string) {
  const element = await page.locator(selector);
  await expect(element).toHaveAttribute('role', 'alert');
  if (errorMessage) {
    await expect(element).toContainText(errorMessage);
  }
}
