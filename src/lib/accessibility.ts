/**
 * Accessibility Utility Functions for BMad Escape Room
 * Core accessibility helpers and WCAG compliance utilities
 */

import type {
  AccessibilityContext,
  AccessibilityPreferences,
  AccessibilityAnnouncement,
  WCAGLevel,
  AccessibilityCompliance
} from '@/types/accessibility';

/**
 * Detect user's accessibility context from browser APIs
 */
export function detectAccessibilityContext(): AccessibilityContext {
  if (typeof window === 'undefined') {
    return getDefaultAccessibilityContext();
  }

  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight,
    zoom: window.devicePixelRatio || 1,
  };

  // Detect screen reader
  const screenReaderActive = detectScreenReader();

  // Detect high contrast mode
  const highContrast = window.matchMedia('(prefers-contrast: high)').matches;

  // Detect reduced motion preference
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Detect color scheme
  const colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' :
                     highContrast ? 'high-contrast' : 'light';

  // Detect keyboard navigation preference
  const keyboardNavigation = detectKeyboardNavigation();

  return {
    inputMethod: determineInputMethod(),
    assistiveTech: detectAssistiveTechnology(),
    reducedMotion,
    highContrast,
    screenReaderActive,
    keyboardNavigation,
    viewport,
    colorScheme,
    focusVisible: document.documentElement.classList.contains('focus-visible') || keyboardNavigation,
  };
}

/**
 * Detect screen reader usage
 */
function detectScreenReader(): boolean {
  if (typeof window === 'undefined') return false;

  // Check for common screen reader indicators
  const userAgent = navigator.userAgent.toLowerCase();
  const screenReaderIndicators = [
    'nvda', 'jaws', 'dragon', 'zoomtext', 'magic', 'supernova',
    'narrator', 'voiceover', 'talkback', 'orca'
  ];

  const hasScreenReaderInUserAgent = screenReaderIndicators.some(
    indicator => userAgent.includes(indicator)
  );

  // Check for speech synthesis API usage (often indicates screen reader)
  const hasSpeechSynthesis = 'speechSynthesis' in window && window.speechSynthesis.speaking;

  // Check for accessibility tree API usage
  const hasAccessibilityAPI = 'accessibilityAPI' in window;

  return hasScreenReaderInUserAgent || hasSpeechSynthesis || hasAccessibilityAPI;
}

/**
 * Detect assistive technology type
 */
function detectAssistiveTechnology(): string | null {
  if (typeof window === 'undefined') return null;

  const userAgent = navigator.userAgent.toLowerCase();

  // Common assistive technologies
  if (userAgent.includes('nvda')) return 'NVDA';
  if (userAgent.includes('jaws')) return 'JAWS';
  if (userAgent.includes('voiceover')) return 'VoiceOver';
  if (userAgent.includes('talkback')) return 'TalkBack';
  if (userAgent.includes('narrator')) return 'Narrator';
  if (userAgent.includes('orca')) return 'Orca';
  if (userAgent.includes('dragon')) return 'Dragon NaturallySpeaking';

  return null;
}

/**
 * Detect keyboard navigation preference
 */
function detectKeyboardNavigation(): boolean {
  if (typeof window === 'undefined') return false;

  // Check for keyboard navigation indicators
  const hasKeyboardNavigation = localStorage.getItem('keyboard-navigation') === 'true';
  const isTouchDevice = 'ontouchstart' in window;
  const hasPointer = window.matchMedia('(pointer: fine)').matches;

  // Assume keyboard navigation if not a touch device and has fine pointer control
  return hasKeyboardNavigation || (!isTouchDevice && hasPointer);
}

/**
 * Determine primary input method
 */
function determineInputMethod(): AccessibilityContext['inputMethod'] {
  if (typeof window === 'undefined') return 'mouse';

  // Check touch capability
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    return 'touch';
  }

  // Check for screen reader
  if (detectScreenReader()) {
    return 'screen_reader';
  }

  // Check for keyboard-only navigation
  if (detectKeyboardNavigation()) {
    return 'keyboard';
  }

  // Default to mouse
  return 'mouse';
}

/**
 * Get default accessibility context for SSR
 */
function getDefaultAccessibilityContext(): AccessibilityContext {
  return {
    inputMethod: 'mouse',
    assistiveTech: null,
    reducedMotion: false,
    highContrast: false,
    screenReaderActive: false,
    keyboardNavigation: false,
    viewport: { width: 1024, height: 768, zoom: 1 },
    colorScheme: 'light',
    focusVisible: false,
  };
}

