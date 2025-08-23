/**
 * Focus Manager - Advanced focus management for accessibility
 * Handles focus trapping, restoration, and keyboard navigation
 */

"use client";

import * as React from "react";
import { useAccessibility, useFocusManagement } from "@/hooks/useAccessibility";

interface FocusManagerProps {
  children?: React.ReactNode;
}

export const FocusManager: React.FC<FocusManagerProps> = ({ children }) => {
  const { context } = useAccessibility();
  const { currentFocus, focusHistory } = useFocusManagement();

  // Focus restoration on page navigation
  React.useEffect(() => {
    const handleBeforeUnload = () => {
      // Store focus for restoration on return
      if (currentFocus) {
        sessionStorage.setItem('bmad-focus-restore', currentFocus);
      }
    };

    const handleLoad = () => {
      // Restore focus if available
      const storedFocus = sessionStorage.getItem('bmad-focus-restore');
      if (storedFocus) {
        const element = document.getElementById(storedFocus);
        if (element) {
          setTimeout(() => {
            element.focus();
          }, 100);
        }
        sessionStorage.removeItem('bmad-focus-restore');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('load', handleLoad);
    };
  }, [currentFocus]);

  // Enhanced keyboard navigation
  React.useEffect(() => {
    if (!context.keyboardNavigation && !context.screenReaderActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle global keyboard shortcuts
      switch (e.key) {
        case 'F6':
          // Cycle through major sections
          e.preventDefault();
          cycleThroughSections(e.shiftKey ? 'backward' : 'forward');
          break;

        case 'Escape':
          // Return to main content or close modal
          handleEscapeKey();
          break;

        case 'Home':
          // Go to top of page
          if (e.ctrlKey) {
            e.preventDefault();
            focusFirstElement();
          }
          break;

        case 'End':
          // Go to bottom of page
          if (e.ctrlKey) {
            e.preventDefault();
            focusLastElement();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [context.keyboardNavigation, context.screenReaderActive]);

  // Visible focus indicator for keyboard navigation
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Add visible focus class for keyboard users
      if (context.keyboardNavigation) {
        target.classList.add('keyboard-focus');
      }
    };

    const handleFocusOut = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      target.classList.remove('keyboard-focus');
    };

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, [context.keyboardNavigation]);

  return (
    <>
      {children}
    </>
  );
};

// Utility functions for focus management
function cycleThroughSections(direction: 'forward' | 'backward') {
  const sections = [
    'room-scene',
    'puzzle-area',
    'hint-panel',
    'inventory',
    'accessibility-controls'
  ];

  const currentElement = document.activeElement as HTMLElement;
  let currentSectionIndex = -1;

  // Find current section
  for (let i = 0; i < sections.length; i++) {
    const sectionId = sections[i];
    if (!sectionId) continue;
    const section = document.getElementById(sectionId);
    if (section && (section === currentElement || section.contains(currentElement))) {
      currentSectionIndex = i;
      break;
    }
  }

  // Move to next/previous section
  const nextIndex = direction === 'forward'
    ? (currentSectionIndex + 1) % sections.length
    : currentSectionIndex <= 0 ? sections.length - 1 : currentSectionIndex - 1;

  const nextSectionId = sections[nextIndex];
  if (!nextSectionId) return;
  const nextSection = document.getElementById(nextSectionId);
  if (nextSection) {
    // Focus first focusable element in section
    const focusableElement = nextSection.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as HTMLElement;

    if (focusableElement) {
      focusableElement.focus();
    } else {
      nextSection.focus();
    }
  }
}

function handleEscapeKey() {
  // Check if we're in a modal or overlay
  const modal = document.querySelector('[role="dialog"][aria-modal="true"]');
  if (modal) {
    // Let the modal handle escape
    return;
  }

  // Return to main content
  const mainContent = document.getElementById('main-content') ||
                     document.getElementById('room-scene') ||
                     document.querySelector('main');

  if (mainContent) {
    const firstFocusable = mainContent.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as HTMLElement;

    if (firstFocusable) {
      firstFocusable.focus();
    } else {
      mainContent.focus();
    }
  }
}

function focusFirstElement() {
  const firstFocusable = document.querySelector(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  ) as HTMLElement;

  if (firstFocusable) {
    firstFocusable.focus();
  }
}

function focusLastElement() {
  const focusableElements = document.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;
  if (lastFocusable) {
    lastFocusable.focus();
  }
}

// Hook for focus trap functionality
export function useFocusTrap(isActive: boolean, containerRef: React.RefObject<HTMLElement>) {
  React.useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus first element when trap activates
    firstElement?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, containerRef]);
}

// Hook for restoring focus after component unmount
export function useFocusRestore() {
  const previousFocus = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    // Store current focus on mount
    previousFocus.current = document.activeElement as HTMLElement;

    // Restore focus on unmount
    return () => {
      if (previousFocus.current && document.contains(previousFocus.current)) {
        setTimeout(() => {
          previousFocus.current?.focus();
        }, 0);
      }
    };
  }, []);

  return {
    storeFocus: () => {
      previousFocus.current = document.activeElement as HTMLElement;
    },
    restoreFocus: () => {
      if (previousFocus.current && document.contains(previousFocus.current)) {
        previousFocus.current.focus();
      }
    }
  };
}
