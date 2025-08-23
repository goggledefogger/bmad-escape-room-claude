/**
 * Screen Reader Announcer - Live region management for accessibility
 * Handles ARIA live region announcements with proper queuing and timing
 */

"use client";

import * as React from "react";
import { useAccessibility } from "@/hooks/useAccessibility";

export const ScreenReaderAnnouncer: React.FC = () => {
  const { announcements, context } = useAccessibility();
  const politeRef = React.useRef<HTMLDivElement>(null);
  const assertiveRef = React.useRef<HTMLDivElement>(null);

  // Handle new announcements
  React.useEffect(() => {
    if (announcements.length === 0) return;

    const latestAnnouncement = announcements[announcements.length - 1];
    if (!latestAnnouncement) return;

    const targetRef = latestAnnouncement.priority === 'assertive' ? assertiveRef : politeRef;
    if (!targetRef.current) return;

    // Clear previous content and set new content
    targetRef.current.textContent = '';

    // Use requestAnimationFrame to ensure the clear happens before the new content
    requestAnimationFrame(() => {
      if (targetRef.current) {
        targetRef.current.textContent = latestAnnouncement.message;
      }
    });

    // Auto-clear after a reasonable time to prevent accumulation
    const timeoutId = setTimeout(() => {
      if (targetRef.current) {
        targetRef.current.textContent = '';
      }
    }, 10000); // 10 seconds

    return () => clearTimeout(timeoutId);
  }, [announcements]);

  // Only render if screen reader is likely active or we're in development
  if (!context.screenReaderActive && process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <>
      {/* Polite announcements - don't interrupt current speech */}
      <div
        ref={politeRef}
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
        aria-relevant="additions text"
        role="status"
      />

      {/* Assertive announcements - interrupt current speech for urgent messages */}
      <div
        ref={assertiveRef}
        className="sr-only"
        aria-live="assertive"
        aria-atomic="true"
        aria-relevant="additions text"
        role="alert"
      />
    </>
  );
};

// Hook for easy announcement usage in components
export function useScreenReaderAnnouncer() {
  const { announce, context } = useAccessibility();

  // Enhanced announce function with context awareness
  const enhancedAnnounce = React.useCallback((
    message: string,
    priority: 'polite' | 'assertive' = 'polite',
    options?: {
      delay?: number;
      context?: string;
      onlyIfScreenReader?: boolean;
    }
  ) => {
    // Skip if screen reader only and no screen reader detected
    if (options?.onlyIfScreenReader && !context.screenReaderActive) {
      return;
    }

    const announceMessage = () => {
      announce(message, priority, options?.context);
    };

    // Delay if specified
    if (options?.delay) {
      setTimeout(announceMessage, options.delay);
    } else {
      announceMessage();
    }
  }, [announce, context.screenReaderActive]);

  // Announce with automatic context detection
  const announceWithContext = React.useCallback((
    message: string,
    elementRef?: React.RefObject<HTMLElement>,
    priority: 'polite' | 'assertive' = 'polite'
  ) => {
    let context = '';

    // Try to get context from the element
    if (elementRef?.current) {
      const element = elementRef.current;
      const label = element.getAttribute('aria-label') ||
                   element.getAttribute('aria-labelledby') ||
                   element.textContent ||
                   element.tagName.toLowerCase();
      context = `In ${label}`;
    }

    enhancedAnnounce(message, priority, { context });
  }, [enhancedAnnounce]);

  // Announce state changes (loading, success, error)
  const announceStateChange = React.useCallback((
    state: 'loading' | 'success' | 'error' | 'info',
    message: string,
    details?: string
  ) => {
    const stateMessages = {
      loading: 'Loading',
      success: 'Success',
      error: 'Error',
      info: 'Information'
    };

    const priority = state === 'error' ? 'assertive' : 'polite';
    const fullMessage = `${stateMessages[state]}: ${message}${details ? '. ' + details : ''}`;

    enhancedAnnounce(fullMessage, priority);
  }, [enhancedAnnounce]);

  // Announce progress updates
  const announceProgress = React.useCallback((
    current: number,
    total: number,
    context?: string,
    options?: { percentage?: boolean; onlyMilestones?: boolean }
  ) => {
    const percentage = Math.round((current / total) * 100);

    // Only announce at milestone percentages to avoid spam
    if (options?.onlyMilestones && percentage % 25 !== 0) {
      return;
    }

    const progressMessage = options?.percentage
      ? `${percentage} percent complete`
      : `${current} of ${total} complete`;

    const fullMessage = context ? `${context}: ${progressMessage}` : progressMessage;

    enhancedAnnounce(fullMessage, 'polite', { onlyIfScreenReader: true });
  }, [enhancedAnnounce]);

  return {
    announce: enhancedAnnounce,
    announceWithContext,
    announceStateChange,
    announceProgress,
    isScreenReaderActive: context.screenReaderActive
  };
}
