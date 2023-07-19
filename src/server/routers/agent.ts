import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '~/server/utils';

export const agentRouter = createTRPCRouter({
  register: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    const resp = await fetch('https://api.spacetraders.io/v2/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        symbol: input,
        faction: 'COSMIC',
      }),
    });

    const data = await resp.json();
    console.log('new agent', data);

    return `agent ${input}!`;
  }),
});
