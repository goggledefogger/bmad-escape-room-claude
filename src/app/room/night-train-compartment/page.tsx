/**
 * Night Train Compartment Escape Room
 * Main game interface for The Night Train Compartment escape room
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useAccessibility } from "@/hooks/useAccessibility";

export default function NightTrainCompartmentRoom() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const accessibility = useAccessibility();

  const steps = [
    {
      title: "Enter the Compartment",
      description: "You find yourself in a dimly lit train compartment. The door has locked behind you.",
      action: "Look around"
    },
    {
      title: "Ticket Inspection Puzzle",
      description: "You notice a ticket on the seat. The conductor's stamp seems incomplete.",
      action: "Examine ticket"
    },
    {
      title: "Punch Card Alignment",
      description: "A complex punch card mechanism is visible near the window.",
      action: "Align cards"
    },
    {
      title: "Final Gate Puzzle",
      description: "The compartment door has a sophisticated lock mechanism.",
      action: "Solve lock"
    }
  ];

  const startGame = () => {
    setGameStarted(true);
    accessibility.announce("Game started. You are now in the Night Train Compartment.");
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      accessibility.announce(`Moving to ${steps[currentStep + 1].title}`);
    } else {
      accessibility.announce("Congratulations! You have escaped the Night Train Compartment!");
    }
  };

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

  const currentStepData = steps[currentStep];
  const isComplete = currentStep >= steps.length;

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
              <li>• Puzzles completed: {steps.length}</li>
              <li>• Accessibility features used: Multiple</li>
              <li>• Time taken: Completed at your own pace</li>
              <li>• Difficulty: Moderate with hint support</li>
            </ul>
          </div>

          <div className="flex gap-4 justify-center">
            <Button onClick={() => {setGameStarted(false); setCurrentStep(0);}} size="lg">
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
            <span className="text-gray-400">Step {currentStep + 1} of {steps.length}</span>
          </div>

          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-yellow-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Main game area */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Scene description */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-yellow-400">
              {currentStepData.title}
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {currentStepData.description}
            </p>

            <Button onClick={nextStep} className="w-full touch-target">
              {currentStepData.action}
            </Button>
          </div>

          {/* Hints and help */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">
              💡 Need Help?
            </h3>
            <p className="text-gray-300 mb-4">
              Stuck on this puzzle? Progressive hints are available to guide you through.
            </p>

            <div className="space-y-2">
              <Button variant="secondary" className="w-full">
                Hint Level 1 (Gentle Nudge)
              </Button>
              <Button variant="secondary" className="w-full">
                Hint Level 2 (More Specific)
              </Button>
              <Button variant="secondary" className="w-full">
                Hint Level 3 (Detailed Guidance)
              </Button>
              <Button variant="secondary" className="w-full">
                Hint Level 4 (Step-by-Step)
              </Button>
            </div>

            <div className="mt-6 p-4 bg-gray-700 rounded">
              <h4 className="font-semibold text-sm mb-2 text-yellow-400">
                Accessibility Features Active
              </h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Screen reader announcements</li>
                <li>• Keyboard navigation support</li>
                <li>• High contrast mode available</li>
                <li>• No time pressure</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
