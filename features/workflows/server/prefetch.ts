import type { inferInput } from '@trpc/tanstack-react-query';

import { prefetch, trpc } from '@/trpc/server';

type Input = inferInput<typeof trpc.workflows.findMany>;

/**
 * Prefetch workflows
 */

export const prefetchWorkflows = (input: Input) => {
  return prefetch(trpc.workflows.findMany.queryOptions(input));
};
