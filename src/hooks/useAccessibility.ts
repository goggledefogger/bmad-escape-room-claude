/**
 * useAccessibility Hook - Core accessibility management for BMad Escape Room
 * Provides comprehensive accessibility state management and utilities
 */

"use client";

import { useEffect, useState, useCallback, useRef } from 'react';
import { create } from 'zustand';
import type {
  AccessibilityContext,
  AccessibilityPreferences,
  AccessibilityAnnouncement,
  FocusManagement
} from '@/types/accessibility';
import {
  detectAccessibilityContext,
  getStoredAccessibilityPreferences,
  storeAccessibilityPreferences,
  applyAccessibilityPreferences,
  announceToScreenReader,
  manageFocus,
  getAccessibleTimeout,
  formatForScreenReader
} from '@/lib/accessibility';

interface AccessibilityStore {
  // State
  context: AccessibilityContext;
  preferences: AccessibilityPreferences;
  announcements: AccessibilityAnnouncement[];
  focusManagement: FocusManagement;
  isInitialized: boolean;

  // Actions
  updateContext: (context: Partial<AccessibilityContext>) => void;
  updatePreferences: (preferences: Partial<AccessibilityPreferences>) => void;
  announce: (message: string, priority?: 'polite' | 'assertive', context?: string) => void;
  setFocus: (elementId: string, options?: { announceChange?: boolean; restoreFocus?: boolean }) => void;
  initialize: () => void;
}

