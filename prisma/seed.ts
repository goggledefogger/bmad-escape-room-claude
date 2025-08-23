/**
 * Seed script for BMad Escape Room development database
 * Creates the Night Train Compartment room configuration
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create the Night Train Compartment room configuration
  const nightTrainRoom = await prisma.roomConfiguration.upsert({
    where: {
      roomId: 'night-train-compartment',
    },
    update: {},
    create: {
      roomId: 'night-train-compartment',
      name: 'The Night Train Compartment',
      description: 'A cozy midnight rail mystery featuring tactile puzzles and progressive assistance',
      estimatedTimeMinutes: 5,
      difficultyLevel: 2,
      accessibilityFeatures: [
        'screen_reader',
        'keyboard_navigation',
        'high_contrast',
        'dyslexia_font',
        'reduced_motion'
      ],
      theme: 'vintage-train',
      aesthetic: 'blueprint',
      audioEnabled: true,
      visualComplexity: 'medium',
      cognitiveLoad: 'moderate',
      puzzleSequence: {
        puzzles: [
          {
            id: 'ticket-math',
            name: 'Seat Row + Platform',
            type: 'combination_lock',
            description: 'Examine the ticket and timetable to find the combination',
            estimatedTimeSeconds: 120,
            hints: [
              'Seat row and platform—two numbers, one lock.',
              'Find the platform for your destination on the board.',
              'Order: row then platform.',
              'The combination is 125'
            ],
            accessibilityOptions: {
              screenReaderInstructions: 'This is a combination lock requiring three digits. Examine the train ticket to find your seat row number, then check the timetable board to find the platform number for your destination.',
              keyboardAlternatives: [
                {
                  originalMethod: 'click',
                  alternativeMethod: 'keyboard',
                  instructions: 'Use Tab to navigate to each digit, then use arrow keys or number keys to set the value.',
                  keyMapping: [
                    { key: 'Tab', action: 'navigate', description: 'Move between digits' },
                    { key: 'ArrowUp/ArrowDown', action: 'change_value', description: 'Increase or decrease digit' },
                    { key: 'Enter', action: 'submit', description: 'Try the combination' }
                  ]
                }
              ],
              audioDescriptions: [
                'Click sound for each digit change',
                'Success chime when correct combination is entered',
                'Lock opening sound effect'
              ]
            }
          },
          {
            id: 'punch-card',
            name: 'Punch the Route',
            type: 'overlay_alignment',
            description: 'Align the punch card overlay to reveal a word',
            estimatedTimeSeconds: 180,
            hints: [
              'Overlays belong on the board.',
              'Align markers. Letters appear through the holes.',
              'It\'s a 4-letter word you can tell the conductor.',
              'The word is PASS'
            ],
            accessibilityOptions: {
              screenReaderInstructions: 'This puzzle involves placing a punch card overlay on the timetable board. The overlay has holes that reveal letters when properly aligned. Use the alignment markers to position it correctly.',
              keyboardAlternatives: [
                {
                  originalMethod: 'drag',
                  alternativeMethod: 'keyboard',
                  instructions: 'Use arrow keys to move the overlay, spacebar to place it, and Enter to check alignment.',
                  keyMapping: [
                    { key: 'ArrowKeys', action: 'move_overlay', description: 'Move the punch card in small increments' },
                    { key: 'Spacebar', action: 'place', description: 'Place the overlay at current position' },
                    { key: 'Enter', action: 'check', description: 'Check if letters are revealed' },
                    { key: 'R', action: 'reset', description: 'Reset overlay to starting position' }
                  ]
                }
              ],
              tactileDescriptions: [
                'The overlay has raised markers at the corners for alignment',
                'Letters become visible through punched holes when correctly positioned',
                'Four letters spell out a word when properly aligned'
              ]
            }
          },
          {
            id: 'final-gate',
            name: 'Announce and Proceed',
            type: 'intercom_keypad',
            description: 'Use the intercom and keypad to complete your escape',
            estimatedTimeSeconds: 120,
            hints: [
              'Tell the intercom the word you found.',
              'Press TALK.',
              'Use the three digits on the door.',
              'The code is 374'
            ],
            accessibilityOptions: {
              screenReaderInstructions: 'This final puzzle has two parts: first, use the intercom to speak the word you discovered from the punch card puzzle. Then, enter the three-digit code found on the door using the keypad.',
              keyboardAlternatives: [
                {
                  originalMethod: 'click',
                  alternativeMethod: 'keyboard',
                  instructions: 'Tab to the intercom, press Enter to activate, then Tab to keypad and use number keys.',
                  keyMapping: [
                    { key: 'Tab', action: 'navigate', description: 'Move between intercom and keypad' },
                    { key: 'Enter', action: 'activate_intercom', description: 'Press the TALK button' },
                    { key: 'Numbers', action: 'enter_code', description: 'Enter the door code' },
                    { key: 'Enter', action: 'submit_code', description: 'Submit the keypad code' }
                  ]
                }
              ],
              audioDescriptions: [
                'Intercom static when TALK button is pressed',
                'Confirmation tone when word is accepted',
                'Keypad beep for each number entered',
                'Door unlock sound when code is correct'
              ]
            }
          }
        ]
      },
      randomizationConfig: {
        enabled: false, // Keep simple for MVP
        elements: [],
        constraints: []
      }
    },
  });

  console.log('✅ Created room:', nightTrainRoom.name);

  // Create a sample accessibility audit
  const audit = await prisma.accessibilityAudit.create({
    data: {
      roomId: 'night-train-compartment',
      wcagLevel: 'AA',
      toolsUsed: ['axe-core', 'lighthouse', 'manual-testing'],
      auditorName: 'BMad Development Team',
      overallScore: 95,
      perceivableScore: 98,
      operableScore: 96,
      understandableScore: 94,
      robustScore: 92,
      violations: [],
      warnings: [
        {
          id: 'color-contrast-enhancement',
          description: 'Consider AAA contrast ratios for critical interactive elements',
          impact: 'minor',
          element: '.puzzle-hotspot',
          helpUrl: 'https://webaim.org/articles/contrast/'
        }
      ],
      passes: [
        {
          id: 'keyboard-navigation',
          description: 'All interactive elements are keyboard accessible',
          element: 'all'
        },
        {
          id: 'screen-reader-support',
          description: 'Comprehensive ARIA labels and live regions implemented',
          element: 'all'
        }
      ],
      notes: 'Excellent accessibility implementation with comprehensive support for assistive technologies.'
    }
  });

  console.log('✅ Created accessibility audit with score:', audit.overallScore);

  console.log('🌱 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
