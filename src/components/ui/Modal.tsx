/**
 * Accessible Modal Component for BMad Escape Room
 * WCAG 2.1 AA compliant with focus trapping and screen reader support
 */

"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAccessibility, useFocusManagement } from "@/hooks/useAccessibility";
import { Button } from "./Button";

const Modal = Dialog.Root;
const ModalTrigger = Dialog.Trigger;

const ModalPortal = Dialog.Portal;

const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof Dialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof Dialog.Overlay>
>(({ className, ...props }, ref) => {
  const { preferences } = useAccessibility();

  return (
    <Dialog.Overlay
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-secondary-950/80 backdrop-blur-sm",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        // Respect reduced motion preference
        preferences.reducedMotion && "animate-none transition-none",
        className
      )}
      {...props}
    />
  );
});
ModalOverlay.displayName = Dialog.Overlay.displayName;

const ModalContent = React.forwardRef<
  React.ElementRef<typeof Dialog.Content>,
  React.ComponentPropsWithoutRef<typeof Dialog.Content> & {
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    showCloseButton?: boolean;
    onEscapeKeyDown?: (event: KeyboardEvent) => void;
  }
>(({ className, children, size = 'md', showCloseButton = true, onEscapeKeyDown, ...props }, ref) => {
  const { announce, preferences } = useAccessibility();
  const { pushFocus, popFocus } = useFocusManagement();
  const contentId = React.useId();

  // Size variants
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-xl",
    xl: "max-w-3xl",
    full: "max-w-[95vw] max-h-[95vh]"
  };

  // Handle modal open
  React.useEffect(() => {
    announce("Modal opened. Press Escape to close.", 'polite');
    pushFocus(contentId);

    return () => {
      popFocus();
    };
  }, [announce, pushFocus, popFocus, contentId]);

  // Handle escape key with accessibility announcement
  const handleEscapeKeyDown = React.useCallback((event: KeyboardEvent) => {
    announce("Modal closing", 'polite');
    onEscapeKeyDown?.(event);
  }, [announce, onEscapeKeyDown]);

  return (
    <ModalPortal>
      <ModalOverlay />
      <Dialog.Content
        ref={ref}
        id={contentId}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border border-secondary-200 bg-secondary-50 p-6 shadow-lg duration-200",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
          "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
          "sm:rounded-lg",
          // Size classes
          sizeClasses[size],
          // Accessibility enhancements
          "focus:outline-none focus:ring-2 focus:ring-accent-600 focus:ring-offset-2",
          // Respect reduced motion
          preferences.reducedMotion && "animate-none transition-none",
          // High contrast mode
          preferences.highContrast && "border-2 border-accent-600",
          className
        )}
        onEscapeKeyDown={handleEscapeKeyDown}
        // Ensure proper ARIA attributes
        role="dialog"
        aria-modal="true"
        {...props}
      >
        {children}
        {showCloseButton && (
          <Dialog.Close asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-secondary-50 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-accent-600 focus:ring-offset-2 disabled:pointer-events-none"
              ariaLabel="Close modal"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </Dialog.Close>
        )}
      </Dialog.Content>
    </ModalPortal>
  );
});
ModalContent.displayName = Dialog.Content.displayName;

const ModalHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
ModalHeader.displayName = "ModalHeader";

const ModalFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
ModalFooter.displayName = "ModalFooter";

const ModalTitle = React.forwardRef<
  React.ElementRef<typeof Dialog.Title>,
  React.ComponentPropsWithoutRef<typeof Dialog.Title>
>(({ className, ...props }, ref) => (
  <Dialog.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight text-secondary-900",
      className
    )}
    {...props}
  />
));
ModalTitle.displayName = Dialog.Title.displayName;

const ModalDescription = React.forwardRef<
  React.ElementRef<typeof Dialog.Description>,
  React.ComponentPropsWithoutRef<typeof Dialog.Description>
>(({ className, ...props }, ref) => (
  <Dialog.Description
    ref={ref}
    className={cn("text-sm text-secondary-700", className)}
    {...props}
  />
));
ModalDescription.displayName = Dialog.Description.displayName;

// Specialized modals for escape room functionality

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = 'default'
}) => {
  const { announce } = useAccessibility();

  const handleConfirm = React.useCallback(() => {
    announce(`${title} confirmed`, 'polite');
    onConfirm();
    onClose();
  }, [announce, title, onConfirm, onClose]);

  const handleCancel = React.useCallback(() => {
    announce(`${title} cancelled`, 'polite');
    onClose();
  }, [announce, title, onClose]);

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent size="sm">
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <ModalDescription>{description}</ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <Button variant="ghost" onClick={handleCancel}>
            {cancelText}
          </Button>
          <Button
            variant={variant === 'destructive' ? 'destructive' : 'primary'}
            onClick={handleConfirm}
          >
            {confirmText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

// Puzzle inspection modal for escape room
interface PuzzleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const PuzzleModal: React.FC<PuzzleModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'lg'
}) => {
  const { announce } = useAccessibility();

  React.useEffect(() => {
    if (isOpen) {
      announce(`${title} puzzle opened. Examine the details to solve the puzzle.`, 'polite');
    }
  }, [isOpen, title, announce]);

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent size={size}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          {description && <ModalDescription>{description}</ModalDescription>}
        </ModalHeader>
        <div className="py-4">
          {children}
        </div>
      </ModalContent>
    </Modal>
  );
};

export {
  Modal,
  ModalPortal,
  ModalOverlay,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
};
