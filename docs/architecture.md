# BMad Escape Room - Night Train Experience Fullstack Architecture Document

## Introduction

This document outlines the complete fullstack architecture for BMad Escape Room - Night Train Experience, including backend systems, frontend implementation, and their integration. It serves as the single source of truth for AI-driven development, ensuring consistency across the entire technology stack.

This unified approach combines what would traditionally be separate backend and frontend architecture documents, streamlining the development process for modern fullstack applications where these concerns are increasingly intertwined.

### Starter Template or Existing Project

**Template Choice:** T3 Stack (Create T3 App) - Modern fullstack TypeScript template with Next.js, tRPC, Prisma, and Tailwind CSS

**Rationale:** T3 Stack provides excellent TypeScript end-to-end type safety, built-in accessibility patterns with Next.js, and serverless-ready architecture that aligns perfectly with our PWA requirements and accessibility-first approach. The tRPC integration eliminates REST API boilerplate while maintaining type safety between frontend and backend.

**Key Benefits for Accessibility:**
- Next.js built-in accessibility features and SSR for better screen reader support
- TypeScript ensures accessibility props and ARIA attributes are properly typed
- Tailwind CSS includes comprehensive accessibility utilities out of the box
- Server-side rendering improves initial page load for assistive technologies

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|---------|
| 2024-01-XX | v1.0 | Initial architecture document based on T3 Stack and accessibility-first requirements | BMad Architect |

## High Level Architecture

### Technical Summary

The BMad Escape Room platform employs a modern serverless-first architecture using the T3 Stack with Next.js for the frontend PWA, tRPC for type-safe API communication, and Vercel for deployment with edge computing capabilities. The system prioritizes accessibility compliance through server-side rendering, semantic HTML generation, and progressive enhancement patterns. Analytics and user progress are handled through serverless functions with PostgreSQL database for persistence, while static assets are delivered via Vercel's edge network for optimal performance across diverse user capabilities and connection speeds.

### Platform and Infrastructure Choice

**Platform:** Vercel + Supabase
**Key Services:**
- Vercel Edge Functions for serverless backend
- Supabase PostgreSQL for primary database
- Vercel Edge Network for CDN and static asset delivery
- Supabase Auth for authentication (future enhancement)
- Vercel Analytics for performance monitoring

**Deployment Host and Regions:**
- Primary: Vercel Edge (globally distributed)
- Database: Supabase US-East (with read replicas as needed)
- CDN: Vercel Edge Network (automatic global distribution)

**Rationale:** This combination provides exceptional accessibility performance through edge computing, built-in PWA support, and serverless scalability without infrastructure management overhead. Vercel's edge network ensures consistent performance for users with diverse connection speeds, critical for accessibility compliance.

### Repository Structure

**Structure:** Monorepo with T3 Stack foundation
**Monorepo Tool:** Built-in T3 workspace with npm workspaces
**Package Organization:**
- Single Next.js app with integrated frontend/backend
- Shared utilities for accessibility helpers
- Separate packages for reusable UI components and type definitions

### High Level Architecture Diagram

```mermaid
graph TB
    User[User with Assistive Technology] --> PWA[Next.js PWA App]
    PWA --> CDN[Vercel Edge Network]
    PWA --> tRPC[tRPC API Layer]
    tRPC --> Edge[Vercel Edge Functions]
    Edge --> DB[(Supabase PostgreSQL)]
    Edge --> Analytics[Analytics Collection]
    PWA --> SW[Service Worker]
    SW --> Cache[Offline Cache]
    PWA --> A11y[Accessibility Layer]
    A11y --> SR[Screen Reader APIs]
    A11y --> HC[High Contrast Mode]
    A11y --> KB[Keyboard Navigation]
```

### Architectural Patterns

- **Jamstack + SSR Architecture:** Static generation with server-side rendering for accessibility - _Rationale:_ Ensures content is available to assistive technologies immediately without JavaScript dependencies
- **Progressive Enhancement:** Core functionality works without JavaScript, enhanced with React - _Rationale:_ Critical for accessibility compliance and diverse user capabilities
- **Edge-First Serverless:** Serverless functions deployed to edge locations - _Rationale:_ Reduces latency for global accessibility requirements and provides automatic scaling
- **Type-Safe API Layer:** End-to-end TypeScript with tRPC - _Rationale:_ Prevents runtime errors that could break accessibility features and ensures ARIA attributes are properly typed
- **Component-Based Accessibility:** Reusable accessible components with built-in ARIA patterns - _Rationale:_ Maintains consistency and prevents accessibility regressions across puzzle implementations
- **Data Layer Abstraction:** Prisma ORM with accessibility-optimized queries - _Rationale:_ Ensures data fetching patterns support screen reader performance requirements

## Tech Stack

### Technology Stack Table

| Category | Technology | Version | Purpose | Rationale |
|----------|------------|---------|---------|-----------|
| Frontend Language | TypeScript | 5.0+ | Type-safe UI development | Prevents accessibility attribute errors and ensures proper ARIA typing |
| Frontend Framework | Next.js | 14.0+ | React with SSR/SSG | Built-in accessibility features, SSR for screen readers, PWA support |
| UI Component Library | Headless UI + Radix UI | Latest | Accessible component primitives | WAI-ARIA compliant components with keyboard navigation built-in |
| State Management | Zustand | 4.0+ | Client state management | Lightweight, accessibility-friendly state updates without re-render issues |
| Backend Language | TypeScript | 5.0+ | Serverless function development | Consistent language across stack, strong typing for data validation |
| Backend Framework | Next.js API Routes | 14.0+ | Serverless API endpoints | Integrated with frontend, automatic serverless deployment |
| API Style | tRPC | 10.0+ | Type-safe API communication | End-to-end type safety eliminates API integration errors |
| Database | PostgreSQL (Supabase) | 15.0+ | Primary data storage | ACID compliance for user progress, excellent JSON support for puzzle data |
| Cache | Vercel Edge Cache | Built-in | Static asset and API caching | Automatic edge caching for performance, critical for accessibility users |
| File Storage | Vercel Blob Storage | Built-in | Audio files and large assets | Edge-distributed storage for puzzle audio assets |
| Authentication | NextAuth.js | 5.0+ | User authentication (future) | Accessibility-compliant auth flows, multiple provider support |
| Frontend Testing | Jest + React Testing Library | Latest | Component and accessibility testing | Built-in accessibility testing utilities, screen reader simulation |
| Backend Testing | Jest + Supertest | Latest | API endpoint testing | Integration testing for tRPC procedures and database operations |
| E2E Testing | Playwright | Latest | Full user journey testing | Excellent accessibility testing support, multiple assistive technology simulation |
| Build Tool | Next.js Build System | 14.0+ | Integrated build pipeline | Optimized bundling with accessibility polyfills included |
| Bundler | Turbopack | Built-in | Fast development builds | Faster iteration during accessibility testing cycles |
| IaC Tool | Vercel Configuration | Built-in | Infrastructure as code | Declarative edge function and database configuration |
| CI/CD | GitHub Actions + Vercel | Built-in | Automated testing and deployment | Integrated accessibility testing in pipeline |
| Monitoring | Vercel Analytics + Sentry | Latest | Performance and error tracking | Real User Monitoring with accessibility metrics |
| Logging | Vercel Functions Logs | Built-in | Serverless function logging | Built-in logging with accessibility event tracking |
| CSS Framework | Tailwind CSS | 3.0+ | Utility-first styling | Comprehensive accessibility utilities, consistent focus states |

## Data Models

### Room Progress Model

**Purpose:** Tracks user progress through escape room puzzles with accessibility interaction data

**Key Attributes:**
- sessionId: string - Unique session identifier for anonymous tracking
- roomId: string - Identifier for specific room (night-train-compartment)
- puzzleStates: PuzzleState[] - Array of individual puzzle completion states
- hintsUsed: HintUsage[] - Track hint usage for accessibility analysis
- completionTime: number - Total time spent (includes pause time for accessibility users)
- accessibilityFeatures: AccessibilityUsage - Track which a11y features were used
- createdAt: Date - Session start timestamp
- completedAt: Date | null - Session completion timestamp

#### TypeScript Interface

```typescript
interface RoomProgress {
  sessionId: string;
  roomId: string;
  puzzleStates: PuzzleState[];
  hintsUsed: HintUsage[];
  completionTime: number;
  accessibilityFeatures: AccessibilityUsage;
  createdAt: Date;
  completedAt: Date | null;
  score: number;
  inactivityPauses: number;
}

interface PuzzleState {
  puzzleId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  attempts: number;
  startedAt: Date;
  completedAt: Date | null;
  inputMethod: 'mouse' | 'keyboard' | 'touch' | 'screen_reader';
}

interface HintUsage {
  puzzleId: string;
  hintLevel: 1 | 2 | 3 | 4; // nudge, hint, specific, reveal
  requestedAt: Date;
  helpfulnessRating?: number;
}

interface AccessibilityUsage {
  screenReader: boolean;
  keyboardOnly: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  fontSize: 'normal' | 'large' | 'extra-large';
  dyslexiaFont: boolean;
}
```

