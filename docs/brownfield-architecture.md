# BMad Escape Room - Night Train Experience Brownfield Architecture Document

## Introduction

This document captures the CURRENT STATE of the BMad Escape Room codebase, including technical debt, workarounds, and real-world patterns. It serves as a reference for AI agents working on enhancements.

### Document Scope

Focused on areas relevant to: Night Train Compartment escape room implementation as defined in the PRD. The project is currently in early development stages with foundational infrastructure completed and basic room implementation in progress.

### Change Log

| Date       | Version | Description                 | Author    |
| ---------- | ------- | --------------------------- | --------- |
| 2024-12-XX | 1.0     | Initial brownfield analysis | Assistant |

## Quick Reference - Key Files and Entry Points

### Critical Files for Understanding the System

- **Main Entry**: `src/app/page.tsx` (Next.js App Router homepage)
- **Room Entry**: `src/app/room/night-train-compartment/page.tsx` (Main escape room experience)
- **Configuration**: `src/env.js`, `.env` (environment variables with Zod validation)
- **Core Business Logic**: `src/server/api/routers/` (tRPC API endpoints)
- **Database Models**: `prisma/schema.prisma` (Prisma schema with accessibility tracking)
- **Accessibility Framework**: `src/components/accessibility/` (Custom accessibility system)
- **Key Algorithms**: `src/lib/accessibility.ts` (Contrast calculations, color utilities)

### Enhancement Impact Areas (Based on PRD Requirements)

Based on the Night Train Compartment escape room requirements, these files will be affected by continued development:

- `src/app/room/night-train-compartment/page.tsx` - Currently basic prototype, needs full puzzle implementation
- `src/server/api/routers/room.ts` - Needs puzzle validation and progress tracking
- `src/types/room.ts` - Puzzle type definitions need expansion
- `src/components/ui/` - Need puzzle-specific components (ticket, punch-card, intercom)
- `prisma/schema.prisma` - May need additional puzzle tracking tables

## High Level Architecture

### Technical Summary

BMad Escape Room is a Next.js 14 fullstack application using the T3 Stack pattern with accessibility-first design. The current implementation focuses on PWA capabilities, comprehensive accessibility support, and a basic escape room prototype.

### Actual Tech Stack (from package.json)

| Category          | Technology                | Version | Notes                                    |
| ----------------- | ------------------------- | ------- | ---------------------------------------- |
| Runtime           | Node.js                   | 18+     | Required for Next.js 14                 |
| Framework         | Next.js                   | 14.0.4  | App Router, SSR enabled                 |
| Frontend          | React                     | 18.2.0  | With TypeScript                         |
| Backend API       | tRPC                      | 10.45.0 | Type-safe API layer                     |
| Database          | PostgreSQL + Prisma      | 5.7.0   | ORM with accessibility analytics        |
| Styling           | Tailwind CSS              | 3.3.6   | Custom accessibility utilities          |
| State Management  | Zustand                   | 4.4.7   | For accessibility state                 |
| UI Components     | Radix UI                  | Various | Accessible component primitives         |
| Authentication    | NextAuth.js               | 4.24.5  | Ready but not yet implemented           |
| Testing           | Jest + Playwright         | 29.7.0  | Accessibility testing with jest-axe     |
| Build/Deploy      | Vercel (implied)          | N/A     | Next.js optimized hosting               |

### Repository Structure Reality Check

- Type: Monorepo (single Next.js application)
- Package Manager: npm (package-lock.json present)
- Notable: T3 Stack template structure with custom accessibility extensions

## Source Tree and Module Organization

### Project Structure (Actual)

```text
bmad-escape-room/
├── .bmad-core/                 # BMad methodology files (DO NOT MODIFY)
├── docs/                       # Comprehensive project documentation
│   ├── architecture.md         # Original architecture specification
│   ├── brief.md               # Project brief
│   ├── competitor-analysis.md # Market analysis
│   ├── front-end-spec.md      # UX/UI specifications
│   ├── market-research.md     # Market research
│   └── prd.md                 # Product Requirements Document
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── api/trpc/          # tRPC API route handler
│   │   ├── room/              # Escape room pages
│   │   │   └── night-train-compartment/ # Main room implementation
│   │   ├── layout.tsx         # Root layout with accessibility providers
│   │   └── page.tsx           # Landing page
│   ├── components/            # React components
│   │   ├── accessibility/     # Custom accessibility framework
│   │   └── ui/                # Base UI components (Button, Modal)
│   ├── hooks/                 # Custom React hooks
│   │   └── useAccessibility.ts # Main accessibility state hook
│   ├── lib/                   # Utility libraries
│   │   ├── accessibility.ts   # Color/contrast calculations
│   │   └── utils.ts          # General utilities (Tailwind merge)
│   ├── server/                # Backend/API layer
│   │   ├── api/               # tRPC routers and setup
│   │   ├── auth.ts           # NextAuth configuration (unused)
│   │   └── db.ts             # Prisma client instance
│   ├── styles/               # Global styles
│   │   └── globals.css       # Tailwind + custom accessibility CSS
│   ├── trpc/                 # tRPC client setup
│   ├── types/                # TypeScript type definitions
│   └── utils/                # Client-side utilities (empty)
├── prisma/                   # Database schema and migrations
│   ├── schema.prisma         # Database models with accessibility tracking
│   └── seed.ts               # Database seeding script
├── public/                   # Static assets
└── [config files]            # Next.js, TypeScript, Tailwind configs
```

