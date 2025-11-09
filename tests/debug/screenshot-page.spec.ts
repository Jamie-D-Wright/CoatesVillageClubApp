import { test } from '@playwright/test';

test('capture full page screenshot', async ({ page }) => {
  await page.goto('/');
  
  // Wait for page to fully load
  await page.waitForLoadState('networkidle');
  
  // Take full page screenshot
  await page.screenshot({ 
    path: 'tests/debug/full-page.png',
    fullPage: true 
  });
  
  // Also take viewport screenshot
  await page.screenshot({ 
    path: 'tests/debug/viewport.png'
  });
  
  console.log('Screenshots saved to tests/debug/');
});
