# Navigation Structure

## Overview
The Coates Village Club PWA uses a mobile-first, responsive navigation system with role-based menu items. Navigation adapts between mobile (hamburger menu with drawer) and desktop (horizontal navigation bar) layouts.

## Layout Components

### App Header (`<club-app-header>`)
- **Position**: Sticky header at top of viewport
- **Components**:
  - Logo/Home link
  - Navigation menu (desktop) / Hamburger button (mobile)
  - Offline indicator (when offline)
  - Login/Logout button
  
### Breakpoints
- **Mobile**: < 768px - Hamburger menu with slide-out drawer
- **Desktop**: ≥ 768px - Horizontal navigation bar

## Menu Structure

### Public (Unauthenticated)
- **Events** (accessible to all)
- Login button

### Member (Authenticated, Basic Role)
- **Events** - View upcoming club events
- **Profile** (future) - View/edit own profile
- Logout button

### Volunteer (Authenticated, Elevated Role)
All Member features plus:

**Volunteer Section:**
- **My Shifts** - View and sign up for volunteer shifts
- **Stock Alerts** - Raise and view bar stock alerts
- **Expenses** - Submit and track expense claims

### Committee (Authenticated, Admin Role)
All Volunteer features plus:

**Admin Section:**
- **Manage Events** - Create, edit, delete, and publish events
- **Users** - Manage club members and permissions

## Menu Groups

Navigation is organized into labeled groups for clarity:

1. **Main** (no label)
   - Events

2. **Volunteer** (label: "Volunteer")
   - My Shifts (Volunteer+ only)
   - Stock Alerts (Volunteer+ only)
   - Expenses (Volunteer+ only)

3. **Admin** (label: "Admin")
   - Manage Events (Committee only)
   - Users (Committee only)

## Visual Indicators

### Offline Indicator
- **Location**: Right side of header, before Login/Logout button
- **Display**: Icon (wifi-slash) + "Offline" text
- **Show When**: `navigator.onLine === false`
- **Additional Info**: Shows pending queue count if requests are queued
- **Example**: "Offline (3 pending)"
- **Accessibility**: `role="status"` with `aria-live="polite"`

### Active Page
- **Desktop**: Highlighted navigation link with increased opacity background
- **Mobile**: Highlighted drawer item with colored background
- **Attribute**: `aria-current="page"` for accessibility

### Role Badges
- **Committee-only pages**: Display "Admin Only" badge in page header
- **Badge variant**: `danger` (red) to indicate restricted access

## Mobile Navigation (< 768px)

### Hamburger Menu
- **Icon**: Three horizontal bars (`bars`)
- **Location**: Left side of header
- **Action**: Opens slide-out drawer from left

### Drawer
- **Width**: 280px
- **Slide Direction**: From left
- **Close Methods**:
  - Click outside drawer (backdrop)
  - Press Escape key
  - Navigate to a page
  
### Drawer Contents (Top to Bottom)
1. **Header**
   - "Coates Village Club" title
   - Primary brand color background

2. **Navigation Groups**
   - Section labels (uppercase, small text)
   - Navigation links with icons
   - Visual dividers between groups

3. **User Info** (if authenticated)
   - User email
   - Role badge (Member/Volunteer/Committee)
   - Background: light neutral color

## Desktop Navigation (≥ 768px)

### Horizontal Navigation Bar
- **Layout**: Logo (left) → Navigation (center) → Actions (right)
- **Navigation Items**:
  - Grouped with section labels
  - Icons + text labels
  - Hover state: light background
  - Active state: highlighted background

### Menu Item Layout
- Icon (left)
- Label (right)
- Padding: Comfortable click targets
- Color: White text on primary blue background

## Keyboard Navigation

### Tab Order
1. Skip to main content (future enhancement)
2. Logo/Home link
3. Hamburger button (mobile only)
4. Navigation links (desktop) / Open drawer (mobile)
5. Offline indicator (if visible)
6. Login/Logout button

### Keyboard Shortcuts
- **Tab**: Navigate through menu items
- **Enter/Space**: Activate link or button
- **Escape**: Close mobile drawer

## Focus Management

### Route Changes
- Router outlet receives focus on navigation
- `tabindex="-1"` allows programmatic focus
- Focus visible outline for accessibility

### Drawer Focus Trap
- Focus stays within drawer when open
- First focusable element receives focus on open
- Tab cycles through drawer items only

## Accessibility Features

### ARIA Labels
- Main navigation: `aria-label="Main navigation"`
- Mobile menu button: `aria-label="Toggle menu"`, `aria-expanded` state
- Active page: `aria-current="page"`
- Offline indicator: `role="status"`, `aria-live="polite"`

### Screen Reader Announcements
- Navigation changes announced
- Offline status announced
- Login/logout actions announced

### Color Contrast
- All text meets WCAG AA contrast ratios (4.5:1 minimum)
- Primary blue (#1e40af) on white or white on primary blue

## Route Structure

```
/                        → Redirect to /events
/login                   → Login page (public)
/events                  → Events list (public)
/shifts                  → Volunteer shifts (Volunteer+)
/stock-alerts            → Stock alerts (Volunteer+)
/expenses                → Expense claims (Volunteer+)
/users                   → User management (Committee only)
/manage-events           → Event management (Committee only)
/*                       → Redirect to /events (404 fallback)
```

## Route Guards

### Authentication Required
- All routes except `/events` and `/login` require authentication
- Unauthenticated users redirected to `/login`

### Role-Based Access
- **Volunteer routes**: Require Volunteer or Committee role
- **Committee routes**: Require Committee role only
- Unauthorized users redirected to `/events`

### Authenticated Redirect
- Users accessing `/login` while authenticated → redirect to `/events`

## Offline Behavior

### Visual Feedback
- Offline indicator appears in header
- Badge shows "Offline" with pending request count
- Warning color (amber/yellow) for visibility

### Queue Display
- Format: "Offline (3 pending)" when requests are queued
- Format: "Offline" when no queued requests
- Updates in real-time as queue changes

### Connectivity Detection
- `navigator.onLine` monitored for status changes
- Event listeners: `online`, `offline`
- Automatic queue processing when connection restored

## Page Layout

### Page Shell Components
All page components follow consistent structure:

```typescript
<club-app-header>        // Sticky header with navigation
<main>                   // Page content area
  <router-outlet>        // Dynamic page content
</router-outlet>
</main>
```

### Page Content Structure
Individual pages:
```
<h1>Page Title <wa-badge>Role Badge</wa-badge></h1>
<wa-card>
  // Page-specific content
</wa-card>
```

### Max Width Container
- Content max-width: 1280px
- Centered with auto margins
- Padding: 2rem (mobile and desktop)

## Future Enhancements
1. **Skip Navigation Link**: "Skip to main content" for keyboard users
2. **Search**: Global search in header
3. **Notifications**: Badge on bell icon for unread notifications
4. **Profile Menu**: Dropdown with profile, settings, logout
5. **Breadcrumbs**: For deep navigation hierarchies
6. **Persistent Offline Queue**: Save queued requests to localStorage

---

**Design Philosophy**: Mobile-first, accessible, role-aware, offline-capable
**Technology**: Lit Web Components, Web Awesome UI, Vaadin Router
**Testing**: Playwright for visual regression and interaction testing
