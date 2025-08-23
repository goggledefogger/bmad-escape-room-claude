import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const analyticsRouter = createTRPCRouter({
  trackInteraction: publicProcedure
    .input(z.object({
      sessionId: z.string(),
      eventType: z.string(),
      elementId: z.string().optional(),
      accessibilityContext: z.record(z.any()),
      duration: z.number().optional(),
      successful: z.boolean(),
      errorMessage: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const event = await ctx.db.analyticsEvent.create({
        data: {
          sessionId: input.sessionId,
          eventType: input.eventType,
          elementId: input.elementId,
          accessibilityContext: input.accessibilityContext,
          duration: input.duration,
          successful: input.successful,
          errorMessage: input.errorMessage,
          assistiveTechnology: (input.accessibilityContext as any)?.assistiveTech,
        }
      });

      return { success: true, eventId: event.id };
    }),

  getAccessibilityStats: publicProcedure
    .input(z.object({ roomId: z.string() }))
    .query(async ({ input, ctx }) => {
      // Get basic stats for the room
      const sessions = await ctx.db.roomSession.findMany({
        where: { roomId: input.roomId },
        include: {
          analyticsEvents: true,
        }
      });

      return {
        totalSessions: sessions.length,
        completedSessions: sessions.filter(s => s.completedAt).length,
        averageTime: sessions
          .filter(s => s.totalTimeSeconds > 0)
          .reduce((acc, s) => acc + s.totalTimeSeconds, 0) / sessions.length || 0,
        accessibilityUsage: {
          screenReader: sessions.filter(s =>
            (s.accessibilityFeatures as any)?.screenReader === true
          ).length,
          keyboardOnly: sessions.filter(s =>
            (s.accessibilityFeatures as any)?.keyboardOnly === true
          ).length,
        }
      };
    }),
});
