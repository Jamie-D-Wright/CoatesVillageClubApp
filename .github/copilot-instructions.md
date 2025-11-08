# Coates Village Club App - AI Agent Instructions

## Project Overview

This is a **front-end UI repository** for the Coates Village Club App, using the **SpecKit workflow system** for feature-driven development. The project uses a template-based approach for specifications, planning, task generation, and implementation through custom VS Code slash commands.

**Technology Stack** (per Constitution):
- **Framework**: Lit web components only
- **UI Library**: Web Awesome via CDN links (https://webawesome.com/docs/) - NO npm packages
- **Testing**: Playwright (MANDATORY for all features)
- **Authentication**: JWT tokens (stateless, backend-managed)
- **Hosting**: Azure Blob Storage (static site)
- **Architecture**: Mobile-first PWA

**Critical Constraints**:
- ⚠️ Minimal dependencies - justify any new dependencies in spec
- ⚠️ Playwright testing is MANDATORY (not optional) - every user story requires tests
- ⚠️ Mobile-first responsive design - all layouts must work 320px+
- ⚠️ PWA requirements - manifest, service worker, installability
- ⚠️ Backend is separate repo - this is frontend only

## Architecture & Workflow

### Core Workflow Commands

All commands are triggered via `.github/prompts/speckit.*.prompt.md` files and follow a strict sequential order:

1. **`/speckit.constitution`** - Define or update project principles (`.specify/memory/constitution.md`)
2. **`/speckit.specify`** - Create feature specification from natural language
3. **`/speckit.clarify`** - Interactive Q&A to resolve spec ambiguities (run BEFORE planning)
4. **`/speckit.plan`** - Generate implementation plan with tech stack and architecture
5. **`/speckit.tasks`** - Convert plan into dependency-ordered, checklist-formatted tasks
6. **`/speckit.checklist`** - Generate custom quality/requirements validation checklists
7. **`/speckit.analyze`** - Cross-artifact consistency analysis (read-only, post-tasks)
8. **`/speckit.implement`** - Execute tasks with gate enforcement and progress tracking

### Directory Structure Convention

```
specs/
  ###-feature-name/          # Feature number + short-name (e.g., 001-user-auth)
    spec.md                  # User stories with priorities (P1, P2, P3)
    plan.md                  # Tech stack, architecture, structure decisions
    research.md              # Phase 0: Technical research and decisions
    data-model.md            # Phase 1: Entities, relationships, validation
    quickstart.md            # Phase 1: Integration scenarios
    contracts/               # Phase 1: API specs (OpenAPI/GraphQL)
    tasks.md                 # Generated task list with strict format
    checklists/              # Custom quality validation checklists
      *.md                   # e.g., ux.md, security.md, test.md
.specify/
  memory/
    constitution.md          # Project principles template (AUTHORITY document)
  templates/                 # Markdown templates for all artifacts
  scripts/
    powershell/              # PowerShell automation scripts
      create-new-feature.ps1 # Branch creation with auto-numbering
      check-prerequisites.ps1 # Context discovery for commands
      setup-plan.ps1         # Plan workflow initialization
      update-agent-context.ps1 # Agent-specific context updater
      common.ps1             # Shared utilities
```

## Critical Implementation Rules

### Feature Branching

- **Branch naming**: `###-short-name` (e.g., `005-user-auth`)
- **Auto-numbering**: Scripts check remote/local branches AND `specs/` directories for highest number
- **Creation**: Always run `create-new-feature.ps1 -Json -ShortName "..." -Number N "description"`
- **Short name rules**: 2-4 words, action-noun format, preserve technical terms (OAuth2, JWT, etc.)

### Task Format (MANDATORY)

Every task in `tasks.md` MUST follow this exact format:

```markdown
- [ ] T001 [P] [US1] Description with file path
```

**Format components**:
- `- [ ]` - Markdown checkbox (REQUIRED)
- `T###` - Sequential task ID (REQUIRED)
- `[P]` - Parallelizable marker (OPTIONAL, only if no dependencies)
- `[US#]` - User story label (REQUIRED for user story phases, NOT for Setup/Foundation/Polish)
- Description with absolute file path (REQUIRED)

**Task organization**: Tasks are grouped by user story (P1, P2, P3) to enable independent implementation and testing.

### Checklist Philosophy

**Checklists are "unit tests for requirements"** - they validate spec quality, NOT implementation correctness:

- ✅ "Are visual hierarchy requirements defined for all card types?" (completeness)
- ✅ "Is 'prominent display' quantified with sizing/positioning?" (clarity)
- ❌ NOT "Verify the button clicks correctly" (that's testing)
- ❌ NOT "Confirm API returns 200" (that's validation)

Checklists test whether the **requirements are well-written**, not whether code works.

### Constitution Authority

`.specify/memory/constitution.md` is **non-negotiable** within analysis scope. Constitution conflicts are automatically CRITICAL. The constitution:
- Contains project principles in template format with `[PLACEHOLDER_TOKENS]`
- Uses semantic versioning (MAJOR.MINOR.PATCH)
- Requires explicit amendments with ratification dates
- Supersedes all other practices

### Gate Enforcement

1. **Constitution Check** (plan.md) - Must pass before Phase 0 research, re-check after Phase 1 design
2. **Checklist Status** (implement) - All checklists must show `0 incomplete items` or user must explicitly approve bypass
3. **Prerequisites** - Commands abort if required files missing (spec before plan, plan before tasks, etc.)

## PowerShell Script Usage

All scripts support `-Json` flag for structured output parsing:

```powershell
# Feature creation
.specify/scripts/powershell/create-new-feature.ps1 -Json -ShortName "user-auth" -Number 1 "Add authentication"

# Context discovery
.specify/scripts/powershell/check-prerequisites.ps1 -Json -RequireTasks -IncludeTasks

# Plan setup
.specify/scripts/powershell/setup-plan.ps1 -Json

# Agent context update (detects active AI agent)
.specify/scripts/powershell/update-agent-context.ps1 -AgentType copilot
```

**Escape handling**: For single quotes like "I'm", use `'I'\''m'` or wrap in double quotes: `"I'm"`

## User Story Independence

Specs prioritize user stories (P1, P2, P3...) where each story:
- Represents an **independently testable MVP slice**
- Can be implemented, tested, and deployed standalone
- Delivers value even if implemented alone
- Maps directly to task phases in `tasks.md`

**Independent Test criterion**: Each story must define how it can be tested without other stories being complete.

## Clarification Limits

- **Spec generation**: Maximum 3 `[NEEDS CLARIFICATION]` markers (prioritize by impact: scope > security > UX > technical)
- **Clarify command**: Up to 5 targeted questions maximum (Q1-Q5)
- **Checklist generation**: Up to 3 initial contextual questions, may escalate to 2 more (max 5 total)

## Ignore File Strategy

`/speckit.implement` detects project type and creates/verifies ignore files:
- Checks git presence → `.gitignore`
- Detects Dockerfile → `.dockerignore`
- Detects package.json/node_modules → `.eslintignore`, `.prettierignore`
- Detects `*.tf` → `.terraformignore`

**Pattern sources**: Derives from `plan.md` tech stack (Node.js, Python, Java, .NET, Go, Ruby, PHP, Rust, Kotlin, C++, C, Swift, R)

## Multi-Turn Command Flows

Some commands use dynamic multi-turn conversations:
- `/speckit.clarify` - Up to 5 Q&A rounds to resolve ambiguities
- `/speckit.checklist` - 3-5 questions to understand checklist scope/depth/audience
- `/speckit.constitution` - Interactive principle collection or batch update

## Analysis & Reporting

`/speckit.analyze` performs **read-only** cross-artifact consistency checks:
- Compares spec.md, plan.md, tasks.md for conflicts
- Detects duplications, ambiguities, underspecified items
- Constitution violations are CRITICAL (no silent ignoring)
- Outputs structured report, offers optional remediation plan (requires user approval)

## Project Type Detection

Plan generation detects project type from feature description keywords:
- **Single project** (default): `src/`, `tests/`, `lib/`
- **Web application**: "frontend" + "backend" detected → `backend/`, `frontend/`
- **Mobile + API**: "iOS/Android" detected → `api/`, `ios/` or `android/`

## Version Control Integration

- All paths must be absolute
- Branch detection checks: `git ls-remote`, `git branch`, `specs/` directories
- `git fetch --all --prune` before branch number calculation
- Constitution uses `RATIFICATION_DATE` (original) and `LAST_AMENDED_DATE` (today if changed)

## Command Prerequisites

Each command validates prerequisites via `check-prerequisites.ps1`:
- `/speckit.plan` requires `spec.md`
- `/speckit.tasks` requires `plan.md`
- `/speckit.implement` requires `tasks.md` (use `-RequireTasks`)
- `-IncludeTasks` flag adds task list to output
- `-PathsOnly` returns minimal context (FEATURE_DIR, FEATURE_SPEC)

## Testing Strategy

- **Playwright Tests are MANDATORY**: Every user story MUST include Playwright visual and interaction tests (Constitution Principle V)
- Test types: Playwright visual regression, interaction tests, accessibility checks
- Test location: `tests/playwright/[feature].spec.ts`
- Coverage requirements:
  - Minimum one Playwright test per user story acceptance scenario
  - Visual regression screenshots for critical UI states
  - Interaction validation for all user actions (clicks, forms, navigation)
  - Cross-browser testing (Chromium, Firefox, WebKit/Safari)
  - Basic accessibility assertions (ARIA roles, keyboard navigation)
- Phase structure: Setup → Foundation → User Stories (each with Playwright tests) → Polish

## Implementation Phases

1. **Phase 0**: Research & decision documentation (`research.md`)
2. **Phase 1**: Data models, contracts, quickstart (`data-model.md`, `contracts/`, `quickstart.md`)
3. **Phase 2+**: One phase per user story (in priority order)
4. **Final Phase**: Polish & cross-cutting concerns

After Phase 1, run `update-agent-context.ps1` to keep agent context files in sync with new technologies.
