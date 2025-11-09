import { test, expect } from '@playwright/test';

test.describe('Landing Page Color Schemes', () => {
  test('scheme 1 - current purple/blue gradient', async ({ page }) => {
    await page.goto('http://localhost:3001/');
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({ 
      path: 'playwright-snapshots/color-scheme-1-purple-blue.png',
      fullPage: true 
    });
  });

  test('scheme 2 - emerald green', async ({ page }) => {
    await page.goto('http://localhost:3001/');
    await page.waitForLoadState('networkidle');
    
    // Inject color scheme 2
    await page.evaluate(() => {
      const style = document.createElement('style');
      style.textContent = `
        club-landing-page::part(hero) {
          background: linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%) !important;
        }
        club-landing-page .feature-icon-wrapper {
          background: linear-gradient(135deg, #059669, #10b981) !important;
        }
        club-landing-page .stat-number {
          color: #059669 !important;
        }
      `;
      document.head.appendChild(style);
    });
    
    await page.screenshot({ 
      path: 'playwright-snapshots/color-scheme-2-emerald.png',
      fullPage: true 
    });
  });

  test('scheme 3 - navy corporate', async ({ page }) => {
    await page.goto('http://localhost:3001/');
    await page.waitForLoadState('networkidle');
    
    await page.evaluate(() => {
      const landingPage = document.querySelector('club-landing-page');
      if (landingPage && landingPage.shadowRoot) {
        const style = document.createElement('style');
        style.textContent = `
          .hero {
            background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 50%, #312e81 100%) !important;
          }
          .feature-icon-wrapper {
            background: linear-gradient(135deg, #1e40af, #3b82f6) !important;
          }
          .stat-number {
            color: #1e40af !important;
          }
        `;
        landingPage.shadowRoot.appendChild(style);
      }
    });
    
    await page.screenshot({ 
      path: 'playwright-snapshots/color-scheme-3-navy.png',
      fullPage: true 
    });
  });

  test('scheme 4 - warm sunset', async ({ page }) => {
    await page.goto('http://localhost:3001/');
    await page.waitForLoadState('networkidle');
    
    await page.evaluate(() => {
      const landingPage = document.querySelector('club-landing-page');
      if (landingPage && landingPage.shadowRoot) {
        const style = document.createElement('style');
        style.textContent = `
          .hero {
            background: linear-gradient(135deg, #ea580c 0%, #f97316 50%, #fb923c 100%) !important;
          }
          .feature-icon-wrapper {
            background: linear-gradient(135deg, #ea580c, #f97316) !important;
          }
          .stat-number {
            color: #ea580c !important;
          }
        `;
        landingPage.shadowRoot.appendChild(style);
      }
    });
    
    await page.screenshot({ 
      path: 'playwright-snapshots/color-scheme-4-sunset.png',
      fullPage: true 
    });
  });

  test('scheme 5 - deep teal', async ({ page }) => {
    await page.goto('http://localhost:3001/');
    await page.waitForLoadState('networkidle');
    
    await page.evaluate(() => {
      const landingPage = document.querySelector('club-landing-page');
      if (landingPage && landingPage.shadowRoot) {
        const style = document.createElement('style');
        style.textContent = `
          .hero {
            background: linear-gradient(135deg, #0f766e 0%, #14b8a6 50%, #2dd4bf 100%) !important;
          }
          .feature-icon-wrapper {
            background: linear-gradient(135deg, #0f766e, #14b8a6) !important;
          }
          .stat-number {
            color: #0f766e !important;
          }
        `;
        landingPage.shadowRoot.appendChild(style);
      }
    });
    
    await page.screenshot({ 
      path: 'playwright-snapshots/color-scheme-5-teal.png',
      fullPage: true 
    });
  });

  test('scheme 6 - ruby red', async ({ page }) => {
    await page.goto('http://localhost:3001/');
    await page.waitForLoadState('networkidle');
    
    await page.evaluate(() => {
      const landingPage = document.querySelector('club-landing-page');
      if (landingPage && landingPage.shadowRoot) {
        const style = document.createElement('style');
        style.textContent = `
          .hero {
            background: linear-gradient(135deg, #be123c 0%, #e11d48 50%, #f43f5e 100%) !important;
          }
          .feature-icon-wrapper {
            background: linear-gradient(135deg, #be123c, #e11d48) !important;
          }
          .stat-number {
            color: #be123c !important;
          }
        `;
        landingPage.shadowRoot.appendChild(style);
      }
    });
    
    await page.screenshot({ 
      path: 'playwright-snapshots/color-scheme-6-ruby.png',
      fullPage: true 
    });
  });

  test('scheme 7 - deep slate (sophisticated)', async ({ page }) => {
    await page.goto('http://localhost:3001/');
    await page.waitForLoadState('networkidle');
    
    await page.evaluate(() => {
      const landingPage = document.querySelector('club-landing-page');
      if (landingPage && landingPage.shadowRoot) {
        const style = document.createElement('style');
        style.textContent = `
          .hero {
            background: linear-gradient(135deg, #334155 0%, #475569 50%, #64748b 100%) !important;
          }
          .feature-icon-wrapper {
            background: linear-gradient(135deg, #475569, #64748b) !important;
          }
          .stat-number {
            color: #475569 !important;
          }
        `;
        landingPage.shadowRoot.appendChild(style);
      }
    });
    
    await page.screenshot({ 
      path: 'playwright-snapshots/color-scheme-7-slate.png',
      fullPage: true 
    });
  });

  test('scheme 8 - vibrant magenta', async ({ page }) => {
    await page.goto('http://localhost:3001/');
    await page.waitForLoadState('networkidle');
    
    await page.evaluate(() => {
      const landingPage = document.querySelector('club-landing-page');
      if (landingPage && landingPage.shadowRoot) {
        const style = document.createElement('style');
        style.textContent = `
          .hero {
            background: linear-gradient(135deg, #a21caf 0%, #c026d3 50%, #d946ef 100%) !important;
          }
          .feature-icon-wrapper {
            background: linear-gradient(135deg, #a21caf, #c026d3) !important;
          }
          .stat-number {
            color: #a21caf !important;
          }
        `;
        landingPage.shadowRoot.appendChild(style);
      }
    });
    
    await page.screenshot({ 
      path: 'playwright-snapshots/color-scheme-8-magenta.png',
      fullPage: true 
    });
  });
});
