import { test, expect } from '@playwright/test';

test('inspect page on load', async ({ page }) => {
  // Navigate to the app
  await page.goto('http://localhost:3000');
  
  // Wait a bit for everything to load
  await page.waitForTimeout(2000);
  
  // Get the page HTML
  const html = await page.content();
  console.log('=== PAGE HTML ===');
  console.log(html);
  
  // Check for errors in console
  const consoleMessages: string[] = [];
  page.on('console', msg => {
    consoleMessages.push(`[${msg.type()}] ${msg.text()}`);
  });
  
  // Check for errors
  const errors: string[] = [];
  page.on('pageerror', error => {
    errors.push(error.message);
  });
  
  // Wait a bit more to catch any async errors
  await page.waitForTimeout(1000);
  
  console.log('\n=== CONSOLE MESSAGES ===');
  consoleMessages.forEach(msg => console.log(msg));
  
  console.log('\n=== PAGE ERRORS ===');
  errors.forEach(err => console.log(err));
  
  // Check what components are present
  const clubApp = await page.locator('club-app').count();
  const clubAppHeader = await page.locator('club-app-header').count();
  const routerOutlet = await page.locator('#router-outlet').count();
  
  console.log('\n=== COMPONENT COUNTS ===');
  console.log(`club-app: ${clubApp}`);
  console.log(`club-app-header: ${clubAppHeader}`);
  console.log(`#router-outlet: ${routerOutlet}`);
  
  // Check for Web Awesome components
  const waCards = await page.locator('wa-card').count();
  const waButtons = await page.locator('wa-button').count();
  const waIcons = await page.locator('wa-icon').count();
  
  console.log('\n=== WEB AWESOME COMPONENTS ===');
  console.log(`wa-card: ${waCards}`);
  console.log(`wa-button: ${waButtons}`);
  console.log(`wa-icon: ${waIcons}`);
  
  // Take a screenshot
  await page.screenshot({ path: 'tests/debug/page-load.png', fullPage: true });
  console.log('\n=== Screenshot saved to tests/debug/page-load.png ===');
  
  // Get computed styles of main elements
  const clubAppStyles = await page.locator('club-app').evaluate(el => {
    const styles = window.getComputedStyle(el);
    return {
      display: styles.display,
      visibility: styles.visibility,
      opacity: styles.opacity,
    };
  });
  
  console.log('\n=== CLUB-APP STYLES ===');
  console.log(clubAppStyles);
  
  // Check if router loaded
  const routerOutletContent = await page.locator('#router-outlet').innerHTML();
  console.log('\n=== ROUTER OUTLET CONTENT ===');
  console.log(routerOutletContent || '(empty)');
});