### Key Modules and Their Purpose

- **Accessibility Framework**: `src/components/accessibility/` - Custom, comprehensive accessibility system
- **Room Implementation**: `src/app/room/night-train-compartment/page.tsx` - Basic prototype escape room
- **API Layer**: `src/server/api/routers/` - tRPC endpoints for room, analytics, accessibility
- **State Management**: `src/hooks/useAccessibility.ts` - Zustand-based accessibility state
- **Database Layer**: `prisma/schema.prisma` - Models for sessions, analytics, accessibility audits
- **UI Components**: `src/components/ui/` - Accessible base components using Radix UI

## Data Models and APIs

### Data Models

Reference actual model files for complete schemas:

- **Room Models**: See `src/types/room.ts` and `prisma/schema.prisma`
  - `RoomSession` - User session tracking
  - `RoomConfiguration` - Room settings and variations
  - `Puzzle` - Individual puzzle definitions
  - `Hint` - Progressive hint system
- **Analytics Models**: See `prisma/schema.prisma`
  - `AnalyticsEvent` - User interaction tracking
  - `AccessibilityAudit` - Accessibility compliance monitoring
- **Accessibility Types**: See `src/types/accessibility.ts`
  - `AccessibilityContext` - Browser/user accessibility settings
  - `AccessibilityPreferences` - User accessibility preferences

### API Specifications

- **tRPC Routers**: Located in `src/server/api/routers/`
  - Room router: Basic room data and configuration
  - Analytics router: Event tracking and metrics
  - Accessibility router: Accessibility preference management
- **Type Safety**: Full end-to-end type safety via tRPC integration
- **API Route**: `src/app/api/trpc/[trpc]/route.ts` - Next.js API handler

## Technical Debt and Known Issues

### Critical Technical Debt

1. **Room Implementation**: Current room (`src/app/room/night-train-compartment/page.tsx`) is a basic prototype with placeholder puzzles, not actual puzzle logic from PRD
2. **Authentication System**: NextAuth is configured but not implemented or integrated
3. **Database Migrations**: No migration files exist yet, using `db push` for development
4. **Testing Infrastructure**: Test files configured but no actual tests written
5. **PWA Features**: Service worker and manifest not yet implemented despite PWA requirements

### Workarounds and Gotchas

- **PostCSS Configuration**: Required for Tailwind processing - ensure `postcss.config.js` exists
- **Package.json Type**: Removed `"type": "module"` due to Next.js compatibility issues
- **Environment Variables**: Uses Zod validation in `src/env.js` - all env vars must be declared there
- **OpenDyslexic Font**: Currently commented out in CSS due to missing font file
- **Color System**: Using standard Tailwind colors instead of custom palette defined in Tailwind config
- **Debug Overlay**: Accessibility debug panel positioned bottom-right, may overlap content on small screens

### Styling System Realities

- **Color Scheme**: Despite extensive custom color palette in `tailwind.config.ts`, components use standard Tailwind colors (`gray-900`, `yellow-400`, etc.)
- **CSS Custom Properties**: Defined in `globals.css` but not consistently used
- **Component Variants**: Using `class-variance-authority` for component styling but limited implementation

## Integration Points and External Dependencies

### External Services

| Service     | Purpose           | Integration Type | Key Files                 |
| ----------- | ----------------- | ---------------- | ------------------------- |
| PostgreSQL  | Data persistence  | Prisma ORM       | `prisma/schema.prisma`    |
| Vercel      | Hosting/Deploy    | Next.js native   | Implied (no config files) |
| Google Fonts| Typography       | CSS imports      | `src/styles/globals.css`  |

### Internal Integration Points

- **Accessibility System**: Global state via Zustand, provides context to all components
- **tRPC Integration**: Type-safe client-server communication
- **Database Layer**: Prisma client available globally via `src/server/db.ts`

## Development and Deployment

### Local Development Setup

1. **Prerequisites**: Node.js 18+, PostgreSQL running locally
2. **Installation**: `npm install` (automatically runs `prisma generate`)
3. **Database Setup**:
   - Create database matching `.env` DATABASE_URL
   - Run `npm run db:push` to sync schema
   - Run `npm run db:seed` to populate test data
