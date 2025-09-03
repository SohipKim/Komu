# Roommate Co-living App Guidelines

## Design System Requirements

### Typography Hierarchy
**IMPORTANT:** Always use proper semantic HTML elements instead of divs with text classes.

#### Semantic HTML Elements:
- **H1**: Page titles and main headings (24px, 600 weight)
- **H2**: Section headings and major subsections (18px, 600 weight)  
- **H3**: Sub-section headings (16px, 600 weight)
- **H4**: Minor headings, component titles (14px, 600 weight)
- **H5**: Small headings for cards/elements (14px, 500 weight)
- **P**: Body text, descriptions, labels (14px, 400 weight)

#### Implementation Rules:
- Replace `<div className="text-2xl font-medium">` with `<h1>`
- Replace `<div className="text-lg font-semibold">` with `<h2>`
- Replace `<span className="text-sm">` with `<p>` for body content
- Use `<label>` for form field labels
- Avoid font size classes (text-xl, text-sm) unless overriding defaults is necessary

### Spacing & Layout
- **Base Grid**: 16px spacing system
- **Card Radius**: 8px (use `--radius-lg` token)
- **Component Spacing**: Follow 16px grid multiples (4px, 8px, 16px, 24px, 32px)

### Brand Colors
- **Primary**: Teal (`--brand-primary-600: #0fa3b1`)
- **Secondary**: Coral (`--brand-secondary-600: #f45b47`)
- **Use semantic tokens**: `var(--color-primary)`, `var(--color-text)`, etc.

### Component Guidelines

#### Buttons
- Use semantic button element `<button>` or ShadCN Button component
- Primary actions: `btn--primary` class or `variant="default"`
- Secondary actions: `btn--secondary` or `variant="outline"`

#### Cards
- Use 8px border radius (`rounded-lg`)
- Include proper drop shadows (`shadow-2`)
- Structure with semantic headings inside

#### Hearts & Gamification
- Heart icons should use `fill-red-500 text-red-500` for filled hearts
- Use `❤️` emoji sparingly, prefer Lucide Heart icon
- Heart counts always paired with heart icon

### Accessibility
- Proper heading hierarchy (don't skip levels)
- All interactive elements must be keyboard accessible
- Use semantic HTML for screen readers
- Color contrast ratios must meet WCAG AA standards

### File Organization
- Components in `/components/` directory
- UI primitives in `/components/ui/`
- Each major screen gets its own component file
- Avoid overly large component files (split when needed)

## Specific Feature Guidelines

### Contribution Tracking
- Always show heart values with heart icons
- Use proper semantic headings for MVP banners
- Date formats: "Aug 31st" or "July 28 - Aug 3"

### Navigation
- Back buttons use ArrowLeft icon from Lucide
- Navigation headers use H1 for page titles
- Toggle switches for view modes clearly labeled

### Data Visualization
- Interactive elements must be keyboard accessible
- Calendar views use semantic table structure when appropriate
- Progress indicators include proper ARIA labels