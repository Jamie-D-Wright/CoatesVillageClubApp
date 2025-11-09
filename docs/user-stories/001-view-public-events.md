# View Public Events

## User Story
As a member of the general public, I want to be able to see what events are on at the Coates Village Club, so that I can decide whether to attend and plan my visit.

## Acceptance Criteria
- [ ] Public users can view a list of upcoming events without authentication
- [ ] Each event displays: title, description, date, time, and event type
- [ ] Events are sorted chronologically with upcoming events first
- [ ] Past events are not displayed in the main list
- [ ] Loading state is shown while fetching events
- [ ] Error state is shown if events cannot be loaded
- [ ] Empty state is shown if there are no upcoming events
- [ ] Events display correctly on mobile, tablet, and desktop viewports

## API Requirements

### Endpoint
`GET /api/v1/events`

### Query Parameters
- `status` (optional): Filter by event status (`upcoming`, `past`)
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of events per page (default: 10)

### Response Schema
```json
{
  "events": [
    {
      "id": "string (UUID)",
      "title": "string",
      "description": "string",
      "date": "string (ISO 8601 date)",
      "startTime": "string (HH:mm format)",
      "endTime": "string (HH:mm format)",
      "eventType": "string (SpecialEvent | RegularBarNight | PrivateHire | Fundraiser)",
      "createdAt": "string (ISO 8601 datetime)",
      "updatedAt": "string (ISO 8601 datetime)"
    }
  ],
  "pagination": {
    "currentPage": "number",
    "totalPages": "number",
    "totalEvents": "number",
    "limit": "number"
  }
}
```

### Error Response
```json
{
  "error": {
    "code": "string",
    "message": "string"
  }
}
```

## UI/UX Requirements

### Component Hierarchy
```
<club-event-list>
  ├── <loading-spinner> (when loading)
  ├── <error-message> (when error)
  ├── <empty-state> (when no events)
  └── <club-event-card>* (for each event)
```

### States
1. **Loading**: Show spinner with "Loading events..." message
2. **Success**: Display grid/list of event cards
3. **Error**: Show error message with retry option
4. **Empty**: Show friendly message "No upcoming events scheduled"

### Interactions
- Event cards are static (no click interaction in MVP)
- Scroll to view all events
- Responsive layout: 
  - Mobile: Single column
  - Tablet: Two columns
  - Desktop: Three columns

## Accessibility Requirements

### ARIA Labels
- List container: `role="list"` with `aria-label="Upcoming events"`
- Each event card: `role="listitem"`
- Loading state: `aria-live="polite"` with `aria-busy="true"`
- Error messages: `role="alert"` with `aria-live="assertive"`

### Keyboard Navigation
- Event list should be focusable and scrollable via keyboard
- Keyboard users can navigate through event cards using Tab key
- Focus indicators are clearly visible

### Screen Reader Compatibility
- Event dates announced in readable format (e.g., "Saturday, November 9th, 2025")
- Event times announced with context (e.g., "8:00 PM to 12:00 AM")
- Event types announced clearly (e.g., "Special Event", "Regular Bar Night")
- Loading and error states announced to screen readers

### Color Contrast
- All text meets WCAG AA contrast ratio (4.5:1 for normal text)
- Error messages use color plus iconography (not color alone)

## Playwright Test Scenarios

### Basic Functionality
- [ ] Event list renders successfully with mock data
- [ ] Loading state displays before events load
- [ ] Events are sorted chronologically (earliest first)
- [ ] Each event card displays all required fields
- [ ] Event types are displayed with appropriate labels

### State Management
- [ ] Empty state displays when no events exist
- [ ] Error state displays when API call fails
- [ ] Retry functionality works in error state
- [ ] Loading spinner disappears when data loads

### Responsive Design
- [ ] Single column layout on mobile (viewport width 375px)
- [ ] Two column layout on tablet (viewport width 768px)
- [ ] Three column layout on desktop (viewport width 1280px)
- [ ] Event cards adapt to container width

### Accessibility
- [ ] Event list has correct ARIA role and label
- [ ] Loading state announces to screen readers
- [ ] Error messages have alert role
- [ ] Keyboard navigation works through all events
- [ ] Focus indicators are visible on all interactive elements
- [ ] Color contrast meets WCAG AA standards (axe-core validation)

### Visual Regression
- [ ] Event list matches approved design baseline
- [ ] Loading state matches baseline
- [ ] Error state matches baseline
- [ ] Empty state matches baseline
- [ ] Mobile layout matches baseline
- [ ] Tablet layout matches baseline
- [ ] Desktop layout matches baseline

## Design Notes
- Design system tokens defined in `docs/design-system/tokens.md`
- Approved wireframes to be captured in `docs/wireframes/001-event-list.md`
- Component uses Web Awesome card components for consistent styling
- Colors, typography, and spacing follow design system

## Technical Notes
- Component: `<club-event-list>` in `src/components/events/`
- Service: `EventsService` in `src/services/events-service.ts`
- Feature flag: `VITE_USE_REAL_API` controls mock vs real API
- Mock service provides realistic test data
- Real API integration ready for when backend is deployed
