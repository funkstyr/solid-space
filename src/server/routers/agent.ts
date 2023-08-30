import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/utils";

export const agentRouter = createTRPCRouter({
  register: publicProcedure
    .input(z.string())
    // .output(
    //   z.object({
    //     token: z.string(),
    //     agent: z.object({
    //       accountId: z.string(),
    //       symbol: z.string(),
    //       headquarters: z.string(),
    //       credits: z.number(),
    //       startingFaction: z.string(),
    //     }),
    //     contract: z.object({
    //       id: z.string(),
    //       factionSymbol: z.string(),
    //       type: z.string(),
    //       terms: z.any(),
    //       accepted: z.boolean(),
    //       fulfilled: z.boolean(),
    //       expiration: z.date(),
    //       deadlineToAccept: z.date(),
    //     }),
    //     faction: z.object({
    //       symbol: z.string(),
    //       name: z.string(),
    //       description: z.string(),
    //       headquarters: z.string(),
    //       traits: z.array(z.any()),
    //       isRecruiting: z.boolean(),
    //     }),
    //     ship: z.object({
    //       symbol: z.string(),
    //       nav: z.any(),
    //       crew: z.any(),
    //       fuel: z.any(),
    //       frame: z.any(),
    //       reactor: z.any(),
    //       engine: z.any(),
    //       modules: z.array(z.any()),
    //       mounts: z.array(z.any()),
    //       registration: z.any(),
    //       cargo: z.any(),
    //     }),
    //   })
    // )
    .mutation(async ({ input }) => {
      const resp = await fetch("https://api.spacetraders.io/v2/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symbol: input,
          faction: "COSMIC",
        }),
      });

      return resp.json();
    }),

  select: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    // set token as ctx for other routes

    if (!input) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "token invalid",
      });
    }

    ctx.token = input;
  }),
});
