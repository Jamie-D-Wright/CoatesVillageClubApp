# Coates Village Club PWA

Progressive Web App for managing club activities, events, and member interactions at Coates Village Club.

## Technology Stack

- **Frontend Framework**: [Lit](https://lit.dev/) - Lightweight web components
- **UI Components**: [Web Awesome](https://webawesome.com/) - Modern component library
- **Testing**: [Playwright](https://playwright.dev/) - E2E, visual, and accessibility testing
- **Build Tool**: [Vite](https://vitejs.dev/) - Fast development and optimized builds
- **PWA**: Service Workers, Web App Manifest, offline capabilities

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/Jamie-D-Wright/CoatesVillageClubApp.git
cd CoatesVillageClubApp

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

The app will open at `http://localhost:3000`

### Development

```bash
# Start dev server with hot reload
npm run dev

# Run type checking
npm run type-check

# Run linting
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

### Testing

```bash
# Run all Playwright tests
npm test

# Run tests with UI mode
npm run test:ui

# Run tests in headed mode (see browser)
npm run test:headed

# Debug tests
npm run test:debug

# View test report
npm run test:report
```

## Project Structure

```
CoatesVillageClubApp/
├── docs/                    # Documentation
│   ├── user-stories/       # Feature specifications
│   ├── design-system/      # Design tokens and guidelines
│   ├── wireframes/         # UI mockups and approved designs
│   ├── api-documentation/  # API contracts
│   └── accessibility/      # WCAG compliance docs
├── src/                    # Source code
│   ├── components/         # Lit web components (organized by feature)
│   ├── services/           # API service layer
│   ├── styles/            # Global styles
│   ├── workers/           # Service workers
│   └── assets/            # Images, icons, fonts
├── tests/                 # Playwright tests
│   ├── e2e/              # End-to-end tests
│   ├── visual/           # Visual regression tests
│   └── accessibility/    # Accessibility tests
├── playwright-snapshots/  # Visual test baselines
└── public/               # Static assets
```

## Environment Variables

- `VITE_USE_REAL_API` - Set to `true` to use real API endpoints, `false` for mock data (default: `false`)
- `VITE_API_BASE_URL` - Base URL for API endpoints (used when `VITE_USE_REAL_API=true`)

## Contributing

1. Create a feature branch from `main`
2. Follow the design-first approach (document → design → implement)
3. Write Playwright tests before implementation
4. Ensure all tests pass and accessibility standards are met
5. Update documentation alongside code changes
6. Submit PR with test results and screenshots

## License

MIT
