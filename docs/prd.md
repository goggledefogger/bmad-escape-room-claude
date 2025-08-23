# BMad Escape Room - Night Train Experience Product Requirements Document (PRD)

## Goals and Background Context

### Goals

- Deliver an accessible, WCAG 2.1 AA compliant digital escape room experience that serves users with diverse abilities
- Create a 5-minute engaging puzzle experience with progressive hint system that prevents user frustration
- Establish technical and UX foundation for scalable escape room content series
- Validate market demand for accessibility-first puzzle entertainment
- Build user engagement and retention through anti-stuck design and social sharing features
- Generate initial revenue through premium individual subscriptions and corporate licensing opportunities
- Position BMad as the accessibility leader in digital escape room market

### Background Context

The digital escape room market is fragmented with no clear accessibility leader, creating a significant opportunity for differentiated positioning. Based on comprehensive market research, the $2.8B global market shows strong growth driven by remote work permanence and mandatory accessibility compliance requirements in corporate training.

The Night Train Compartment experience addresses the gap between casual mobile games (30-second sessions) and traditional escape rooms (60+ minutes) with a thoughtfully designed 5-minute format that aligns with post-pandemic attention patterns. The progressive hint system and anti-stuck design innovations create technical differentiation that competitors cannot easily replicate, while WCAG 2.1 AA compliance opens the $420M accessible premium entertainment market.

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|---------|
| 2024-01-XX | v1.0 | Initial PRD creation based on project brief and market analysis | BMad PM |

## Requirements

### Functional

1. **FR1:** The system shall present "The Night Train Compartment" as a single-scene experience with distinct interactive hotspots (Ticket & Timetable, Suitcase, Intercom, Door Keypad, Window).

2. **FR2:** The puzzle system shall implement Puzzle A (Ticket Math) where users combine seat row number and platform number to unlock a 3-digit suitcase lock.

3. **FR3:** The puzzle system shall implement Puzzle B (Punch-Card Grille) where users drag and align a punch-card overlay on the timetable to reveal a 4-letter word through hole alignment.

4. **FR4:** The puzzle system shall implement Final Gate where users input the 4-letter word into an intercom to receive 3 digits from the conductor for door keypad entry.

5. **FR5:** The hint system shall provide 4-tier progressive assistance (nudge → hint → specific → reveal) for each puzzle with user-triggered access.

6. **FR6:** The anti-stuck system shall automatically detect 45-second inactivity and provide nudge assistance through hotspot highlighting.

7. **FR7:** The system shall implement anti-brute-force protection with 1-second debounce on incorrect lock attempts.

8. **FR8:** The user interface shall provide inventory management for the punch-card overlay with drag-and-drop placement mechanics.

9. **FR9:** The system shall track and display elapsed time with a 5:00 countdown timer and scoring based on completion time minus hint penalties.

10. **FR10:** The system shall implement fail-forward functionality showing solution replay and retry option when timer expires.

11. **FR11:** The system shall provide social sharing features with completion badges and invite links for organic user acquisition.

12. **FR12:** The system shall implement light randomization of seat numbers, platform assignments, and 4-letter words for replayability.

13. **FR13:** The system shall capture analytics data including first hotspot interaction, time per puzzle, wrong attempts, hint usage, and completion metrics.

### Non Functional

1. **NFR1:** The system shall achieve 100% WCAG 2.1 AA accessibility compliance including screen reader support, keyboard navigation, and high contrast modes.

2. **NFR2:** The system shall provide audio captions for all spoken content and visual feedback for audio cues.

3. **NFR3:** The system shall support touch targets of minimum 44px for mobile accessibility compliance.

4. **NFR4:** The system shall load initial content within 3 seconds and respond to user interactions within 500ms.

5. **NFR5:** The system shall function as a Progressive Web App (PWA) optimized for desktop and mobile browsers without app store distribution.

6. **NFR6:** The system shall support modern browsers: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ covering 95% of target users.

7. **NFR7:** The system shall implement offline capability for completed content and graceful degradation for network issues.

8. **NFR8:** The system shall use dyslexia-friendly font options and avoid color-only communication patterns.