// Create Zustand store for accessibility state
const useAccessibilityStore = create<AccessibilityStore>((set, get) => ({
  // Initial state
  context: {
    inputMethod: 'mouse',
    assistiveTech: null,
    reducedMotion: false,
    highContrast: false,
    screenReaderActive: false,
    keyboardNavigation: false,
    viewport: { width: 1024, height: 768, zoom: 1 },
    colorScheme: 'light',
    focusVisible: false,
  },
  preferences: {
    screenReader: false,
    keyboardOnly: false,
    highContrast: false,
    reducedMotion: false,
    fontSize: 'normal',
    dyslexiaFont: false,
    audioDescriptions: true,
    hapticFeedback: true,
  },
  announcements: [],
  focusManagement: {
    currentFocus: null,
    focusHistory: [],
    trapActive: false,
    skipLinks: [],
    landmarkNavigation: false,
  },
  isInitialized: false,

  // Actions
  updateContext: (newContext) =>
    set((state) => ({
      context: { ...state.context, ...newContext }
    })),

  updatePreferences: (newPreferences) =>
    set((state) => {
      const updatedPreferences = { ...state.preferences, ...newPreferences };

      // Store preferences and apply to DOM
      storeAccessibilityPreferences(updatedPreferences);
      applyAccessibilityPreferences(updatedPreferences);

      return { preferences: updatedPreferences };
    }),

  announce: (message, priority = 'polite', context) => {
    const announcement: AccessibilityAnnouncement = {
      id: `announcement-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      message: formatForScreenReader(message, context),
      priority,
      timestamp: new Date(),
      context,
    };

    set((state) => ({
      announcements: [...state.announcements.slice(-9), announcement] // Keep last 10
    }));

    // Actually announce to screen readers
    announceToScreenReader(announcement.message, priority);
  },

  setFocus: (elementId, options = {}) => {
    manageFocus(elementId, {
      announceChange: options.announceChange,
      restoreFocus: options.restoreFocus,
    });

    set((state) => ({
      focusManagement: {
        ...state.focusManagement,
        currentFocus: elementId,
        focusHistory: [...state.focusManagement.focusHistory.slice(-19), elementId], // Keep last 20
      }
    }));
  },

  initialize: () => {
    if (typeof window === 'undefined') return;

    const context = detectAccessibilityContext();
    const preferences = getStoredAccessibilityPreferences();

    // Apply preferences to DOM
    applyAccessibilityPreferences(preferences);

    // Check media queries for initial state
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const mediaContext = {
      reducedMotion: reducedMotionQuery.matches,
      highContrast: highContrastQuery.matches,
      colorScheme: darkModeQuery.matches ? 'dark' :
                  highContrastQuery.matches ? 'high-contrast' : 'light',
    };

    set({
      context: { ...context, ...mediaContext },
      preferences,
      isInitialized: true,
    });
  },
}));

/**
 * Main accessibility hook
 */
export function useAccessibility() {
  const store = useAccessibilityStore();
  const initializeRef = useRef(false);

  // Initialize on mount
  useEffect(() => {
    if (!initializeRef.current && typeof window !== 'undefined') {
      store.initialize();
      initializeRef.current = true;
    }
  }, [store]);

  // Listen for accessibility preference changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'accessibility-preferences' && e.newValue) {
        try {
          const newPreferences = JSON.parse(e.newValue);
          store.updatePreferences(newPreferences);
        } catch (error) {
          console.warn('Failed to parse accessibility preferences from storage:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [store]);

  // Listen for media query changes
  useEffect(() => {
    if (typeof window === 'undefined' || !initializeRef.current) return;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleMediaChange = () => {
      store.updateContext({
        reducedMotion: reducedMotionQuery.matches,
        highContrast: highContrastQuery.matches,
        colorScheme: darkModeQuery.matches ? 'dark' :
                    highContrastQuery.matches ? 'high-contrast' : 'light',
      });
    };

    // Listen for changes only, don't call initially to avoid loops
    reducedMotionQuery.addEventListener('change', handleMediaChange);
    highContrastQuery.addEventListener('change', handleMediaChange);
    darkModeQuery.addEventListener('change', handleMediaChange);

    return () => {
      reducedMotionQuery.removeEventListener('change', handleMediaChange);
      highContrastQuery.removeEventListener('change', handleMediaChange);
      darkModeQuery.removeEventListener('change', handleMediaChange);
    };
  }, []); // Empty dependency array to run only once

  // Track interaction method changes
  const trackInteraction = useCallback((elementId: string, method: AccessibilityContext['inputMethod']) => {
    store.updateContext({ inputMethod: method });

    // Update focus management if this was a focus interaction
    if (method === 'keyboard' || method === 'screen_reader') {
      store.setFocus(elementId, { announceChange: false });
    }
  }, [store]);

  // Get accessible timeout duration
  const getTimeout = useCallback((baseTimeout: number) => {
    return getAccessibleTimeout(baseTimeout, store.context);
  }, [store.context]);

  // Check if feature is enabled
  const isFeatureEnabled = useCallback((feature: keyof AccessibilityPreferences) => {
    return store.preferences[feature];
  }, [store.preferences]);

  // Get current input method
  const getCurrentInputMethod = useCallback(() => {
    return store.context.inputMethod;
  }, [store.context.inputMethod]);

  // Check if screen reader is active
  const isScreenReaderActive = useCallback(() => {
    return store.context.screenReaderActive;
  }, [store.context.screenReaderActive]);

  // Check if keyboard navigation is active
  const isKeyboardNavigation = useCallback(() => {
    return store.context.keyboardNavigation || store.preferences.keyboardOnly;
  }, [store.context.keyboardNavigation, store.preferences.keyboardOnly]);

  // Get accessible color scheme
  const getColorScheme = useCallback(() => {
    if (store.preferences.highContrast) return 'high-contrast';
    return store.context.colorScheme;
  }, [store.context.colorScheme, store.preferences.highContrast]);

  return {
    // State
    context: store.context,
    preferences: store.preferences,
    announcements: store.announcements,
    focusManagement: store.focusManagement,
    isInitialized: store.isInitialized,

    // Actions
    updatePreferences: store.updatePreferences,
    announce: store.announce,
    setFocus: store.setFocus,
    trackInteraction,

    // Utilities
    getTimeout,
    isFeatureEnabled,
    getCurrentInputMethod,
    isScreenReaderActive,
    isKeyboardNavigation,
    getColorScheme,
  };
}

/**
 * Hook for keyboard navigation management
 */
export function useKeyboardNavigation(containerRef?: React.RefObject<HTMLElement>) {
  const { context, setFocus, trackInteraction } = useAccessibility();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [focusableElements, setFocusableElements] = useState<HTMLElement[]>([]);

  // Update focusable elements when container changes
  useEffect(() => {
    if (!containerRef?.current) return;

    const updateFocusableElements = () => {
      const elements = Array.from(
        containerRef.current!.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ) as HTMLElement[];

      setFocusableElements(elements.filter(el => !el.hasAttribute('disabled')));
    };

    updateFocusableElements();

    // Use MutationObserver to watch for DOM changes
    const observer = new MutationObserver(updateFocusableElements);
    observer.observe(containerRef.current, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['disabled', 'tabindex']
    });

    return () => observer.disconnect();
  }, [containerRef]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!context.keyboardNavigation || !containerRef?.current) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          setCurrentIndex(prev => (prev + 1) % focusableElements.length);
          break;

        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          setCurrentIndex(prev => prev === 0 ? focusableElements.length - 1 : prev - 1);
          break;

        case 'Enter':
        case ' ':
          e.preventDefault();
          const currentElement = focusableElements[currentIndex];
          if (currentElement) {
            currentElement.click();
            trackInteraction(currentElement.id || 'unknown', 'keyboard');
          }
          break;

        case 'Escape':
          e.preventDefault();
          // Focus first element or container
          if (focusableElements[0]) {
            setCurrentIndex(0);
          }
          break;
      }
    };

    containerRef.current.addEventListener('keydown', handleKeyDown);
    return () => containerRef.current?.removeEventListener('keydown', handleKeyDown);
  }, [context.keyboardNavigation, focusableElements, currentIndex, trackInteraction, containerRef]);

  // Focus current element
  useEffect(() => {
    const currentElement = focusableElements[currentIndex];
    if (currentElement && context.keyboardNavigation) {
      currentElement.focus();
    }
  }, [currentIndex, focusableElements, context.keyboardNavigation]);

  return {
    currentIndex,
    focusableElements,
    navigateNext: () => setCurrentIndex(prev => (prev + 1) % focusableElements.length),
    navigatePrevious: () => setCurrentIndex(prev => prev === 0 ? focusableElements.length - 1 : prev - 1),
    selectCurrent: () => {
      const currentElement = focusableElements[currentIndex];
      if (currentElement) {
        currentElement.click();
        trackInteraction(currentElement.id || 'unknown', 'keyboard');
      }
    }
  };
}

/**
 * Hook for screen reader announcements
 */
export function useScreenReader() {
  const { context, announce } = useAccessibility();
  const announcementQueue = useRef<string[]>([]);
  const isProcessing = useRef(false);

  // Process announcement queue
  const processQueue = useCallback(async () => {
    if (isProcessing.current || announcementQueue.current.length === 0) return;

    isProcessing.current = true;

    while (announcementQueue.current.length > 0) {
      const message = announcementQueue.current.shift()!;
      announce(message, 'polite');

      // Wait between announcements for better screen reader experience
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    isProcessing.current = false;
  }, [announce]);

  // Queue announcement
  const queueAnnouncement = useCallback((message: string) => {
    if (!context.screenReaderActive) return;

    announcementQueue.current.push(message);
    processQueue();
  }, [context.screenReaderActive, processQueue]);

  // Immediate announcement for urgent messages
  const announceImmediately = useCallback((message: string) => {
    announce(message, 'assertive');
  }, [announce]);

  return {
    isScreenReaderActive: context.screenReaderActive,
    queueAnnouncement,
    announceImmediately,
    announce: (message: string, priority?: 'polite' | 'assertive') =>
      announce(message, priority),
  };
}

/**
 * Hook for focus management with accessibility considerations
 */
export function useFocusManagement() {
  const { focusManagement, setFocus } = useAccessibility();
  const focusStack = useRef<string[]>([]);

  // Push focus state to stack
  const pushFocus = useCallback((elementId: string) => {
    if (focusManagement.currentFocus) {
      focusStack.current.push(focusManagement.currentFocus);
    }
    setFocus(elementId, { announceChange: true });
  }, [focusManagement.currentFocus, setFocus]);

  // Pop focus from stack
  const popFocus = useCallback(() => {
    const previousFocus = focusStack.current.pop();
    if (previousFocus) {
      setFocus(previousFocus, { announceChange: true });
    }
  }, [setFocus]);

  // Clear focus stack
  const clearFocusStack = useCallback(() => {
    focusStack.current = [];
  }, []);

  return {
    currentFocus: focusManagement.currentFocus,
    focusHistory: focusManagement.focusHistory,
    pushFocus,
    popFocus,
    clearFocusStack,
    setFocus: (elementId: string) => setFocus(elementId, { announceChange: true }),
  };
}
