/**
 * Suitcase Lock Modal
 * Interactive 3-digit combination lock interface
 */

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useAccessibility } from '@/hooks/useAccessibility';

interface SuitcaseLockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function SuitcaseLockModal({ isOpen, onClose, onSuccess }: SuitcaseLockModalProps) {
  const [combination, setCombination] = useState(['', '', '']);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [lastAttemptTime, setLastAttemptTime] = useState(0);

  const accessibility = useAccessibility();
  const correctCombination = ['1', '2', '5']; // Seat row (12) + Platform (5) = 125

  const updateDigit = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCombination = [...combination];
      newCombination[index] = value;
      setCombination(newCombination);
      setError(''); // Clear error when user starts typing

      // Auto-focus next field
      if (value && index < 2) {
        const nextInput = document.getElementById(`lock-digit-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleSubmit = async () => {
    const now = Date.now();

    // Anti-brute force: 1-second debounce on incorrect attempts
    if (now - lastAttemptTime < 1000 && attempts > 0) {
      accessibility.announce('Please wait before trying again');
      return;
    }

    setLastAttemptTime(now);
    setIsUnlocking(true);

    // Check if all digits are entered
    if (combination.some(digit => !digit)) {
      setError('Please enter all three digits');
      accessibility.announce('Error: Please enter all three digits');
      setIsUnlocking(false);
      return;
    }

    // Simulate lock mechanism delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Check combination
    const isCorrect = combination.every((digit, index) => digit === correctCombination[index]);

    if (isCorrect) {
      accessibility.announce('Success! Suitcase lock opened. Punch-card overlay discovered inside.');
      setIsUnlocking(false);
      onSuccess();
    } else {
      setAttempts(prev => prev + 1);
      setError(`Incorrect combination. ${3 - attempts - 1} attempts remaining.`);
      accessibility.announce(`Incorrect combination. ${3 - attempts - 1} attempts remaining. The lock remains secured.`);
      setIsUnlocking(false);

      // Clear combination after error
      setTimeout(() => {
        setCombination(['', '', '']);
        document.getElementById('lock-digit-0')?.focus();
      }, 1500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter') {
      if (index < 2 && combination[index]) {
        // Move to next field
        document.getElementById(`lock-digit-${index + 1}`)?.focus();
      } else if (index === 2 || combination.every(digit => digit)) {
        // Submit if on last field or all fields filled
        handleSubmit();
      }
    } else if (e.key === 'Backspace' && !combination[index] && index > 0) {
      // Move to previous field if current is empty
      document.getElementById(`lock-digit-${index - 1}`)?.focus();
    }
  };

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setCombination(['', '', '']);
      setError('');
      setAttempts(0);
      setIsUnlocking(false);
      // Focus first input after modal animation
      setTimeout(() => {
        document.getElementById('lock-digit-0')?.focus();
      }, 300);
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Suitcase Combination Lock"
      className="max-w-md"
    >
      <div className="text-center">
        {/* Suitcase Visual */}
        <div className="bg-amber-900 p-6 rounded-lg border-4 border-amber-700 mb-6">
          <div className="bg-amber-800 p-4 rounded border-2 border-amber-600 mb-4">
            <p className="text-amber-200 text-sm font-mono">SECURITY LOCK</p>
            <p className="text-amber-100 text-xs">3-DIGIT COMBINATION</p>
          </div>

          {/* Combination Input */}
          <div className="flex justify-center gap-3 mb-4">
            {combination.map((digit, index) => (
              <input
                key={index}
                id={`lock-digit-${index}`}
                type="text"
                value={digit}
                onChange={(e) => updateDigit(index, e.target.value)}
                onKeyDown={(e) => handleKeyPress(e, index)}
                className="w-16 h-16 text-center text-2xl font-bold bg-gray-100 border-2 border-gray-400 rounded focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800"
                maxLength={1}
                aria-label={`Combination digit ${index + 1} of 3`}
                aria-describedby={index === 0 ? 'combination-help' : undefined}
                disabled={isUnlocking}
              />
            ))}
          </div>

          {/* Helper Text */}
          <p id="combination-help" className="text-amber-200 text-sm mb-4">
            Enter the 3-digit combination to unlock the suitcase
          </p>

          {/* Error Message */}
          {error && (
            <div
              className="bg-red-700 text-red-100 p-3 rounded mb-4 text-sm"
              role="alert"
              aria-live="polite"
            >
              {error}
            </div>
          )}

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={isUnlocking || combination.some(digit => !digit)}
            className="w-full mb-2"
            aria-describedby="unlock-description"
          >
            {isUnlocking ? 'Unlocking...' : 'Try Combination'}
          </Button>

          <p id="unlock-description" className="text-amber-200 text-xs">
            Press Enter in any field or click to attempt unlock
          </p>
        </div>

        {/* Hint */}
        <div className="bg-blue-900 border border-blue-700 rounded p-4 mb-4">
          <p className="text-blue-200 text-sm">
            💡 <strong>Hint:</strong> Check your ticket and the timetable board.
            The combination might be related to your seat and platform information.
          </p>
        </div>

        <Button variant="secondary" onClick={onClose} className="w-full">
          Close Lock
        </Button>
      </div>
    </Modal>
  );
}
