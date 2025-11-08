<!--
  Sync Impact Report
  ------------------
  Version: 0.0.0 → 1.0.0 (Initial constitution establishment)
  Date: 2025-11-08
  
  Changes:
  - Initial constitution created for Coates Village Club App
  - Established 5 core principles for front-end UI development
    I. Minimal Dependencies (NON-NEGOTIABLE)
    II. Visual-First Development with Playwright
    III. Mobile-First PWA Architecture
    IV. Stateless Frontend with JWT Authentication
    V. Visual Testing Coverage (NON-NEGOTIABLE)
  - Defined technology stack constraints (Lit, Web Awesome, Playwright, JWT, Azure)
  - Set development workflow standards with quality gates
  
  Templates requiring updates:
  ✅ .specify/templates/plan-template.md - Constitution Check section compatible
  ✅ .specify/templates/spec-template.md - User story structure aligns with principles
  ✅ .specify/templates/tasks-template.md - Updated to require Playwright tests (mandatory)
  
  Follow-up TODOs: None
-->

# Coates Village Club App Constitution

## Core Principles

### I. Minimal Dependencies (NON-NEGOTIABLE)

The application MUST minimize external dependencies to reduce complexity, security surface, and maintenance burden:

- **Web Components with Lit**: Use Lit as the sole component framework
- **Web Awesome via CDN**: Use Web Awesome (https://webawesome.com/docs/) via CDN links, NOT npm packages
- **No Build Complexity**: Avoid introducing build tools, bundlers, or transpilers unless absolutely necessary for the deployment target
- **Justify New Dependencies**: Any new dependency MUST be explicitly justified in the feature spec with rationale for why native web platform capabilities or existing dependencies cannot solve the problem

**Rationale**: Front-end dependencies have high churn rates and security implications. CDN-delivered libraries reduce build complexity and leverage browser caching. Static hosting on Azure Blob Storage requires minimal tooling overhead.

### II. Visual-First Development with Playwright

All features MUST be developed and refined through visual validation using Playwright:

- **Design Phase**: Use Playwright to prototype and validate component appearance and behavior before finalizing specs
- **Development Phase**: Run Playwright continuously during implementation to see changes in real-time
- **Testing Phase**: All user acceptance scenarios MUST include Playwright visual regression and interaction tests
- **Refinement**: Use Playwright screenshots and recordings to iterate on UX with stakeholders

**Rationale**: "Seeing is believing" - visual validation catches UI/UX issues earlier than unit tests alone. Playwright provides a single tool for prototyping, development feedback, and automated testing across the entire lifecycle.

### III. Mobile-First PWA Architecture

The application MUST be designed mobile-first and function as a Progressive Web App:

- **Responsive Design**: All layouts MUST work on mobile viewports (320px+) before desktop optimization
- **PWA Manifest**: Include valid web app manifest with icons, theme colors, and display mode
- **Service Worker**: Implement service worker for offline capability and app-like experience
- **Installability**: App MUST be installable on iOS, Android, and desktop browsers
- **Touch-First**: All interactions MUST be touch-friendly (44px+ touch targets)

**Rationale**: Mobile devices are the primary access method for modern web apps. PWA capability provides native-like experience without app store distribution. Azure Blob Storage hosting supports static PWA requirements perfectly.

### IV. Stateless Frontend with JWT Authentication

The frontend MUST remain stateless with authentication handled via JWT tokens:

- **No Session Storage**: JWT tokens stored securely in memory or httpOnly cookies only
- **Token-Based Auth**: All authenticated requests MUST include JWT in Authorization header
- **Backend Decoupling**: Authentication logic lives in separate backend repository; frontend only validates token presence and expiration
- **Secure Transmission**: All auth-related communication MUST use HTTPS
- **Token Refresh**: Implement silent token refresh flow to maintain user sessions

**Rationale**: Stateless architecture enables horizontal scaling and simplifies deployment to static hosting. JWT standard provides secure, self-contained authentication that works across distributed systems.

### V. Visual Testing Coverage (NON-NEGOTIABLE)

Every user-facing feature MUST include Playwright visual and interaction tests:

- **Test Coverage**: Minimum one Playwright test per user story acceptance scenario
- **Visual Regression**: Capture screenshots for critical UI states
- **Interaction Testing**: Validate all user interactions (clicks, forms, navigation)
- **Cross-Browser**: Test on Chromium, Firefox, and WebKit (iOS Safari)
- **Accessibility**: Include basic a11y assertions (ARIA roles, keyboard navigation)

**Rationale**: Visual testing provides confidence that the UI works as designed across browsers and devices. Playwright's cross-browser support catches platform-specific issues early.

## Technology Stack Constraints

**Mandated Technologies**:
- **Framework**: Lit web components only
- **Component Library**: Web Awesome (CDN links, not npm)
- **Testing**: Playwright for all visual/interaction testing
- **Authentication**: JWT tokens (backend-managed)
- **Hosting**: Azure Blob Storage (static site)

**Forbidden**:
- React, Vue, Angular, or other heavyweight frameworks
- npm packages for Web Awesome (use CDN links)
- Server-side rendering in this repository (handled separately)
- Heavy build toolchains (webpack, rollup, vite) unless deployment requires
- Session-based authentication

**Allowed When Justified**:
- Build tools for production optimization (minification, bundling) if Azure hosting benefits
- Additional testing utilities that integrate with Playwright
- Accessibility testing libraries
- Development utilities (linters, formatters, type checkers)

## Development Workflow

**Feature Development Process**:
1. **Specify** with mobile-first user stories and visual acceptance criteria
2. **Design** using Playwright to prototype component appearance
3. **Implement** with Playwright running to provide immediate visual feedback
4. **Test** with comprehensive Playwright test suite covering all acceptance scenarios
5. **Refine** based on Playwright visual regression and stakeholder review
6. **Deploy** to Azure Blob Storage as static assets

**Quality Gates**:
- ✅ All Playwright tests passing across Chromium, Firefox, WebKit
- ✅ Mobile viewport validation (320px, 375px, 768px)
- ✅ PWA manifest and service worker functional
- ✅ JWT authentication flow working end-to-end
- ✅ No unnecessary dependencies introduced
- ✅ Visual regression screenshots reviewed and approved

**Branching Strategy**:
- Follow SpecKit feature branch pattern: `###-feature-name`
- Each feature MUST have independent PWA and mobile validation
- Merge to main requires all quality gates passing

## Governance

This constitution supersedes all other development practices and conventions. Any deviation from these principles MUST be:

1. **Explicitly documented** in the feature spec with detailed rationale
2. **Approved** through the clarification process before planning
3. **Justified** with evidence that constitutional approach is technically infeasible or creates unacceptable tradeoffs
4. **Reviewed** in the analyze phase to ensure constitution alignment

All features, specs, plans, and tasks MUST demonstrate compliance with these principles. The constitution check in `plan.md` is MANDATORY before Phase 0 research begins and MUST be re-verified after Phase 1 design.

**Amendment Process**: Constitution changes require semantic versioning increment (MAJOR for breaking changes, MINOR for new principles, PATCH for clarifications) and explicit ratification date.

**Version**: 1.0.0 | **Ratified**: 2025-11-08 | **Last Amended**: 2025-11-08