/**
 * Store accessibility preferences in localStorage
 */
export function storeAccessibilityPreferences(preferences: AccessibilityPreferences): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem('accessibility-preferences', JSON.stringify(preferences));
  } catch (error) {
    console.warn('Failed to store accessibility preferences:', error);
  }
}

/**
 * Retrieve stored accessibility preferences
 */
export function getStoredAccessibilityPreferences(): AccessibilityPreferences {
  if (typeof window === 'undefined') {
    return getDefaultAccessibilityPreferences();
  }

  try {
    const stored = localStorage.getItem('accessibility-preferences');
    if (stored) {
      return { ...getDefaultAccessibilityPreferences(), ...JSON.parse(stored) };
    }
  } catch (error) {
    console.warn('Failed to retrieve accessibility preferences:', error);
  }

  return getDefaultAccessibilityPreferences();
}

/**
 * Default accessibility preferences
 */
function getDefaultAccessibilityPreferences(): AccessibilityPreferences {
  return {
    screenReader: false,
    keyboardOnly: false,
    highContrast: false,
    reducedMotion: false,
    fontSize: 'normal',
    dyslexiaFont: false,
    audioDescriptions: true,
    hapticFeedback: true,
  };
}

/**
 * Announce message to screen readers
 */
export function announceToScreenReader(
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
): void {
  if (typeof window === 'undefined') return;

  // Create a temporary live region for the announcement
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.setAttribute('class', 'sr-only');
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove the announcement after it's been read
  setTimeout(() => {
    if (document.body.contains(announcement)) {
      document.body.removeChild(announcement);
    }
  }, 1000);
}

/**
 * Manage focus with accessibility considerations
 */
export function manageFocus(targetId: string, options?: {
  preventScroll?: boolean;
  restoreFocus?: boolean;
  announceChange?: boolean;
}): void {
  if (typeof window === 'undefined') return;

  const target = document.getElementById(targetId);
  if (!target) {
    console.warn(`Focus target not found: ${targetId}`);
    return;
  }

  // Store current focus for restoration
  const currentFocus = document.activeElement as HTMLElement;

  // Apply focus
  target.focus({ preventScroll: options?.preventScroll });

  // Announce focus change if requested
  if (options?.announceChange) {
    const label = target.getAttribute('aria-label') ||
                  target.getAttribute('aria-labelledby') ||
                  target.textContent ||
                  'Element';
    announceToScreenReader(`Focused on ${label}`);
  }

  // Store focus restoration callback
  if (options?.restoreFocus && currentFocus) {
    const restoreFocus = () => {
      if (document.contains(currentFocus)) {
        currentFocus.focus();
      }
    };

    // Add to global restoration stack (you might want to implement this)
    if (typeof window !== 'undefined') {
      (window as any).focusRestoreStack = (window as any).focusRestoreStack || [];
      (window as any).focusRestoreStack.push(restoreFocus);
    }
  }
}

/**
 * Create skip links for keyboard navigation
 */
export function createSkipLinks(targets: Array<{ id: string; label: string }>): HTMLElement {
  const skipNav = document.createElement('nav');
  skipNav.setAttribute('aria-label', 'Skip navigation');
  skipNav.className = 'skip-links';

  targets.forEach(({ id, label }) => {
    const skipLink = document.createElement('a');
    skipLink.href = `#${id}`;
    skipLink.textContent = `Skip to ${label}`;
    skipLink.className = 'skip-link';

    skipLink.addEventListener('click', (e) => {
      e.preventDefault();
      manageFocus(id, { announceChange: true });
    });

    skipNav.appendChild(skipLink);
  });

  return skipNav;
}

/**
 * Validate WCAG color contrast ratio
 */
export function validateContrastRatio(
  foreground: string,
  background: string,
  level: WCAGLevel = 'AA'
): { passed: boolean; ratio: number; required: number } {
  const luminance1 = getLuminance(foreground);
  const luminance2 = getLuminance(background);

  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);

  const ratio = (lighter + 0.05) / (darker + 0.05);

  // WCAG requirements
  const requirements = {
    'A': 3,     // Large text only
    'AA': 4.5,  // Normal text
    'AAA': 7    // Enhanced contrast
  };

  const required = requirements[level];
  const passed = ratio >= required;

  return { passed, ratio, required };
}