#### Relationships
- One Room Progress per session (anonymous)
- One-to-many relationship with Puzzle States
- One-to-many relationship with Hint Usage events

### Analytics Event Model

**Purpose:** Capture detailed user interaction data for accessibility optimization and puzzle improvement

**Key Attributes:**
- eventId: string - Unique event identifier
- sessionId: string - Links to room progress
- eventType: string - Type of interaction (click, keyboard, drag, etc.)
- elementId: string - Specific UI element interacted with
- timestamp: Date - Precise interaction timestamp
- accessibilityContext: AccessibilityContext - Assistive technology context
- duration: number - Time spent on interaction
- successful: boolean - Whether interaction achieved intended result

#### TypeScript Interface

```typescript
interface AnalyticsEvent {
  eventId: string;
  sessionId: string;
  eventType: 'hotspot_click' | 'hint_request' | 'puzzle_attempt' | 'navigation' | 'error_recovery';
  elementId: string;
  timestamp: Date;
  accessibilityContext: AccessibilityContext;
  duration: number;
  successful: boolean;
  errorMessage?: string;
  assistiveTechnology?: string;
}

interface AccessibilityContext {
  inputMethod: 'mouse' | 'keyboard' | 'touch' | 'screen_reader' | 'voice';
  assistiveTech: string | null;
  viewportSize: string;
  colorScheme: 'light' | 'dark' | 'high-contrast';
  reducedMotion: boolean;
  focusVisible: boolean;
}
```

#### Relationships
- Many-to-one relationship with Room Progress
- Used for aggregate accessibility analytics

## API Specification

### tRPC Router Definitions

```typescript
// Main application router
export const appRouter = router({
  room: roomRouter,
  analytics: analyticsRouter,
  accessibility: accessibilityRouter,
});

// Room-specific procedures
export const roomRouter = router({
  // Get room configuration with accessibility options
  getRoom: publicProcedure
    .input(z.object({ roomId: z.string() }))
    .query(async ({ input }) => {
      return await getRoomConfiguration(input.roomId);
    }),

  // Start new room session
  startSession: publicProcedure
    .input(z.object({
      roomId: z.string(),
      accessibilityPreferences: accessibilityPreferencesSchema
    }))
    .mutation(async ({ input }) => {
      return await createRoomSession(input);
    }),

  // Update puzzle progress
  updateProgress: publicProcedure
    .input(z.object({
      sessionId: z.string(),
      puzzleId: z.string(),
      state: puzzleStateSchema,
      inputMethod: z.enum(['mouse', 'keyboard', 'touch', 'screen_reader'])
    }))
    .mutation(async ({ input }) => {
      return await updatePuzzleProgress(input);
    }),

  // Request hint with accessibility context
  requestHint: publicProcedure
    .input(z.object({
      sessionId: z.string(),
      puzzleId: z.string(),
      hintLevel: z.number().min(1).max(4),
      accessibilityContext: accessibilityContextSchema
    }))
    .mutation(async ({ input }) => {
      return await provideAccessibleHint(input);
    }),

  // Complete room session
  completeSession: publicProcedure
    .input(z.object({
      sessionId: z.string(),
      completionData: sessionCompletionSchema
    }))
    .mutation(async ({ input }) => {
      return await completeRoomSession(input);
    }),
});

// Analytics procedures for accessibility insights
export const analyticsRouter = router({
  // Track accessibility interaction
  trackInteraction: publicProcedure
    .input(analyticsEventSchema)
    .mutation(async ({ input }) => {
      return await trackAccessibilityEvent(input);
    }),

  // Get accessibility usage statistics (for optimization)
  getAccessibilityStats: publicProcedure
    .input(z.object({ roomId: z.string() }))
    .query(async ({ input }) => {
      return await getAccessibilityUsageStats(input.roomId);
    }),
});

// Accessibility-specific procedures
export const accessibilityRouter = router({
  // Get room content in screen reader optimized format
  getScreenReaderContent: publicProcedure
    .input(z.object({ roomId: z.string(), sectionId: z.string() }))
    .query(async ({ input }) => {
      return await getScreenReaderOptimizedContent(input);
    }),

  // Validate accessibility compliance
  validateCompliance: publicProcedure
    .input(z.object({ roomId: z.string() }))
    .query(async ({ input }) => {
      return await validateAccessibilityCompliance(input.roomId);
    }),
});

export type AppRouter = typeof appRouter;
```

## Components

### Accessibility Engine Component

**Responsibility:** Central accessibility management system that handles all WCAG compliance features, assistive technology integration, and accessibility preference management across the entire application.

**Key Interfaces:**
- AccessibilityProvider React context for global a11y state
- Screen reader announcement system
- Keyboard navigation coordinator
- High contrast mode controller

**Dependencies:** Browser Web APIs, localStorage for preferences persistence

**Technology Stack:** React Context, Web APIs (Screen Reader API, Media Queries), TypeScript for type-safe accessibility configurations

### Puzzle Interaction Manager

**Responsibility:** Handles all puzzle-specific interactions with accessibility adaptations, including drag-and-drop alternatives, keyboard navigation patterns, and assistive technology compatibility for each puzzle type.

**Key Interfaces:**
- Unified interaction API supporting mouse, keyboard, touch, and assistive technology
- Puzzle state validation with accessibility context
- Progress tracking with interaction method analysis

**Dependencies:** Accessibility Engine, Room State Manager, Analytics Tracker

**Technology Stack:** React hooks, Web APIs for gesture handling, Zustand for interaction state

### Progressive Hint System

**Responsibility:** Manages the 4-tier hint system with accessibility-aware delivery, ensuring hints are properly announced to screen readers and formatted for diverse cognitive needs.

**Key Interfaces:**
- Hint request handler with accessibility context
- Structured hint content delivery (text, audio, visual)
- Hint effectiveness tracking for accessibility analytics

**Dependencies:** Room State Manager, Accessibility Engine, Analytics Tracker

**Technology Stack:** React components, tRPC for hint retrieval, audio synthesis for screen reader users

### Room State Manager

**Responsibility:** Central state management for room progress, puzzle states, and user session data with real-time synchronization and offline capability for accessibility users who may need longer interaction times.

**Key Interfaces:**
- Room progress API with accessibility metrics
- Puzzle state synchronization
- Session persistence and recovery

**Dependencies:** tRPC client, local storage, Zustand state management

**Technology Stack:** Zustand for state management, tRPC for server synchronization, IndexedDB for offline persistence

### Analytics Tracker

**Responsibility:** Collects and transmits accessibility-focused analytics data to understand user interaction patterns, identify accessibility barriers, and optimize the experience for diverse user needs.

**Key Interfaces:**
- Event tracking API with accessibility context
- Privacy-compliant data collection
- Real-time accessibility metrics

**Dependencies:** Accessibility Engine, privacy compliance utilities

**Technology Stack:** Custom analytics layer, Vercel Analytics integration, privacy-first data collection

### Component Diagrams

```mermaid
graph TD
    A[Accessibility Engine] --> B[Puzzle Interaction Manager]
    A --> C[Progressive Hint System]
    A --> D[Room State Manager]
    B --> E[Analytics Tracker]
    C --> E
    D --> E
    F[PWA Shell] --> A
    F --> D
    G[UI Components] --> A
    G --> B
    H[Service Worker] --> D
    I[tRPC Client] --> D
    I --> C
```

## External APIs

No external APIs are required for the MVP implementation. All functionality is provided through the internal tRPC API and Vercel/Supabase infrastructure. Future enhancements may include:

- Web Speech API for voice interaction (browser-native)
- Screen Reader API for enhanced assistive technology integration (browser-native)
- Social sharing APIs (built into browsers/OS)

## Core Workflows

### Accessibility-First Room Entry Workflow

```mermaid
sequenceDiagram
    participant U as User with AT
    participant PWA as Next.js PWA
    participant A11y as Accessibility Engine
    participant tRPC as tRPC API
    participant DB as Supabase DB

    U->>PWA: Navigate to room
    PWA->>A11y: Initialize accessibility context
    A11y->>A11y: Detect assistive technology
    A11y->>PWA: Apply accessibility preferences
    PWA->>tRPC: Request room configuration
    tRPC->>DB: Fetch room data with a11y options
    DB-->>tRPC: Return accessible room config
    tRPC-->>PWA: Accessible room data
    PWA->>A11y: Setup screen reader announcements
    A11y->>U: Announce room loaded and available interactions
    PWA->>U: Render accessible room interface
```

### Progressive Hint Request Workflow

```mermaid
sequenceDiagram
    participant U as User
    participant UI as Puzzle UI
    participant HSys as Hint System
    participant A11y as Accessibility Engine
    participant Analytics as Analytics Tracker
    participant tRPC as tRPC API

    U->>UI: Request hint (keyboard/click/voice)
    UI->>A11y: Get accessibility context
    A11y-->>UI: Return user capabilities and preferences
    UI->>HSys: Request hint with a11y context
    HSys->>tRPC: Fetch appropriate hint level
    tRPC-->>HSys: Return structured hint content
    HSys->>A11y: Format hint for user's needs
    A11y-->>HSys: Accessible hint format
    HSys->>Analytics: Track hint usage with a11y data
    HSys->>U: Deliver accessible hint
    A11y->>U: Announce hint availability to screen reader
```

