import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const roomRouter = createTRPCRouter({
  getRoom: publicProcedure
    .input(z.object({ roomId: z.string() }))
    .query(async ({ input, ctx }) => {
      // For now, return mock data for the night train compartment
      if (input.roomId === "night-train-compartment") {
        return {
          roomId: "night-train-compartment",
          name: "The Night Train Compartment",
          description: "A cozy midnight rail mystery featuring tactile puzzles and progressive assistance",
          estimatedTimeMinutes: 5,
          difficultyLevel: 2,
          accessibilityFeatures: [
            "screen_reader",
            "keyboard_navigation",
            "high_contrast",
            "dyslexia_font",
            "reduced_motion"
          ],
          puzzleSequence: [
            {
              id: "ticket-math",
              name: "Seat Row + Platform",
              type: "combination_lock",
              description: "Examine the ticket and timetable to find the combination",
              hints: [
                "Seat row and platform—two numbers, one lock.",
                "Find the platform for your destination on the board.",
                "Order: row then platform.",
                "The combination is 125"
              ]
            },
            {
              id: "punch-card",
              name: "Punch the Route",
              type: "overlay_alignment",
              description: "Align the punch card overlay to reveal a word",
              hints: [
                "Overlays belong on the board.",
                "Align markers. Letters appear through the holes.",
                "It's a 4-letter word you can tell the conductor.",
                "The word is PASS"
              ]
            },
            {
              id: "final-gate",
              name: "Announce and Proceed",
              type: "intercom_keypad",
              description: "Use the intercom and keypad to complete your escape",
              hints: [
                "Tell the intercom the word you found.",
                "Press TALK.",
                "Use the three digits on the door.",
                "The code is 374"
              ]
            }
          ]
        };
      }

      throw new Error("Room not found");
    }),

  startSession: publicProcedure
    .input(z.object({
      roomId: z.string(),
      accessibilityPreferences: z.object({
        screenReader: z.boolean().default(false),
        keyboardOnly: z.boolean().default(false),
        highContrast: z.boolean().default(false),
        reducedMotion: z.boolean().default(false),
        fontSize: z.enum(['normal', 'large', 'extra-large']).default('normal'),
        dyslexiaFont: z.boolean().default(false),
      }).optional()
    }))
    .mutation(async ({ input, ctx }) => {
      // Create a new session in the database
      const session = await ctx.db.roomSession.create({
        data: {
          roomId: input.roomId,
          sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
          accessibilityFeatures: input.accessibilityPreferences || {},
          currentPuzzle: "ticket-math",
        }
      });

      return {
        sessionId: session.sessionId,
        roomId: session.roomId,
        currentPuzzle: session.currentPuzzle,
        accessibilityFeatures: session.accessibilityFeatures,
      };
    }),
});
