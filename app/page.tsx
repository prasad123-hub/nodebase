'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { requireAuth } from '@/lib/auth-utils';
import { useTRPC } from '@/trpc/client';
import { caller } from '@/trpc/server';

export default function Home() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());
  const queryClient = useQueryClient();

  const createWorkflow = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());
      },
    }),
  );

  const testAI = useMutation(
    trpc.testAPI.mutationOptions({
      onSuccess: () => {
        console.log('AI test successful');
      },
    }),
  );

  return (
    <div>
      <h1>Workflows</h1>
      <Button
        onClick={() => createWorkflow.mutate()}
        variant="outline"
        disabled={createWorkflow.isPending}
      >
        Create Workflow
      </Button>
      <Button onClick={() => testAI.mutate()} variant="outline" disabled={testAI.isPending}>
        Test AI
      </Button>
      <ul>
        {data?.map((workflow) => (
          <li key={workflow.id}>{workflow.name}</li>
        ))}
      </ul>
      <div>{testAI.data?.text}</div>
    </div>
  );
}
