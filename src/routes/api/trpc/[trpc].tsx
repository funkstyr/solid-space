import { createSolidAPIHandler } from 'solid-start-trpc';

import { appRouter } from '~/server/root';
import { createTRPCContext } from '~/server/utils';

const handler = createSolidAPIHandler({
  router: appRouter,
  createContext: createTRPCContext,
});

export const GET = handler;
export const POST = handler;