## Database Schema

```sql
-- User session and progress tracking
CREATE TABLE room_sessions (
  session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  total_time_seconds INTEGER DEFAULT 0,
  score INTEGER DEFAULT 0,
  accessibility_features JSONB DEFAULT '{}',
  inactivity_pauses INTEGER DEFAULT 0,
  completion_method VARCHAR(50), -- 'completed', 'timeout', 'abandoned'

  -- Indexes for analytics queries
  INDEX idx_room_sessions_room_id (room_id),
  INDEX idx_room_sessions_created_at (created_at),
  INDEX idx_room_sessions_accessibility ((accessibility_features->>'screenReader'))
);

-- Individual puzzle progress within sessions
CREATE TABLE puzzle_states (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES room_sessions(session_id) ON DELETE CASCADE,
  puzzle_id VARCHAR(50) NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('not_started', 'in_progress', 'completed')),
  attempts INTEGER DEFAULT 0,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  input_method VARCHAR(20) NOT NULL CHECK (input_method IN ('mouse', 'keyboard', 'touch', 'screen_reader')),
  time_spent_seconds INTEGER DEFAULT 0,

  -- Composite index for session queries
  INDEX idx_puzzle_states_session_puzzle (session_id, puzzle_id),
  UNIQUE(session_id, puzzle_id)
);

-- Hint usage tracking for accessibility analysis
CREATE TABLE hint_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES room_sessions(session_id) ON DELETE CASCADE,
  puzzle_id VARCHAR(50) NOT NULL,
  hint_level INTEGER NOT NULL CHECK (hint_level BETWEEN 1 AND 4),
  requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  accessibility_context JSONB NOT NULL,
  helpfulness_rating INTEGER CHECK (helpfulness_rating BETWEEN 1 AND 5),

  -- Index for hint effectiveness analysis
  INDEX idx_hint_usage_puzzle_level (puzzle_id, hint_level),
  INDEX idx_hint_usage_accessibility ((accessibility_context->>'inputMethod'))
);

-- Detailed interaction analytics for accessibility optimization
CREATE TABLE analytics_events (
  event_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES room_sessions(session_id) ON DELETE CASCADE,
  event_type VARCHAR(50) NOT NULL,
  element_id VARCHAR(100),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  accessibility_context JSONB NOT NULL,
  duration_ms INTEGER,
  successful BOOLEAN NOT NULL,
  error_message TEXT,
  assistive_technology VARCHAR(100),

  -- Partitioning by date for performance
  PARTITION BY RANGE (timestamp),
  INDEX idx_analytics_events_session (session_id),
  INDEX idx_analytics_events_type_time (event_type, timestamp),
  INDEX idx_analytics_events_accessibility ((accessibility_context->>'assistiveTech'))
);

-- Room configuration and puzzle definitions
CREATE TABLE room_configurations (
  room_id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  estimated_time_minutes INTEGER NOT NULL,
  difficulty_level INTEGER CHECK (difficulty_level BETWEEN 1 AND 5),
  accessibility_features TEXT[] NOT NULL, -- Array of supported a11y features
  puzzle_sequence JSONB NOT NULL, -- Ordered list of puzzle configurations
  randomization_config JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Initialize with Night Train Compartment room
INSERT INTO room_configurations (room_id, name, description, estimated_time_minutes, difficulty_level, accessibility_features, puzzle_sequence)
VALUES (
  'night-train-compartment',
  'The Night Train Compartment',
  'A cozy midnight rail mystery featuring tactile puzzles and progressive assistance',
  5,
  2,
  ARRAY['screen_reader', 'keyboard_navigation', 'high_contrast', 'dyslexia_font', 'reduced_motion'],
  '{
    "puzzles": [
      {
        "id": "ticket-math",
        "name": "Seat Row + Platform",
        "type": "combination_lock",
        "hints": [
          "Seat row and platform—two numbers, one lock.",
          "Find the platform for your destination on the board.",
          "Order: row then platform.",
          "The combination is 125"
        ]
      },
      {
        "id": "punch-card",
        "name": "Punch the Route",
        "type": "overlay_alignment",
        "hints": [
          "Overlays belong on the board.",
          "Align markers. Letters appear through the holes.",
          "It''s a 4-letter word you can tell the conductor.",
          "The word is PASS"
        ]
      },
      {
        "id": "final-gate",
        "name": "Announce and Proceed",
        "type": "intercom_keypad",
        "hints": [
          "Tell the intercom the word you found.",
          "Press TALK.",
          "Use the three digits on the door.",
          "The code is 374"
        ]
      }
    ]
  }'
);
```

## Frontend Architecture

### Component Architecture

#### Component Organization

```
src/
├── components/
│   ├── accessibility/          # Accessibility-specific components
│   │   ├── ScreenReaderAnnouncer.tsx
│   │   ├── FocusManager.tsx
│   │   ├── HighContrastToggle.tsx
│   │   └── AccessibilityProvider.tsx
│   ├── room/                   # Room-specific components
│   │   ├── RoomShell.tsx
│   │   ├── CompartmentScene.tsx
│   │   ├── HotspotManager.tsx
│   │   └── InventoryPanel.tsx
│   ├── puzzles/                # Individual puzzle components
│   │   ├── TicketInspection.tsx
│   │   ├── SuitcaseLock.tsx
│   │   ├── PunchCardOverlay.tsx
│   │   └── IntercomKeypad.tsx
│   ├── hints/                  # Hint system components
│   │   ├── HintPanel.tsx
│   │   ├── ProgressiveHint.tsx
│   │   └── HintButton.tsx
│   ├── ui/                     # Base UI components (accessible)
│   │   ├── Button.tsx
│   │   ├── Modal.tsx
│   │   ├── Card.tsx
│   │   └── Timer.tsx
│   └── layout/                 # Layout components
│       ├── PWAShell.tsx
│       ├── NavigationBar.tsx
│       └── SkipLinks.tsx
```

#### Component Template

```typescript
// Accessible component template with proper TypeScript and ARIA support
import { forwardRef, useId } from 'react';
import { cn } from '@/lib/utils';
import { useAccessibility } from '@/hooks/useAccessibility';

interface AccessibleComponentProps {
  children: React.ReactNode;
  ariaLabel?: string;
  describedBy?: string;
  className?: string;
  onInteraction?: (method: 'mouse' | 'keyboard' | 'screen_reader') => void;
}

export const AccessibleComponent = forwardRef<
  HTMLDivElement,
  AccessibleComponentProps
>(({ children, ariaLabel, describedBy, className, onInteraction }, ref) => {
  const id = useId();
  const { announceToScreenReader, trackInteraction } = useAccessibility();

  const handleInteraction = (event: React.SyntheticEvent) => {
    const method = event.nativeEvent.detail === 0 ? 'keyboard' : 'mouse';
    trackInteraction(id, method);
    onInteraction?.(method);
  };

  return (
    <div
      ref={ref}
      id={id}
      className={cn(
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        'transition-all duration-200',
        className
      )}
      role="region"
      aria-label={ariaLabel}
      aria-describedby={describedBy}
      onClick={handleInteraction}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleInteraction(e);
        }
      }}
      tabIndex={0}
    >
      {children}
    </div>
  );
});

AccessibleComponent.displayName = 'AccessibleComponent';
```

### State Management Architecture

#### State Structure

```typescript
// Global application state with accessibility focus
interface AppState {
  // Room session state
  session: {
    sessionId: string | null;
    roomId: string | null;
    startTime: Date | null;
    isActive: boolean;
  };

  // Accessibility preferences and state
  accessibility: {
    preferences: {
      screenReader: boolean;
      keyboardOnly: boolean;
      highContrast: boolean;
      reducedMotion: boolean;
      fontSize: 'normal' | 'large' | 'extra-large';
      dyslexiaFont: boolean;
    };
    currentInputMethod: 'mouse' | 'keyboard' | 'touch' | 'screen_reader';
    announcementQueue: string[];
    focusHistory: string[];
  };

  // Room and puzzle state
  room: {
    config: RoomConfiguration | null;
    currentScene: string;
    hotspots: HotspotState[];
    inventory: InventoryItem[];
  };

  // Puzzle progress
  puzzles: Record<string, PuzzleState>;

  // Hint system state
  hints: {
    available: Record<string, number>; // puzzle_id -> max_level
    used: HintUsage[];
    currentRequest: string | null;
  };

  // Analytics and performance
  analytics: {
    events: AnalyticsEvent[];
    pendingEvents: AnalyticsEvent[];
    uploadQueue: string[];
  };
}

// Zustand store with accessibility-optimized updates
export const useAppStore = create<AppState & AppActions>((set, get) => ({
  // Initial state
  session: { sessionId: null, roomId: null, startTime: null, isActive: false },
  accessibility: {
    preferences: getStoredAccessibilityPreferences(),
    currentInputMethod: 'mouse',
    announcementQueue: [],
    focusHistory: [],
  },
  room: { config: null, currentScene: 'main', hotspots: [], inventory: [] },
  puzzles: {},
  hints: { available: {}, used: [], currentRequest: null },
  analytics: { events: [], pendingEvents: [], uploadQueue: [] },

  // Actions with accessibility considerations
  updateAccessibilityPreference: (key, value) =>
    set((state) => {
      const newPreferences = { ...state.accessibility.preferences, [key]: value };
      storeAccessibilityPreferences(newPreferences);
      return {
        accessibility: {
          ...state.accessibility,
          preferences: newPreferences,
        },
      };
    }),

  announceToScreenReader: (message) =>
    set((state) => ({
      accessibility: {
        ...state.accessibility,
        announcementQueue: [...state.accessibility.announcementQueue, message],
      },
    })),
}));
```

