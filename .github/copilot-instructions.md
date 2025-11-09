# Coates Village Club - Copilot Instructions

## Project Overview
The Coates Village Club is a Progressive Web App (PWA) for managing club activities, events, and member interactions. The application is a static site hosted on Azure Blob Storage with Azure Web App, consuming backend API endpoints.

## Backend API & Microservices
The backend API and microservices that this UI consumes are documented in the **"Coates Village Club"** Copilot Space (owner: Jamie-D-Wright). When working on API integration:
- **Access Documentation**: Use GitHub MCP to access the Copilot Space for endpoint specifications, request/response schemas, authentication requirements, and backend architecture details
- **Stay Synchronized**: Always check the Copilot Space for the latest endpoint documentation before implementing or updating service layer code
- **Contract-First**: Ensure UI implementation matches the API contracts defined in the backend microservices
- **Reference Source**: The Copilot Space contains the complete backend specification including:
  - Microservices architecture (.NET 8 Azure Functions)
  - API contracts (OpenAPI specifications)
  - Data models and entity relationships
  - Authentication patterns (JWT tokens)
  - User roles and permissions (Committee, Volunteer, Member)
  - Business rules and validation requirements

## Technology Stack

### Core Technologies
- **Frontend Framework**: [Lit](https://lit.dev/) - Lightweight web components library
- **UI Components**: [Web Awesome](https://webawesome.com/) - Modern component library
- **Testing & Visual Validation**: [Playwright](https://playwright.dev/) - Used extensively for testing, visual validation, and AI-assisted UI refinement
- **Hosting**: Azure Blob Storage with Azure Web App (Static Website)
- **PWA**: Service Workers, Web App Manifest, offline capabilities

### Dependency Philosophy
- **Minimal Dependencies**: Keep the dependency tree as lean as possible
- Only add new dependencies if they provide significant value and cannot be reasonably implemented with existing tools
- Prefer native browser APIs and web standards over third-party libraries
- Leverage Lit's built-in reactivity and Web Awesome's components before adding utilities

## Project Structure

```
CoatesVillageClubApp/
├── docs/                           # All design documentation
│   ├── user-stories/              # User stories and acceptance criteria
│   ├── wireframes/                # UI wireframes and mockups
│   ├── api-documentation/         # API endpoint specifications
│   ├── architecture/              # System architecture diagrams
│   ├── accessibility/             # WCAG compliance documentation
│   └── design-system/             # Design tokens, colors, typography
├── src/                           # Source code
│   ├── components/                # Lit web components
│   ├── services/                  # API service layer
│   ├── styles/                    # Global styles and themes
│   ├── utils/                     # Utility functions
│   ├── pages/                     # Page-level components
│   ├── workers/                   # Service workers
│   └── assets/                    # Images, icons, fonts
├── tests/                         # Playwright tests
│   ├── e2e/                       # End-to-end tests
│   ├── visual/                    # Visual regression tests
│   └── accessibility/             # Accessibility tests
├── playwright-snapshots/          # Visual test baseline snapshots
└── public/                        # Static assets and manifest
```

## Development Workflow

### Design-First Approach
1. **Document First**: Before implementing features, create user stories in `docs/user-stories/`
2. **Design Tokens**: Define design system components in `docs/design-system/`
3. **Wireframes**: Create visual mockups in `docs/wireframes/`
4. **API Contracts**: Reference the "Coates Village Club" Copilot Space via GitHub MCP for authoritative endpoint documentation; mirror relevant details in `docs/api-documentation/` for quick reference

### Implementation with Playwright
1. **Test-Driven Development**: Write Playwright tests before implementing features
2. **Visual Validation**: Use Playwright screenshots during development to validate UI
3. **AI Vision Refinement**: 
   - Take screenshots of components during development
   - Use AI vision capabilities to analyze and suggest improvements
   - Iterate on design based on visual feedback
4. **Continuous Testing**: Run Playwright tests throughout development phases

### Playwright Integration Strategy
- **Design Phase**: Use Playwright to render initial mockups and gather visual feedback
- **Development Phase**: Test components in isolation and as part of user flows
- **Refinement Phase**: Capture screenshots for AI analysis to improve aesthetics, accessibility, and usability
- **Production**: Maintain visual regression tests to prevent UI degradation

## Code Standards

### Lit Components
- Use TypeScript for all components
- Follow Lit's reactive properties and lifecycle methods
- Keep components small and focused (Single Responsibility Principle)
- Use CSS-in-JS with Lit's `css` template literal
- Implement shadow DOM for style encapsulation

Example component structure:
```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('club-member-card')
export class ClubMemberCard extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  @property({ type: String })
  name = '';

  render() {
    return html`<div>${this.name}</div>`;
  }
}
```

### Web Awesome Components
- Use Web Awesome components as building blocks
- Customize through CSS custom properties
- Maintain consistent theming across all components
- Reference Web Awesome documentation (https://webawesome.com/docs/) for component APIs

### API Integration
- Create service classes for API endpoints
- Implement proper error handling and retry logic
- Use native `fetch` API (avoid axios/other HTTP libraries)
- Cache responses appropriately for offline support
- Handle loading states and error states consistently

Example service:
```typescript
export class MemberService {
  private baseUrl = '/api/members';

  async getMembers(): Promise<Member[]> {
    const response = await fetch(this.baseUrl);
    if (!response.ok) throw new Error('Failed to fetch members');
    return response.json();
  }
}
```

### PWA Requirements
- **Offline Support**: Implement service worker with appropriate caching strategies
- **Manifest**: Maintain `manifest.json` with app metadata, icons, and theme colors
- **Installability**: Ensure app meets PWA installability criteria
- **Responsive**: Mobile-first design, works on all screen sizes
- **Performance**: Lighthouse score > 90 across all categories

## Documentation Standards

### User Stories Format (docs/user-stories/)
```markdown
# [Feature Name]

## User Story
As a [user type], I want to [action], so that [benefit].

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## API Requirements
- Endpoint: `GET /api/resource`
- Response: `{ ... }`

## UI/UX Requirements
- Component hierarchy
- Interactions
- States (loading, error, empty, success)

## Accessibility Requirements
- ARIA labels
- Keyboard navigation
- Screen reader compatibility

## Playwright Test Scenarios
- [ ] Test scenario 1
- [ ] Test scenario 2
```

### Design System Documentation (docs/design-system/)
- **Colors**: Primary, secondary, semantic colors (success, warning, error)
- **Typography**: Font families, sizes, weights, line heights
- **Spacing**: Spacing scale (4px, 8px, 16px, 24px, 32px, etc.)
- **Components**: Document reusable component patterns
- **Breakpoints**: Mobile, tablet, desktop breakpoints

## Testing Strategy

### Playwright Test Types

#### 1. Component Tests
- Test individual Lit components in isolation
- Verify component properties and events
- Check responsive behavior

#### 2. Visual Regression Tests
- Capture baseline screenshots of components
- Compare against baselines on each run
- Flag visual changes for review

#### 3. E2E Tests
- Test complete user flows
- Verify API integration
- Test offline behavior
- Check PWA installation

#### 4. Accessibility Tests
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader compatibility
- Color contrast ratios

### AI Vision Integration with Playwright
```typescript
// Example: Capture component for AI analysis
test('capture member card for AI review', async ({ page }) => {
  await page.goto('/components/member-card');
  await page.screenshot({ 
    path: 'ai-review/member-card.png',
    fullPage: true 
  });
});
```

During development:
1. Run tests to capture screenshots
2. Review screenshots with AI vision capabilities
3. Get suggestions for improvements (layout, spacing, accessibility, visual hierarchy)
4. Iterate based on feedback
5. Update baselines when design is approved

## Accessibility Guidelines
- Use semantic HTML elements
- Provide ARIA labels for interactive elements
- Ensure keyboard navigation for all functionality
- Maintain color contrast ratios (WCAG AA: 4.5:1 for text)
- Test with screen readers (NVDA, JAWS, VoiceOver)
- Support reduced motion preferences
- Implement focus management for SPA navigation

## Performance Best Practices
- Lazy load components and routes
- Optimize images (WebP format, responsive images)
- Minimize JavaScript bundle size
- Use code splitting for larger features
- Implement efficient caching strategies
- Avoid layout shifts (CLS)
- Optimize for Core Web Vitals

## Azure Deployment
- **Static Website**: Enable static website hosting on Azure Blob Storage
- **CDN**: Consider Azure CDN for global performance
- **Build Process**: Generate production build optimized for static hosting
- **Environment Variables**: Use build-time environment variables for API endpoints
- **HTTPS**: Ensure HTTPS is enabled (automatic with Azure Web App)

## Git Workflow
- Feature branches from `main`
- Meaningful commit messages
- PR reviews include Playwright test results and screenshots
- Update documentation with code changes
- Keep documentation in sync with implementation

## AI Assistance Guidelines
When working with AI (Copilot, ChatGPT, etc.):
- Provide Playwright screenshots for visual feedback
- Ask for accessibility improvements
- Request design system consistency checks
- Get suggestions for component composition
- Validate responsive design across viewports
- Review generated code for dependency bloat
- Ensure suggestions align with Lit and Web Awesome patterns

## Key Principles
1. **Documentation-Driven Development**: Document before you code
2. **Visual Validation**: Use Playwright extensively to "see" what you're building
3. **Minimal Dependencies**: Question every new dependency
4. **Progressive Enhancement**: Build for the web platform
5. **Accessibility First**: Design for all users from the start
6. **Performance Matters**: Fast and efficient by default
7. **Test Early, Test Often**: Playwright tests guide development

## Getting Started Checklist
- [ ] Access the "Coates Village Club" Copilot Space (Jamie-D-Wright/Coates Village Club) via GitHub MCP for backend API documentation
- [ ] Review existing API documentation and architecture in the Copilot Space
- [ ] Create initial user stories for MVP features
- [ ] Define design system tokens
- [ ] Set up Playwright test infrastructure
- [ ] Create first component with tests
- [ ] Implement service worker for offline support
- [ ] Set up PWA manifest
- [ ] Configure Azure deployment pipeline
- [ ] Establish visual regression baseline
- [ ] Document component library

---

**Remember**: The goal is to create a fast, accessible, and maintainable PWA that serves the Coates Village Club community effectively. Use Playwright and AI vision capabilities as your design partner throughout the entire development lifecycle.