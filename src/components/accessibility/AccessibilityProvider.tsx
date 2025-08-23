/**
 * Accessibility Provider - Global accessibility context and management
 * Provides accessibility state and utilities throughout the application
 */

"use client";

import * as React from "react";
import { useAccessibility } from "@/hooks/useAccessibility";
import { ScreenReaderAnnouncer } from "./ScreenReaderAnnouncer";
import { SkipLinks } from "./SkipLinks";
import { FocusManager } from "./FocusManager";

interface AccessibilityProviderProps {
  children: React.ReactNode;
  skipLinks?: Array<{ id: string; label: string }>;
  enableDebug?: boolean;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({
  children,
  skipLinks = [
    { id: "main-content", label: "main content" },
    { id: "navigation", label: "navigation" },
    { id: "accessibility-controls", label: "accessibility controls" }
  ],
  enableDebug = false
}) => {
  const { isInitialized, context, preferences } = useAccessibility();

  // Apply global accessibility classes
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const html = document.documentElement;

    // Apply accessibility classes based on context and preferences
    if (context.screenReaderActive) {
      html.classList.add('screen-reader-active');
    } else {
      html.classList.remove('screen-reader-active');
    }

    if (context.keyboardNavigation || preferences.keyboardOnly) {
      html.classList.add('keyboard-navigation');
    } else {
      html.classList.remove('keyboard-navigation');
    }

    if (preferences.reducedMotion || context.reducedMotion) {
      html.classList.add('reduce-motion');
    } else {
      html.classList.remove('reduce-motion');
    }

    if (preferences.highContrast || context.highContrast) {
      html.classList.add('high-contrast');
    } else {
      html.classList.remove('high-contrast');
    }

    // Font size
    html.classList.remove('font-size-normal', 'font-size-large', 'font-size-extra-large');
    html.classList.add(`font-size-${preferences.fontSize}`);

    // Dyslexia font
    if (preferences.dyslexiaFont) {
      html.classList.add('dyslexic-font');
    } else {
      html.classList.remove('dyslexic-font');
    }

  }, [context, preferences]);

  // Add viewport meta tag for accessibility
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.setAttribute(
        'content',
        'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes'
      );
    }
  }, []);

  // Debug overlay for development
  const DebugOverlay = enableDebug ? () => (
    <div
      className="fixed bottom-4 right-4 z-50 bg-gray-900 text-white p-4 rounded-lg shadow-lg font-mono text-xs max-w-xs border border-gray-700 max-h-[calc(100vh-2rem)] overflow-y-auto"
      role="region"
      aria-label="Accessibility Debug Information"
    >
      <h3 className="font-semibold mb-2">A11y Debug</h3>
      <div className="space-y-1">
        <div>Input: {context.inputMethod}</div>
        <div>SR: {context.screenReaderActive ? 'Yes' : 'No'}</div>
        <div>KB: {context.keyboardNavigation ? 'Yes' : 'No'}</div>
        <div>HC: {preferences.highContrast ? 'Yes' : 'No'}</div>
        <div>RM: {preferences.reducedMotion ? 'Yes' : 'No'}</div>
        <div>Font: {preferences.fontSize}</div>
      </div>
    </div>
  ) : null;

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-300">Initializing accessibility features...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Skip links for keyboard navigation */}
      <SkipLinks links={skipLinks} />

      {/* Screen reader announcements */}
      <ScreenReaderAnnouncer />

      {/* Focus management */}
      <FocusManager />

      {/* Main content */}
      {children}

      {/* Debug overlay */}
      {DebugOverlay && <DebugOverlay />}
    </>
  );
};

// HOC for components that need accessibility context
export function withAccessibility<P extends object>(
  Component: React.ComponentType<P>
) {
  const AccessibilityWrapper = (props: P) => {
    const accessibility = useAccessibility();

    return (
      <Component
        {...props}
        accessibility={accessibility}
      />
    );
  };

  AccessibilityWrapper.displayName = `withAccessibility(${Component.displayName || Component.name})`;

  return AccessibilityWrapper;
}

// Hook for components that need to announce their state changes
export function useAccessibilityAnnouncements() {
  const { announce } = useAccessibility();
  const announcedRef = React.useRef<Set<string>>(new Set());

  const announceOnce = React.useCallback((key: string, message: string, priority?: 'polite' | 'assertive') => {
    if (!announcedRef.current.has(key)) {
      announce(message, priority);
      announcedRef.current.add(key);
    }
  }, [announce]);

  const clearAnnouncements = React.useCallback(() => {
    announcedRef.current.clear();
  }, []);

  return {
    announce,
    announceOnce,
    clearAnnouncements
  };
}

// Accessibility preferences context for forms
export const AccessibilityPreferencesContext = React.createContext<{
  preferences: any;
  updatePreferences: (updates: any) => void;
} | null>(null);

export function useAccessibilityPreferences() {
  const context = React.useContext(AccessibilityPreferencesContext);
  if (!context) {
    throw new Error('useAccessibilityPreferences must be used within AccessibilityProvider');
  }
  return context;
}
