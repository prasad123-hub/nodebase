'use client';

import { useRouter } from 'next/navigation';

import { EntityContainer, EntityHeader } from '@/components/entity-components';
import { useUpgradeModal } from '@/hooks/use-upgrade-modal';
import { useCreateWorkflow, useSuspenseWorkflows } from '@/hooks/use-workflows';

export const WorkflowsList = () => {
  const { data: workflows } = useSuspenseWorkflows();

  return (
    <div>
      <ul>
        {workflows.map((workflow) => (
          <li key={workflow.id}>{workflow.name}</li>
        ))}
      </ul>
    </div>
  );
};

export const WorkflowsHeader = ({ disabled }: { disabled: boolean }) => {
  const router = useRouter();
  const createWorkflow = useCreateWorkflow();
  const { modal, handleError } = useUpgradeModal();

  const handleNewWorkflow = () => {
    createWorkflow.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`);
      },
      onError: (error) => {
        handleError(error);
      },
    });
  };

  return (
    <>
      {modal}
      <EntityHeader
        title="Workflows"
        description="Create and manage your workflows"
        newButtonLabel="New Workflow"
        onNew={handleNewWorkflow}
        disabled={disabled}
        isCreating={createWorkflow.isPending}
      />
    </>
  );
};

export const WorkflowsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <EntityContainer
      header={<WorkflowsHeader disabled={false} />}
      search={<></>}
      pagination={<></>}
    >
      {children}
    </EntityContainer>
  );
};
