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
- **UI Components**: [Web Awesome Pro](https://webawesome.com/) - Modern component library (loaded via CDN)
- **Testing & Visual Validation**: [Playwright](https://playwright.dev/) - Used extensively for testing, visual validation, and AI-assisted UI refinement
- **Hosting**: Azure Blob Storage with Azure Web App (Static Website)
- **PWA**: Service Workers, Web App Manifest, offline capabilities

### Web Awesome Pro CDN
The project uses Web Awesome Pro via CDN instead of NPM package for:
- Access to all Pro components and icons
- Smaller bundle size (components loaded on-demand)
- Automatic updates to latest Pro features
- CDN Kit ID: `60d71a227629472d` (included in `index.html`)

**Component Documentation**: https://webawesome.com/docs/components/
- Always check component documentation before implementing UI elements
- Use Web Awesome components as the primary building blocks
- Minimize custom CSS and HTML - leverage built-in component features
- Components include: buttons, cards, inputs, dialogs, dropdowns, badges, alerts, and more

#### CDN Implementation Requirements
**CRITICAL**: Web Awesome Pro CDN components must be explicitly imported when used inside Lit shadow DOM:

1. **Import Components in `src/main.ts`**: 
   - The CDN kit script loads configuration but does NOT auto-register components used in shadow DOM
   - Must explicitly import each component type used in the application
   - Example:
   ```typescript
   // Import Web Awesome components we use
   import 'https://ka-p.webawesome.com/kit/60d71a227629472d/webawesome@3.0.0/components/icon/icon.js';
   import 'https://ka-p.webawesome.com/kit/60d71a227629472d/webawesome@3.0.0/components/button/button.js';
   import 'https://ka-p.webawesome.com/kit/60d71a227629472d/webawesome@3.0.0/components/card/card.js';
   import { setDefaultIconFamily } from 'https://ka-p.webawesome.com/kit/60d71a227629472d/webawesome@3.0.0/webawesome.js';
   setDefaultIconFamily('classic');
   ```

2. **Icon Usage**:
   - Do NOT use `family="regular"` attribute on `<wa-icon>` elements
   - The CDN sets default icon family to 'classic' automatically
   - Icons should be: `<wa-icon name="calendar"></wa-icon>`
   - NOT: `<wa-icon family="regular" name="calendar"></wa-icon>`

3. **Component Registration Issues**:
   - If components don't render (show as empty/missing), check that they're imported in `main.ts`
   - Use browser console: `customElements.get('wa-icon')` should return component constructor
   - If returns `undefined`, the component wasn't imported correctly

### Dependency Philosophy
- **Minimal Dependencies**: Keep the dependency tree as lean as possible
- Only add new dependencies if they provide significant value and cannot be reasonably implemented with existing tools
- Prefer native browser APIs and web standards over third-party libraries
- Leverage Lit's built-in reactivity and Web Awesome's components before adding utilities

### Development Best Practices
- **Resolve Warnings Immediately**: Address all TypeScript, linting, and build warnings as they occur - do not allow technical debt to accumulate
- **Zero Warning Policy**: Every commit should resolve all warnings in the codebase
- **Continuous Quality**: Fix issues during development, not after

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

### Visual Design Review with Browser MCP Server
Use the browser MCP server to capture, analyze, and iteratively improve UI designs:

#### 1. Capture Current Design
```typescript
// Navigate to the page/component
await page.goto('http://localhost:3002/component-path');

// Wait for content to load
await page.waitForSelector('component-selector');

// Capture full page screenshot for analysis
await page.screenshot({ 
  path: 'design-review/current-design.png',
  fullPage: true 
});
```

#### 2. Visual Analysis Process
- **Review Screenshots**: Examine captured designs for visual hierarchy, spacing, colors, and consistency
- **Identify Issues**: Look for:
  - Elements that dominate unnecessarily (oversized badges, heavy borders)
  - Inconsistent spacing and alignment
  - Poor color contrast or excessive use of accent colors
  - Typography hierarchy problems (sizes, weights, line-heights)
  - Hover states and interactions that need refinement
  - Components that don't match the design system

#### 3. Document Improvements
Create a list of specific improvements with rationale:
```markdown
## Design Analysis

### Issues Found:
1. Date badges too large - dominate the card visual hierarchy
2. Timeline line too thick - draws attention away from content
3. Cards lack subtle shadows - appear flat
4. Hover effects basic - need more polish
5. Typography weights inconsistent - some text too bold/light

### Proposed Solutions:
1. Reduce date badge size, use outline style instead of solid fill
2. Make timeline line thinner (2px) with gradient and opacity
3. Add subtle shadows and elegant borders to cards
4. Enhance hover with scale, movement, and shadow transitions
5. Refine font sizes and weights for better hierarchy
```

#### 4. Implement Improvements
Apply changes systematically:
- Use `multi_replace_string_in_file` for efficiency when making multiple related changes
- Focus on one area at a time (e.g., all timeline improvements, then all card improvements)
- Keep changes consistent with the design system (check `docs/design-system/tokens.md`)

#### 5. Capture and Compare
```typescript
// Reload the page to see changes
await page.reload();

// Capture improved design
await page.screenshot({ 
  path: 'design-review/improved-design.png',
  fullPage: true 
});
```

#### 6. Iterate as Needed
- Compare before/after screenshots
- Identify remaining issues or new problems introduced
- Continue refining until design meets quality standards
- Test across different viewport sizes (mobile, tablet, desktop)

#### 7. Best Practices
- **Start the dev server first**: Ensure `npm run dev` is running before using browser MCP
- **Wait for content**: Use `page.waitForSelector()` to ensure dynamic content has loaded
- **Test interactions**: Capture hover states, active states, and transitions
- **Mobile-first**: Test responsive behavior at multiple breakpoints
- **Accessibility**: Check color contrast, focus states, and keyboard navigation
- **Consistency**: Compare similar components to ensure unified styling

#### Example: Complete Review Workflow
```typescript
// 1. Navigate and capture original
await page.goto('http://localhost:3002/events');
await page.waitForSelector('club-event-timeline');
await page.screenshot({ path: 'review/timeline-before.png', fullPage: true });

// 2. Analyze and identify improvements needed:
// - Timeline dots too large
// - Card borders too heavy
// - Date badges too prominent

// 3. Implement changes in code (CSS refinements)

// 4. Reload and capture improved version
await page.reload();
await page.waitForTimeout(500); // Allow animations to settle
await page.screenshot({ path: 'review/timeline-after.png', fullPage: true });

// 5. Test interactions
await page.hover('.event-card'); // Capture hover state if needed
await page.screenshot({ path: 'review/timeline-hover.png' });

// 6. Test responsive
await page.setViewportSize({ width: 375, height: 812 });
await page.screenshot({ path: 'review/timeline-mobile.png', fullPage: true });
```

#### When to Use Browser MCP Review
- After implementing new components or pages
- When visual design feels "off" but specific issues aren't clear
- Before committing major UI changes
- When refining existing designs for better polish
- To compare design variants (grid vs. timeline, different color schemes)
- To validate responsive behavior across breakpoints
- When gathering screenshots for documentation or design reviews

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
      background: white; /* Clean white background - avoid neutral-50 gray */
    }
  `;

  @property({ type: String })
  name = '';

  render() {
    return html`
      <wa-card>
        <div>${this.name}</div>
      </wa-card>
    `;
  }
}
```

**Styling Best Practices**:
- Always set `background: white` on `:host` for page components to prevent gray backgrounds
- Use Web Awesome CSS custom properties for colors: `var(--wa-color-primary-600)`, `var(--wa-color-neutral-900)`, etc.
- Icons should NOT have `family` attribute - let CDN defaults handle it
- Leverage Web Awesome component variants (`variant="primary"`, `size="large"`) instead of custom CSS

### Web Awesome Components
**Primary UI Library** - Use Web Awesome components for ALL UI elements wherever possible:
- **Component Documentation**: https://webawesome.com/docs/components/
- **Icons Library**: https://webawesome.com/icons
- Use Web Awesome components as the default choice before writing custom HTML/CSS
- Minimize custom CSS - leverage component variants, sizes, and built-in styling options
- Customize through CSS custom properties (CSS variables) only when necessary
- Maintain consistent theming across all components using design tokens
- Common components to use:
  - `<wa-button>` for all buttons (https://webawesome.com/docs/components/button/)
  - `<wa-card>` for content containers (https://webawesome.com/docs/components/card/)
  - `<wa-input>`, `<wa-select>`, `<wa-checkbox>`, `<wa-radio>` for forms (https://webawesome.com/docs/components/input/)
  - `<wa-dialog>` for modals (https://webawesome.com/docs/components/dialog/)
  - `<wa-alert>` for notifications (https://webawesome.com/docs/components/alert/)
  - `<wa-badge>` for status indicators (https://webawesome.com/docs/components/badge/)
  - `<wa-spinner>` for loading states (https://webawesome.com/docs/components/spinner/)
  - `<wa-icon>` for all icons (https://webawesome.com/docs/components/icon/)
  - `<wa-dropdown>` for menus (https://webawesome.com/docs/components/dropdown/)
  - `<wa-tab-group>` and `<wa-tab>` for tabbed interfaces (https://webawesome.com/docs/components/tab-group/)

**Philosophy**: Web Awesome provides comprehensive, accessible, and well-tested components. Using them reduces code, improves consistency, and ensures accessibility compliance. Only write custom HTML/CSS when Web Awesome doesn't provide the required functionality.

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
  - **Brand Color Scheme**: Defined in `docs/design-system/tokens.md`
  - All pages and components MUST use the unified brand color scheme
  - Always check documentation before implementing colors
- **Typography**: Font families, sizes, weights, line heights
- **Spacing**: Spacing scale (4px, 8px, 16px, 24px, 32px, etc.)
- **Components**: Document reusable component patterns
- **Breakpoints**: Mobile, tablet, desktop breakpoints

### Color Consistency Workflow
When updating colors or adding new pages/components:
1. **Check Design Tokens First**: Review `docs/design-system/tokens.md` for the current brand color scheme
2. **Use Brand Colors**: Apply the documented gradients and accent colors consistently
3. **Update Multiple Files**: If changing the color scheme, update ALL of these files:
   - `src/styles/global.css` - Global CSS variables
   - `docs/design-system/tokens.md` - Design token documentation
   - All page components (`src/pages/*.ts`) - Hero gradients and backgrounds
   - All UI components (`src/components/**/*.ts`) - Accent colors, borders, icons
4. **Verify Consistency**: Check that all pages use the same color palette
5. **Update Visual Baselines**: Run `npx playwright test --update-snapshots` to update visual regression tests
6. **Document Changes**: Update design documentation with rationale for color choices

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
- Use browser MCP server to capture designs and iterate based on visual analysis
- Request specific improvements based on captured screenshots (spacing, colors, typography, shadows)
- Compare before/after screenshots to validate improvements

## Key Principles
1. **Documentation-Driven Development**: Document before you code
2. **Visual Validation**: Use Playwright and browser MCP extensively to "see" what you're building
3. **Minimal Dependencies**: Question every new dependency
4. **Progressive Enhancement**: Build for the web platform
5. **Accessibility First**: Design for all users from the start
6. **Performance Matters**: Fast and efficient by default
7. **Test Early, Test Often**: Playwright tests guide development
8. **Zero Warnings**: Resolve all warnings immediately as they occur
9. **Web Awesome First**: Use Web Awesome components before writing custom HTML/CSS
10. **Design Consistency**: Maintain unified color scheme across all pages - always check and update design documentation
11. **Iterative Refinement**: Capture designs with browser MCP, analyze visually, implement improvements, and compare results

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

**Remember**: The goal is to create a fast, accessible, and maintainable PWA that serves the Coates Village Club community effectively. Use Playwright and browser MCP server as your design partners throughout the entire development lifecycle - capture, analyze, improve, and validate designs iteratively for professional results.