9. **NFR9:** The system shall maintain consistent 60fps performance during drag-and-drop interactions and animations.

10. **NFR10:** The system shall implement Content Security Policy (CSP) headers and secure data handling for user privacy protection.

## User Interface Design Goals

### Overall UX Vision

The experience embodies a cozy, late-night train atmosphere with blueprint-style line art aesthetic using a navy/cream color palette with brass accents. The interface prioritizes clarity and accessibility over visual complexity, ensuring every interaction feels intuitive and satisfying whether accessed via mouse, keyboard, or touch. The design should evoke the focused calm of problem-solving in a comfortable space, avoiding time pressure stress while maintaining engagement through progressive discovery.

### Key Interaction Paradigms

**Inspect-First Discovery:** All interactions begin with hovering or tapping to reveal hotspot labels and affordances before committing to actions. This reduces anxiety and provides clear navigation for users with diverse abilities.

**Generous Interaction Zones:** All clickable areas extend beyond visual boundaries with clear feedback states (hover, active, disabled) to accommodate motor accessibility needs and prevent frustration.

**Progressive Disclosure:** Information and hints are revealed gradually through user agency rather than overwhelming the interface, maintaining challenge while preventing stuck states.

**Tactile Feedback Metaphors:** Digital interactions mirror real-world actions (suitcase latches, overlay alignment, intercom buttons) with appropriate audio and visual feedback for multi-sensory engagement.

### Core Screens and Views

**Main Compartment View:** Single-scene experience showing the full train compartment with labeled hotspots and subtle environmental motion for ambiance.

**Zoom Overlays:** Modal detail views for Ticket & Timetable inspection, Suitcase lock interface, and Intercom interaction panel.

**Inventory Card:** Floating panel for punch-card overlay management with drag-and-drop alignment interface.

**Hint Interface:** Slide-out panel with progressive hint levels and clear penalty indication for informed decision-making.

**Completion Screen:** Victory state with time/score display, social sharing options, and preview of next room in series.

### Accessibility: WCAG AA

Complete WCAG 2.1 AA compliance including:
- Screen reader compatibility with semantic HTML and ARIA labels
- Full keyboard navigation with visible focus indicators
- High contrast mode toggle and customizable text sizing
- Audio descriptions for visual puzzles and captions for all audio content
- Motor accessibility with extended interaction zones and configurable timing controls

### Branding

