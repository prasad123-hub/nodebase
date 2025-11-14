// eslint-disable-next-line import/no-extraneous-dependencies
import { generateSlug } from 'random-word-slugs';
import { z } from 'zod';

import prisma from '@/lib/prisma';
import { createTRPCRouter, premiumProcedure, protectedProcedure } from '@/trpc/init';

export const workflowsRouter = createTRPCRouter({
  create: premiumProcedure.mutation(async ({ ctx }) => {
    return prisma.workflow.create({
      data: {
        name: generateSlug(3, { format: 'kebab' }),
        userId: ctx.auth.user.id,
      },
    });
  }),
  remove: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return prisma.workflow.delete({
        where: {
          id: input.id,
          userId: ctx.auth.user.id,
        },
      });
    }),
  updateName: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string().min(1).max(20) }))
    .mutation(async ({ ctx, input }) => {
      return prisma.workflow.update({
        where: {
          id: input.id,
          userId: ctx.auth.user.id,
        },
        data: { name: input.name },
      });
    }),
  findOne: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    return prisma.workflow.findUnique({
      where: {
        id: input.id,
        userId: ctx.auth.user.id,
      },
    });
  }),
  findMany: protectedProcedure.query(async ({ ctx }) => {
    return prisma.workflow.findMany({
      where: {
        userId: ctx.auth.user.id,
      },
    });
  }),
});