4. **Development Server**: `npm run dev` starts on http://localhost:3000

### Environment Variables Required

See `.env.example` or `src/env.js` for complete list:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Authentication secret (not yet used)
- `NEXTAUTH_URL` - App URL for auth callbacks
- `NEXT_PUBLIC_APP_URL` - Public app URL
- `NEXT_PUBLIC_APP_NAME` - Application name

### Build and Deployment Process

- **Development**: `npm run dev` - Next.js development server
- **Build**: `npm run build` - Production build with type checking
- **Production**: `npm run start` - Production server
- **Database Operations**: Various `npm run db:*` commands for Prisma

## Testing Reality

### Current Test Coverage

- **Unit Tests**: 0% coverage - Jest configured but no tests written
- **Integration Tests**: 0% coverage - Planned but not implemented
- **E2E Tests**: 0% coverage - Playwright configured but no tests written
- **Accessibility Tests**: 0% coverage - jest-axe and @axe-core/playwright available
- **Manual Testing**: Primary current QA method

### Testing Infrastructure Available

```bash
npm test                    # Jest unit tests (none exist)
npm run test:unit          # Unit test specific
npm run test:integration   # Integration tests (none exist)
npm run test:e2e          # Playwright E2E tests (none exist)
npm run test:accessibility # Accessibility-specific tests (none exist)
npm run accessibility:audit # Axe CLI audit (configured)
```

## Enhancement Impact Analysis (Based on PRD)

### Current Implementation Status

**✅ COMPLETED:**
- Project foundation with T3 Stack
- Accessibility framework infrastructure
- Basic room page routing
- Database schema for analytics and accessibility
- Landing page with dark theme
- Core UI components (Button, Modal)

**🚧 IN PROGRESS:**
- Night Train Compartment room (basic prototype exists)
- Accessibility features (framework built, needs testing)

**❌ NOT STARTED:**
- Actual puzzle logic (ticket math, punch-card, intercom)
- Progressive hint system implementation
- User session management
- Analytics tracking implementation
- PWA features (service worker, manifest)
- Social sharing functionality
- Scoring system
- Authentication integration

### Files That Will Need Major Development

For completing the Night Train Compartment escape room:

- `src/app/room/night-train-compartment/page.tsx` - Replace prototype with actual puzzles
- `src/components/room/` - New directory for puzzle-specific components:
  - `TicketInspection.tsx` - Ticket mathematics puzzle
  - `PunchCardOverlay.tsx` - Punch-card alignment puzzle
  - `IntercomPanel.tsx` - Final intercom puzzle
- `src/server/api/routers/room.ts` - Add puzzle validation logic
- `src/lib/puzzles/` - New directory for puzzle logic and validation
- `prisma/schema.prisma` - May need puzzle-specific tracking tables

### New Files/Modules Needed

- **Puzzle Components**: Ticket, punch-card, and intercom interfaces
- **Game Logic**: Puzzle validation and progression logic
- **Hint System**: Progressive hint delivery system
- **Analytics Implementation**: Event tracking and user behavior analytics
- **PWA Manifest**: Service worker and app manifest for PWA capabilities
- **Session Management**: User progress and state persistence

### Integration Considerations

- Must integrate with existing accessibility framework
- Follow established dark theme color scheme
- Use existing tRPC API patterns
- Integrate with Prisma database models
- Maintain WCAG 2.1 AA compliance requirements

## Appendix - Useful Commands and Scripts

### Frequently Used Commands

```bash
npm run dev              # Start development server
npm run build            # Production build with type checking
npm run db:push          # Sync Prisma schema to database
npm run db:studio        # Open Prisma Studio (database GUI)
npm run db:seed          # Seed database with test data
npm run db:reset         # Reset database and re-seed
npm run lint             # ESLint code checking
```

### Development Workflow

```bash
# Setup new development environment
npm install
npm run db:push
npm run db:seed
npm run dev

# Database schema changes
# 1. Edit prisma/schema.prisma
# 2. Run npm run db:push (development)
# 3. For production: npm run db:migrate

# Adding new dependencies
npm install <package>
# Edit src/env.js if environment variables needed
```

### Debugging and Troubleshooting

- **Logs**: Check browser console for client-side issues
- **Database Issues**: Use `npm run db:studio` to inspect database state
- **Type Errors**: Run `npm run build` to see all TypeScript issues
- **Accessibility Issues**: Use browser DevTools accessibility panel
- **API Issues**: Check Network tab for tRPC call failures

### Accessibility Development Notes

- **Debug Panel**: Available in development mode (bottom-right corner)
- **Keyboard Testing**: Tab through all interactions
- **Screen Reader Testing**: Test with browser screen reader or NVDA
- **Color Contrast**: Use browser DevTools color picker for contrast ratios
- **Focus Management**: Verify focus indicators and logical tab order
