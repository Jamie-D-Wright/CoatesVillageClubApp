# Getting Started with Coates Village Club PWA

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** version 18 or higher
- **npm** (comes with Node.js)
- **Git** for version control

## Installation

1. **Install dependencies**:
```bash
npm install
```

This will install:
- Lit (web components framework)
- Vite (build tool and dev server)
- Playwright (testing framework)
- TypeScript and ESLint
- Vite PWA plugin
- Axe Playwright (accessibility testing)

2. **Set up environment variables**:
```bash
# Copy the example environment file
cp .env.example .env

# The default configuration uses mock data:
# VITE_USE_REAL_API=false
```

## Running the Application

### Development Mode

Start the development server with hot reload:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Production Build

Build the application for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Running Tests

### Install Playwright Browsers

First time only - install Playwright browsers:
```bash
npx playwright install
```

### Run All Tests

```bash
npm test
```

### Run Tests with UI Mode (Recommended for Development)

```bash
npm run test:ui
```

This opens Playwright's interactive test runner where you can:
- See tests run in real-time
- Debug failing tests
- View screenshots and traces
- Generate visual regression baselines

### Run Tests in Headed Mode

Watch tests execute in the browser:
```bash
npm run test:headed
```

### Debug Tests

```bash
npm run test:debug
```

### View Test Report

After running tests, view the HTML report:
```bash
npm run test:report
```

## Project Structure

```
CoatesVillageClubApp/
├── src/
│   ├── components/
│   │   ├── club-app.ts              # Main app component
│   │   └── events/
│   │       ├── club-event-list.ts   # Event list container
│   │       └── club-event-card.ts   # Individual event card
│   ├── services/
│   │   ├── types.ts                 # TypeScript interfaces
│   │   └── events-service.ts        # Event service with mock/real API
│   ├── styles/
│   │   └── global.css               # Global styles
│   ├── main.ts                      # Application entry point
│   └── vite-env.d.ts               # Vite environment types
├── tests/
│   ├── e2e/
│   │   └── view-events.spec.ts      # E2E tests for event viewing
│   └── helpers/
│       └── test-utils.ts            # Test utilities and accessibility helpers
├── docs/
│   ├── user-stories/
│   │   └── 001-view-public-events.md
│   ├── design-system/
│   │   └── tokens.md
│   └── api-documentation/
│       └── events-api.md
├── public/
│   └── manifest.json                # PWA manifest
├── index.html                       # HTML entry point
├── vite.config.ts                   # Vite configuration
├── playwright.config.ts             # Playwright test configuration
├── tsconfig.json                    # TypeScript configuration
└── package.json                     # Project dependencies
```

## Development Workflow

### 1. Mock Data (Current Setup)

The app currently uses **mock data** by default (`VITE_USE_REAL_API=false`). The mock service provides realistic event data that matches the backend API contract.

**Benefits**:
- Develop offline without backend dependency
- Consistent test data
- Fast iteration

### 2. Switching to Real API

When the backend Events service is deployed:

1. Update `.env`:
```bash
VITE_USE_REAL_API=true
VITE_API_BASE_URL=https://api.coatesvillageclub.co.uk
```

2. Restart the dev server:
```bash
npm run dev
```

The service layer will automatically switch to consuming real API endpoints.

### 3. Testing Both APIs

You can test both implementations:

**Mock API**:
```bash
VITE_USE_REAL_API=false npm run dev
```

**Real API**:
```bash
VITE_USE_REAL_API=true npm run dev
```

## Design Iteration Workflow

### 1. Run Tests to Capture Screenshots

```bash
npm run test:ui
```

### 2. Review Visual Snapshots

Screenshots are saved to `playwright-snapshots/`

### 3. Share Screenshots for Feedback

Share the screenshots for design review and feedback.

### 4. Iterate Based on Feedback

Make design changes in component styles, then re-run tests.

### 5. Update Baselines

Once design is approved:
```bash
# Update visual regression baselines
npx playwright test --update-snapshots
```

### 6. Document Approved Design

Save approved screenshots to `docs/wireframes/001-event-list.md`

## Type Checking and Linting

### Type Check

```bash
npm run type-check
```

### Lint Code

```bash
npm run lint
```

## Troubleshooting

### TypeScript Errors

The project has TypeScript errors because dependencies haven't been installed yet. Run `npm install` to resolve them.

### Port Already in Use

If port 3000 is in use, Vite will automatically try other ports. Check the terminal output for the actual URL.

### Playwright Browser Installation

If tests fail with browser errors:
```bash
npx playwright install
```

### Clear Build Cache

If experiencing strange build issues:
```bash
rm -rf node_modules dist .vite
npm install
npm run dev
```

## Next Steps

1. **Install dependencies**: `npm install`
2. **Run the app**: `npm run dev`
3. **Run tests**: `npx playwright install && npm run test:ui`
4. **Capture screenshots**: Review visual snapshots in test UI
5. **Share for feedback**: Send screenshots for design approval
6. **Iterate**: Make adjustments based on feedback
7. **Document**: Save approved designs to wireframes folder

## Key Features Implemented

✅ Lit web components with TypeScript  
✅ Mock events service with feature flag  
✅ Responsive event list (mobile/tablet/desktop)  
✅ Loading, error, and empty states  
✅ Accessible ARIA labels and keyboard navigation  
✅ Playwright E2E and visual regression tests  
✅ PWA manifest for installability  
✅ Design system tokens documented  
✅ Service worker foundation (via Vite PWA plugin)

## What's Next

- **Backlog**: Azure deployment pipeline (deferred)
- **Backlog**: Lighthouse CI automation (deferred)
- **Future**: Authentication and member-only features
- **Future**: Event details page
- **Future**: Dark mode support

## Documentation

- **User Story**: `docs/user-stories/001-view-public-events.md`
- **Design Tokens**: `docs/design-system/tokens.md`
- **API Documentation**: `docs/api-documentation/events-api.md`
- **Copilot Instructions**: `.github/copilot-instructions.md`

For backend API details, access the **"Coates Village Club" Copilot Space** (Jamie-D-Wright/Coates Village Club) via GitHub MCP.
