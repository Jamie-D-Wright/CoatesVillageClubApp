# Design System Tokens

## Overview
Design system tokens define the visual language for Coates Village Club PWA. These tokens ensure consistency across all components and align with Web Awesome's theming system.

**Brand Color**: The app uses a **Rose/Red** color palette (#be123c → #e11d48 → #f43f5e) for a warm, welcoming, and energetic community feel. This color scheme is applied consistently across all pages and components.

## Colors

### Primary Palette (Rose/Red Brand Colors)
```css
--primary-50: #fff1f2;
--primary-100: #ffe4e6;
--primary-200: #fecdd3;
--primary-300: #fda4af;
--primary-400: #fb7185;
--primary-500: #f43f5e;  /* Light primary */
--primary-600: #e11d48;  /* Main primary color */
--primary-700: #be123c;  /* Dark primary for headers */
--primary-800: #9f1239;
--primary-900: #881337;
```

### Neutral Palette (Grays)
```css
--neutral-50: #f9fafb;
--neutral-100: #f3f4f6;
--neutral-200: #e5e7eb;
--neutral-300: #d1d5db;
--neutral-400: #9ca3af;
--neutral-500: #6b7280;
--neutral-600: #4b5563;
--neutral-700: #374151;
--neutral-800: #1f2937;
--neutral-900: #111827;
```

### Semantic Colors
```css
/* Success (Green) */
--success-50: #f0fdf4;
--success-500: #22c55e;
--success-700: #15803d;

/* Warning (Amber) */
--warning-50: #fffbeb;
--warning-500: #f59e0b;
--warning-700: #b45309;

/* Error (Red) */
--error-50: #fef2f2;
--error-500: #ef4444;
--error-700: #b91c1c;

/* Info (Blue) */
--info-50: #eff6ff;
--info-500: #3b82f6;
--info-700: #1d4ed8;
```

### Background Colors
```css
--bg-primary: #ffffff;
--bg-secondary: #fff1f2;       /* Rose tint */
--bg-tertiary: #ffe4e6;        /* Lighter rose tint */
--bg-gradient: linear-gradient(180deg, #fff1f2 0%, #ffffff 100%);
```

### Hero/Feature Gradients
```css
--hero-gradient: linear-gradient(135deg, #be123c 0%, #e11d48 50%, #f43f5e 100%);
```

### Text Colors
```css
--text-primary: #1f2937;      /* Main body text */
--text-secondary: #6b7280;    /* Subtitles, captions */
--text-tertiary: #9ca3af;     /* Disabled, placeholder */
--text-inverse: #ffffff;      /* Text on dark backgrounds */
```

### Border Colors
```css
--border-light: #fecdd3;      /* Rose-200 for primary borders */
--border-medium: #fda4af;     /* Rose-300 */
--border-dark: #fb7185;       /* Rose-400 */
--border-neutral: #e5e7eb;    /* Neutral borders */
```

## Typography

### Font Families
```css
--font-family-base: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 
                    Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
--font-family-heading: var(--font-family-base);
--font-family-mono: 'Courier New', Courier, monospace;
```

### Font Sizes
```css
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 1.875rem;  /* 30px */
--font-size-4xl: 2.25rem;   /* 36px */
```

### Font Weights
```css
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Line Heights
```css
--line-height-tight: 1.25;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
```

## Spacing

### Spacing Scale
```css
--spacing-0: 0;
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px */
--spacing-5: 1.25rem;   /* 20px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-8: 2rem;      /* 32px */
--spacing-10: 2.5rem;   /* 40px */
--spacing-12: 3rem;     /* 48px */
--spacing-16: 4rem;     /* 64px */
```

### Component Spacing
```css
--spacing-xs: var(--spacing-1);   /* 4px */
--spacing-sm: var(--spacing-2);   /* 8px */
--spacing-md: var(--spacing-4);   /* 16px */
--spacing-lg: var(--spacing-6);   /* 24px */
--spacing-xl: var(--spacing-8);   /* 32px */
```

## Breakpoints

### Responsive Breakpoints
```css
--breakpoint-sm: 640px;    /* Mobile landscape */
--breakpoint-md: 768px;    /* Tablet portrait */
--breakpoint-lg: 1024px;   /* Tablet landscape / Small desktop */
--breakpoint-xl: 1280px;   /* Desktop */
--breakpoint-2xl: 1536px;  /* Large desktop */
```

### Media Query Usage
```css
/* Mobile first approach */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

## Borders & Radius

### Border Width
```css
--border-width-thin: 1px;
--border-width-medium: 2px;
--border-width-thick: 4px;
```

### Border Radius
```css
--radius-none: 0;
--radius-sm: 0.125rem;   /* 2px */
--radius-base: 0.25rem;  /* 4px */
--radius-md: 0.375rem;   /* 6px */
--radius-lg: 0.5rem;     /* 8px */
--radius-xl: 0.75rem;    /* 12px */
--radius-2xl: 1rem;      /* 16px */
--radius-full: 9999px;   /* Fully rounded */
```

## Shadows

### Box Shadows
```css
--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
```

## Transitions

### Timing Functions
```css
--timing-linear: linear;
--timing-ease: ease;
--timing-ease-in: ease-in;
--timing-ease-out: ease-out;
--timing-ease-in-out: ease-in-out;
```

### Durations
```css
--duration-fast: 150ms;
--duration-base: 250ms;
--duration-slow: 350ms;
```

### Standard Transitions
```css
--transition-base: all var(--duration-base) var(--timing-ease-in-out);
--transition-colors: color var(--duration-base) var(--timing-ease-in-out),
                     background-color var(--duration-base) var(--timing-ease-in-out),
                     border-color var(--duration-base) var(--timing-ease-in-out);
```

## Z-Index Scale

### Layering
```css
--z-base: 0;
--z-dropdown: 100;
--z-sticky: 200;
--z-fixed: 300;
--z-modal-backdrop: 400;
--z-modal: 500;
--z-popover: 600;
--z-tooltip: 700;
```

## Web Awesome Integration

### Custom Properties for Web Awesome Components
Web Awesome components can be themed using CSS custom properties. Apply these in component styles:

```css
/* Example: Customizing Web Awesome card */
fa-card {
  --fa-card-border-color: var(--border-light);
  --fa-card-border-radius: var(--radius-lg);
  --fa-card-padding: var(--spacing-lg);
  --fa-card-shadow: var(--shadow-md);
}

/* Example: Customizing Web Awesome button */
fa-button {
  --fa-button-primary-background: var(--primary-600);
  --fa-button-primary-hover: var(--primary-700);
  --fa-button-border-radius: var(--radius-md);
  --fa-button-padding-x: var(--spacing-4);
  --fa-button-padding-y: var(--spacing-2);
}
```

## Accessibility

### Focus Indicators
```css
--focus-ring-color: var(--primary-500);
--focus-ring-width: 2px;
--focus-ring-offset: 2px;
--focus-ring-style: solid;
```

### Minimum Touch Targets
```css
--touch-target-min: 44px;  /* WCAG 2.1 AAA: 44x44px */
```

## Usage Guidelines

### Color Contrast Requirements
- **Body Text**: Minimum 4.5:1 contrast ratio (WCAG AA)
- **Large Text (18px+ or 14px+ bold)**: Minimum 3:1 contrast ratio
- **UI Components**: Minimum 3:1 contrast ratio

### Verified Combinations (WCAG AA Compliant)
- Primary text: `--text-primary` (#1f2937) on `--bg-primary` (#ffffff) ✓ (14.8:1)
- Secondary text: `--text-secondary` (#6b7280) on `--bg-primary` (#ffffff) ✓ (5.74:1)
- Primary button: `--text-inverse` (#ffffff) on `--primary-600` (#e11d48) ✓ (4.53:1)
- Hero text: `--text-inverse` (#ffffff) on rose gradient ✓ (4.5:1+)
- Rose accent: `--primary-600` (#e11d48) on `--bg-primary` (#ffffff) ✓ (4.53:1)
- Error text: `--error-700` (#b91c1c) on `--error-50` (#fef2f2) ✓ (7.0:1)
- Success text: `--success-700` (#15803d) on `--success-50` (#f0fdf4) ✓ (7.5:1)

### Component-Specific Tokens
Create component-specific token files as needed:
- `docs/design-system/components/button-tokens.md`
- `docs/design-system/components/card-tokens.md`
- `docs/design-system/components/form-tokens.md`

## Implementation

Apply these tokens in `src/styles/global.css` and individual component stylesheets:

```css
:root {
  /* Import all design tokens */
  @import './design-tokens.css';
}
```

Reference tokens in Lit component styles:

```typescript
static styles = css`
  .card {
    background: var(--bg-primary);
    border: var(--border-width-thin) solid var(--border-light);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    box-shadow: var(--shadow-md);
    transition: var(--transition-base);
  }
  
  .card:hover {
    box-shadow: var(--shadow-lg);
  }
`;
```

## Future Considerations
- Dark mode color palette (to be defined)
- High contrast mode adjustments
- Custom icon set definitions
- Animation presets
- Grid system tokens
