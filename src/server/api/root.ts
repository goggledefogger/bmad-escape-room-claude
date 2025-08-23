import { roomRouter } from "@/server/api/routers/room";
import { analyticsRouter } from "@/server/api/routers/analytics";
import { accessibilityRouter } from "@/server/api/routers/accessibility";
import { createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  room: roomRouter,
  analytics: analyticsRouter,
  accessibility: accessibilityRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
