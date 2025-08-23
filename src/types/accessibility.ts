/**
 * Accessibility Type Definitions for BMad Escape Room
 * These types ensure type safety across all accessibility features
 */

export interface AccessibilityPreferences {
  screenReader: boolean;
  keyboardOnly: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  fontSize: 'normal' | 'large' | 'extra-large';
  dyslexiaFont: boolean;
  audioDescriptions: boolean;
  hapticFeedback: boolean;
}

export interface AccessibilityContext {
  inputMethod: 'mouse' | 'keyboard' | 'touch' | 'screen_reader' | 'voice';
  assistiveTech: string | null;
  reducedMotion: boolean;
  highContrast: boolean;
  screenReaderActive: boolean;
  keyboardNavigation: boolean;
  viewport: {
    width: number;
    height: number;
    zoom: number;
  };
  colorScheme: 'light' | 'dark' | 'high-contrast';
  focusVisible: boolean;
}

export interface AccessibilityAnnouncement {
  id: string;
  message: string;
  priority: 'polite' | 'assertive';
  timestamp: Date;
  context?: string;
}

export interface AccessibilityUsage {
  screenReader: boolean;
  keyboardOnly: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  fontSize: 'normal' | 'large' | 'extra-large';
  dyslexiaFont: boolean;
  sessionDuration: number;
  interactionCounts: {
    mouse: number;
    keyboard: number;
    touch: number;
    screen_reader: number;
  };
}

export interface FocusManagement {
  currentFocus: string | null;
  focusHistory: string[];
  trapActive: boolean;
  skipLinks: string[];
  landmarkNavigation: boolean;
}

export interface ScreenReaderOptimization {
  structuredContent: boolean;
  skipNavigation: boolean;
  landmarkNavigation: boolean;
  ariaLiveRegions: boolean;
  semanticStructure: boolean;
  alternativeText: boolean;
}

// Accessibility compliance levels
export type WCAGLevel = 'A' | 'AA' | 'AAA';

export interface AccessibilityCompliance {
  level: WCAGLevel;
  guidelines: {
    perceivable: boolean;
    operable: boolean;
    understandable: boolean;
    robust: boolean;
  };
  lastAuditDate: Date;
  violations: AccessibilityViolation[];
}

export interface AccessibilityViolation {
  id: string;
  guideline: string;
  severity: 'critical' | 'serious' | 'moderate' | 'minor';
  element: string;
  description: string;
  impact: string;
  helpUrl: string;
}

// Component accessibility props
export interface AccessibleComponentProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
  'aria-live'?: 'polite' | 'assertive' | 'off';
  'aria-atomic'?: boolean;
  'aria-relevant'?: string;
  role?: string;
  tabIndex?: number;
  onAccessibilityAction?: (action: AccessibilityAction) => void;
}

export interface AccessibilityAction {
  type: 'announce' | 'focus' | 'navigate' | 'interact';
  target?: string;
  data?: any;
  timestamp: Date;
  inputMethod: AccessibilityContext['inputMethod'];
}

// Keyboard navigation
export interface KeyboardNavigation {
  enabled: boolean;
  visualFocusIndicator: boolean;
  skipLinks: boolean;
  tabOrder: string[];
  shortcuts: KeyboardShortcut[];
}

export interface KeyboardShortcut {
  keys: string[];
  action: string;
  description: string;
  scope: 'global' | 'page' | 'component';
}

// Touch and motor accessibility
export interface TouchAccessibility {
  enabled: boolean;
  minimumTargetSize: number; // in pixels
  tapTimeout: number; // in milliseconds
  gestureAlternatives: boolean;
  dragDropAlternatives: boolean;
}

// Color and visual accessibility
export interface VisualAccessibility {
  contrastRatio: number;
  colorBlindnessSupport: boolean;
  customColorSchemes: string[];
  textScaling: number;
  lineSpacing: number;
  focusIndicatorStyle: 'outline' | 'background' | 'border';
}

// Audio accessibility
export interface AudioAccessibility {
  captionsEnabled: boolean;
  audioDescriptions: boolean;
  soundAlternatives: boolean;
  volumeControl: boolean;
  playbackSpeed: number;
}

// Cognitive accessibility
export interface CognitiveAccessibility {
  simplifiedInterface: boolean;
  readingLevel: 'basic' | 'intermediate' | 'advanced';
  timeoutExtensions: boolean;
  errorPrevention: boolean;
  contextualHelp: boolean;
  progressIndicators: boolean;
}

// Analytics for accessibility
export interface AccessibilityAnalytics {
  featureUsage: Record<string, number>;
  userJourneyTimes: number[];
  errorRates: Record<string, number>;
  satisfactionScores: number[];
  assistiveTechDistribution: Record<string, number>;
}

// Accessibility testing
export interface AccessibilityTestResult {
  passed: boolean;
  violations: AccessibilityViolation[];
  warnings: string[];
  testDate: Date;
  tools: string[];
  coverage: number; // percentage
}

export interface AccessibilityMetrics {
  compliance: AccessibilityCompliance;
  usage: AccessibilityUsage;
  performance: {
    screenReaderResponseTime: number;
    keyboardNavigationSpeed: number;
    focusManagementLatency: number;
  };
  userSatisfaction: {
    rating: number;
    feedback: string[];
    completionRate: number;
  };
}