#### State Management Patterns

- **Accessibility-First Updates:** All state changes consider screen reader announcements and focus management
- **Optimistic UI with Rollback:** State updates happen immediately with server sync, rolling back if accessibility validation fails
- **Event-Driven Architecture:** State changes trigger accessibility events (announcements, focus updates)
- **Persistence Strategy:** Critical accessibility preferences stored locally, session data synced with server
- **Performance Optimization:** State slices prevent unnecessary re-renders during accessibility feature updates

### Routing Architecture

#### Route Organization

```
pages/
├── index.tsx                   # Landing page with accessibility intro
├── room/
│   └── [roomId].tsx           # Dynamic room pages with SSR for accessibility
├── accessibility/
│   ├── statement.tsx          # Accessibility statement page
│   ├── help.tsx              # Accessibility help and tutorials
│   └── feedback.tsx          # Accessibility feedback form
├── api/
│   └── trpc/
│       └── [trpc].ts         # tRPC API handler
├── _app.tsx                   # App wrapper with accessibility providers
├── _document.tsx             # Custom document with accessibility meta tags
└── 404.tsx                   # Accessible 404 page
```

#### Protected Route Pattern

```typescript
// Accessibility-aware route protection
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAccessibility } from '@/hooks/useAccessibility';
import { useAppStore } from '@/store/app';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresSession?: boolean;
  accessibilityLevel?: 'basic' | 'enhanced';
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiresSession = false,
  accessibilityLevel = 'basic',
}) => {
  const router = useRouter();
  const { announceToScreenReader } = useAccessibility();
  const { session, accessibility } = useAppStore();

  useEffect(() => {
    // Check session requirement
    if (requiresSession && !session.isActive) {
      announceToScreenReader('Session required. Redirecting to start page.');
      router.push('/');
      return;
    }

    // Check accessibility compatibility
    if (accessibilityLevel === 'enhanced') {
      const hasEnhancedSupport = checkEnhancedAccessibilitySupport();
      if (!hasEnhancedSupport) {
        announceToScreenReader('Enhanced accessibility features not available. Providing alternative experience.');
        // Provide fallback experience rather than blocking access
      }
    }

    // Announce successful route access
    announceToScreenReader(`Entered ${router.pathname}. Page content loading.`);
  }, [router.pathname, session.isActive, accessibilityLevel]);

  return <>{children}</>;
};

// Check for enhanced accessibility feature support
function checkEnhancedAccessibilitySupport(): boolean {
  if (typeof window === 'undefined') return false;

  return !!(
    window.speechSynthesis &&
    window.SpeechRecognition &&
    CSS.supports('prefers-reduced-motion', 'reduce')
  );
}
```

### Frontend Services Layer

#### API Client Setup

```typescript
// tRPC client with accessibility-aware error handling
import { createTRPCNext } from '@trpc/next';
import { httpBatchLink, loggerLink } from '@trpc/client';
import type { AppRouter } from '@/server/api/root';
import { useAccessibility } from '@/hooks/useAccessibility';

function getBaseUrl() {
  if (typeof window !== 'undefined') return '';
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const api = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          headers() {
            // Include accessibility context in all requests
            const accessibilityContext = getAccessibilityContext();
            return {
              'X-Accessibility-Context': JSON.stringify(accessibilityContext),
            };
          },
        }),
      ],
      queryClientConfig: {
        defaultOptions: {
          queries: {
            // Longer timeout for users with accessibility needs
            staleTime: 30000,
            retry: (failureCount, error) => {
              // Accessibility-aware retry logic
              const maxRetries = getAccessibilityRetryCount();
              return failureCount < maxRetries;
            },
            onError: (error) => {
              // Announce API errors to screen readers
              announceAccessibleError(error);
            },
          },
        },
      },
    };
  },
  ssr: false, // Using SSG for better accessibility performance
});

// Get current accessibility context for API requests
function getAccessibilityContext() {
  if (typeof window === 'undefined') return {};

  return {
    screenReader: window.navigator.userAgent.includes('NVDA') ||
                  window.navigator.userAgent.includes('JAWS') ||
                  window.speechSynthesis?.speaking,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    highContrast: window.matchMedia('(prefers-contrast: high)').matches,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
  };
}
```

#### Service Example

```typescript
// Room service with accessibility integration
import { api } from '@/utils/api';
import { useAccessibility } from '@/hooks/useAccessibility';
import { useAppStore } from '@/store/app';

export function useRoomService(roomId: string) {
  const { announceToScreenReader, trackInteraction } = useAccessibility();
  const { updateAccessibilityPreference } = useAppStore();

  // Start room session with accessibility preferences
  const startSession = api.room.startSession.useMutation({
    onSuccess: (data) => {
      announceToScreenReader(`Room session started. ${data.accessibilityFeatures.length} accessibility features available.`);
      trackInteraction('session_start', 'api');
    },
    onError: (error) => {
      announceToScreenReader(`Error starting room session: ${error.message}`);
    },
  });

  // Update puzzle progress with interaction tracking
  const updateProgress = api.room.updateProgress.useMutation({
    onMutate: (variables) => {
      // Optimistic update for better accessibility UX
      trackInteraction('puzzle_progress', variables.inputMethod);
    },
    onSuccess: (data) => {
      if (data.completed) {
        announceToScreenReader(`Puzzle completed! Moving to next challenge.`);
      }
    },
  });

  // Request hint with accessibility context
  const requestHint = api.room.requestHint.useMutation({
    onSuccess: (data) => {
      announceToScreenReader(`Hint available: ${data.accessibleText}`);
      // Auto-focus hint content for screen readers
      setTimeout(() => {
        document.getElementById('hint-content')?.focus();
      }, 100);
    },
  });

  return {
    startSession: startSession.mutate,
    updateProgress: updateProgress.mutate,
    requestHint: requestHint.mutate,
    isLoading: startSession.isLoading || updateProgress.isLoading,
  };
}
```

## Backend Architecture

### Service Architecture

#### Serverless Function Organization

```
src/server/
├── api/
│   ├── routers/                # tRPC routers
│   │   ├── room.ts            # Room management procedures
│   │   ├── analytics.ts       # Analytics collection procedures
│   │   └── accessibility.ts   # Accessibility-specific procedures
│   ├── root.ts                # Main tRPC router
│   └── trpc.ts               # tRPC configuration
├── db/
│   ├── schema.ts             # Prisma schema definitions
│   ├── migrations/           # Database migrations
│   └── seed.ts              # Accessibility test data
├── lib/
│   ├── accessibility/        # Accessibility utility functions
│   │   ├── compliance.ts     # WCAG validation utilities
│   │   ├── screen-reader.ts  # Screen reader optimization
│   │   └── analytics.ts      # Accessibility analytics
│   ├── puzzles/             # Puzzle logic modules
│   │   ├── ticket-math.ts   # Ticket + platform puzzle logic
│   │   ├── punch-card.ts    # Overlay alignment logic
│   │   └── final-gate.ts    # Intercom + keypad logic
│   └── utils/               # Shared utilities
│       ├── validation.ts    # Input validation with accessibility
│       ├── errors.ts        # Accessible error formatting
│       └── cache.ts         # Edge cache optimization
└── middleware/
    ├── accessibility.ts     # Accessibility context middleware
    ├── analytics.ts        # Analytics collection middleware
    └── validation.ts       # Request validation middleware
```

#### Function Template

