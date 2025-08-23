/**
 * Home Page for BMad Escape Room
 * Landing page with accessibility-first design
 */

import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
          BMad Escape Room
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
          Experience <strong>The Night Train Compartment</strong> -
          A fully accessible digital escape room designed for everyone.
        </p>

        {/* Accessibility highlights */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold mb-4 text-yellow-400">
            🌟 Accessibility-First Design
          </h2>
          <ul className="text-left space-y-2 text-gray-300">
            <li>✓ Full screen reader compatibility</li>
            <li>✓ Keyboard-only navigation support</li>
            <li>✓ High contrast and reduced motion options</li>
            <li>✓ Dyslexia-friendly font alternatives</li>
            <li>✓ WCAG 2.1 AA compliant</li>
          </ul>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/room/night-train-compartment">
            <Button size="lg" className="w-full sm:w-auto">
              Start Your Escape
            </Button>
          </Link>
          <Link href="/accessibility/help">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              Accessibility Guide
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          Game Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-gray-800 rounded-lg shadow-sm border border-gray-700">
            <div className="text-4xl mb-4">🧩</div>
            <h3 className="text-xl font-semibold mb-3 text-white">Smart Puzzles</h3>
            <p className="text-gray-300">
              Three interconnected puzzles with multiple solution paths and adaptive difficulty.
            </p>
          </div>

          <div className="text-center p-6 bg-gray-800 rounded-lg shadow-sm border border-gray-700">
            <div className="text-4xl mb-4">💡</div>
            <h3 className="text-xl font-semibold mb-3 text-white">Progressive Hints</h3>
            <p className="text-gray-300">
              Four-tier hint system providing just the right amount of guidance when needed.
            </p>
          </div>

          <div className="text-center p-6 bg-gray-800 rounded-lg shadow-sm border border-gray-700">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-3 text-white">Quick Experience</h3>
            <p className="text-gray-300">
              Designed for 5-10 minute sessions perfect for breaks or team building.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          How It Works
        </h2>
        <div className="max-w-3xl mx-auto">
          <ol className="space-y-6">
            <li className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-yellow-600 text-black rounded-full flex items-center justify-center font-semibold">
                1
              </span>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-white">Set Your Preferences</h3>
                <p className="text-gray-300">
                  Configure accessibility settings including screen reader optimization, keyboard navigation, and visual preferences.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-yellow-600 text-black rounded-full flex items-center justify-center font-semibold">
                2
              </span>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-white">Explore the Compartment</h3>
                <p className="text-gray-300">
                  Navigate the train compartment using mouse, keyboard, or screen reader to discover interactive hotspots.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-yellow-600 text-black rounded-full flex items-center justify-center font-semibold">
                3
              </span>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-white">Solve Three Puzzles</h3>
                <p className="text-gray-300">
                  Work through ticket inspection, punch card alignment, and final gate puzzles with progressive hint support.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-yellow-600 text-black rounded-full flex items-center justify-center font-semibold">
                4
              </span>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-white">Escape Successfully</h3>
                <p className="text-gray-300">
                  Complete your escape and receive accessibility-focused feedback on your experience.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* Accessibility Information */}
      <section className="bg-gray-800 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Designed for Universal Access
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-3 text-yellow-400">For Screen Reader Users</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Structured headings and landmarks</li>
              <li>• Descriptive alt text and ARIA labels</li>
              <li>• Live region announcements</li>
              <li>• Skip navigation links</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3 text-yellow-400">For Motor Accessibility</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Large touch targets (minimum 44px)</li>
              <li>• Keyboard alternatives to drag-and-drop</li>
              <li>• Extended interaction timeouts</li>
              <li>• No fine motor skill requirements</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3 text-yellow-400">For Cognitive Accessibility</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Clear, simple language</li>
              <li>• Progressive hint system</li>
              <li>• No time pressure</li>
              <li>• Consistent navigation patterns</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3 text-yellow-400">For Visual Accessibility</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• High contrast color options</li>
              <li>• Scalable fonts up to 200%</li>
              <li>• No color-only information</li>
              <li>• Reduced motion alternatives</li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/accessibility/statement">
            <Button variant="link">
              View Full Accessibility Statement
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