/**
 * Calculate relative luminance for contrast calculation
 */
function getLuminance(color: string): number {
  // Convert color to RGB values
  const rgb = hexToRgb(color);
  if (!rgb) return 0;

  // Convert to relative luminance
  const rsRGB = rgb.r / 255;
  const gsRGB = rgb.g / 255;
  const bsRGB = rgb.b / 255;

  const r = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const g = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const b = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result && result[1] && result[2] && result[3] ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Apply accessibility preferences to DOM
 */
export function applyAccessibilityPreferences(preferences: AccessibilityPreferences): void {
  if (typeof window === 'undefined') return;

  const html = document.documentElement;

  // High contrast mode
  if (preferences.highContrast) {
    html.classList.add('high-contrast');
  } else {
    html.classList.remove('high-contrast');
  }

  // Reduced motion
  if (preferences.reducedMotion) {
    html.classList.add('reduce-motion');
  } else {
    html.classList.remove('reduce-motion');
  }

  // Font size
  html.classList.remove('font-normal', 'font-large', 'font-extra-large');
  html.classList.add(`font-${preferences.fontSize}`);

  // Dyslexia-friendly font
  if (preferences.dyslexiaFont) {
    html.classList.add('dyslexic-font');
  } else {
    html.classList.remove('dyslexic-font');
  }

  // Keyboard navigation
  if (preferences.keyboardOnly) {
    html.classList.add('keyboard-navigation');
    // Ensure focus is always visible
    html.classList.add('force-focus-visible');
  } else {
    html.classList.remove('keyboard-navigation', 'force-focus-visible');
  }

  // Screen reader optimizations
  if (preferences.screenReader) {
    html.classList.add('screen-reader-optimized');
  } else {
    html.classList.remove('screen-reader-optimized');
  }
}

/**
 * Get accessibility-aware timeout duration
 */
export function getAccessibleTimeout(
  baseTimeout: number,
  context: AccessibilityContext
): number {
  let multiplier = 1;

  // Increase timeout for screen reader users
  if (context.screenReaderActive) {
    multiplier *= 2;
  }

  // Increase timeout for keyboard navigation
  if (context.keyboardNavigation) {
    multiplier *= 1.5;
  }

  // Increase timeout for reduced motion (cognitive accessibility)
  if (context.reducedMotion) {
    multiplier *= 1.5;
  }

  return Math.round(baseTimeout * multiplier);
}

/**
 * Format text for screen readers
 */
export function formatForScreenReader(text: string, context?: string): string {
  // Add context if provided
  if (context) {
    text = `${context}: ${text}`;
  }

  // Replace abbreviations and symbols with full words
  text = text
    .replace(/&/g, 'and')
    .replace(/@/g, 'at')
    .replace(/#/g, 'number')
    .replace(/\$/g, 'dollars')
    .replace(/%/g, 'percent')
    .replace(/\+/g, 'plus')
    .replace(/-/g, 'minus')
    .replace(/\*/g, 'times')
    .replace(/\//g, 'divided by');

  // Add periods for better screen reader pacing
  if (!text.endsWith('.') && !text.endsWith('!') && !text.endsWith('?')) {
    text += '.';
  }

  return text;
}

/**
 * Generate unique IDs for accessibility attributes
 */
export function generateAccessibilityId(prefix = 'a11y'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Check if element is focusable
 */
export function isFocusable(element: HTMLElement): boolean {
  // Elements that are inherently focusable
  const focusableElements = [
    'input', 'select', 'textarea', 'button', 'a', 'area', 'object', 'embed', 'iframe'
  ];

  const tagName = element.tagName.toLowerCase();

  // Check if inherently focusable
  if (focusableElements.includes(tagName)) {
    return !element.hasAttribute('disabled');
  }

  // Check for tabindex
  const tabIndex = element.getAttribute('tabindex');
  return tabIndex !== null && tabIndex !== '-1';
}

/**
 * Get all focusable elements within a container
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const focusableSelectors = [
    'input:not([disabled]):not([tabindex="-1"])',
    'select:not([disabled]):not([tabindex="-1"])',
    'textarea:not([disabled]):not([tabindex="-1"])',
    'button:not([disabled]):not([tabindex="-1"])',
    'a[href]:not([tabindex="-1"])',
    'area[href]:not([tabindex="-1"])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable]:not([tabindex="-1"])'
  ].join(', ');

  return Array.from(container.querySelectorAll(focusableSelectors)) as HTMLElement[];
}
