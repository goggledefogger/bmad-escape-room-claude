/**
 * Skip Links Component - Keyboard navigation assistance
 * Provides skip links for keyboard users to navigate efficiently
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useAccessibility } from "@/hooks/useAccessibility";

interface SkipLink {
  id: string;
  label: string;
  shortcut?: string;
}

interface SkipLinksProps {
  links: SkipLink[];
  className?: string;
}

export const SkipLinks: React.FC<SkipLinksProps> = ({ links, className }) => {
  const { context, setFocus, announce } = useAccessibility();

  // Handle skip link activation
  const handleSkipToSection = React.useCallback((targetId: string, label: string) => {
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      setFocus(targetId);
      announce(`Skipped to ${label}`, 'polite');

      // Scroll into view if needed
      targetElement.scrollIntoView({
        behavior: context.reducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });
    } else {
      announce(`Could not find ${label} section`, 'assertive');
    }
  }, [setFocus, announce, context.reducedMotion]);

  // Keyboard shortcuts for skip links
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle shortcuts if no input is focused
      const activeElement = document.activeElement;
      if (activeElement?.tagName === 'INPUT' ||
          activeElement?.tagName === 'TEXTAREA' ||
          activeElement?.getAttribute('contenteditable') === 'true') {
        return;
      }

      // Handle Alt + number shortcuts
      if (e.altKey && !e.ctrlKey && !e.shiftKey) {
        const number = parseInt(e.key);
        if (number >= 1 && number <= links.length) {
          e.preventDefault();
          const link = links[number - 1];
          if (link) {
            handleSkipToSection(link.id, link.label);
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [links, handleSkipToSection]);

  return (
    <nav
      className={cn(
        "skip-links fixed left-0 top-0 z-[1000] p-4",
        className
      )}
      aria-label="Skip navigation"
    >
      <ul className="flex flex-col gap-2">
        {links.map((link, index) => (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              className={cn(
                // Base skip link styles
                "skip-link",
                "absolute left-[-9999px] top-[-9999px]",
                "bg-gray-900 text-white px-4 py-2 rounded-md",
                "text-sm font-medium",
                "focus:left-4 focus:top-4 focus:z-[1001]",
                "focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2",
                "transition-all duration-150",
                // Ensure it's visible when focused
                "focus:relative focus:block"
              )}
              onClick={(e) => {
                e.preventDefault();
                handleSkipToSection(link.id, link.label);
              }}
              title={link.shortcut ? `Keyboard shortcut: Alt+${index + 1}` : undefined}
            >
              Skip to {link.label}
              {link.shortcut && (
                <span className="ml-2 text-xs opacity-75">
                  (Alt+{index + 1})
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>

      {/* Instructions for screen reader users */}
      <div className="sr-only">
        <p>
          Use Tab to navigate through skip links, or use keyboard shortcuts Alt+1 through Alt+{links.length}
          to jump directly to sections.
        </p>
      </div>
    </nav>
  );
};

// Hook for managing skip link targets
export function useSkipTarget(targetId: string, label?: string) {
  const elementRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Ensure the element has the target ID
    if (!element.id) {
      element.id = targetId;
    }

    // Add skip target attributes for accessibility
    element.setAttribute('tabindex', '-1');

    // Add aria-label if provided and element doesn't have one
    if (label && !element.getAttribute('aria-label') && !element.getAttribute('aria-labelledby')) {
      element.setAttribute('aria-label', label);
    }

    // Handle focus events
    const handleFocus = () => {
      // Remove tabindex after focus to prevent confusion
      setTimeout(() => {
        element.removeAttribute('tabindex');
      }, 100);
    };

    element.addEventListener('focus', handleFocus);

    return () => {
      element.removeEventListener('focus', handleFocus);
    };
  }, [targetId, label]);

  return elementRef;
}

// Default skip links for common page structures
export const defaultSkipLinks: SkipLink[] = [
  { id: 'main-content', label: 'main content', shortcut: '1' },
  { id: 'navigation', label: 'navigation', shortcut: '2' },
  { id: 'accessibility-controls', label: 'accessibility controls', shortcut: '3' },
  { id: 'footer', label: 'footer', shortcut: '4' }
];

// Specialized skip links for escape room
export const escapeRoomSkipLinks: SkipLink[] = [
  { id: 'room-scene', label: 'room scene', shortcut: '1' },
  { id: 'puzzle-area', label: 'puzzle area', shortcut: '2' },
  { id: 'hint-panel', label: 'hint panel', shortcut: '3' },
  { id: 'inventory', label: 'inventory', shortcut: '4' },
  { id: 'accessibility-controls', label: 'accessibility controls', shortcut: '5' }
];
