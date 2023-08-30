import { agentRouter } from "~/server/routers/agent";
import { exampleRouter } from "~/server/routers/example";
import { createTRPCRouter } from "~/server/utils";

export const appRouter = createTRPCRouter({
  agent: agentRouter,
  example: exampleRouter,
});

export type AppRouter = typeof appRouter;
