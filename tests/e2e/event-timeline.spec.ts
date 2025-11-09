import { test, expect } from '@playwright/test';

test.describe('Event Timeline View', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3002/events');
    await page.waitForLoadState('networkidle');
  });

  test('should display timeline view by default', async ({ page }) => {
    // Wait for events to load
    await page.waitForSelector('club-event-timeline', { timeout: 10000 });
    
    // Check that timeline component is visible
    const timeline = page.locator('club-event-timeline');
    await expect(timeline).toBeVisible();
  });

  test('should show view toggle buttons', async ({ page }) => {
    // Wait for view controls
    await page.waitForSelector('.view-controls', { timeout: 10000 });
    
    // Check for timeline and grid buttons
    const timelineButton = page.getByRole('button', { name: /timeline/i });
    const gridButton = page.getByRole('button', { name: /grid/i });
    
    await expect(timelineButton).toBeVisible();
    await expect(gridButton).toBeVisible();
  });

  test('should switch between timeline and grid views', async ({ page }) => {
    // Wait for page to load
    await page.waitForSelector('club-event-timeline', { timeout: 10000 });
    
    // Click grid view button
    const gridButton = page.getByRole('button', { name: /grid/i });
    await gridButton.click();
    
    // Check that grid view is displayed
    await page.waitForSelector('.events-grid', { timeout: 5000 });
    const eventsGrid = page.locator('.events-grid');
    await expect(eventsGrid).toBeVisible();
    
    // Click timeline view button
    const timelineButton = page.getByRole('button', { name: /timeline/i });
    await timelineButton.click();
    
    // Check that timeline view is displayed again
    await page.waitForSelector('club-event-timeline', { timeout: 5000 });
    const timeline = page.locator('club-event-timeline');
    await expect(timeline).toBeVisible();
  });

  test('should display events grouped by month in timeline', async ({ page }) => {
    // Wait for timeline to load
    await page.waitForSelector('club-event-timeline', { timeout: 10000 });
    
    // Check for month sections
    const monthSections = page.locator('.month-section');
    const count = await monthSections.count();
    
    // Should have at least one month section
    expect(count).toBeGreaterThan(0);
  });

  test('should display month headers in timeline', async ({ page }) => {
    // Wait for timeline to load
    await page.waitForSelector('club-event-timeline', { timeout: 10000 });
    
    // Check for month titles
    const monthTitles = page.locator('.month-title');
    const count = await monthTitles.count();
    
    // Should have at least one month title
    expect(count).toBeGreaterThan(0);
    
    // First month title should contain text
    const firstMonthTitle = monthTitles.first();
    const text = await firstMonthTitle.textContent();
    expect(text).toBeTruthy();
    expect(text).toMatch(/[A-Za-z]+ \d{4}/); // e.g., "November 2025"
  });

  test('should display event cards with timeline styling', async ({ page }) => {
    // Wait for timeline to load
    await page.waitForSelector('club-event-timeline', { timeout: 10000 });
    
    // Check for timeline events
    const timelineEvents = page.locator('.timeline-event');
    const count = await timelineEvents.count();
    
    // Should have multiple events
    expect(count).toBeGreaterThan(0);
    
    // Check first event has required elements
    const firstEvent = timelineEvents.first();
    await expect(firstEvent.locator('.event-card')).toBeVisible();
    await expect(firstEvent.locator('.event-title')).toBeVisible();
    await expect(firstEvent.locator('.event-date-badge')).toBeVisible();
  });

  test('should take screenshot of timeline view - desktop', async ({ page }) => {
    // Wait for timeline to load
    await page.waitForSelector('club-event-timeline', { timeout: 10000 });
    
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 1024 });
    
    // Wait a bit for layout to stabilize
    await page.waitForTimeout(500);
    
    // Take screenshot
    await expect(page).toHaveScreenshot('event-timeline-desktop.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.05,
    });
  });

  test('should take screenshot of timeline view - mobile', async ({ page }) => {
    // Wait for timeline to load
    await page.waitForSelector('club-event-timeline', { timeout: 10000 });
    
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 812 });
    
    // Wait a bit for layout to stabilize
    await page.waitForTimeout(500);
    
    // Take screenshot
    await expect(page).toHaveScreenshot('event-timeline-mobile.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.05,
    });
  });

  test('should take screenshot of grid view - desktop', async ({ page }) => {
    // Wait for page to load
    await page.waitForSelector('club-event-timeline', { timeout: 10000 });
    
    // Click grid view button
    const gridButton = page.getByRole('button', { name: /grid/i });
    await gridButton.click();
    
    // Wait for grid to render
    await page.waitForSelector('.events-grid', { timeout: 5000 });
    await page.waitForTimeout(500);
    
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 1024 });
    
    // Take screenshot
    await expect(page).toHaveScreenshot('event-grid-desktop.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.05,
    });
  });
});