```typescript
// Serverless function template with accessibility context
import { type NextRequest } from 'next/server';
import { z } from 'zod';
import { createTRPCContext } from '@/server/api/trpc';
import { appRouter } from '@/server/api/root';
import { validateAccessibilityContext } from '@/server/lib/accessibility/compliance';

// Input validation with accessibility considerations
const accessibilityAwareInput = z.object({
  sessionId: z.string().uuid(),
  data: z.record(z.any()),
  accessibilityContext: z.object({
    inputMethod: z.enum(['mouse', 'keyboard', 'touch', 'screen_reader']),
    assistiveTech: z.string().optional(),
    reducedMotion: z.boolean().default(false),
    highContrast: z.boolean().default(false),
    screenReaderActive: z.boolean().default(false),
  }),
});

export async function POST(req: NextRequest) {
  try {
    // Parse and validate input
    const body = await req.json();
    const input = accessibilityAwareInput.parse(body);

    // Validate accessibility context
    const contextValidation = await validateAccessibilityContext(input.accessibilityContext);
    if (!contextValidation.valid) {
      return Response.json(
        { error: 'Invalid accessibility context', details: contextValidation.errors },
        { status: 400 }
      );
    }

    // Create tRPC context with accessibility data
    const ctx = await createTRPCContext({
      req,
      accessibilityContext: input.accessibilityContext,
    });

    // Execute tRPC procedure
    const caller = appRouter.createCaller(ctx);
    const result = await caller.room.updateProgress({
      ...input.data,
      accessibilityContext: input.accessibilityContext,
    });

    // Format response for accessibility
    const accessibleResponse = await formatAccessibleResponse(result, input.accessibilityContext);

    return Response.json(accessibleResponse);
  } catch (error) {
    // Accessibility-aware error handling
    const accessibleError = await formatAccessibleError(error);
    return Response.json(accessibleError, { status: 500 });
  }
}

// Format response based on accessibility context
async function formatAccessibleResponse(data: any, context: AccessibilityContext) {
  const response = { ...data };

  // Add screen reader optimized content
  if (context.screenReaderActive) {
    response.screenReaderText = await generateScreenReaderText(data);
    response.ariaLiveMessage = generateAriaLiveMessage(data);
  }

  // Add reduced motion alternatives
  if (context.reducedMotion) {
    response.animations = 'disabled';
    response.transitions = 'instant';
  }

  // Include accessibility metadata
  response.accessibilityMetadata = {
    wcagLevel: 'AA',
    screenReaderTested: true,
    keyboardAccessible: true,
    contrastRatio: context.highContrast ? 'AAA' : 'AA',
  };

  return response;
}
```

### Database Architecture

#### Schema Design

```typescript
// Prisma schema with accessibility optimizations
model RoomSession {
  id        String   @id @default(cuid())
  sessionId String   @unique
  roomId    String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Accessibility tracking
  accessibilityFeatures Json     @default("{}")
  inputMethods         String[]  @default([])
  assistiveTechnology  String?

  // Performance tracking for accessibility
  totalTimeSeconds    Int      @default(0)
  inactivityPauses    Int      @default(0)
  hintRequests        Int      @default(0)

  // Relationships
  puzzleStates        PuzzleState[]
  hintUsage          HintUsage[]
  analyticsEvents    AnalyticsEvent[]

  @@map("room_sessions")
  @@index([roomId, createdAt])
  @@index([accessibilityFeatures(path: "$.screenReader")])
}

model PuzzleState {
  id        String   @id @default(cuid())
  sessionId String
  puzzleId  String
  status    String   // 'not_started', 'in_progress', 'completed'
  attempts  Int      @default(0)

  // Accessibility interaction data
  inputMethod    String   // 'mouse', 'keyboard', 'touch', 'screen_reader'
  timeSpent      Int      @default(0)
  hintsUsed      Int      @default(0)
  errorCount     Int      @default(0)

  startedAt   DateTime?
  completedAt DateTime?

  // Relationships
  session RoomSession @relation(fields: [sessionId], references: [sessionId], onDelete: Cascade)

  @@map("puzzle_states")
  @@unique([sessionId, puzzleId])
  @@index([puzzleId, status])
}
```

#### Data Access Layer

```typescript
// Repository pattern with accessibility considerations
import { PrismaClient } from '@prisma/client';
import type { AccessibilityContext } from '@/types/accessibility';

export class AccessibilityAwareRepository {
  constructor(private prisma: PrismaClient) {}

  // Create session with accessibility context
  async createSession(data: {
    roomId: string;
    accessibilityContext: AccessibilityContext;
  }) {
    return await this.prisma.roomSession.create({
      data: {
        sessionId: generateSessionId(),
        roomId: data.roomId,
        accessibilityFeatures: data.accessibilityContext,
        inputMethods: [data.accessibilityContext.inputMethod],
        assistiveTechnology: data.accessibilityContext.assistiveTech,
      },
    });
  }

  // Update puzzle progress with accessibility tracking
  async updatePuzzleProgress(data: {
    sessionId: string;
    puzzleId: string;
    status: string;
    inputMethod: string;
    timeSpent: number;
  }) {
    // Update puzzle state
    const puzzleState = await this.prisma.puzzleState.upsert({
      where: {
        sessionId_puzzleId: {
          sessionId: data.sessionId,
          puzzleId: data.puzzleId,
        },
      },
      update: {
        status: data.status,
        attempts: { increment: 1 },
        timeSpent: { increment: data.timeSpent },
        inputMethod: data.inputMethod,
        completedAt: data.status === 'completed' ? new Date() : null,
      },
      create: {
        sessionId: data.sessionId,
        puzzleId: data.puzzleId,
        status: data.status,
        attempts: 1,
        inputMethod: data.inputMethod,
        timeSpent: data.timeSpent,
        startedAt: new Date(),
        completedAt: data.status === 'completed' ? new Date() : null,
      },
    });

    // Update session input methods tracking
    await this.prisma.roomSession.update({
      where: { sessionId: data.sessionId },
      data: {
        inputMethods: {
          push: data.inputMethod,
        },
        updatedAt: new Date(),
      },
    });

    return puzzleState;
  }

  // Get accessibility usage statistics
  async getAccessibilityStats(roomId: string) {
    const stats = await this.prisma.roomSession.groupBy({
      by: ['accessibilityFeatures'],
      where: { roomId },
      _count: true,
      _avg: {
        totalTimeSeconds: true,
        hintRequests: true,
      },
    });

    return this.formatAccessibilityStats(stats);
  }

  private formatAccessibilityStats(rawStats: any[]) {
    return {
      screenReaderUsage: this.calculateFeatureUsage(rawStats, 'screenReader'),
      keyboardOnlyUsage: this.calculateFeatureUsage(rawStats, 'keyboardOnly'),
      highContrastUsage: this.calculateFeatureUsage(rawStats, 'highContrast'),
      averageCompletionTime: this.calculateAverageByFeature(rawStats),
      mostCommonInputMethods: this.calculateInputMethodDistribution(rawStats),
    };
  }
}
```

### Authentication and Authorization

#### Auth Flow

```mermaid
sequenceDiagram
    participant U as User
    participant PWA as Next.js PWA
    participant Auth as NextAuth.js
    participant Provider as Auth Provider
    participant DB as Supabase

    Note over U,DB: Future Enhancement - MVP uses anonymous sessions

    U->>PWA: Access room (anonymous)
    PWA->>PWA: Generate anonymous session
    PWA->>DB: Create anonymous session record
    DB-->>PWA: Session confirmation
    PWA->>U: Begin room experience

    Note over U,DB: Optional authentication for progress saving

    U->>PWA: Choose to save progress
    PWA->>Auth: Initiate auth flow
    Auth->>Provider: OAuth/Magic Link
    Provider-->>Auth: User identity
    Auth->>DB: Link session to user
    DB-->>Auth: Confirmation
    Auth-->>PWA: Authenticated session
    PWA->>U: Progress will be saved
```

#### Middleware/Guards

```typescript
// Accessibility-aware authentication middleware
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { validateAccessibilityContext } from '@/lib/accessibility';

export async function accessibilityAwareAuth(
  req: NextRequest,
  requiredLevel: 'anonymous' | 'authenticated' = 'anonymous'
) {
  const token = await getToken({ req });

  // Extract accessibility context from headers
  const accessibilityHeader = req.headers.get('X-Accessibility-Context');
  const accessibilityContext = accessibilityHeader
    ? JSON.parse(accessibilityHeader)
    : {};

  // Validate accessibility context
  const contextValidation = await validateAccessibilityContext(accessibilityContext);
  if (!contextValidation.valid) {
    return NextResponse.json(
      {
        error: 'Invalid accessibility context',
        accessibleMessage: 'There was a problem with accessibility settings. Please refresh and try again.',
        details: contextValidation.errors
      },
      { status: 400 }
    );
  }

  // Handle anonymous access (MVP default)
  if (requiredLevel === 'anonymous') {
    // Generate or validate anonymous session
    const sessionId = req.headers.get('X-Session-Id') || generateAnonymousSession();

    return NextResponse.next({
      request: {
        headers: new Headers({
          ...req.headers,
          'X-Session-Id': sessionId,
          'X-Accessibility-Context': JSON.stringify(accessibilityContext),
        }),
      },
    });
  }

  // Handle authenticated access (future enhancement)
  if (requiredLevel === 'authenticated' && !token) {
    return NextResponse.json(
      {
        error: 'Authentication required',
        accessibleMessage: 'Please sign in to access this feature.',
        redirectUrl: '/auth/signin',
      },
      { status: 401 }
    );
  }

  return NextResponse.next();
}

function generateAnonymousSession(): string {
  return `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