Blueprint aesthetic combining technical line art precision with vintage train travel romance. Navy (#1e293b) and cream (#fef7ed) primary palette with brass accent (#d4af37) for interactive elements. Typography emphasizes legibility with dyslexia-friendly options. Visual design avoids pixel-hunting complexity in favor of clear, high-contrast interaction targets that maintain artistic cohesion.

### Target Device and Platforms: Web Responsive

Progressive Web App optimized for seamless experience across desktop and mobile browsers. Touch-first interaction design with generous snap zones for mobile usability, while maintaining precision cursor interactions for desktop users. Responsive layout adapts interaction paradigms appropriately for each form factor without compromising accessibility or functionality.

## Technical Assumptions

### Repository Structure: Monorepo

Single repository containing all project components to simplify development workflow for initial MVP. Frontend puzzle components, backend analytics services, shared accessibility utilities, and content management tools all maintained in unified structure with clear separation of concerns.

### Service Architecture

**Serverless-within-Monorepo:** Frontend delivered as static PWA with serverless functions for analytics collection, user progress tracking, and social sharing functionality. This approach minimizes infrastructure complexity while enabling scalable analytics and content delivery without traditional backend overhead.

### Testing Requirements

**Full Testing Pyramid:** Comprehensive testing strategy including unit tests for puzzle logic, integration tests for accessibility compliance, end-to-end tests for complete user journeys, and manual accessibility testing with real assistive technology users. Testing emphasizes accessibility validation and cross-browser compatibility over complex feature testing.

### Additional Technical Assumptions and Requests

- **Content Management:** YAML-based puzzle configuration enabling non-developer content updates and A/B testing of hint text and difficulty variations
- **Analytics Infrastructure:** Privacy-first analytics using Mixpanel or Amplitude for user behavior insights without compromising accessibility user privacy
- **Accessibility Testing Pipeline:** Automated accessibility testing integrated into CI/CD with axe-core, manual testing checkpoints, and real user validation process
- **Performance Monitoring:** Real User Monitoring (RUM) specifically tracking accessibility feature usage patterns and performance impact
- **Social Sharing:** Open Graph integration for rich preview sharing with accessibility-compliant social media metadata

## Epic List

**Epic 1: Foundation & Accessibility Infrastructure**
Establish project foundation with PWA setup, accessibility framework, and basic compartment scene rendering.

**Epic 2: Core Puzzle Mechanics**
Implement the three puzzle systems (Ticket Math, Punch-Card Overlay, Final Gate) with basic interaction and validation.

**Epic 3: Progressive Assistance & Anti-Stuck Systems**
Build the 4-tier hint system, inactivity detection, auto-nudging, and fail-forward functionality.

**Epic 4: Polish & Analytics**
Add scoring, social sharing, light randomization, analytics tracking, and final accessibility validation.

## Epic 1: Foundation & Accessibility Infrastructure

**Epic Goal:** Establish the technical foundation for the escape room platform with accessibility-first architecture, create the basic train compartment scene with hotspot detection, and implement core PWA functionality. This epic delivers a deployable foundation that demonstrates the accessibility commitment and basic interaction paradigms that will support all subsequent puzzle development.

### Story 1.1: Project Foundation & Accessibility Framework

As a developer,
I want to establish the project structure with accessibility-first architecture,
so that all subsequent development maintains WCAG 2.1 AA compliance from the foundation level.

#### Acceptance Criteria

1. **Project Setup:** Create monorepo structure with React/TypeScript frontend, accessibility testing pipeline, and basic CI/CD workflow
2. **Accessibility Framework:** Integrate axe-core for automated testing, implement semantic HTML structure, and establish ARIA labeling patterns
3. **PWA Foundation:** Configure service worker for offline capability, add web app manifest, and implement basic caching strategy
4. **Testing Infrastructure:** Set up accessibility testing with real screen reader validation process and cross-browser testing matrix
5. **Development Standards:** Establish coding standards document emphasizing accessibility best practices and component design patterns

### Story 1.2: Train Compartment Scene Rendering

As a user,
I want to see the train compartment environment with clear visual hierarchy,
so that I can immediately understand the space and begin interacting with puzzle elements.

#### Acceptance Criteria

1. **Scene Layout:** Render main compartment view with navy/cream color scheme and blueprint-style line art aesthetic
2. **Hotspot Identification:** Display labeled interactive areas (Ticket & Timetable, Suitcase, Intercom, Door Keypad, Window) with hover/focus states
3. **Responsive Design:** Ensure scene adapts appropriately to desktop and mobile viewports while maintaining interaction clarity
4. **Environmental Motion:** Add subtle ambient animation (window scenery, gentle lighting) that doesn't interfere with accessibility or focus
5. **Accessibility Labels:** Implement comprehensive ARIA labels and screen reader descriptions for all visual elements

### Story 1.3: Basic Hotspot Interaction System

As a user,
I want to click or tap hotspots to inspect puzzle elements,
so that I can begin exploring the compartment and understanding available interactions.

#### Acceptance Criteria

1. **Interaction Detection:** Implement click/tap handlers for all hotspot areas with generous touch targets (44px minimum)
2. **Modal System:** Create accessible modal overlay system for detailed item inspection (ticket, timetable, suitcase)
3. **Keyboard Navigation:** Ensure full keyboard accessibility with logical tab order and escape key modal dismissal
4. **Visual Feedback:** Provide clear hover, focus, and active states for all interactive elements
5. **Screen Reader Support:** Implement proper ARIA live regions and announcements for dynamic content changes

### Story 1.4: Timer and UI Chrome Implementation

As a user,
I want to see my progress through clear UI elements,
so that I can track my time and access assistance when needed.

#### Acceptance Criteria

1. **Timer Display:** Implement 5:00 countdown timer with clear visual presentation and optional audio announcements
2. **Hint Button:** Add hint access button that's always visible and properly labeled for accessibility
3. **Inventory Area:** Create designated space for puzzle items (overlay card) with drag-and-drop foundation
4. **Navigation Elements:** Implement escape/close mechanisms and help access that work across input methods
5. **Responsive Chrome:** Ensure UI elements adapt appropriately to different screen sizes while maintaining accessibility

## Epic 2: Core Puzzle Mechanics

**Epic Goal:** Implement the three primary puzzle systems that form the core gameplay experience. Each puzzle builds logically on the previous one while maintaining accessibility and providing clear progression. This epic delivers the complete puzzle-solving experience with basic validation and feedback, establishing the foundation for hint systems and advanced features.

### Story 2.1: Ticket & Timetable Inspection System

As a user,
I want to inspect my ticket and the timetable board to gather puzzle information,
so that I can begin solving the seat row and platform combination puzzle.

#### Acceptance Criteria

1. **Ticket Modal:** Create detailed ticket inspection showing Seat B/12, Coach C, Destination Arden with clear typography
2. **Timetable Modal:** Display timetable board with multiple destinations including Arden at Platform 5, departure 22:10
3. **Cross-Reference Highlighting:** When inspecting ticket, highlight corresponding timetable row for the same destination
4. **Accessibility Details:** Ensure modal content is properly announced by screen readers with logical reading order
5. **Mobile Optimization:** Adapt modal layouts for touch interaction while maintaining information clarity

### Story 2.2: Suitcase Lock Puzzle Implementation

As a user,
I want to enter the 3-digit combination into the suitcase lock,
so that I can open the suitcase and discover the punch-card overlay.

#### Acceptance Criteria

1. **Lock Interface:** Create 3-digit combination lock with clear number input and visual feedback
2. **Combination Logic:** Implement validation for seat row (12) + platform (5) = 125 combination
3. **Anti-Brute Force:** Add 1-second debounce on incorrect attempts with clear feedback messaging
4. **Success Animation:** Provide satisfying unlock animation and audio feedback when correct combination is entered
5. **Accessibility Input:** Support both mouse/touch and keyboard number entry with proper labeling and announcements

### Story 2.3: Punch-Card Overlay Discovery

As a user,
I want to discover and collect the punch-card overlay from the opened suitcase,
so that I can use it for the timetable alignment puzzle.

#### Acceptance Criteria

1. **Suitcase Contents:** Reveal punch-card overlay inside opened suitcase with clear visual presentation
2. **Inventory Collection:** Implement drag-to-collect or click-to-collect mechanism that adds overlay to inventory
3. **Inventory Display:** Show collected overlay in designated inventory area with proper labeling
4. **Tool Tip Guidance:** Provide subtle hint that overlays can be used on the timetable board
5. **State Persistence:** Maintain inventory state throughout the session even if user navigates between views

### Story 2.4: Punch-Card Overlay Alignment Puzzle

As a user,
I want to drag and align the punch-card overlay on the timetable board,
so that I can reveal the 4-letter word through the hole alignment system.

#### Acceptance Criteria

1. **Drag and Drop:** Implement smooth drag-and-drop of overlay onto timetable with generous snap zones
2. **Alignment System:** Create grid-based alignment with corner markers that snap when properly positioned
3. **Letter Revelation:** Show letters appearing through holes when overlay is correctly aligned (e.g., PASS, SAFE, ARDE)
4. **Partial Feedback:** Display 1-2 letters during partial alignment to encourage exploration
5. **Accessibility Alternative:** Provide keyboard-based alignment controls and announce letter discoveries to screen readers

### Story 2.5: Intercom and Final Gate System

As a user,
I want to communicate the discovered word to the conductor via intercom,
so that I can receive the final door code and complete the escape.

#### Acceptance Criteria

1. **Intercom Interface:** Create 4-letter input field with TALK button and clear labeling
2. **Conductor Response:** Implement text and audio response system (e.g., "Code three... seven... four") with captions
3. **Door Keypad:** Provide final 3-digit input system for door unlock with success animation
4. **Completion Sequence:** Trigger victory state when correct sequence is completed
5. **Accessibility Audio:** Ensure all audio content has text alternatives and proper screen reader announcements

## Epic 3: Progressive Assistance & Anti-Stuck Systems

**Epic Goal:** Implement the sophisticated hint and assistance systems that prevent user frustration while maintaining challenge and engagement. This epic creates the differentiated user experience that sets BMad apart from competitors through thoughtful progressive assistance and anti-stuck design innovations.

### Story 3.1: 4-Tier Progressive Hint System

As a user who needs assistance,
I want to access increasingly specific hints for each puzzle,
so that I can make progress without having the solution completely given away.

#### Acceptance Criteria

1. **Hint Interface:** Create slide-out hint panel with clear tier progression (nudge → hint → specific → reveal)
2. **Puzzle-Specific Hints:** Implement custom hint content for each puzzle stage with contextual relevance
3. **Penalty Tracking:** Display hint penalty impact on final score with clear user choice confirmation
4. **Accessibility Formatting:** Ensure hint text is properly structured for screen readers with logical progression
5. **Hint Persistence:** Remember which hints have been accessed to prevent repetition and track usage analytics

### Story 3.2: Inactivity Detection and Auto-Nudging

As a user who becomes stuck or distracted,
I want the system to offer gentle assistance after periods of inactivity,
so that I can maintain progress without abandoning the experience.

#### Acceptance Criteria

1. **Activity Monitoring:** Track user interactions and detect 45-second periods of inactivity
2. **Contextual Nudging:** Highlight relevant hotspots with subtle glow based on current puzzle state
3. **Progressive Escalation:** Increase nudge intensity over time without becoming intrusive
4. **User Agency:** Allow users to dismiss or disable auto-nudging while maintaining accessibility
5. **Analytics Integration:** Track inactivity patterns and nudge effectiveness for experience optimization

### Story 3.3: Auto-Hint Offer System

As a user approaching the time limit,
I want the system to offer free hints when I'm running out of time,
so that I can complete the experience rather than failing due to time pressure.

#### Acceptance Criteria

1. **Time-Based Triggers:** Offer free hint at 0:30 remaining with clear, non-intrusive presentation
2. **Progress Assessment:** Evaluate user progress to offer most relevant hint for current state
3. **Accept/Decline Choice:** Provide clear accept/decline options without penalty for declining
4. **Accessibility Timing:** Ensure sufficient time for users with motor disabilities to respond to offers
5. **Analytics Tracking:** Monitor auto-hint usage patterns and effectiveness for system improvement

### Story 3.4: Fail-Forward Replay System

As a user who doesn't complete the puzzle in time,
I want to see how the solution works and have the option to retry,
so that I can learn from the experience and potentially succeed on a second attempt.

#### Acceptance Criteria

1. **Solution Replay:** Present fast-forward demonstration of puzzle solutions with clear visual flow
2. **Retry Option:** Offer retry opportunity with Puzzle A pre-solved to focus on later stages
3. **Learning Mode:** Provide optional detailed explanations during replay for educational value
4. **Accessibility Descriptions:** Include detailed audio descriptions of visual solution steps
5. **Progress Preservation:** Maintain any unlocked content or hints for retry attempts

### Story 3.5: Anti-Frustration Design Patterns

As a user with diverse abilities and experience levels,
I want the interface to actively prevent common frustration points,
so that I can focus on puzzle-solving rather than fighting the interface.

#### Acceptance Criteria

1. **Generous Interaction Zones:** Ensure all clickable areas extend beyond visual boundaries with clear feedback
2. **Mistake Recovery:** Provide easy undo/reset options for accidental actions without losing progress
3. **Clear Status Communication:** Always indicate current puzzle state and next available actions
4. **Timeout Prevention:** Implement intelligent timer pausing during hint access or modal interactions
5. **Success Reinforcement:** Provide clear positive feedback for correct actions and partial progress

## Epic 4: Polish & Analytics

**Epic Goal:** Complete the experience with scoring systems, social sharing features, analytics collection, and final accessibility validation. This epic delivers the full commercial-ready product with systems for user retention, organic growth, and continuous improvement through data collection.

### Story 4.1: Scoring and Performance Tracking

As a user who completes the escape room,
I want to see my performance score and compare it to previous attempts,
so that I can track improvement and feel motivated to replay or share my success.

#### Acceptance Criteria

1. **Score Calculation:** Implement time-based scoring with hint penalties (time remaining minus hint costs)
2. **Performance Display:** Show completion time, hints used, attempts per puzzle, and final score
3. **Personal Best Tracking:** Store and display user's best performance for comparison
4. **Accessibility Metrics:** Track and celebrate accessibility feature usage without penalizing users
5. **Achievement System:** Create simple achievement unlocks for completion methods and improvement

### Story 4.2: Social Sharing and Viral Features

As a user who enjoys the experience,
I want to share my success and invite others to try the escape room,
so that I can connect with friends and help grow the accessibility-focused community.

#### Acceptance Criteria

1. **Share Completion:** Generate shareable completion badges with score and time information
2. **Invite Links:** Create custom invite URLs that track referral sources for organic growth
3. **Accessibility Messaging:** Include accessibility features prominently in social sharing content
4. **Open Graph Integration:** Implement rich social media previews with accessible image descriptions
5. **Privacy Controls:** Ensure sharing is opt-in with clear privacy policy for shared data

### Story 4.3: Light Randomization System

As a returning user,
I want some variation in puzzle elements when I replay the experience,
so that I can enjoy the challenge again without memorizing specific solutions.

#### Acceptance Criteria

1. **Variable Elements:** Randomize seat numbers (8-15), platform assignments (3-7), and valid 4-letter words
2. **Solution Mapping:** Maintain logical consistency between randomized elements and puzzle solutions
3. **Difficulty Consistency:** Ensure randomization doesn't create significantly easier or harder variations
4. **Content Management:** Implement YAML-based configuration for easy content updates and testing
5. **Analytics Tracking:** Monitor completion rates across variations to identify optimal difficulty balance

### Story 4.4: Analytics and User Behavior Tracking

As a product manager,
I want to collect privacy-first analytics on user behavior and accessibility feature usage,
so that I can optimize the experience and demonstrate accessibility impact to stakeholders.

#### Acceptance Criteria

1. **Event Tracking:** Collect interaction events (hotspot clicks, hint usage, completion patterns) with privacy protection
2. **Accessibility Metrics:** Track screen reader usage, keyboard navigation, high contrast mode adoption
3. **Performance Monitoring:** Monitor load times, interaction response times, and technical performance across devices
4. **Conversion Funnels:** Analyze user progression through puzzle stages to identify drop-off points
5. **Privacy Compliance:** Implement GDPR/CCPA compliant data collection with clear user consent mechanisms

### Story 4.5: Final Accessibility Validation and Polish

As a user with diverse accessibility needs,
I want the complete experience to meet the highest accessibility standards,
so that I can fully enjoy and recommend the escape room to others in the accessibility community.

#### Acceptance Criteria

1. **Comprehensive Audit:** Complete WCAG 2.1 AA compliance validation using automated tools and manual testing
2. **Real User Testing:** Conduct testing sessions with screen reader users, keyboard-only users, and motor accessibility needs
3. **Documentation:** Create accessibility statement and user guide for assistive technology compatibility
4. **Performance Optimization:** Ensure accessibility features don't impact performance for any user group
5. **Community Validation:** Obtain approval from accessibility advocacy partners for community endorsement

## Checklist Results Report

*This section will be populated after running the PM checklist to validate PRD completeness and quality.*

## Next Steps

### UX Expert Prompt

"Please review the BMad Escape Room PRD and create detailed UX specifications focusing on accessibility-first design implementation. Pay special attention to the progressive hint system UI, drag-and-drop accessibility patterns, and mobile optimization requirements. The blueprint aesthetic and navy/cream color scheme must maintain WCAG AA contrast ratios while delivering the cozy train compartment atmosphere."

### Architect Prompt

"Please review the BMad Escape Room PRD and create the technical architecture for a PWA-based escape room platform. Focus on serverless-within-monorepo structure, accessibility framework integration, and analytics infrastructure. The system must support WCAG 2.1 AA compliance, offline capability, and cross-browser compatibility while maintaining 60fps performance during puzzle interactions."
