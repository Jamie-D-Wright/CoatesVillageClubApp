import { test, expect } from '@playwright/test';

test.describe('Event List - View Public Events', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/events');
  });

  test('should display the events page header', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Upcoming Events');
    await expect(page.locator('.hero-subtitle')).toContainText('Discover exciting events');
  });

  test('should show loading state initially', async ({ page }) => {
    const loadingContainer = page.locator('.loading-container');
    await expect(loadingContainer).toBeVisible();
    await expect(loadingContainer).toHaveAttribute('aria-busy', 'true');
    await expect(page.locator('.loading-text')).toContainText('Loading');
  });

  test('should display events after loading', async ({ page }) => {
    // Wait for loading to complete
    await page.waitForSelector('.events-grid', { timeout: 10000 });
    
    // Check that events are displayed
    const eventCards = page.locator('club-event-card');
    const count = await eventCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display event details correctly', async ({ page }) => {
    await page.waitForSelector('club-event-card', { timeout: 10000 });
    
    const firstCard = page.locator('club-event-card').first();
    
    // Check for event type badge (Web Awesome badge component)
    await expect(firstCard.locator('wa-badge')).toBeVisible();
    
    // Check for event title
    await expect(firstCard.locator('.event-title')).toBeVisible();
    
    // Check for date
    await expect(firstCard.locator('.event-date')).toBeVisible();
    
    // Check for time
    await expect(firstCard.locator('.event-time')).toBeVisible();
    
    // Check for description
    await expect(firstCard.locator('.event-description')).toBeVisible();
  });

  test('should have proper ARIA labels for accessibility', async ({ page }) => {
    await page.waitForSelector('.events-grid', { timeout: 10000 });
    
    // Check list container has proper role and label
    const eventsList = page.locator('.events-grid');
    await expect(eventsList).toHaveAttribute('role', 'list');
    await expect(eventsList).toHaveAttribute('aria-label', 'Upcoming events');
    
    // Check event cards have listitem role
    const firstCard = page.locator('club-event-card').first();
    await expect(firstCard).toHaveAttribute('role', 'listitem');
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForSelector('club-event-card', { timeout: 10000 });
    
    // Check that events are visible on mobile
    const eventCards = page.locator('club-event-card');
    const count = await eventCards.count();
    expect(count).toBeGreaterThan(0);
    
    // Verify single column layout (all cards should be visible vertically)
    const firstCard = eventCards.first();
    await expect(firstCard).toBeVisible();
  });

  test('should be responsive on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForSelector('club-event-card', { timeout: 10000 });
    
    const eventCards = page.locator('club-event-card');
    const count = await eventCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should be responsive on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.waitForSelector('club-event-card', { timeout: 10000 });
    
    const eventCards = page.locator('club-event-card');
    const count = await eventCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should format dates in readable format', async ({ page }) => {
    await page.waitForSelector('club-event-card', { timeout: 10000 });
    
    const firstCard = page.locator('club-event-card').first();
    const dateText = await firstCard.locator('.event-date time').textContent();
    
    // Check that date includes day name and full format
    // Formats can vary: "Saturday 15 November 2025" or "Saturday, 15 November 2025"
    expect(dateText).toMatch(/\w+day,?\s+\d+\s+\w+\s+\d{4}/);
  });

  test('should format times in 12-hour format with AM/PM', async ({ page }) => {
    await page.waitForSelector('club-event-card', { timeout: 10000 });
    
    const firstCard = page.locator('club-event-card').first();
    const timeText = await firstCard.locator('.event-time').textContent();
    
    // Check for AM or PM
    expect(timeText).toMatch(/(AM|PM)/);
  });

  test('should display different event type badges', async ({ page }) => {
    await page.waitForSelector('club-event-card', { timeout: 10000 });
    
    const badges = page.locator('wa-badge');
    const badgeTexts = await badges.allTextContents();
    
    // Should have various event types
    expect(badgeTexts.length).toBeGreaterThan(0);
  });
});

test.describe('Event List - Visual Regression', () => {
  test('should match baseline for event list on desktop', async ({ page }) => {
    await page.goto('/events');
    await page.waitForSelector('.events-grid', { timeout: 10000 });
    
    await expect(page).toHaveScreenshot('event-list-desktop.png', {
      fullPage: true,
    });
  });

  test('should match baseline for event list on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/events');
    await page.waitForSelector('.events-grid', { timeout: 10000 });
    
    await expect(page).toHaveScreenshot('event-list-mobile.png', {
      fullPage: true,
    });
  });

  test('should match baseline for loading state', async ({ page }) => {
    await page.goto('/events');
    
    // Capture loading state quickly before it disappears
    await page.waitForSelector('.loading-container', { timeout: 5000 });
    
    await expect(page.locator('.loading-container')).toHaveScreenshot('loading-state.png');
  });
});
