# BMad Escape Room Brownfield Architecture Document

## Introduction

This document captures the CURRENT STATE of the BMad Escape Room - Night Train Experience codebase, including technical debt, workarounds, and real-world patterns. It serves as a reference for AI agents working on enhancements to this accessibility-first digital escape room platform.

### Document Scope

Comprehensive documentation of entire system with focus on escape room puzzle implementation, accessibility infrastructure, and T3 Stack integration patterns.

### Change Log

| Date   | Version | Description                 | Author    |
| ------ | ------- | --------------------------- | --------- |
| 2024-01-20 | 1.0     | Initial brownfield analysis | AI Agent |

## Quick Reference - Key Files and Entry Points

### Critical Files for Understanding the System

- **Main Entry**: `src/app/page.tsx` - Next.js App Router root page
- **Configuration**: `next.config.js`, `src/env.js`, `prisma/schema.prisma`
- **Core Game Logic**: `src/app/room/night-train-compartment/page.tsx` - Main escape room component
- **Accessibility Infrastructure**: `src/components/accessibility/` - Provider and utilities
- **Puzzle Components**: `src/components/room/` - Individual modal components for puzzles
- **Database Models**: `prisma/schema.prisma` - Comprehensive accessibility analytics schema
- **API Layer**: `src/server/api/` - tRPC routers for accessibility and analytics

### Current Implementation Status

**✅ COMPLETED (Stories 1 & 2):**
- Ticket Math Puzzle with improved combination logic (512)
- Punch-Card Overlay Alignment System
- Modal state management and UI flow
- Accessibility provider infrastructure
- Basic tRPC/Prisma foundation

**🚧 IN PROGRESS:**
- Story 3: Intercom and Final Gate System
- Story 4: Progressive Hint System

**❌ NOT YET IMPLEMENTED:**
- Timer and scoring system
- Analytics data collection
- Anti-stuck detection
- Fail-forward functionality
- Social sharing features

## High Level Architecture

### Technical Summary

