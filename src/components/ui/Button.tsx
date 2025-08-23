/**
 * Accessible Button Component for BMad Escape Room
 * WCAG 2.1 AA compliant with comprehensive accessibility features
 */

"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useAccessibility } from "@/hooks/useAccessibility";

const buttonVariants = cva(
  // Base styles with accessibility focus
  [
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "touch-target", // Minimum 44px touch target
    "motion-reduce-friendly", // Respects reduced motion
    // Screen reader optimizations
    "sr-only:not-sr-only", // Ensures content is available to screen readers
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-primary-900 text-primary-50 hover:bg-primary-800",
          "active:bg-primary-700",
          "disabled:bg-secondary-300 disabled:text-secondary-500"
        ],
        secondary: [
          "bg-secondary-200 text-secondary-900 hover:bg-secondary-300",
          "active:bg-secondary-400",
          "disabled:bg-secondary-100 disabled:text-secondary-400"
        ],
        accent: [
          "bg-accent-600 text-primary-50 hover:bg-accent-700",
          "active:bg-accent-800",
          "disabled:bg-secondary-300 disabled:text-secondary-500"
        ],
        destructive: [
          "bg-error-500 text-primary-50 hover:bg-error-600",
          "active:bg-error-700",
          "disabled:bg-secondary-300 disabled:text-secondary-500"
        ],
        ghost: [
          "hover:bg-secondary-100 hover:text-secondary-900",
          "active:bg-secondary-200",
          "disabled:bg-transparent disabled:text-secondary-400"
        ],
        link: [
          "text-primary-900 underline-offset-4 hover:underline",
          "active:text-primary-700",
          "disabled:text-secondary-400 disabled:no-underline"
        ]
      },
      size: {
        sm: "h-9 px-3 text-xs",
        default: "h-10 px-4 py-2",
        lg: "h-11 px-8 text-base",
        xl: "h-12 px-10 text-lg", // Extra large for motor accessibility
        icon: "h-10 w-10" // Square for icon buttons
      },
      // Accessibility-specific variants
      contrast: {
        normal: "",
        high: "ring-2 ring-accent-600 ring-offset-2" // High contrast mode
      },
      motion: {
        normal: "",
        reduced: "transition-none" // Reduced motion
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      contrast: "normal",
      motion: "normal"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  // Accessibility props
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaControls?: string;
  ariaExpanded?: boolean;
  // Loading state for async actions
  isLoading?: boolean;
  loadingText?: string;
  // Icon support
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  // Interaction tracking
  onAccessibilityAction?: (method: 'mouse' | 'keyboard' | 'touch' | 'screen_reader') => void;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant,
    size,
    contrast,
    motion,
    asChild = false,
    children,
    ariaLabel,
    ariaDescribedBy,
    ariaControls,
    ariaExpanded,
    isLoading = false,
    loadingText = "Loading...",
    leftIcon,
    rightIcon,
    onAccessibilityAction,
    onClick,
    onKeyDown,
    disabled,
    ...props
  }, ref) => {
    const { context, trackInteraction, preferences } = useAccessibility();
    const buttonId = React.useId();

    // Apply accessibility-aware variants
    const accessibilityVariants = {
      contrast: (preferences.highContrast ? 'high' : 'normal') as 'normal' | 'high',
      motion: (preferences.reducedMotion ? 'reduced' : 'normal') as 'normal' | 'reduced'
    };

    const Comp = asChild ? Slot : "button";

    // Handle click with accessibility tracking
    const handleClick = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      if (isLoading || disabled) return;

      // Determine interaction method
      const method = e.detail === 0 ? 'keyboard' : 'mouse';
      trackInteraction(buttonId, method);
      onAccessibilityAction?.(method);
      onClick?.(e);
    }, [isLoading, disabled, trackInteraction, buttonId, onAccessibilityAction, onClick]);

    // Handle keyboard interaction
    const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (isLoading || disabled) return;

      if (e.key === 'Enter' || e.key === ' ') {
        trackInteraction(buttonId, 'keyboard');
        onAccessibilityAction?.('keyboard');
      }

      onKeyDown?.(e);
    }, [isLoading, disabled, trackInteraction, buttonId, onAccessibilityAction, onKeyDown]);

    // Screen reader optimized content
    const getAccessibleContent = () => {
      if (isLoading) {
        return (
          <>
            <span className="sr-only">{loadingText}</span>
            <span aria-hidden="true" className="animate-spin">⟳</span>
            {loadingText && <span className="ml-2">{loadingText}</span>}
          </>
        );
      }

      return (
        <>
          {leftIcon && (
            <span className="mr-2" aria-hidden="true">
              {leftIcon}
            </span>
          )}
          {children}
          {rightIcon && (
            <span className="ml-2" aria-hidden="true">
              {rightIcon}
            </span>
          )}
        </>
      );
    };

    return (
      <Comp
        ref={ref}
        id={buttonId}
        className={cn(
          buttonVariants({
            variant,
            size,
            contrast: accessibilityVariants.contrast,
            motion: accessibilityVariants.motion
          }),
          className
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={disabled || isLoading}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-controls={ariaControls}
        aria-expanded={ariaExpanded}
        aria-disabled={disabled || isLoading}
        aria-busy={isLoading}
        // Enhanced keyboard navigation
        tabIndex={disabled ? -1 : 0}
        {...props}
      >
        {getAccessibleContent()}
      </Comp>
    );
  }
);

Button.displayName = "Button";

// Icon-only button variant with enhanced accessibility
export interface IconButtonProps extends Omit<ButtonProps, 'children'> {
  icon: React.ReactNode;
  ariaLabel: string; // Required for icon buttons
  tooltip?: string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, ariaLabel, tooltip, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        size="icon"
        ariaLabel={ariaLabel}
        ariaDescribedBy={tooltip ? `${props.id || 'icon-button'}-tooltip` : undefined}
        {...props}
      >
        <span aria-hidden="true">{icon}</span>
        {tooltip && (
          <span
            id={`${props.id || 'icon-button'}-tooltip`}
            className="sr-only"
          >
            {tooltip}
          </span>
        )}
      </Button>
    );
  }
);

IconButton.displayName = "IconButton";

export { Button, buttonVariants };
