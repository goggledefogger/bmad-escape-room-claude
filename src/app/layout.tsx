/**
 * Root Layout for BMad Escape Room
 * Accessibility-first layout with comprehensive support
 */

import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/react";
import { AccessibilityProvider } from "@/components/accessibility/AccessibilityProvider";
import { escapeRoomSkipLinks } from "@/components/accessibility/SkipLinks";

import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "BMad Escape Room - Night Train Experience",
  description: "An accessible digital escape room experience featuring The Night Train Compartment. Solve puzzles with full accessibility support including screen readers, keyboard navigation, and WCAG 2.1 AA compliance.",
  keywords: ["escape room", "accessibility", "puzzle", "inclusive design", "WCAG", "screen reader"],
  authors: [{ name: "BMad" }],
  creator: "BMad",
  publisher: "BMad",
  robots: {
    index: true,
    follow: true,
  },
  // Accessibility metadata
  other: {
    "accessibility-statement": "/accessibility/statement",
    "accessibility-help": "/accessibility/help",
    "wcag-compliance": "AA",
  },
  // Open Graph for social sharing
  openGraph: {
    title: "BMad Escape Room - Night Train Experience",
    description: "An accessible digital escape room experience with full WCAG compliance",
    type: "website",
    locale: "en_US",
    siteName: "BMad Escape Room",
  },
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "BMad Escape Room - Night Train Experience",
    description: "An accessible digital escape room experience with full WCAG compliance",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#1e293b",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning // Allows accessibility provider to manage classes
    >
      <head>
        {/* Additional accessibility meta tags */}
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" content="#1e293b" />

        {/* Preload critical fonts for performance */}
        <link rel="preload" href="/fonts/OpenDyslexic-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        {/* Accessibility statement link */}
        <link rel="help" href="/accessibility/statement" />

        {/* High contrast media query */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @media (prefers-contrast: high) {
              :root {
                --tw-bg-opacity: 1;
                --tw-text-opacity: 1;
              }
            }

            @media (prefers-reduced-motion: reduce) {
              *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
              }
            }
          `
        }} />
      </head>
      <body className={`
        min-h-screen bg-gray-900 text-gray-100 antialiased
        font-sans
        motion-reduce-friendly
        focus-visible-only
      `}>
        <TRPCReactProvider>
          <AccessibilityProvider
            skipLinks={escapeRoomSkipLinks}
            enableDebug={process.env.NODE_ENV === 'development'}
          >
            {/* Main application content */}
            <div className="flex min-h-screen flex-col">
              {/* Main content area */}
              <main
                id="main-content"
                className="flex-1"
                role="main"
                aria-label="Main content"
              >
                {children}
              </main>

              {/* Footer with accessibility information */}
              <footer
                id="footer"
                className="border-t border-gray-700 bg-gray-800 py-6"
                role="contentinfo"
                aria-label="Footer"
              >
                <div className="container mx-auto px-4 text-center text-sm text-gray-400">
                  <p className="mb-2">
                    BMad Escape Room - Designed for universal accessibility
                  </p>
                  <nav aria-label="Footer navigation">
                    <ul className="flex justify-center space-x-4">
                      <li>
                        <a
                          href="/accessibility/statement"
                          className="hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                        >
                          Accessibility Statement
                        </a>
                      </li>
                      <li>
                        <a
                          href="/accessibility/help"
                          className="hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                        >
                          Accessibility Help
                        </a>
                      </li>
                      <li>
                        <a
                          href="/accessibility/feedback"
                          className="hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                        >
                          Accessibility Feedback
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </footer>
            </div>
          </AccessibilityProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