```

## Unified Project Structure

```
bmad-escape-room/
├── .github/                    # CI/CD workflows
│   └── workflows/
│       ├── ci.yaml            # Accessibility testing pipeline
│       ├── deploy.yaml        # Multi-environment deployment
│       └── accessibility-audit.yaml  # Weekly a11y compliance checks
├── src/                       # Next.js application
│   ├── components/            # React components
│   │   ├── accessibility/     # Accessibility-specific components
│   │   │   ├── ScreenReaderAnnouncer.tsx
│   │   │   ├── FocusManager.tsx
│   │   │   ├── HighContrastToggle.tsx
│   │   │   ├── SkipLinks.tsx
│   │   │   └── AccessibilityProvider.tsx
│   │   ├── room/              # Room components
│   │   │   ├── RoomShell.tsx
│   │   │   ├── CompartmentScene.tsx
│   │   │   ├── HotspotManager.tsx
│   │   │   ├── InventoryPanel.tsx
│   │   │   └── Timer.tsx
│   │   ├── puzzles/           # Puzzle-specific components
│   │   │   ├── TicketInspection.tsx
│   │   │   ├── SuitcaseLock.tsx
│   │   │   ├── PunchCardOverlay.tsx
│   │   │   ├── IntercomKeypad.tsx
│   │   │   └── PuzzleContainer.tsx
│   │   ├── hints/             # Hint system components
│   │   │   ├── HintPanel.tsx
│   │   │   ├── ProgressiveHint.tsx
│   │   │   ├── HintButton.tsx
│   │   │   └── InactivityDetector.tsx
│   │   └── ui/                # Base accessible UI components
│   │       ├── Button.tsx
│   │       ├── Modal.tsx
│   │       ├── Card.tsx
│   │       ├── Input.tsx
│   │       └── Loading.tsx
│   ├── pages/                 # Next.js pages with SSR for accessibility
│   │   ├── index.tsx          # Landing page with accessibility intro
│   │   ├── room/
│   │   │   └── [roomId].tsx   # Dynamic room pages
│   │   ├── accessibility/
│   │   │   ├── statement.tsx  # WCAG compliance statement
│   │   │   ├── help.tsx       # Accessibility tutorials
│   │   │   └── feedback.tsx   # Accessibility feedback form
│   │   ├── api/               # API routes
│   │   │   └── trpc/
│   │   │       └── [trpc].ts  # tRPC handler
│   │   ├── _app.tsx           # App wrapper with accessibility providers
│   │   ├── _document.tsx      # Custom document with a11y meta tags
│   │   └── 404.tsx            # Accessible 404 page
│   ├── server/                # Backend logic
│   │   ├── api/
│   │   │   ├── routers/       # tRPC routers
│   │   │   │   ├── room.ts
│   │   │   │   ├── analytics.ts
│   │   │   │   └── accessibility.ts
│   │   │   ├── root.ts        # Main router
│   │   │   └── trpc.ts        # tRPC configuration
│   │   ├── db/
│   │   │   ├── schema.prisma  # Database schema
│   │   │   └── seed.ts        # Test data with accessibility scenarios
│   │   └── lib/
│   │       ├── accessibility/ # Accessibility utilities
│   │       ├── puzzles/       # Puzzle logic
│   │       └── analytics/     # Analytics processing
│   ├── hooks/                 # Custom React hooks
│   │   ├── useAccessibility.ts
│   │   ├── useKeyboardNavigation.ts
│   │   ├── useScreenReader.ts
│   │   ├── useRoomState.ts
│   │   └── usePuzzleLogic.ts
│   ├── lib/                   # Shared utilities
│   │   ├── accessibility.ts   # Accessibility helpers
│   │   ├── analytics.ts       # Analytics utilities
│   │   ├── utils.ts           # General utilities
│   │   └── constants.ts       # App constants
│   ├── styles/                # Styling
│   │   ├── globals.css        # Global styles with a11y focus
│   │   ├── accessibility.css  # Accessibility-specific styles
│   │   └── components.css     # Component styles
│   ├── types/                 # TypeScript definitions
│   │   ├── accessibility.ts   # Accessibility types
│   │   ├── room.ts           # Room and puzzle types
│   │   ├── analytics.ts      # Analytics types
│   │   └── api.ts            # API types
│   └── utils/                 # Client-side utilities
│       ├── trpc.ts           # tRPC client setup
│       ├── accessibility.ts  # Client accessibility helpers
│       └── storage.ts        # Local storage helpers
├── public/                    # Static assets
│   ├── icons/                # Accessible iconography
│   ├── audio/                # Audio cues and descriptions
│   ├── images/               # Optimized images with alt text
│   ├── sw.js                 # Service worker for PWA
│   └── manifest.json         # PWA manifest
├── tests/                     # Testing suite
│   ├── accessibility/        # Accessibility-specific tests
│   │   ├── screen-reader.spec.ts
│   │   ├── keyboard-nav.spec.ts
│   │   ├── contrast.spec.ts
│   │   └── wcag-compliance.spec.ts
│   ├── e2e/                  # End-to-end tests
│   │   ├── room-flow.spec.ts
│   │   ├── puzzle-solving.spec.ts
│   │   └── accessibility-flow.spec.ts
│   ├── integration/          # Integration tests
│   │   ├── api.spec.ts
│   │   └── database.spec.ts
│   └── unit/                 # Unit tests
│       ├── components/
│       ├── hooks/
│       └── utils/
├── infrastructure/            # Deployment configuration
│   ├── vercel.json           # Vercel deployment config
│   ├── supabase/             # Database configuration
│   │   ├── migrations/
│   │   └── config.toml
│   └── monitoring/           # Monitoring configuration
├── docs/                     # Project documentation (BMad generated)
│   ├── prd.md
│   ├── architecture.md
│   ├── front-end-spec.md
│   ├── brief.md
│   ├── competitor-analysis.md
│   └── market-research.md
├── .bmad-core/               # BMad methodology structure
│   ├── agents/               # Agent definitions
│   ├── tasks/                # Task workflows
│   ├── templates/            # Document templates
│   └── data/                 # Reference data
├── scripts/                  # Build and deployment scripts
│   ├── build.sh             # Production build
│   ├── test-accessibility.sh # Accessibility testing
│   └── deploy.sh            # Deployment script
├── .env.example              # Environment variables template
├── .env.local               # Local development environment
├── package.json             # Node.js dependencies and scripts
├── next.config.js           # Next.js configuration with a11y optimizations
├── tailwind.config.js       # Tailwind with accessibility utilities
├── tsconfig.json            # TypeScript configuration
├── prisma/                  # Prisma configuration
│   └── schema.prisma
├── playwright.config.ts     # Playwright testing configuration
├── jest.config.js           # Jest testing configuration
├── .gitignore               # Git ignore rules
└── README.md                # Project overview and setup
```

## Development Workflow

### Local Development Setup

#### Prerequisites

```bash
# Install Node.js (18+) and npm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18

# Install Git
# macOS: git is included with Xcode Command Line Tools
xcode-select --install

# Install accessibility testing tools
npm install -g @axe-core/cli lighthouse
```

#### Initial Setup

```bash
# Clone repository and navigate
git clone <repository-url>
cd bmad-escape-room

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Set up database
npx prisma generate
npx prisma db push
npx prisma db seed

# Verify accessibility tools
axe --version
lighthouse --version

# Run accessibility baseline audit
npm run accessibility:audit
```

#### Development Commands

```bash
# Start all services (frontend + backend)
npm run dev

# Start frontend only (useful for static development)
npm run dev:frontend

# Start backend only (for API development)
npm run dev:api

# Run tests
npm test                          # All tests
npm run test:unit                # Unit tests only
npm run test:integration         # Integration tests
npm run test:e2e                 # End-to-end tests
npm run test:accessibility       # Accessibility compliance tests

# Accessibility testing
npm run accessibility:audit      # Full WCAG audit
npm run accessibility:test       # Automated a11y tests
npm run accessibility:manual     # Launch manual testing guide

# Database operations
npm run db:reset                 # Reset database
npm run db:migrate               # Run migrations
npm run db:seed                  # Seed test data
```

### Environment Configuration

#### Required Environment Variables

```bash
# Frontend (.env.local)
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_VERCEL_URL=
NEXT_PUBLIC_ANALYTICS_ENABLED=true
NEXT_PUBLIC_ACCESSIBILITY_DEBUG=true

# Backend (.env)
DATABASE_URL="postgresql://username:password@localhost:5432/bmad_escape_room"
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Supabase
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Analytics and Monitoring
VERCEL_ANALYTICS_ID="your-analytics-id"
SENTRY_DSN="your-sentry-dsn"

# Accessibility
ACCESSIBILITY_TESTING_ENABLED=true
SCREEN_READER_API_KEY="your-api-key"
```

## Deployment Architecture

### Deployment Strategy

**Frontend Deployment:**
- **Platform:** Vercel (Edge Network)
- **Build Command:** `npm run build`
- **Output Directory:** `.next/`
- **CDN/Edge:** Automatic edge distribution with regional caching

**Backend Deployment:**
- **Platform:** Vercel Edge Functions
- **Build Command:** `npm run build:api`
- **Deployment Method:** Serverless functions with edge computing

### CI/CD Pipeline

```yaml
# .github/workflows/ci.yaml
name: CI/CD with Accessibility Validation

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  accessibility-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build

      - name: Run accessibility audit
        run: |
          npm run accessibility:test
          npm run accessibility:audit -- --output-format=json > accessibility-report.json

      - name: Upload accessibility report
        uses: actions/upload-artifact@v3
        with:
          name: accessibility-report
          path: accessibility-report.json

      - name: Validate WCAG compliance
        run: npm run test:wcag

  unit-integration-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm run test:unit

      - name: Run integration tests
        run: npm run test:integration
        env:
          DATABASE_URL: ${{ secrets.TEST_DATABASE_URL }}

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install

      - name: Run E2E tests
        run: npm run test:e2e

      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/

  deploy:
    needs: [accessibility-tests, unit-integration-tests, e2e-tests]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### Environments

