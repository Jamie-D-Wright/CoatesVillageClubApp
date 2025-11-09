import { test, expect } from '@playwright/test';

test.describe('Color Scheme Comparison', () => {
  test.beforeEach(async ({ page }) => {
    // Import the emerald variant
    await page.addScriptTag({
      path: 'src/pages/club-landing-page-emerald.ts',
      type: 'module'
    });
  });

  test('current purple/blue scheme', async ({ page }) => {
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <script type="module" src="/src/main.ts"></script>
          <link rel="stylesheet" href="https://cdn.web-awesome.com/60d71a227629472d/6.7.0/css/all.min.css" />
        </head>
        <body>
          <club-landing-page></club-landing-page>
        </body>
      </html>
    `);
    
    await page.goto('http://localhost:3001/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    await page.screenshot({ 
      path: 'playwright-snapshots/compare-1-purple-blue.png',
      fullPage: true 
    });
  });

  test('emerald green scheme', async ({ page }) => {
    await page.goto('http://localhost:3001/');
    await page.waitForLoadState('networkidle');
    
    // Replace the component
    await page.evaluate(() => {
      const app = document.querySelector('club-app');
      if (app && app.shadowRoot) {
        const main = app.shadowRoot.querySelector('main');
        if (main) {
          main.innerHTML = '<club-landing-page-emerald></club-landing-page-emerald>';
        }
      }
    });
    
    await page.waitForTimeout(1000);
    
    await page.screenshot({ 
      path: 'playwright-snapshots/compare-2-emerald.png',
      fullPage: true 
    });
  });
});
