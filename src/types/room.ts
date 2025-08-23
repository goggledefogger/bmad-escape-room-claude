/**
 * Room and Puzzle Type Definitions for BMad Escape Room
 * Core game mechanics with accessibility integration
 */

import type { AccessibilityContext, AccessibilityUsage } from './accessibility';

export interface RoomConfiguration {
  roomId: string;
  name: string;
  description: string;
  estimatedTimeMinutes: number;
  difficultyLevel: 1 | 2 | 3 | 4 | 5;
  accessibilityFeatures: string[];
  puzzleSequence: PuzzleConfiguration[];
  randomizationConfig: RandomizationConfig;
  metadata: RoomMetadata;
}

export interface RoomMetadata {
  theme: string;
  aesthetic: string;
  colorPalette: string[];
  audioEnabled: boolean;
  visualComplexity: 'low' | 'medium' | 'high';
  cognitiveLoad: 'light' | 'moderate' | 'heavy';
  created: Date;
  updated: Date;
  version: string;
}

export interface PuzzleConfiguration {
  id: string;
  name: string;
  type: PuzzleType;
  description: string;
  estimatedTimeSeconds: number;
  hints: HintConfiguration[];
  accessibilityOptions: PuzzleAccessibilityOptions;
  interactions: InteractionConfiguration[];
  successCriteria: SuccessCriteria;
}

export type PuzzleType =
  | 'combination_lock'
  | 'overlay_alignment'
  | 'intercom_keypad'
  | 'sequence_matching'
  | 'pattern_recognition'
  | 'logical_deduction';

export interface PuzzleAccessibilityOptions {
  screenReaderInstructions: string;
  keyboardAlternatives: InteractionAlternative[];
  audioDescriptions: string[];
  tactileDescriptions: string[];
  cognitiveAids: string[];
  visualAlternatives: VisualAlternative[];
}

export interface InteractionAlternative {
  originalMethod: 'drag' | 'click' | 'hover' | 'gesture';
  alternativeMethod: 'keyboard' | 'sequential_click' | 'voice' | 'switch';
  instructions: string;
  keyMapping?: KeyMapping[];
}

export interface KeyMapping {
  key: string;
  action: string;
  description: string;
}

export interface VisualAlternative {
  type: 'high_contrast' | 'pattern' | 'texture' | 'shape';
  description: string;
  implementation: string;
}

export interface InteractionConfiguration {
  elementId: string;
  type: 'hotspot' | 'draggable' | 'input' | 'button';
  position: Position;
  size: Size;
  accessibility: {
    ariaLabel: string;
    ariaDescription?: string;
    role?: string;
    tabIndex?: number;
  };
  feedback: FeedbackConfiguration;
}

export interface Position {
  x: number;
  y: number;
  relativeTo: 'viewport' | 'container' | 'parent';
}

export interface Size {
  width: number;
  height: number;
  minTouchTarget: number; // accessibility requirement
}

export interface FeedbackConfiguration {
  visual: VisualFeedback;
  audio: AudioFeedback;
  haptic: HapticFeedback;
  accessibility: AccessibilityFeedback;
}

export interface VisualFeedback {
  hover: string; // CSS class or animation
  active: string;
  success: string;
  error: string;
  disabled: string;
}

export interface AudioFeedback {
  hover?: string; // audio file path
  click?: string;
  success?: string;
  error?: string;
  enabled: boolean;
}

export interface HapticFeedback {
  enabled: boolean;
  patterns: {
    success: number[];
    error: number[];
    interaction: number[];
  };
}

export interface AccessibilityFeedback {
  announcements: {
    hover?: string;
    interaction?: string;
    success?: string;
    error?: string;
  };
  focusManagement: {
    onSuccess?: string; // element ID to focus
    onError?: string;
  };
}

export interface SuccessCriteria {
  conditions: SuccessCondition[];
  validation: ValidationRule[];
  rewards: Reward[];
}

export interface SuccessCondition {
  type: 'input_match' | 'sequence_complete' | 'time_limit' | 'attempt_count';
  target: string | number;
  operator: 'equals' | 'greater_than' | 'less_than' | 'contains';
}

export interface ValidationRule {
  field: string;
  type: 'required' | 'format' | 'length' | 'range';
  parameters: Record<string, any>;
  errorMessage: string;
  accessibilityMessage: string;
}

export interface Reward {
  type: 'unlock_next' | 'reveal_item' | 'show_hint' | 'play_audio';
  target: string;
  delay?: number;
}

// Hint System
export interface HintConfiguration {
  level: 1 | 2 | 3 | 4; // nudge, hint, specific, reveal
  content: string;
  accessibilityContent: string;
  visualAids?: string[];
  audioContent?: string;
  estimatedReadingTime: number;
  prerequisites?: string[];
}