| Environment | Frontend URL | Backend URL | Purpose |
|-------------|--------------|-------------|---------|
| Development | http://localhost:3000 | http://localhost:3000/api | Local development and accessibility testing |
| Staging | https://staging.bmad-escape-room.vercel.app | https://staging.bmad-escape-room.vercel.app/api | Pre-production testing and accessibility validation |
| Production | https://bmad-escape-room.vercel.app | https://bmad-escape-room.vercel.app/api | Live environment with full accessibility compliance |

## Security and Performance

### Security Requirements

**Frontend Security:**
- CSP Headers: `script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self'`
- XSS Prevention: Input sanitization with DOMPurify, React's built-in XSS protection
- Secure Storage: SessionStorage for temporary data, localStorage for accessibility preferences only

**Backend Security:**
- Input Validation: Zod schemas with accessibility context validation
- Rate Limiting: 100 requests per minute per session, increased limits for accessibility users
- CORS Policy: Restricted to production domains with accessibility user agent allowlisting

**Authentication Security:**
- Token Storage: HttpOnly cookies for authentication tokens (future enhancement)
- Session Management: Anonymous sessions with secure random IDs for MVP
- Password Policy: N/A for MVP (anonymous access only)

### Performance Optimization

**Frontend Performance:**
- Bundle Size Target: <250KB gzipped for main bundle, <100KB for accessibility polyfills
- Loading Strategy: Progressive enhancement with SSR for accessibility, code splitting by route
- Caching Strategy: Service worker caching for offline accessibility, CDN caching for static assets

**Backend Performance:**
- Response Time Target: <200ms for API endpoints, <500ms for accessibility-enhanced responses
- Database Optimization: Indexed queries for session/analytics data, read replicas for analytics
- Caching Strategy: Edge caching for room configurations, in-memory caching for puzzle logic

## Testing Strategy

### Testing Pyramid

```
        E2E Tests (Accessibility Focus)
       /                              \
      Integration Tests                Browser Tests
     /                                              \
Frontend Unit Tests                    Backend Unit Tests
(React Testing Library)               (Jest + Supertest)
```

### Test Organization

#### Frontend Tests

```
tests/frontend/
├── components/
│   ├── accessibility/
│   │   ├── ScreenReaderAnnouncer.test.tsx
│   │   ├── FocusManager.test.tsx
│   │   └── AccessibilityProvider.test.tsx
│   ├── puzzles/
│   │   ├── SuitcaseLock.test.tsx
│   │   ├── PunchCardOverlay.test.tsx
│   │   └── IntercomKeypad.test.tsx
│   └── room/
│       ├── RoomShell.test.tsx
│       └── HotspotManager.test.tsx
├── hooks/
│   ├── useAccessibility.test.ts
│   ├── useKeyboardNavigation.test.ts
│   └── useRoomState.test.ts
└── pages/
    ├── index.test.tsx
    └── room/[roomId].test.tsx
```

#### Backend Tests

```
tests/backend/
├── api/
│   ├── room.test.ts
│   ├── analytics.test.ts
│   └── accessibility.test.ts
├── lib/
│   ├── accessibility/
│   │   ├── compliance.test.ts
│   │   └── screen-reader.test.ts
│   └── puzzles/
│       ├── ticket-math.test.ts
│       ├── punch-card.test.ts
│       └── final-gate.test.ts
└── db/
    ├── repository.test.ts
    └── migrations.test.ts
```

#### E2E Tests

```
tests/e2e/
├── accessibility/
│   ├── screen-reader-flow.spec.ts
│   ├── keyboard-only-navigation.spec.ts
│   ├── high-contrast-mode.spec.ts
│   └── wcag-compliance.spec.ts
├── puzzles/
│   ├── complete-room-flow.spec.ts
│   ├── hint-system.spec.ts
│   └── mobile-interaction.spec.ts
└── performance/
    ├── load-times.spec.ts
    └── accessibility-performance.spec.ts
```

### Test Examples

#### Frontend Component Test

```typescript
// Frontend accessibility component test
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ScreenReaderAnnouncer } from '@/components/accessibility/ScreenReaderAnnouncer';

expect.extend(toHaveNoViolations);

describe('ScreenReaderAnnouncer', () => {
  it('should announce messages to screen readers', async () => {
    const user = userEvent.setup();

    render(<ScreenReaderAnnouncer />);

    const liveRegion = screen.getByRole('status', { hidden: true });
    expect(liveRegion).toBeInTheDocument();
    expect(liveRegion).toHaveAttribute('aria-live', 'polite');

    // Simulate announcement
    const announceButton = screen.getByRole('button', { name: /announce/i });
    await user.click(announceButton);

    expect(liveRegion).toHaveTextContent('Test announcement');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<ScreenReaderAnnouncer />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should handle urgent announcements', async () => {
    render(<ScreenReaderAnnouncer />);

    const urgentRegion = screen.getByRole('alert', { hidden: true });
    expect(urgentRegion).toHaveAttribute('aria-live', 'assertive');
  });
});
```

#### Backend API Test

```typescript
// Backend accessibility API test
import { createMocks } from 'node-mocks-http';
import { appRouter } from '@/server/api/root';
import { createTRPCContext } from '@/server/api/trpc';

describe('/api/trpc/room.updateProgress', () => {
  it('should update puzzle progress with accessibility context', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      headers: {
        'X-Accessibility-Context': JSON.stringify({
          inputMethod: 'screen_reader',
          assistiveTech: 'NVDA',
          screenReaderActive: true,
        }),
      },
      body: {
        sessionId: 'test-session',
        puzzleId: 'ticket-math',
        status: 'completed',
        inputMethod: 'screen_reader',
      },
    });

    const ctx = await createTRPCContext({ req, res });
    const caller = appRouter.createCaller(ctx);

    const result = await caller.room.updateProgress({
      sessionId: 'test-session',
      puzzleId: 'ticket-math',
      status: 'completed',
      inputMethod: 'screen_reader',
      accessibilityContext: {
        inputMethod: 'screen_reader',
        assistiveTech: 'NVDA',
        screenReaderActive: true,
      },
    });

    expect(result.success).toBe(true);
    expect(result.accessibilityMetadata).toEqual({
      wcagLevel: 'AA',
      screenReaderTested: true,
      keyboardAccessible: true,
    });
  });

  it('should format response for screen readers', async () => {
    // Test screen reader optimized response formatting
    const result = await updateProgressWithScreenReader();

    expect(result.screenReaderText).toContain('Puzzle completed');
    expect(result.ariaLiveMessage).toContain('Moving to next challenge');
  });
});
```

#### E2E Test

```typescript
// E2E accessibility test
import { test, expect } from '@playwright/test';

test.describe('Accessibility Flow', () => {
  test('should complete room using only keyboard navigation', async ({ page }) => {
    await page.goto('/room/night-train-compartment');

    // Enable keyboard navigation mode
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter'); // Enable keyboard mode

    // Navigate to first hotspot
    await page.keyboard.press('Tab');
    expect(await page.locator('[data-hotspot="ticket"]')).toBeFocused();

    // Open ticket inspection
    await page.keyboard.press('Enter');
    await page.waitForSelector('[data-modal="ticket-inspection"]');

    // Verify modal is properly announced
    const announcement = await page.locator('[role="status"]').textContent();
    expect(announcement).toContain('Ticket inspection opened');

    // Continue through puzzle flow using keyboard only
    await completeTicketMathPuzzleWithKeyboard(page);
    await completePunchCardPuzzleWithKeyboard(page);
    await completeFinalGatePuzzleWithKeyboard(page);

    // Verify completion
    await page.waitForSelector('[data-testid="completion-screen"]');
    expect(await page.locator('h1').textContent()).toContain('Escape Complete');
  });

  test('should work with screen reader simulation', async ({ page }) => {
    // Simulate screen reader environment
    await page.addInitScript(() => {
      window.speechSynthesis.speak = () => {}; // Mock speech synthesis
      Object.defineProperty(navigator, 'userAgent', {
        value: navigator.userAgent + ' NVDA/2023.1',
      });
    });

    await page.goto('/room/night-train-compartment');

    // Verify screen reader optimizations are active
    const srContent = await page.locator('[data-sr-only]').count();
    expect(srContent).toBeGreaterThan(0);

    // Test aria-live announcements
    await page.click('[data-hotspot="ticket"]');
    const liveRegion = page.locator('[aria-live="polite"]');
    await expect(liveRegion).toContainText('Ticket inspection available');
  });
});

async function completeTicketMathPuzzleWithKeyboard(page) {
  // Implementation of keyboard-only puzzle completion
  await page.keyboard.press('Tab'); // Navigate to suitcase
  await page.keyboard.press('Enter'); // Open suitcase

  // Enter combination using keyboard
  await page.keyboard.type('1');
  await page.keyboard.type('2');
  await page.keyboard.type('5');
  await page.keyboard.press('Enter');

  // Verify success announcement
  const success = await page.locator('[role="status"]').textContent();
  expect(success).toContain('Suitcase opened');
}
```