BMad Escape Room is a Next.js 14 fullstack application using the T3 Stack pattern with accessibility-first design. The current implementation focuses on PWA capabilities, comprehensive accessibility support, and modular puzzle component architecture. The system leverages tRPC for type-safe API communication and Prisma for accessibility analytics persistence.

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
├── docs/                     # Comprehensive project documentation
│   ├── architecture.md      # Idealized architecture (reference)
│   ├── brief.md             # Project brief and context
│   ├── brownfield-architecture.md  # THIS FILE - actual state
│   ├── front-end-spec.md    # UX/UI specifications
│   └── prd.md               # Product requirements document
├── prisma/                  # Database layer
│   ├── schema.prisma        # Complex accessibility analytics schema
│   └── seed.ts              # Database seeding (empty)
├── public/                  # Static assets
│   ├── favicon.svg          # SVG favicon (also copied as .ico)
│   └── fonts/               # Custom fonts
│       └── OpenDyslexic-Regular.woff2  # Dyslexia-friendly font
├── src/                     # Main application source
│   ├── app/                 # Next.js App Router
│   │   ├── api/trpc/[trpc]/ # tRPC API route handler
│   │   ├── layout.tsx       # Root layout with accessibility providers
│   │   ├── page.tsx         # Home page (basic welcome screen)
│   │   └── room/night-train-compartment/  # Main escape room
│   │       └── page.tsx     # 🎯 CORE GAME LOGIC (380+ lines)
│   ├── components/          # React components
│   │   ├── accessibility/   # ✅ Accessibility infrastructure
│   │   │   ├── AccessibilityProvider.tsx  # Zustand-based context
│   │   │   ├── FocusManager.tsx          # Focus management
│   │   │   ├── ScreenReaderAnnouncer.tsx # SR announcements
│   │   │   └── SkipLinks.tsx             # Skip navigation
│   │   ├── room/           # 🎮 Puzzle modal components
│   │   │   ├── PunchCardOverlayModal.tsx # Story 2 - Drag & drop
│   │   │   ├── SuitcaseLockModal.tsx     # Story 1 - Number lock
│   │   │   ├── TicketModal.tsx           # Display train ticket
│   │   │   └── TimetableModal.tsx        # Display departure board
│   │   └── ui/             # Generic UI components
│   │       ├── Button.tsx  # Accessible button with variants
│   │       └── Modal.tsx   # Accessible modal wrapper
│   ├── hooks/              # Custom React hooks
│   │   └── useAccessibility.ts  # Accessibility state hook
│   ├── lib/                # Utility libraries
│   │   ├── accessibility.ts     # Accessibility helpers
│   │   └── utils.ts            # General utilities
│   ├── server/             # Backend/API layer
│   │   ├── api/            # tRPC routers
│   │   │   ├── root.ts     # Root router configuration
│   │   │   └── routers/    # Feature-specific routers
│   │   │       ├── accessibility.ts  # A11y settings API
│   │   │       ├── analytics.ts      # Usage analytics API
│   │   │       └── room.ts           # Room session API
│   │   ├── auth.ts         # Authentication config (unused)
│   │   ├── db.ts           # Prisma client instance
│   │   └── trpc.ts         # tRPC server configuration
│   ├── styles/
│   │   └── globals.css     # Global styles + accessibility utilities
│   ├── trpc/               # Client-side tRPC
│   │   ├── react.tsx       # React Query integration
│   │   └── shared.ts       # Shared tRPC configuration
│   ├── types/              # TypeScript type definitions
│   │   ├── accessibility.ts # Accessibility-related types
│   │   └── room.ts         # Room and puzzle types
│   └── utils/              # Client utilities (currently empty)
├── tailwind.config.ts      # Tailwind with accessibility extensions
├── next.config.js          # Next.js config with accessibility optimizations
└── package.json            # Dependencies and scripts
```

### Key Modules and Their Purpose

- **Main Game Controller**: `src/app/room/night-train-compartment/page.tsx` - Central game state management, hotspot rendering, modal orchestration
- **Accessibility System**: `src/components/accessibility/AccessibilityProvider.tsx` - Global accessibility settings, screen reader support
- **Puzzle Components**: `src/components/room/` - Self-contained modal components for each puzzle interaction
- **Type Safety**: `src/types/` - TypeScript definitions for accessibility and game state
- **Database Layer**: `prisma/schema.prisma` - Comprehensive analytics schema (11 tables) for accessibility metrics

## Data Models and APIs

### Data Models

The Prisma schema is extensive with 11 models focused on accessibility analytics:

- **Core Session Tracking**: `RoomSession`, `PuzzleState` - Track user progress and accessibility features used
- **Accessibility Analytics**: `AnalyticsEvent`, `HintUsage` - Detailed interaction tracking for UX optimization
- **Compliance & Feedback**: `AccessibilityAudit`, `UserFeedback` - WCAG compliance monitoring and user experience ratings
- **Aggregation**: `DailyAnalytics` - Performance metrics aggregated by accessibility features
- **Configuration**: `RoomConfiguration`, `UserPreferences` - Room setup and user accessibility preferences

**Critical Note**: Database models are fully defined but NOT YET CONNECTED to the frontend. Game state is currently managed entirely in React state.

### API Specifications

- **tRPC Routers**: `src/server/api/routers/` - Type-safe API endpoints (defined but not fully implemented)
- **Accessibility Router**: Settings and feature detection endpoints
- **Analytics Router**: Event tracking and metrics collection
- **Room Router**: Session management and progress persistence

## Technical Debt and Known Issues

### Critical Technical Debt

1. **Database Integration Gap**: Extensive Prisma schema exists but no actual database calls in game logic - all state is ephemeral React state
2. **tRPC Router Disconnect**: API routers are defined but not connected to frontend components
3. **Missing Analytics**: No actual event tracking despite comprehensive analytics schema
4. **Authentication Stub**: NextAuth.js configured but not implemented or used
5. **Timer System Missing**: PRD requires 5-minute timer with scoring, not implemented
6. **Progressive Hints Incomplete**: Hint system architecture exists but not connected to puzzle components

### Workarounds and Gotchas

- **CSS Optimization Disabled**: `optimizeCss: true` disabled in `next.config.js` due to critters dependency issues
- **Font Loading**: OpenDyslexic font manually downloaded and placed in `public/fonts/` instead of using font provider
- **Modal State Management**: Each puzzle modal manages its own state instead of central game state management
- **Accessibility Announcements**: Using custom announcer instead of more robust screen reader integration

### Current Build/Development Issues

- **Critters Module**: Build fails with `critters` module missing, temporarily disabled CSS optimization
- **Module Type Warning**: Node.js warns about `next.config.js` module type, requires `"type": "module"` in package.json
- **Prisma Generate**: Must run `prisma generate` after npm install, handled in postinstall script

## Integration Points and External Dependencies

### External Services

| Service  | Purpose  | Integration Type | Status |
| -------- | -------- | ---------------- | ------ |
| PostgreSQL | Primary database | Prisma ORM | Schema ready, not connected |
| Vercel   | Hosting platform | Next.js deployment | Implied but not configured |
| Font Libraries | Accessibility fonts | Static files | OpenDyslexic manually added |

### Internal Integration Points

- **Accessibility Context**: Global Zustand store provides accessibility state to all components
- **Modal System**: Radix UI Dialog primitives wrapped in custom Modal component
- **Event System**: Custom announcer for screen reader notifications
- **tRPC Client**: React Query integration for type-safe API calls (not yet used in game logic)

## Development and Deployment

### Local Development Setup

**Working Steps:**
1. `npm install` - Install dependencies (runs `prisma generate` automatically)
2. Set up `.env` file with `DATABASE_URL` (currently not required as DB not connected)
3. `npm run dev` - Start development server on localhost:3000
4. **Known Issue**: CSS optimization warnings, performance slightly degraded

**Environment Variables Required:**
- `DATABASE_URL` - PostgreSQL connection string (not currently used)
- `NEXTAUTH_SECRET` - Authentication secret (not currently used)
- `NODE_ENV` - Environment setting

### Build and Deployment Process

- **Build Command**: `npm run build` - Next.js production build
- **Development**: `npm run dev` - Hot reload development server
- **Database**: `npm run db:push` - Push Prisma schema to database (not currently used)
- **Testing**: `npm run test` - Jest unit tests, `npm run test:e2e` - Playwright E2E tests

### Current Scripts Available

```bash
npm run dev              # Development server
npm run build            # Production build
npm run lint             # ESLint checking
npm run test             # Jest unit tests
npm run test:accessibility  # Accessibility-specific tests
npm run db:studio        # Prisma database GUI
npm run db:seed          # Seed database (empty)
```

## Testing Reality

### Current Test Coverage

- **Unit Tests**: Basic Jest setup, minimal coverage
- **Integration Tests**: Playwright configured for E2E testing with accessibility focus
- **Accessibility Tests**: jest-axe configured for automated a11y testing
- **Manual Testing**: Primary QA method during development

### Testing Infrastructure

- **Accessibility Testing**: `@axe-core/playwright` for automated WCAG compliance checking
- **Component Testing**: `@testing-library/react` for React component testing
- **E2E Testing**: Playwright with accessibility-focused test scenarios
- **Jest Configuration**: Custom setup for accessibility testing with jsdom environment

## Current Game Implementation Status

### Implemented Features (Stories 1 & 2)

**✅ Ticket Math Puzzle (Story 1):**
- Interactive ticket modal with seat B/12, coach C, destination Arden
- Timetable modal showing Platform 5 for Arden departure
- Suitcase lock with 3-digit combination (512 = Platform + Seat digits)
- Progressive hints with solution reveal after 3 attempts
- Accessibility features: keyboard navigation, screen reader announcements

**✅ Punch-Card Overlay System (Story 2):**
- Draggable punch-card overlay component with mouse and keyboard support
- Alignment detection system with grid-based positioning
- Hidden word reveal mechanism (not yet connected to actual word discovery)
- Accessibility announcements for alignment feedback
- Touch and keyboard interaction support

### Game Flow Implementation

1. **Start Screen**: Basic welcome screen with game start button
2. **Main Compartment**: Interactive hotspot system with visual feedback
3. **Progressive Unlocking**: Ticket → Timetable → Suitcase → Punch-card → Intercom (planned)
4. **State Management**: React useState for all game state (no database persistence)
5. **Completion**: Basic completion screen with play again functionality

### Missing Critical Features

- **Timer System**: No countdown timer or time-based scoring
- **Hint System**: Architecture exists but not integrated into puzzles
- **Analytics**: No event tracking or user behavior analytics
- **Persistence**: No database integration for session management
- **Anti-Stuck System**: No automatic guidance for inactive users
- **Final Escape**: Intercom and door keypad systems not implemented

## Puzzle-Specific Implementation Notes

### Suitcase Lock Logic (Fixed)

**Current Implementation**: Platform 5 + Seat 12 = 512
- **First digit**: Platform number (5)
- **Second digit**: First digit of seat (1)
- **Third digit**: Second digit of seat (2)
- **User Experience**: Clear, logical connection between clues and solution

### Punch-Card Overlay System

**Technical Implementation**:
- Grid-based alignment system with 8x6 character matrix
- Drag state management with position tracking
- Keyboard navigation with arrow key support
- Alignment detection with tolerance for positioning
- **Note**: Word discovery mechanism exists but placeholder implementation

### Modal State Architecture

**Pattern Used**: Individual modal state management
- Each puzzle modal manages its own open/close state
- Parent component coordinates between modals
- **Technical Debt**: Should be centralized game state management

## Future Enhancement Impact Areas

### Story 3: Intercom and Final Gate System

**Files That Will Need Modification:**
- `src/app/room/night-train-compartment/page.tsx` - Add intercom interaction and final door logic
- New: `src/components/room/IntercomModal.tsx` - Intercom communication interface
- New: `src/components/room/DoorKeypadModal.tsx` - Final 3-digit door entry
- `src/types/room.ts` - Add new puzzle state types

### Story 4: Progressive Hint System

**Files That Will Need Modification:**
- All puzzle modals in `src/components/room/` - Integrate hint system
- `src/components/accessibility/AccessibilityProvider.tsx` - Add hint state management
- `src/server/api/routers/analytics.ts` - Hint usage tracking
- Database integration for hint effectiveness analytics

### Database Integration (Major Technical Debt)

**Required Changes:**
- Connect tRPC routers to game state management
- Implement session persistence in main game component
- Add analytics event tracking throughout puzzle interactions
- Connect Prisma client to actual database instance

## Appendix - Useful Commands and Scripts

### Frequently Used Commands

```bash
npm run dev              # Start development server (localhost:3000)
npm run build            # Production build with accessibility optimizations
npm run lint             # ESLint with accessibility plugin checking
npm run test:accessibility  # Run accessibility-specific test suite
npm run db:studio        # Open Prisma Studio for database management
```

### Development Workflow

```bash
# Standard development cycle
npm run dev                    # Start development
# Make changes to src/ files
npm run lint                   # Check for issues
npm run test:accessibility     # Verify accessibility compliance
npm run build                  # Test production build
```

### Debugging and Troubleshooting

- **Build Issues**: Check for critters module errors, may need to disable CSS optimization
- **Accessibility Testing**: Use browser dev tools + screen reader for manual testing
- **Database Issues**: Currently not applicable as database not connected
- **Font Loading**: Check `public/fonts/` directory for OpenDyslexic font files
- **Modal Issues**: Verify Radix UI Dialog accessibility attributes in browser inspector

### Accessibility Testing Workflow

```bash
npm run accessibility:audit     # Automated axe-core testing
npm run test:accessibility      # Jest accessibility tests
# Manual testing with screen reader (NVDA/JAWS/VoiceOver)
# Keyboard navigation testing (Tab, Enter, Arrow keys)
# High contrast mode verification
```

---

**Document Status**: This brownfield architecture document reflects the actual state as of January 2024. The system has strong accessibility foundations and two working puzzle implementations, but significant technical debt exists in database integration and analytics implementation. The T3 Stack foundation provides excellent type safety and development experience, though several planned features remain unimplemented.