export interface HintUsage {
  id: string;
  sessionId: string;
  puzzleId: string;
  hintLevel: number;
  requestedAt: Date;
  accessibilityContext: AccessibilityContext;
  helpfulnessRating?: number;
  timeToSolveAfterHint?: number;
}

// Session Management
export interface RoomSession {
  sessionId: string;
  roomId: string;
  startTime: Date;
  endTime?: Date;
  currentPuzzle: string;
  puzzleStates: Record<string, PuzzleState>;
  hintsUsed: HintUsage[];
  accessibilityUsage: AccessibilityUsage;
  score: SessionScore;
  metadata: SessionMetadata;
}

export interface PuzzleState {
  puzzleId: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'skipped';
  attempts: number;
  startedAt?: Date;
  completedAt?: Date;
  timeSpent: number;
  inputMethod: AccessibilityContext['inputMethod'];
  errors: PuzzleError[];
  hints: HintUsage[];
  userInputs: UserInput[];
}

export interface PuzzleError {
  timestamp: Date;
  errorType: string;
  userInput: string;
  expectedInput: string;
  accessibilityContext: AccessibilityContext;
  recoveryAction?: string;
}

export interface UserInput {
  timestamp: Date;
  elementId: string;
  inputType: 'click' | 'keyboard' | 'drag' | 'voice';
  value: string;
  successful: boolean;
  accessibilityContext: AccessibilityContext;
}

export interface SessionScore {
  baseScore: number;
  timeBonus: number;
  hintPenalty: number;
  accessibilityBonus: number; // bonus for using accessibility features
  finalScore: number;
  completionPercentage: number;
}

export interface SessionMetadata {
  userAgent: string;
  screenResolution: string;
  accessibility: AccessibilityUsage;
  performanceMetrics: PerformanceMetrics;
  feedbackProvided?: UserFeedback;
}

export interface PerformanceMetrics {
  averageResponseTime: number;
  totalInteractions: number;
  errorRate: number;
  hintsPerPuzzle: number;
  accessibilityFeatureUsage: Record<string, number>;
}

export interface UserFeedback {
  rating: number; // 1-5 stars
  difficulty: 'too_easy' | 'just_right' | 'too_hard';
  accessibility: 'excellent' | 'good' | 'fair' | 'poor';
  comments?: string;
  wouldRecommend: boolean;
  accessibilitySpecificFeedback?: AccessibilityFeedback;
}

export interface AccessibilityFeedbackData {
  screenReaderExperience: number; // 1-5 rating
  keyboardNavigation: number;
  visualDesign: number;
  audioDescription: number;
  overallInclusion: number;
  suggestions: string[];
}

// Randomization System
export interface RandomizationConfig {
  enabled: boolean;
  elements: RandomizationElement[];
  constraints: RandomizationConstraint[];
  seed?: string;
}

export interface RandomizationElement {
  elementType: 'combination' | 'word' | 'sequence' | 'position';
  puzzleId: string;
  variations: Variation[];
  accessibilityConsiderations: string[];
}

export interface Variation {
  id: string;
  content: any;
  difficulty: number;
  accessibilityRating: number;
  usage: VariationUsage;
}

export interface VariationUsage {
  timesUsed: number;
  averageCompletionTime: number;
  accessibilityUserSuccess: number;
  playerSatisfaction: number;
}

export interface RandomizationConstraint {
  type: 'difficulty_balance' | 'accessibility_parity' | 'completion_time';
  parameters: Record<string, any>;
}

// Analytics and Progress Tracking
export interface RoomAnalytics {
  roomId: string;
  totalSessions: number;
  completionRate: number;
  averageTimeToComplete: number;
  accessibilityUsageStats: AccessibilityUsageStats;
  puzzleAnalytics: Record<string, PuzzleAnalytics>;
  userFeedbackSummary: FeedbackSummary;
}

export interface AccessibilityUsageStats {
  screenReaderUsers: number;
  keyboardOnlyUsers: number;
  highContrastUsers: number;
  reducedMotionUsers: number;
  averageSessionDuration: Record<string, number>; // by accessibility feature
  completionRates: Record<string, number>; // by accessibility feature
}

export interface PuzzleAnalytics {
  puzzleId: string;
  completionRate: number;
  averageAttempts: number;
  averageTime: number;
  commonErrors: string[];
  hintEffectiveness: Record<number, number>; // hint level -> success rate
  accessibilityPerformance: Record<string, number>; // feature -> success rate
}

export interface FeedbackSummary {
  averageRating: number;
  difficultyDistribution: Record<string, number>;
  accessibilityRating: number;
  commonSuggestions: string[];
  recommendationRate: number;
}
