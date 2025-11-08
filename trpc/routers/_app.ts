import { z } from 'zod';
import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/prisma';
export const appRouter = createTRPCRouter({
  getUser: protectedProcedure
    .query(async ({ ctx }) => {
      return await prisma.user.findMany({
        where: {
          id: ctx.auth.user?.id,
        },
      });
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;