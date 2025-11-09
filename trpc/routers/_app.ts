import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { z } from 'zod';
import { inngest } from '@/inngest/client';
import prisma from '@/lib/prisma';
import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init';

export const appRouter = createTRPCRouter({
  testAPI: protectedProcedure.mutation(async () => {
    const { text } = await generateText({
      model: google('gemini-2.5-flash'),
      prompt: 'Write a vegetarian lasagna recipe for 4 people.',
    });
    return { text };
  }),

  getWorkflows: protectedProcedure.query(async ({ ctx }) => {
    return await prisma.workflow.findMany();
  }),

  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: 'workflow/execute',
    });

    return { success: true, message: 'Job Queued Successfully' };
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