## Coding Standards

### Critical Fullstack Rules

- **Accessibility First:** Every interactive element must have proper ARIA labels, keyboard support, and screen reader compatibility before implementation is considered complete
- **Type Safety:** All data passed between frontend and backend must use shared TypeScript interfaces from `@/types/shared`
- **Error Handling:** All API endpoints and React components must implement accessible error states with clear messaging for assistive technologies
- **Performance:** Components must not re-render more than necessary during accessibility feature toggles; use React.memo and useMemo appropriately
- **Progressive Enhancement:** Core functionality must work without JavaScript; React interactions are enhancements only
- **Input Validation:** All user inputs must be validated both client-side and server-side with accessibility context awareness
- **State Management:** Accessibility preferences and session data must persist across page reloads using appropriate storage mechanisms
- **Focus Management:** Interactive elements must maintain logical focus order and provide clear focus indicators
- **Testing:** Every component must include accessibility tests using jest-axe and React Testing Library's accessibility queries
- **Analytics:** All user interactions must be tracked with accessibility context for continuous improvement

### Naming Conventions

| Element | Frontend | Backend | Example |
|---------|----------|---------|---------|
| Components | PascalCase | - | `AccessibilityProvider.tsx` |
| Hooks | camelCase with 'use' | - | `useAccessibility.ts` |
| API Routes | - | kebab-case | `/api/room-progress` |
| Database Tables | - | snake_case | `room_sessions` |
| ARIA Labels | kebab-case | - | `aria-label="puzzle-hotspot"` |
| CSS Classes | kebab-case | - | `.accessibility-controls` |
| Event Types | SCREAMING_SNAKE_CASE | - | `PUZZLE_COMPLETED` |
| Environment Variables | SCREAMING_SNAKE_CASE | SCREAMING_SNAKE_CASE | `ACCESSIBILITY_DEBUG` |

## Error Handling Strategy

### Error Flow

```mermaid
sequenceDiagram
    participant U as User
    participant UI as React Component
    participant API as tRPC API
    participant DB as Database
    participant A11y as Accessibility System

    U->>UI: Interaction (any input method)
    UI->>API: API Request with accessibility context
    API->>DB: Database query
    DB-->>API: Error response
    API->>A11y: Format accessible error
    A11y-->>API: Accessible error format
    API-->>UI: Accessible error response
    UI->>A11y: Announce error to assistive technology
    A11y->>U: Screen reader announcement + visual feedback
    UI->>U: Display accessible error UI with recovery options
```

### Error Response Format

```typescript
interface ApiError {
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
    timestamp: string;
    requestId: string;
    // Accessibility-specific error information
    accessibleMessage: string;
    screenReaderText?: string;
    ariaLiveLevel: 'polite' | 'assertive';
    suggestedActions: string[];
    isRecoverable: boolean;
  };
}
```

### Frontend Error Handling

```typescript
// Accessible error boundary with screen reader support
import { Component, ErrorInfo, ReactNode } from 'react';
import { useAccessibility } from '@/hooks/useAccessibility';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorId?: string;
}

export class AccessibleErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorId: `error-${Date.now()}`,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error with accessibility context
    const accessibilityContext = getAccessibilityContext();
    console.error('Accessible Error Boundary caught an error:', {
      error,
      errorInfo,
      accessibilityContext,
      timestamp: new Date().toISOString(),
    });

    // Announce error to screen readers
    this.announceError(error);
  }

  announceError(error: Error) {
    const message = `An error occurred: ${error.message}. Please try refreshing the page or contact support for assistance.`;

    // Create temporary announcement element
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'alert');
    announcement.setAttribute('aria-live', 'assertive');
    announcement.textContent = message;
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';

    document.body.appendChild(announcement);

    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <AccessibleErrorDisplay
          error={this.state.error}
          errorId={this.state.errorId}
          onRetry={() => this.setState({ hasError: false })}
        />
      );
    }

    return this.props.children;
  }
}

// Accessible error display component
interface ErrorDisplayProps {
  error?: Error;
  errorId?: string;
  onRetry?: () => void;
}

const AccessibleErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  errorId,
  onRetry,
}) => {
  return (
    <div
      role="alert"
      aria-labelledby={`error-title-${errorId}`}
      aria-describedby={`error-description-${errorId}`}
      className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto mt-8"
    >
      <h2
        id={`error-title-${errorId}`}
        className="text-lg font-semibold text-red-800 mb-2"
      >
        Something went wrong
      </h2>

      <p
        id={`error-description-${errorId}`}
        className="text-red-700 mb-4"
      >
        {error?.message || 'An unexpected error occurred. Please try again.'}
      </p>

      <div className="flex gap-3">
        <button
          onClick={onRetry}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-describedby={`retry-description-${errorId}`}
        >
          Try Again
        </button>

        <button
          onClick={() => window.location.href = '/'}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Return Home
        </button>
      </div>

      <p
        id={`retry-description-${errorId}`}
        className="sr-only"
      >
        Retry the action that caused the error
      </p>
    </div>
  );
};
```

### Backend Error Handling

```typescript
// Accessibility-aware backend error handler
import { TRPCError } from '@trpc/server';
import type { AccessibilityContext } from '@/types/accessibility';

export class AccessibleTRPCError extends TRPCError {
  public accessibleMessage: string;
  public screenReaderText?: string;
  public ariaLiveLevel: 'polite' | 'assertive';
  public suggestedActions: string[];
  public isRecoverable: boolean;

  constructor(opts: {
    code: TRPCError['code'];
    message: string;
    accessibleMessage: string;
    screenReaderText?: string;
    ariaLiveLevel?: 'polite' | 'assertive';
    suggestedActions?: string[];
    isRecoverable?: boolean;
    cause?: unknown;
  }) {
    super(opts);
    this.accessibleMessage = opts.accessibleMessage;
    this.screenReaderText = opts.screenReaderText;
    this.ariaLiveLevel = opts.ariaLiveLevel || 'polite';
    this.suggestedActions = opts.suggestedActions || [];
    this.isRecoverable = opts.isRecoverable ?? true;
  }
}

// Error formatter with accessibility context
export function formatAccessibleError(
  error: Error,
  accessibilityContext?: AccessibilityContext
) {
  const baseResponse = {
    code: 'INTERNAL_SERVER_ERROR',
    message: error.message,
    timestamp: new Date().toISOString(),
    requestId: generateRequestId(),
  };

  // Handle accessibility-aware errors
  if (error instanceof AccessibleTRPCError) {
    return {
      ...baseResponse,
      accessibleMessage: error.accessibleMessage,
      screenReaderText: error.screenReaderText,
      ariaLiveLevel: error.ariaLiveLevel,
      suggestedActions: error.suggestedActions,
      isRecoverable: error.isRecoverable,
    };
  }

  // Format standard errors for accessibility
  const accessibleMessage = generateAccessibleMessage(error, accessibilityContext);
  const screenReaderText = accessibilityContext?.screenReaderActive
    ? generateScreenReaderText(error)
    : undefined;

  return {
    ...baseResponse,
    accessibleMessage,
    screenReaderText,
    ariaLiveLevel: 'polite' as const,
    suggestedActions: [
      'Try refreshing the page',
      'Check your internet connection',
      'Contact support if the problem persists',
    ],
    isRecoverable: true,
  };
}

function generateAccessibleMessage(
  error: Error,
  context?: AccessibilityContext
): string {
  // Customize error messages based on accessibility context
  if (context?.inputMethod === 'screen_reader') {
    return `Error: ${error.message}. Please use the retry button or contact support for assistance.`;
  }

  if (context?.keyboardOnly) {
    return `Error: ${error.message}. Use Tab to navigate to the retry button or press Alt+Home to return to the main page.`;
  }

  return `Error: ${error.message}. Please try again or contact support if the problem continues.`;
}

function generateScreenReaderText(error: Error): string {
  return `System error encountered. ${error.message}. Retry options are available below the error message.`;
}
```

## Monitoring and Observability

### Monitoring Stack

- **Frontend Monitoring:** Vercel Analytics + Real User Monitoring with accessibility metrics
- **Backend Monitoring:** Vercel Functions monitoring with custom accessibility dashboards
- **Error Tracking:** Sentry with accessibility context enrichment
- **Performance Monitoring:** Core Web Vitals + custom accessibility performance metrics

### Key Metrics

**Frontend Metrics:**
- Core Web Vitals (LCP, FID, CLS) with accessibility user segmentation
- JavaScript errors with accessibility feature correlation
- API response times measured from accessibility user perspective
- User interactions tracked by input method (mouse, keyboard, screen reader, touch)

**Backend Metrics:**
- Request rate segmented by accessibility context
- Error rate with accessibility feature impact analysis
- Response time 95th percentile for accessibility-enhanced responses
- Database query performance for accessibility analytics

**Accessibility-Specific Metrics:**
- Screen reader usage percentage and session duration
- Keyboard-only navigation completion rates
- High contrast mode adoption and user satisfaction
- Hint system effectiveness by accessibility context
- Error recovery success rates for assistive technology users

---

<function_calls>
<invoke name="todo_write">
<parameter name="merge">true
