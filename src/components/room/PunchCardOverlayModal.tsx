/**
 * Punch-Card Overlay Alignment Modal
 * Drag-and-drop interface for aligning punch-card overlay on timetable
 */

import React, { useState, useRef, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useAccessibility } from '@/hooks/useAccessibility';

interface PunchCardOverlayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (word: string) => void;
}

interface Position {
  x: number;
  y: number;
}

export function PunchCardOverlayModal({ isOpen, onClose, onSuccess }: PunchCardOverlayModalProps) {
  const [overlayPosition, setOverlayPosition] = useState<Position>({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [isAligned, setIsAligned] = useState(false);
  const [revealedLetters, setRevealedLetters] = useState<string[]>([]);
  const [discoveredWord, setDiscoveredWord] = useState('');
  const accessibility = useAccessibility();
  
  // Correct alignment position (center of timetable)
  const correctPosition = { x: 200, y: 150 };
  const snapThreshold = 30;
  const correctWord = 'PASS';
  
  const overlayRef = useRef<HTMLDivElement>(null);
  const timetableRef = useRef<HTMLDivElement>(null);

  // Calculate distance between two points
  const getDistance = (pos1: Position, pos2: Position) => {
    return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
  };

  // Check alignment and reveal letters
  const checkAlignment = (position: Position) => {
    const distance = getDistance(position, correctPosition);
    const aligned = distance <= snapThreshold;
    
    if (aligned && !isAligned) {
      // Perfect alignment - reveal full word
      setIsAligned(true);
      setRevealedLetters(correctWord.split(''));
      setDiscoveredWord(correctWord);
      accessibility.announce(`Perfect alignment! The word "${correctWord}" is revealed through the holes.`);
    } else if (distance <= snapThreshold * 2 && !aligned) {
      // Partial alignment - show some letters
      const partialLetters = distance <= snapThreshold * 1.5 ? ['P', 'A'] : ['P'];
      setRevealedLetters(partialLetters);
      setIsAligned(false);
      accessibility.announce(`Getting closer! ${partialLetters.join(' ')} visible through holes.`);
    } else {
      // No alignment
      setRevealedLetters([]);
      setIsAligned(false);
    }
  };

  // Mouse/Touch drag handlers
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    accessibility.announce('Started dragging punch-card overlay');
  };

  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !timetableRef.current) return;

    const rect = timetableRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const newPosition = {
      x: clientX - rect.left,
      y: clientY - rect.top
    };

    setOverlayPosition(newPosition);
    checkAlignment(newPosition);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    // Snap to correct position if close enough
    const distance = getDistance(overlayPosition, correctPosition);
    if (distance <= snapThreshold) {
      setOverlayPosition(correctPosition);
      accessibility.announce('Overlay snapped into perfect alignment');
    } else {
      accessibility.announce('Overlay released. Try positioning it over the center of the timetable.');
    }
  };

  // Keyboard navigation handlers
  const handleKeyboardMove = (direction: 'up' | 'down' | 'left' | 'right') => {
    const step = 10;
    const newPosition = { ...overlayPosition };
    
    switch (direction) {
      case 'up':
        newPosition.y = Math.max(0, newPosition.y - step);
        break;
      case 'down':
        newPosition.y = Math.min(300, newPosition.y + step);
        break;
      case 'left':
        newPosition.x = Math.max(0, newPosition.x - step);
        break;
      case 'right':
        newPosition.x = Math.min(400, newPosition.x + step);
        break;
    }
    
    setOverlayPosition(newPosition);
    checkAlignment(newPosition);
    accessibility.announce(`Moved overlay ${direction}. ${revealedLetters.length > 0 ? `Letters visible: ${revealedLetters.join(' ')}` : 'No letters visible yet'}`);
  };

  const handleSnapToCenter = () => {
    setOverlayPosition(correctPosition);
    checkAlignment(correctPosition);
    accessibility.announce('Overlay snapped to center position');
  };

  const handleComplete = () => {
    if (isAligned && discoveredWord) {
      onSuccess(discoveredWord);
    }
  };

  const resetPosition = () => {
    setOverlayPosition({ x: 50, y: 50 });
    setRevealedLetters([]);
    setIsAligned(false);
    setDiscoveredWord('');
    accessibility.announce('Overlay position reset');
  };

  // Set up drag event listeners
  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e: MouseEvent) => handleDragMove(e);
      const handleMouseUp = () => handleDragEnd();
      const handleTouchMove = (e: TouchEvent) => handleDragMove(e);
      const handleTouchEnd = () => handleDragEnd();

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, overlayPosition]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setOverlayPosition({ x: 50, y: 50 });
      setRevealedLetters([]);
      setIsAligned(false);
      setDiscoveredWord('');
      setIsDragging(false);
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Punch-Card Overlay Alignment"
      className="max-w-4xl"
    >
      <div className="space-y-6">
        {/* Instructions */}
        <div className="bg-blue-900 border border-blue-700 rounded p-4">
          <h3 className="text-blue-200 font-semibold mb-2">Instructions:</h3>
          <p className="text-blue-300 text-sm mb-2">
            Drag the punch-card overlay onto the timetable grid to reveal letters through the holes.
            Align it carefully to discover a 4-letter word.
          </p>
          <p className="text-blue-300 text-sm">
            <strong>Keyboard users:</strong> Use arrow keys to move, Spacebar to snap to center.
          </p>
        </div>

        {/* Main Alignment Area */}
        <div className="relative">
          {/* Timetable Background */}
          <div 
            ref={timetableRef}
            className="relative bg-gray-900 border-2 border-green-600 rounded-lg p-4 h-80 overflow-hidden"
            style={{ width: '400px', margin: '0 auto' }}
          >
            {/* Timetable Grid */}
            <div className="absolute inset-4 grid grid-cols-4 gap-2 text-green-400 font-mono text-sm">
              {/* Create a grid of letters that will be revealed */}
              <div className="grid grid-cols-8 col-span-4 gap-1">
                {[
                  'B', 'R', 'I', 'S', 'T', 'O', 'L', '3',
                  'O', 'X', 'F', 'O', 'R', 'D', '7', '2',
                  'A', 'R', 'D', 'E', 'N', '5', '2', '2',
                  'C', 'H', 'E', 'S', 'T', 'E', 'R', '2',
                  'Y', 'O', 'R', 'K', '6', '2', '2', '4',
                  'D', 'U', 'N', 'D', 'E', 'E', '4', '2'
                ].map((char, index) => (
                  <div key={index} className="w-6 h-6 flex items-center justify-center text-xs">
                    {char}
                  </div>
                ))}
              </div>
            </div>

            {/* Punch-Card Overlay */}
            <div
              ref={overlayRef}
              className={`absolute w-32 h-20 bg-amber-200 border-2 border-amber-400 rounded cursor-move transition-all duration-200 ${
                isDragging ? 'shadow-lg scale-105' : ''
              } ${isAligned ? 'border-green-500 bg-green-200' : ''}`}
              style={{
                left: `${overlayPosition.x - 64}px`,
                top: `${overlayPosition.y - 40}px`,
                transform: isDragging ? 'rotate(2deg)' : 'rotate(0deg)'
              }}
              onMouseDown={handleDragStart}
              onTouchStart={handleDragStart}
              tabIndex={0}
              role="button"
              aria-label="Punch-card overlay. Drag to align with timetable or use arrow keys to move."
              onKeyDown={(e) => {
                switch (e.key) {
                  case 'ArrowUp':
                    e.preventDefault();
                    handleKeyboardMove('up');
                    break;
                  case 'ArrowDown':
                    e.preventDefault();
                    handleKeyboardMove('down');
                    break;
                  case 'ArrowLeft':
                    e.preventDefault();
                    handleKeyboardMove('left');
                    break;
                  case 'ArrowRight':
                    e.preventDefault();
                    handleKeyboardMove('right');
                    break;
                  case ' ':
                    e.preventDefault();
                    handleSnapToCenter();
                    break;
                  case 'Enter':
                    e.preventDefault();
                    if (isAligned) handleComplete();
                    break;
                }
              }}
            >
              {/* Punch holes */}
              <div className="relative w-full h-full">
                <div className="absolute top-2 left-4 w-3 h-3 bg-gray-800 rounded-full" />
                <div className="absolute top-2 left-12 w-3 h-3 bg-gray-800 rounded-full" />
                <div className="absolute top-2 left-20 w-3 h-3 bg-gray-800 rounded-full" />
                <div className="absolute top-2 left-28 w-3 h-3 bg-gray-800 rounded-full" />
                
                <div className="absolute bottom-2 left-8 w-2 h-2 bg-gray-800 rounded-full" />
                <div className="absolute bottom-2 left-16 w-2 h-2 bg-gray-800 rounded-full" />
                <div className="absolute bottom-2 left-24 w-2 h-2 bg-gray-800 rounded-full" />
                
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="text-amber-800 text-xs font-bold">OVERLAY</div>
                </div>
              </div>
            </div>

            {/* Alignment Guide */}
            {!isAligned && (
              <div 
                className="absolute w-8 h-8 border-2 border-dashed border-yellow-400 rounded"
                style={{
                  left: `${correctPosition.x - 16}px`,
                  top: `${correctPosition.y - 16}px`
                }}
              >
                <div className="w-full h-full flex items-center justify-center text-yellow-400 text-xs">
                  ⊕
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Letter Revelation Display */}
        <div className="bg-gray-800 border border-gray-600 rounded p-4">
          <h3 className="text-yellow-400 font-semibold mb-3">Letters Revealed:</h3>
          <div className="flex justify-center gap-3 mb-4">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className={`w-12 h-12 border-2 rounded flex items-center justify-center text-xl font-bold ${
                  revealedLetters[index]
                    ? 'bg-green-700 border-green-500 text-green-100'
                    : 'bg-gray-700 border-gray-500 text-gray-400'
                }`}
              >
                {revealedLetters[index] || '?'}
              </div>
            ))}
          </div>
          
          {revealedLetters.length > 0 && (
            <p className="text-center text-green-300 text-sm">
              {revealedLetters.length === 4 
                ? `Complete word discovered: "${discoveredWord}"!`
                : `${revealedLetters.length} letter${revealedLetters.length > 1 ? 's' : ''} visible: ${revealedLetters.join(' ')}`
              }
            </p>
          )}
          
          {isAligned && (
            <div className="text-center mt-4">
              <p className="text-green-200 font-semibold mb-3">
                🎉 Perfect alignment! The conductor will recognize this word.
              </p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Button
            onClick={handleSnapToCenter}
            variant="secondary"
            aria-label="Snap overlay to center position for perfect alignment"
          >
            Snap to Center
          </Button>
          
          <Button
            onClick={resetPosition}
            variant="secondary"
            aria-label="Reset overlay to starting position"
          >
            Reset Position
          </Button>
          
          {isAligned && discoveredWord && (
            <Button
              onClick={handleComplete}
              className="bg-green-600 hover:bg-green-700"
              aria-label={`Use the discovered word "${discoveredWord}" with the intercom`}
            >
              Use Word "{discoveredWord}"
            </Button>
          )}
          
          <Button
            onClick={onClose}
            variant="secondary"
          >
            Close Overlay System
          </Button>
        </div>

        {/* Accessibility Status */}
        <div 
          className="sr-only" 
          role="status" 
          aria-live="polite"
          aria-label="Alignment status"
        >
          {isAligned ? `Perfect alignment achieved. Word "${discoveredWord}" discovered.` : 
           revealedLetters.length > 0 ? `Partial alignment. Letters: ${revealedLetters.join(' ')}` :
           'No alignment. Continue adjusting position.'}
        </div>
      </div>
    </Modal>
  );
}
