import { exampleRouter } from '~/server/routers/example';
import { createTRPCRouter } from '~/server/utils';

export const appRouter = createTRPCRouter({
  example: exampleRouter,
});

export type AppRouter = typeof appRouter;
