/**
 * Night Train Compartment Escape Room
 * Main game interface for The Night Train Compartment escape room
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useAccessibility } from "@/hooks/useAccessibility";
import { TicketModal } from "@/components/room/TicketModal";
import { TimetableModal } from "@/components/room/TimetableModal";
import { SuitcaseLockModal } from "@/components/room/SuitcaseLockModal";

export default function NightTrainCompartmentRoom() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const accessibility = useAccessibility();

  // Modal states
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [timetableModalOpen, setTimetableModalOpen] = useState(false);
  const [suitcaseModalOpen, setSuitcaseModalOpen] = useState(false);

  // Puzzle progress states
  const [suitcaseUnlocked, setSuitcaseUnlocked] = useState(false);
  const [hasViewedTicket, setHasViewedTicket] = useState(false);
  const [hasViewedTimetable, setHasViewedTimetable] = useState(false);
  const [hasPunchCard, setHasPunchCard] = useState(false);

  // Hotspot definitions with interaction handlers
  const hotspots = [
    {
      id: 'ticket-timetable',
      title: 'Ticket & Timetable',
      description: 'A train ticket and departure board are visible here',
      position: { top: '20%', left: '15%' },
      available: true,
      completed: hasViewedTicket && hasViewedTimetable,
      onClick: () => setTicketModalOpen(true)
    },
    {
      id: 'suitcase',
      title: 'Suitcase Lock',
      description: 'A locked suitcase with a 3-digit combination lock',
      position: { top: '60%', left: '70%' },
      available: hasViewedTicket && hasViewedTimetable,
      completed: suitcaseUnlocked,
      onClick: () => setSuitcaseModalOpen(true)
    },
    {
      id: 'window',
      title: 'Window View',
      description: 'The train window shows the passing countryside',
      position: { top: '30%', left: '85%' },
      available: true,
      completed: false,
      onClick: () => setTimetableModalOpen(true)
    },
    {
      id: 'intercom',
      title: 'Intercom Panel',
      description: 'Communication system to contact the conductor',
      position: { top: '40%', left: '5%' },
      available: hasPunchCard,
      completed: false,
      onClick: () => accessibility.announce('Intercom system - functionality coming soon')
    },
    {
      id: 'door',
      title: 'Compartment Door',
      description: 'The locked exit door with a keypad mechanism',
      position: { top: '70%', left: '45%' },
      available: false, // Will be enabled later
      completed: false,
      onClick: () => accessibility.announce('Door lock - requires conductor code')
    }
  ];

  const startGame = () => {
    setGameStarted(true);
    accessibility.announce("Game started. You are now in the Night Train Compartment. Explore the interactive hotspots to begin solving puzzles.");
  };

  // Event handlers for puzzle interactions
  const handleTicketView = () => {
    setHasViewedTicket(true);
    setTicketModalOpen(false);
    accessibility.announce('Ticket examined. Seat B/12 in Coach C, destination Arden. Check the timetable for platform information.');
  };

  const handleTimetableView = () => {
    setHasViewedTimetable(true);
    setTimetableModalOpen(false);
    accessibility.announce('Timetable examined. Arden departs from Platform 5 at 22:10. You now have the information needed for the suitcase lock.');
  };

  const handleSuitcaseUnlock = () => {
    setSuitcaseUnlocked(true);
    setHasPunchCard(true);
    setSuitcaseModalOpen(false);
    accessibility.announce('Suitcase unlocked! You have found a punch-card overlay inside. This can be used with the timetable board.');
  };

  const getCompletedPuzzles = () => {
    let completed = 0;
    if (hasViewedTicket && hasViewedTimetable) completed++;
    if (suitcaseUnlocked) completed++;
    return completed;
  };

  const getTotalPuzzles = () => 3; // Ticket/Timetable + Suitcase + Final (coming in next stories)

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center p-8">
          <h1 className="text-4xl font-bold mb-6">The Night Train Compartment</h1>
          <p className="text-xl text-gray-300 mb-8">
            You board the midnight express, but something isn't right.
            The compartment door locks behind you, and you realize you must solve
            a series of puzzles to escape before the train reaches its destination.
          </p>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4 text-yellow-400">
              🚂 About This Experience
            </h2>
            <ul className="text-left space-y-2 text-gray-300">
              <li>• Three interconnected puzzles to solve</li>
              <li>• Progressive hint system available</li>
              <li>• Fully accessible with screen reader support</li>
              <li>• No time pressure - solve at your own pace</li>
              <li>• Average completion time: 5-10 minutes</li>
            </ul>
          </div>

          <Button onClick={startGame} size="lg" className="touch-target-large">
            Begin Your Escape
          </Button>
        </div>
      </div>
    );
  }

  // Check if all current puzzles are completed
  const completedPuzzles = getCompletedPuzzles();
  const totalPuzzles = getTotalPuzzles();
  const isComplete = completedPuzzles >= 2; // For now, complete after first 2 puzzles

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center p-8">
          <h1 className="text-4xl font-bold mb-6 text-green-400">🎉 Escape Successful!</h1>
          <p className="text-xl text-gray-300 mb-8">
            Congratulations! You have successfully solved all puzzles and escaped
            the Night Train Compartment. The door swings open as the train pulls
            into the station.
          </p>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4 text-yellow-400">
              🏆 Experience Summary
            </h2>
            <ul className="text-left space-y-2 text-gray-300">
              <li>• Puzzles completed: {completedPuzzles} of {totalPuzzles}</li>
              <li>• Ticket examination: ✓ Completed</li>
              <li>• Timetable analysis: ✓ Completed</li>
              <li>• Suitcase puzzle: ✓ Solved</li>
              <li>• Accessibility features used: Multiple</li>
            </ul>
          </div>

          <div className="flex gap-4 justify-center">
            <Button onClick={() => {
              setGameStarted(false);
              setCurrentStep(0);
              setSuitcaseUnlocked(false);
              setHasViewedTicket(false);
              setHasViewedTimetable(false);
              setHasPunchCard(false);
            }} size="lg">
              Play Again
            </Button>
            <Button variant="secondary" onClick={() => window.location.href = '/'} size="lg">
              Return Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">The Night Train Compartment</h1>
            <span className="text-gray-400">Puzzles: {completedPuzzles} of {totalPuzzles} completed</span>
          </div>

          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-yellow-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedPuzzles / totalPuzzles) * 100}%` }}
            />
          </div>
        </div>

        {/* Main game area */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Interactive Compartment Scene */}
          <div className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-yellow-400">
              🚂 Train Compartment
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              You are in a vintage train compartment. Click on the interactive hotspots below to examine objects and solve puzzles.
              {!hasViewedTicket && " Start by examining your ticket and the departure board."}
              {hasViewedTicket && hasViewedTimetable && !suitcaseUnlocked && " Use the information from your ticket and timetable to unlock the suitcase."}
              {suitcaseUnlocked && " Great! You've found the punch-card overlay. More puzzles coming soon..."}
            </p>

            {/* Compartment Visual with Hotspots */}
            <div className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 rounded-lg border-2 border-amber-700 h-80 mb-4">
              {/* Background compartment scene */}
              <div className="absolute inset-4 bg-gradient-to-b from-amber-700 to-amber-800 rounded border border-amber-600 opacity-30" />

              {/* Interactive Hotspots */}
              {hotspots.map((hotspot) => (
                <button
                  key={hotspot.id}
                  onClick={hotspot.onClick}
                  disabled={!hotspot.available}
                  className={`absolute w-12 h-12 rounded-full border-2 transition-all duration-200 touch-target ${
                    hotspot.completed
                      ? 'bg-green-500 border-green-300 hover:bg-green-400'
                      : hotspot.available
                      ? 'bg-yellow-500 border-yellow-300 hover:bg-yellow-400 animate-pulse'
                      : 'bg-gray-500 border-gray-400 opacity-50 cursor-not-allowed'
                  }`}
                  style={{
                    top: hotspot.position.top,
                    left: hotspot.position.left,
                    transform: 'translate(-50%, -50%)'
                  }}
                  aria-label={`${hotspot.title}: ${hotspot.description} ${hotspot.completed ? '(completed)' : hotspot.available ? '(available)' : '(locked)'}`}
                  title={hotspot.title}
                >
                  <span className="sr-only">{hotspot.title}</span>
                  {hotspot.completed && '✓'}
                  {!hotspot.completed && hotspot.available && '•'}
                  {!hotspot.available && '🔒'}
                </button>
              ))}

              {/* Hotspot Legend */}
              <div className="absolute bottom-2 left-2 right-2 text-xs text-amber-200">
                <p>• Available  ✓ Completed  🔒 Locked</p>
              </div>
            </div>

            {/* Current Status */}
            <div className="text-sm text-gray-400">
              {!hasViewedTicket && "Click the ticket area to begin your investigation."}
              {hasViewedTicket && !hasViewedTimetable && "Good! Now check the timetable to find platform information."}
              {hasViewedTicket && hasViewedTimetable && !suitcaseUnlocked && "Perfect! You have both pieces of information. Try the suitcase lock."}
              {suitcaseUnlocked && "Excellent work! You've solved the first puzzle and obtained the punch-card overlay."}
            </div>
          </div>

          {/* Inventory and Status Panel */}
          <div className="space-y-6">
            {/* Inventory */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-yellow-400">
                🎒 Inventory
              </h3>
              <div className="space-y-3">
                {hasPunchCard ? (
                  <div className="bg-blue-800 border border-blue-600 rounded p-3">
                    <p className="text-blue-200 font-semibold">✓ Punch-card Overlay</p>
                    <p className="text-blue-300 text-sm">Found in the suitcase. Can be used with timetable.</p>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm italic">No items collected yet</p>
                )}
              </div>
            </div>

            {/* Hints and help */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-yellow-400">
                💡 Need Help?
              </h3>
              <p className="text-gray-300 mb-4">
                Progressive hints coming in Story 4. For now, examine your ticket and the timetable to find the suitcase combination.
              </p>

              <div className="p-4 bg-blue-900 border border-blue-700 rounded">
                <h4 className="font-semibold text-sm mb-2 text-blue-200">
                  Current Objective:
                </h4>
                <p className="text-blue-300 text-sm">
                  {!hasViewedTicket && "Examine your train ticket"}
                  {hasViewedTicket && !hasViewedTimetable && "Check the departure timetable"}
                  {hasViewedTicket && hasViewedTimetable && !suitcaseUnlocked && "Use seat + platform numbers for suitcase lock"}
                  {suitcaseUnlocked && "More puzzles coming in next stories!"}
                </p>
              </div>

              <div className="mt-4 p-3 bg-gray-700 rounded">
                <h4 className="font-semibold text-sm mb-2 text-yellow-400">
                  Accessibility Features Active
                </h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Screen reader announcements</li>
                  <li>• Keyboard navigation support</li>
                  <li>• Large touch targets (44px minimum)</li>
                  <li>• No time pressure</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Components */}
      <TicketModal
        isOpen={ticketModalOpen}
        onClose={handleTicketView}
      />

      <TimetableModal
        isOpen={timetableModalOpen}
        onClose={handleTimetableView}
      />

      <SuitcaseLockModal
        isOpen={suitcaseModalOpen}
        onClose={() => setSuitcaseModalOpen(false)}
        onSuccess={handleSuitcaseUnlock}
      />
    </div>
  );
}
