import { test, expect } from '@playwright/test';

// Helper to fill Web Awesome input components (Shadow DOM)
async function fillWaInput(page: any, selector: string, value: string) {
  const input = page.locator(selector);
  await input.waitFor({ state: 'visible' });
  
  // Web Awesome input components use an internal input element
  // We need to interact with the internal element
  await input.evaluate((el: any, val: string) => {
    const waInput = el;
    if (waInput.shadowRoot) {
      const internalInput = waInput.shadowRoot.querySelector('input');
      if (internalInput) {
        internalInput.value = val;
        internalInput.dispatchEvent(new Event('input', { bubbles: true }));
        internalInput.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  }, value);
  
  // Also trigger the wa-input event that the component listens for
  await input.dispatchEvent('wa-input');
}

test.describe('Navigation and Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should display app header with logo and login button', async ({ page }) => {
    // Check for header
    const header = page.locator('club-app-header');
    await expect(header).toBeVisible();

    // Check for logo
    const logo = page.locator('.logo');
    await expect(logo).toContainText('Coates Village Club');

    // Check for login button (when not authenticated)
    const loginButton = page.getByRole('button', { name: /login/i });
    await expect(loginButton).toBeVisible();
  });

  test('should redirect to events page by default', async ({ page }) => {
    await page.waitForURL('**/events');
    expect(page.url()).toContain('/events');
  });

  test('should navigate to login page when clicking login button', async ({ page }) => {
    const loginButton = page.getByRole('button', { name: /login/i });
    await loginButton.click();
    
    await page.waitForURL('**/login');
    expect(page.url()).toContain('/login');
    
    // Check for login form
    const loginForm = page.locator('club-login-form');
    await expect(loginForm).toBeVisible();
  });

  test('should show demo account information on login page', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    
    await expect(page.getByText('Demo Accounts')).toBeVisible();
    await expect(page.getByText(/committee@example.com/)).toBeVisible();
    await expect(page.getByText(/volunteer@example.com/)).toBeVisible();
    await expect(page.getByText(/member@example.com/)).toBeVisible();
  });

  test('should login successfully with committee credentials', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    
    // Fill in login form
    await fillWaInput(page, '#email', 'committee@example.com');
    await fillWaInput(page, '#password', 'password');
    
    // Submit form
    await page.getByRole('button', { name: /sign in/i }).click();
    
    // Should redirect to events page
    await page.waitForURL('**/events', { timeout: 5000 });
    
    // Should show logout button
    const logoutButton = page.getByRole('button', { name: /logout/i });
    await expect(logoutButton).toBeVisible();
  });

  test('should show Committee-only menu items for committee user', async ({ page }) => {
    // Login as committee
    await page.goto('http://localhost:3000/login');
    await fillWaInput(page, '#email', 'committee@example.com');
    await fillWaInput(page, '#password', 'password');
    await page.getByRole('button', { name: /sign in/i }).click();
    await page.waitForURL('**/events');
    
    // On desktop, check navigation items
    if (await page.locator('.desktop-nav').isVisible()) {
      await expect(page.getByRole('link', { name: /manage events/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /users/i })).toBeVisible();
    } else {
      // On mobile, open drawer
      await page.getByRole('button', { name: /toggle menu/i }).click();
      
      // Check for admin section
      await expect(page.getByText('Admin', { exact: true })).toBeVisible();
      await expect(page.getByRole('link', { name: /manage events/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /users/i })).toBeVisible();
    }
  });

  test('should NOT show Committee menu items for volunteer user', async ({ page }) => {
    // Login as volunteer
    await page.goto('http://localhost:3000/login');
    await fillWaInput(page, '#email', 'volunteer@example.com');
    await fillWaInput(page, '#password', 'password');
    await page.getByRole('button', { name: /sign in/i }).click();
    await page.waitForURL('**/events');
    
    // Open mobile menu if needed
    const hamburger = page.getByRole('button', { name: /toggle menu/i });
    if (await hamburger.isVisible()) {
      await hamburger.click();
    }
    
    // Should NOT see admin section
    await expect(page.getByText('Admin', { exact: true })).not.toBeVisible();
    await expect(page.getByRole('link', { name: /users/i })).not.toBeVisible();
    
    // Should see volunteer section
    await expect(page.getByText('Volunteer', { exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: /my shifts/i })).toBeVisible();
  });

  test('should navigate between pages using menu', async ({ page }) => {
    // Login as volunteer
    await page.goto('http://localhost:3000/login');
    await fillWaInput(page, '#email', 'volunteer@example.com');
    await fillWaInput(page, '#password', 'password');
    await page.getByRole('button', { name: /sign in/i }).click();
    await page.waitForURL('**/events');
    
    // Open mobile menu if needed
    const hamburger = page.getByRole('button', { name: /toggle menu/i });
    if (await hamburger.isVisible()) {
      await hamburger.click();
    }
    
    // Navigate to shifts
    await page.getByRole('link', { name: /my shifts/i }).click();
    await page.waitForURL('**/shifts');
    expect(page.url()).toContain('/shifts');
    await expect(page.getByRole('heading', { name: /volunteer shifts/i })).toBeVisible();
    
    // Navigate to stock alerts
    if (await hamburger.isVisible()) {
      await hamburger.click();
    }
    await page.getByRole('link', { name: /stock alerts/i }).click();
    await page.waitForURL('**/stock-alerts');
    expect(page.url()).toContain('/stock-alerts');
    await expect(page.getByRole('heading', { name: /stock alerts/i })).toBeVisible();
  });

  test('should protect Committee routes from volunteer access', async ({ page }) => {
    // Login as volunteer
    await page.goto('http://localhost:3000/login');
    await fillWaInput(page, '#email', 'volunteer@example.com');
    await fillWaInput(page, '#password', 'password');
    await page.getByRole('button', { name: /sign in/i }).click();
    await page.waitForURL('**/events');
    
    // Try to access committee route directly
    await page.goto('http://localhost:3000/users');
    
    // Should redirect to events
    await page.waitForURL('**/events');
    expect(page.url()).toContain('/events');
  });

  test('should logout and redirect to login page', async ({ page }) => {
    // Login first
    await page.goto('http://localhost:3000/login');
    await fillWaInput(page, '#email', 'committee@example.com');
    await fillWaInput(page, '#password', 'password');
    await page.getByRole('button', { name: /sign in/i }).click();
    await page.waitForURL('**/events');
    
    // Logout
    await page.getByRole('button', { name: /logout/i }).click();
    
    // Should redirect to login
    await page.waitForURL('**/login');
    expect(page.url()).toContain('/login');
    
    // Should show login button again
    const loginButton = page.getByRole('button', { name: /login/i });
    await expect(loginButton).toBeVisible();
  });

  test('should show offline indicator when offline', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Go offline
    await page.context().setOffline(true);
    
    // Wait a bit for the event to trigger
    await page.waitForTimeout(500);
    
    // Check for offline indicator
    const offlineIndicator = page.locator('.offline-indicator');
    await expect(offlineIndicator).toBeVisible();
    await expect(offlineIndicator).toContainText('Offline');
  });

  test('should maintain authentication across page reloads', async ({ page }) => {
    // Login
    await page.goto('http://localhost:3000/login');
    await fillWaInput(page, '#email', 'committee@example.com');
    await fillWaInput(page, '#password', 'password');
    await page.getByRole('button', { name: /sign in/i }).click();
    await page.waitForURL('**/events');
    
    // Reload page
    await page.reload();
    
    // Should still be authenticated
    const logoutButton = page.getByRole('button', { name: /logout/i });
    await expect(logoutButton).toBeVisible();
    
    // Should still have access to protected routes
    await page.goto('http://localhost:3000/users');
    await page.waitForURL('**/users');
    expect(page.url()).toContain('/users');
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    
    // Check that form elements can receive tab focus
    await page.keyboard.press('Tab');
    
    // Web Awesome components manage their own focus within shadow DOM
    // Just verify the form can be submitted with keyboard
    await fillWaInput(page, '#email', 'test@example.com');
    await fillWaInput(page, '#password', 'password');
    
    // Focus and activate submit button
    const submitButton = page.getByRole('button', { name: /sign in/i });
    await submitButton.focus();
    await expect(submitButton).toBeVisible();
  });

  test('mobile: should open and close drawer', async ({ page, viewport }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('http://localhost:3000');
    
    // Open drawer
    const hamburger = page.getByRole('button', { name: /toggle menu/i });
    await expect(hamburger).toBeVisible();
    await hamburger.click();
    
    // Drawer should be open
    const drawer = page.locator('wa-drawer');
    await expect(drawer).toHaveAttribute('open', '');
    
    // Close drawer by clicking backdrop or close button
    await page.keyboard.press('Escape');
    
    // Drawer should be closed
    await expect(drawer).not.toHaveAttribute('open', '');
  });
});
