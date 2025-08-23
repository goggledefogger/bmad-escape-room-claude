import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      // Accessibility-first color palette
      colors: {
        // Primary brand colors (WCAG AA compliant)
        primary: {
          50: '#fef7ed',   // Orange 50 - light backgrounds
          100: '#fef3e2',  // Orange 100
          200: '#fde4c1',  // Orange 200
          300: '#fbc88b',  // Orange 300
          400: '#f8a454',  // Orange 400
          500: '#f59e0b',  // Orange 500 - warning states
          600: '#d97706',  // Orange 600
          700: '#b45309',  // Orange 700
          800: '#92400e',  // Orange 800
          900: '#78350f',  // Orange 900 - dark text
          950: '#1e293b',  // Slate 800 - primary dark
        },

        // Secondary colors (Navy/Cream theme)
        secondary: {
          50: '#fef7ed',   // Cream - light backgrounds
          100: '#fef3e2',  // Light cream
          200: '#f8fafc',  // Slate 50 - neutral light
          300: '#e2e8f0',  // Slate 200 - borders
          400: '#cbd5e1',  // Slate 300 - disabled
          500: '#94a3b8',  // Slate 400 - muted text
          600: '#64748b',  // Slate 500 - secondary text
          700: '#475569',  // Slate 600 - primary text
          800: '#334155',  // Slate 700 - dark text
          900: '#1e293b',  // Slate 800 - darkest
          950: '#0f172a',  // Slate 900 - true dark
        },

        // Accent color (Brass/Gold)
        accent: {
          50: '#fffbeb',   // Amber 50
          100: '#fef3c7',  // Amber 100
          200: '#fde68a',  // Amber 200
          300: '#fcd34d',  // Amber 300
          400: '#fbbf24',  // Amber 400
          500: '#f59e0b',  // Amber 500
          600: '#d97706',  // Amber 600 - brass color
          700: '#d4af37',  // Custom gold
          800: '#92400e',  // Amber 800
          900: '#78350f',  // Amber 900
        },

        // Semantic colors (WCAG AA compliant)
        success: {
          50: '#ecfdf5',   // Green 50
          100: '#d1fae5',  // Green 100
          500: '#10b981',  // Emerald 500 - success
          600: '#059669',  // Emerald 600
          700: '#047857',  // Emerald 700
          900: '#064e3b',  // Emerald 900
        },

        warning: {
          50: '#fffbeb',   // Amber 50
          100: '#fef3c7',  // Amber 100
          500: '#f59e0b',  // Amber 500 - warning
          600: '#d97706',  // Amber 600
          700: '#b45309',  // Amber 700
          900: '#78350f',  // Amber 900
        },

        error: {
          50: '#fef2f2',   // Red 50
          100: '#fee2e2',  // Red 100
          500: '#ef4444',  // Red 500 - error
          600: '#dc2626',  // Red 600
          700: '#b91c1c',  // Red 700
          900: '#7f1d1d',  // Red 900
        },

        // High contrast mode colors
        'high-contrast': {
          bg: '#000000',
          text: '#ffffff',
          accent: '#ffff00',
        }
      },

      // Accessibility-optimized font families
      fontFamily: {
        sans: [
          "Inter",
          ...fontFamily.sans
        ],
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          ...fontFamily.mono
        ],
        // Dyslexia-friendly font option
        dyslexic: [
          "OpenDyslexic",
          "Comic Sans MS",
          ...fontFamily.sans
        ]
      },

      // Accessibility-focused spacing scale
      spacing: {
        '18': '4.5rem',   // 72px - large touch targets
        '22': '5.5rem',   // 88px - extra large touch targets
      },

      // Focus ring and interaction states
      ringWidth: {
        '3': '3px',
        '4': '4px',
      },

      // Animation durations with reduced motion support
      transitionDuration: {
        '0': '0ms',       // Instant for reduced motion
        '150': '150ms',   // Quick feedback
        '200': '200ms',   // Standard
        '300': '300ms',   // Moderate
        '500': '500ms',   // Slower for accessibility
      },

      // Accessibility-friendly border radius
      borderRadius: {
        'accessibility': '0.25rem', // 4px - clear boundaries
      },

      // Screen reader and keyboard navigation
      zIndex: {
        'modal': '1000',
        'toast': '1010',
        'tooltip': '1020',
        'skip-link': '1030',
      }
    },
  },
  plugins: [
    // Plugin for accessibility utilities
    function({ addUtilities, theme }: { addUtilities: any; theme: any }) {
      const newUtilities = {
        // Screen reader only content
        '.sr-only': {
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: '0',
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: '0',
        },

        // Skip links for keyboard navigation
        '.skip-link': {
          position: 'absolute',
          top: '-40px',
          left: '6px',
          background: theme('colors.primary.900'),
          color: theme('colors.primary.50'),
          padding: '8px 16px',
          borderRadius: theme('borderRadius.md'),
          textDecoration: 'none',
          zIndex: theme('zIndex.skip-link'),
          '&:focus': {
            top: '6px'
          }
        },

        // High contrast mode utilities
        '.high-contrast': {
          backgroundColor: theme('colors.high-contrast.bg'),
          color: theme('colors.high-contrast.text'),
          '& *': {
            backgroundColor: 'inherit !important',
            color: 'inherit !important',
            borderColor: theme('colors.high-contrast.text') + ' !important',
          }
        },

        // Focus-visible utilities
        '.focus-visible-only': {
          '&:focus:not(:focus-visible)': {
            outline: 'none',
            boxShadow: 'none',
          },
          '&:focus-visible': {
            outline: `2px solid ${theme('colors.accent.600')}`,
            outlineOffset: '2px',
          }
        },

        // Reduced motion utilities
        '@media (prefers-reduced-motion: reduce)': {
          '.motion-reduce-friendly': {
            animationDuration: '0.01ms !important',
            animationIterationCount: '1 !important',
            transitionDuration: '0.01ms !important',
          }
        },

        // Touch target sizing
        '.touch-target': {
          minWidth: '44px',
          minHeight: '44px',
        },

        // Large touch target for accessibility
        '.touch-target-large': {
          minWidth: '60px',
          minHeight: '60px',
        }
      }

      addUtilities(newUtilities)
    }
  ],
} satisfies Config;
