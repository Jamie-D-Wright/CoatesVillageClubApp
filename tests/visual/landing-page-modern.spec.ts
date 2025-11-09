import { test, expect } from '@playwright/test';

test.describe('Modern Landing Page - Visual Test', () => {
  test('should display modern hero section', async ({ page }) => {
    await page.goto('http://localhost:3001/');
    
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Capture the hero section
    const hero = page.locator('.hero');
    await expect(hero).toBeVisible();
    
    await page.screenshot({ 
      path: 'playwright-snapshots/landing-page-hero-modern.png',
      fullPage: false 
    });
  });

  test('should display features section with modern cards', async ({ page }) => {
    await page.goto('http://localhost:3001/');
    await page.waitForLoadState('networkidle');
    
    // Check features are visible
    const features = page.locator('.features');
    await expect(features).toBeVisible();
    
    // Verify all feature cards are present
    const featureCards = page.locator('.feature-card');
    await expect(featureCards).toHaveCount(3);
    
    // Scroll to features section
    await features.scrollIntoViewIfNeeded();
    
    await page.screenshot({ 
      path: 'playwright-snapshots/landing-page-features-modern.png',
      fullPage: false 
    });
  });

  test('should display CTA section with stats', async ({ page }) => {
    await page.goto('http://localhost:3001/');
    await page.waitForLoadState('networkidle');
    
    // Check CTA card
    const ctaCard = page.locator('wa-card.cta-card');
    await expect(ctaCard).toBeVisible();
    
    // Verify stats are present
    const stats = page.locator('wa-card.stat-card');
    await expect(stats).toHaveCount(3);
    
    // Scroll to CTA section
    await ctaCard.scrollIntoViewIfNeeded();
    
    await page.screenshot({ 
      path: 'playwright-snapshots/landing-page-cta-modern.png',
      fullPage: false 
    });
  });

  test('should capture full page layout', async ({ page }) => {
    await page.goto('http://localhost:3001/');
    await page.waitForLoadState('networkidle');
    
    // Capture full page
    await page.screenshot({ 
      path: 'playwright-snapshots/landing-page-full-modern.png',
      fullPage: true 
    });
  });

  test('should display modern header', async ({ page }) => {
    await page.goto('http://localhost:3001/');
    await page.waitForLoadState('networkidle');
    
    // Check header
    const header = page.locator('club-app-header');
    await expect(header).toBeVisible();
    
    await page.screenshot({ 
      path: 'playwright-snapshots/landing-page-header-modern.png',
      fullPage: false,
      clip: { x: 0, y: 0, width: 1280, height: 100 }
    });
  });

  test('should test hover effects on feature cards', async ({ page }) => {
    await page.goto('http://localhost:3001/');
    await page.waitForLoadState('networkidle');
    
    const firstFeatureCard = page.locator('.feature-card').first();
    await firstFeatureCard.scrollIntoViewIfNeeded();
    
    // Hover over the first card
    await firstFeatureCard.hover();
    
    // Wait for animation
    await page.waitForTimeout(300);
    
    await page.screenshot({ 
      path: 'playwright-snapshots/landing-page-card-hover.png',
      fullPage: false 
    });
  });

  test('should test mobile responsive design', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('http://localhost:3001/');
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({ 
      path: 'playwright-snapshots/landing-page-mobile-modern.png',
      fullPage: true 
    });
  });

  test('should test tablet responsive design', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    
    await page.goto('http://localhost:3001/');
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({ 
      path: 'playwright-snapshots/landing-page-tablet-modern.png',
      fullPage: true 
    });
  });
});
